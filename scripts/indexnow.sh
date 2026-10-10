#!/bin/bash
# Submit URLs to IndexNow for search engine indexing
# Usage: ./scripts/indexnow.sh [url]
# If no URL provided, submits the sitemap

SITE_URL="https://thedavecarroll.com"
HOST="thedavecarroll.com"
KEY="373049aeb0c90a6275dad38f9dd7fbc2"
KEY_LOCATION="${SITE_URL}/${KEY}.txt"

if [ -n "$1" ]; then
    # Submit single URL
    URL="$1"
    echo "Submitting: $URL"
    curl -s -X POST "https://api.indexnow.org/indexnow" \
        -H "Content-Type: application/json" \
        -d "{
            \"host\": \"${HOST}\",
            \"key\": \"${KEY}\",
            \"keyLocation\": \"${KEY_LOCATION}\",
            \"urlList\": [\"${URL}\"]
        }"
    echo ""
else
    # Submit all URLs from sitemap
    echo "Fetching sitemap..."
    # Portable extraction (BSD and GNU grep); works on minified single-line sitemaps too
    URLS=$(curl -s "${SITE_URL}/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<\/*loc>//g')

    URL_COUNT=$(printf '%s\n' "$URLS" | grep -c .)
    if [ "$URL_COUNT" -eq 0 ]; then
        echo "No URLs found in ${SITE_URL}/sitemap.xml" >&2
        exit 1
    fi

    # Convert to JSON array
    URL_JSON=$(printf '%s\n' "$URLS" | jq -R -s -c 'split("\n") | map(select(length > 0))')

    echo "Submitting $URL_COUNT URLs to IndexNow..."

    RESPONSE=$(curl -s -X POST "https://api.indexnow.org/indexnow" \
        -H "Content-Type: application/json" \
        -d "{
            \"host\": \"${HOST}\",
            \"key\": \"${KEY}\",
            \"keyLocation\": \"${KEY_LOCATION}\",
            \"urlList\": ${URL_JSON}
        }")

    if [ -z "$RESPONSE" ]; then
        echo "Success! URLs submitted to IndexNow."
    else
        echo "Response: $RESPONSE"
    fi
fi
