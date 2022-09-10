[CmdletBinding()]
param(
    [string]$DraftPath = './_drafts',
    [string]$PostsPath = './_posts'
)

$DraftArticles = Get-ChildItem -Path (Join-Path -Path $DraftPath -ChildPath '*') -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        'Found 1 article in {0}' -f $DraftPath
    } else {
        'Found {0} articles in {1}' -f $DraftArticles.Count,$DraftPath
    }
} else {
    'No markdown files found in {0}' -f $DraftPath
}

'Checking articles:'
foreach ($Draft in $DraftArticles) {
    $FrontMatter = Get-Content -Path $Draft.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $CheckDate = '{0}: CHECK DATE : {1}' -f $FrontMatter['title'],$FrontMatter['date'].ToShortDateString()
        if ($FrontMatter['date'].ToShortDateString() -lt (Get-Date).ToShortDateString()) {
            '{0}: SKIPPED : Article ''date'' is set in the past. Please update the ''date'' value to a future date.' -f $CheckDate
        } elseif ($FrontMatter['date'].ToShortDateString() -eq (Get-Date).ToShortDateString()) {
            '{0}: Renaming' -f $CheckDate

        } else {
            '{0}: SKIPPED : Article is scheduled for a future date.'  -f $CheckDate
        }

    } else {
        '{0}: SKIPPED : Article does not contain a date value.' -f $FrontMatter['title']
    }
}
