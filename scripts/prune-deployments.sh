#!/bin/bash
# Delete old Cloudflare Pages deployments for this site.
#
# Pages keeps every deployment forever and has no retention setting. This keeps:
#   - the newest KEEP_PRODUCTION production deployments (default 3)
#   - the newest deployment of each preview branch
# and deletes the rest.
#
# Usage: ./scripts/prune-deployments.sh [--dry-run]
#   --dry-run  List what would be deleted and delete nothing
#
# Needs curl and jq, and ~/.config/cloudflare/pages.env with
# CLOUDFLARE_API_TOKEN (Pages Edit) and CLOUDFLARE_ACCOUNT_ID.
# The live production deployment is always the newest, so it is always kept;
# Cloudflare also refuses to delete it.

set -euo pipefail

PROJECT=thedavecarroll-com
KEEP_PRODUCTION=${KEEP_PRODUCTION:-3}
ENV_FILE=~/.config/cloudflare/pages.env

DRY_RUN=false
case ${1:-} in
    '') ;;
    --dry-run) DRY_RUN=true ;;
    *) echo "Usage: $0 [--dry-run]" >&2; exit 1 ;;
esac

for tool in curl jq; do
    command -v "$tool" > /dev/null || { echo "$tool is required" >&2; exit 1; }
done

if [ ! -f "$ENV_FILE" ]; then
    echo "Missing $ENV_FILE" >&2
    exit 1
fi
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a
: "${CLOUDFLARE_API_TOKEN:?not set in $ENV_FILE}"
: "${CLOUDFLARE_ACCOUNT_ID:?not set in $ENV_FILE}"

API="https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT/deployments"

api() {
    curl --silent --show-error --max-time 30 --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" "$@"
}

# Collect every deployment, one page at a time. The loop ends at the page
# count Cloudflare reports, on an empty page, or if a page repeats, so an API
# that ignores the page number cannot make it run forever.
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

MAX_PAGES=200
page=1
previous_first=''
echo "Listing deployments of $PROJECT..." >&2
while [ "$page" -le "$MAX_PAGES" ]; do
    api "$API?per_page=25&page=$page" > "$WORK/response.json"
    if [ "$(jq -r '.success' "$WORK/response.json")" != "true" ]; then
        echo "Cloudflare API error on page $page:" >&2
        jq -c '.errors' "$WORK/response.json" >&2
        exit 1
    fi
    count=$(jq '.result | length' "$WORK/response.json")
    first=$(jq -r '.result[0].id // ""' "$WORK/response.json")
    if [ "$count" -eq 0 ] || [ "$first" = "$previous_first" ]; then
        break
    fi
    jq '.result' "$WORK/response.json" > "$WORK/page-$page.json"
    echo "  page $page: $count" >&2
    total_pages=$(jq -r '.result_info.total_pages // 0' "$WORK/response.json")
    if [ "$total_pages" -gt 0 ] && [ "$page" -ge "$total_pages" ]; then
        break
    fi
    previous_first=$first
    page=$((page + 1))
done

if ls "$WORK"/page-*.json > /dev/null 2>&1; then
    ALL=$(jq -s 'add | unique_by(.id)' "$WORK"/page-*.json)
else
    ALL='[]'
fi

total=$(echo "$ALL" | jq 'length')

# id, environment, branch, created_on for everything that is not kept
TO_DELETE=$(echo "$ALL" | jq -r --argjson keep "$KEEP_PRODUCTION" '
    def branch: .deployment_trigger.metadata.branch // "unknown";
    (map(select(.environment == "production")) | sort_by(.created_on) | reverse | .[$keep:]) as $old_production
    | (map(select(.environment != "production"))
        | group_by(branch)
        | map(sort_by(.created_on) | reverse | .[1:])
        | add // []) as $old_previews
    | ($old_production + $old_previews)
    | sort_by(.created_on)
    | .[]
    | [.id, .environment, branch, .created_on]
    | @tsv')

if [ -z "$TO_DELETE" ]; then
    echo "$PROJECT: $total deployments, nothing to delete"
    exit 0
fi

delete_count=$(echo "$TO_DELETE" | wc -l | tr -d ' ')
echo "$PROJECT: $total deployments, $delete_count to delete, $((total - delete_count)) kept"

failed=0
while IFS=$'\t' read -r id environment branch created; do
    if [ "$DRY_RUN" = true ]; then
        echo "would delete  $created  $environment  $branch  $id"
        continue
    fi
    # force=true is needed for deployments that still have a branch alias
    result=$(api --request DELETE "$API/$id?force=true")
    if [ "$(echo "$result" | jq -r '.success')" = "true" ]; then
        echo "deleted       $created  $environment  $branch  $id"
    else
        echo "FAILED        $created  $environment  $branch  $id  $(echo "$result" | jq -c '.errors')" >&2
        failed=$((failed + 1))
    fi
done <<< "$TO_DELETE"

if [ "$DRY_RUN" = true ]; then
    echo "Dry run: nothing was deleted"
fi
[ "$failed" -eq 0 ]
