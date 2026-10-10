#!/bin/bash
# Submit URLs to IndexNow for search engine indexing
#
# Usage: ./scripts/indexnow.sh [--all | --seed] [--dry-run] [url]
#   (no argument)  submit URLs that are new, or whose <lastmod> changed, since the last submission
#   url            submit that one URL
#   --all          submit every URL in the sitemap
#   --seed         record the current sitemap as already submitted, without submitting
#   --dry-run      show what would be submitted; submit nothing and record nothing
#
# The record of what was last submitted is .indexnow-state (gitignored), one
# "url lastmod" line per URL. It is rewritten only after IndexNow accepts a submission.

SITE_URL="https://thedavecarroll.com"
HOST="thedavecarroll.com"
KEY="373049aeb0c90a6275dad38f9dd7fbc2"
KEY_LOCATION="${SITE_URL}/${KEY}.txt"
ENDPOINT="https://api.indexnow.org/indexnow"
STATE_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.indexnow-state"

MODE="changed"
DRY_RUN=0
SINGLE_URL=""
for arg in "$@"; do
    case "$arg" in
        --all)      MODE="all" ;;
        --seed)     MODE="seed" ;;
        --dry-run)  DRY_RUN=1 ;;
        -h|--help)  sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        -*)         echo "Unknown option: $arg" >&2; exit 2 ;;
        *)          SINGLE_URL="$arg" ;;
    esac
done

# Read URLs (one per line) on stdin and submit them. Accepted: HTTP 200 or 202.
submit() {
    local urls count body code
    urls=$(cat)
    count=$(printf '%s\n' "$urls" | grep -c .)
    body=$(printf '%s\n' "$urls" | jq -R -s -c --arg host "$HOST" --arg key "$KEY" --arg loc "$KEY_LOCATION" \
        '{host: $host, key: $key, keyLocation: $loc, urlList: (split("\n") | map(select(length > 0)))}')
    echo "Submitting $count URL(s) to IndexNow..."
    code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$ENDPOINT" \
        -H "Content-Type: application/json" -d "$body")
    if [ "$code" = "200" ] || [ "$code" = "202" ]; then
        echo "Accepted (HTTP $code)."
        return 0
    fi
    echo "IndexNow answered HTTP $code" >&2
    return 1
}

if [ -n "$SINGLE_URL" ]; then
    echo "Submitting: $SINGLE_URL"
    [ "$DRY_RUN" -eq 1 ] && { echo "(dry run: nothing submitted)"; exit 0; }
    printf '%s\n' "$SINGLE_URL" | submit
    exit $?
fi

# Current sitemap as "url lastmod" lines, sorted. The query string keeps an edge copy out of the way.
echo "Fetching sitemap..."
CURRENT=$(mktemp) && trap 'rm -f "$CURRENT"' EXIT
curl -s "${SITE_URL}/sitemap.xml?indexnow=$(date +%s)" \
    | tr '\n' ' ' | sed 's#</url>#&\
#g' \
    | sed -nE 's#.*<loc>([^<]*)</loc>[[:space:]]*(<lastmod>([^<]*)</lastmod>)?.*#\1 \3#p' \
    | LC_ALL=C sort > "$CURRENT"

TOTAL=$(grep -c . "$CURRENT")
if [ "$TOTAL" -eq 0 ]; then
    echo "No URLs found in ${SITE_URL}/sitemap.xml" >&2
    exit 1
fi

if [ "$MODE" = "seed" ]; then
    [ "$DRY_RUN" -eq 1 ] && { echo "(dry run) would record $TOTAL URLs as submitted"; exit 0; }
    cp "$CURRENT" "$STATE_FILE"
    echo "Recorded $TOTAL URLs as already submitted."
    exit 0
fi

if [ "$MODE" = "all" ] || [ ! -f "$STATE_FILE" ]; then
    [ "$MODE" != "all" ] && echo "No record of earlier submissions: submitting everything."
    TO_SUBMIT=$(cut -d' ' -f1 "$CURRENT")
else
    TO_SUBMIT=$(LC_ALL=C comm -23 "$CURRENT" <(LC_ALL=C sort "$STATE_FILE") | cut -d' ' -f1)
fi

if [ -z "$TO_SUBMIT" ]; then
    echo "No new or changed URLs since the last submission ($TOTAL in the sitemap)."
    exit 0
fi

if [ "$DRY_RUN" -eq 1 ]; then
    echo "(dry run) would submit $(printf '%s\n' "$TO_SUBMIT" | grep -c .) of $TOTAL URL(s):"
    printf '%s\n' "$TO_SUBMIT"
    exit 0
fi

if printf '%s\n' "$TO_SUBMIT" | submit; then
    cp "$CURRENT" "$STATE_FILE"
else
    exit 1
fi
