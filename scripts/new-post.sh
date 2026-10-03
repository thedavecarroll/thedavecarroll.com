#!/bin/bash
# Create a new article from archetypes/default.md.
#
# Usage: ./scripts/new-post.sh [-s section] [-b] [-n] <slug>
#   -s  Section: powershell (default) or blog
#   -b  Create as a page bundle (folder with index.md) so images can sit next to it
#   -n  No table of contents: writes "toc: false" into the front matter
#
# The archetype sets the front matter date to the moment the file is created
# and marks the article as a draft.

set -euo pipefail

usage() {
    echo "Usage: $0 [-s section] [-b] [-n] <slug>"
    echo "  -s  Section: powershell (default) or blog"
    echo "  -b  Create as a page bundle (folder with index.md)"
    echo "  -n  No table of contents (toc: false)"
    echo ""
    echo "Examples:"
    echo "  $0 my-new-article             # content/powershell/my-new-article.md"
    echo "  $0 -s blog my-new-article     # content/blog/my-new-article.md"
    echo "  $0 -b -n my-new-article       # content/powershell/my-new-article/index.md, no TOC"
}

SECTION=powershell
BUNDLE=false
TOC=true

while getopts "s:bnh" opt; do
    case $opt in
        s) SECTION=$OPTARG ;;
        b) BUNDLE=true ;;
        n) TOC=false ;;
        h) usage; exit 0 ;;
        *) usage; exit 1 ;;
    esac
done
shift $((OPTIND-1))

if [ $# -ne 1 ]; then
    usage
    exit 1
fi

SLUG=$1

case $SECTION in
    powershell|blog) ;;
    *) echo "Unknown section: $SECTION (use powershell or blog)" >&2; exit 1 ;;
esac

case $SLUG in
    *[!a-z0-9-]*|-*|'')
        echo "Slug must be lowercase letters, digits and hyphens: $SLUG" >&2
        exit 1 ;;
esac

# Run from the site root, wherever the script was called from
cd "$(dirname "$0")/.."

if [ "$BUNDLE" = true ]; then
    POST_PATH="$SECTION/$SLUG/index.md"
else
    POST_PATH="$SECTION/$SLUG.md"
fi

# Either form of the same slug would publish to the same URL
if [ -e "content/$SECTION/$SLUG" ] || [ -e "content/$SECTION/$SLUG.md" ]; then
    echo "Already exists: content/$SECTION/$SLUG" >&2
    exit 1
fi

hugo new content "$POST_PATH"

FILE="content/$POST_PATH"

if [ "$TOC" = false ]; then
    # Insert "toc: false" just before the closing front matter delimiter
    awk '/^---$/ { n++; if (n == 2) print "toc: false" } { print }' "$FILE" > "$FILE.tmp"
    mv "$FILE.tmp" "$FILE"
fi

echo "Created $FILE"
grep -m1 '^date:' "$FILE"
[ "$TOC" = false ] && echo "toc: false"
exit 0
