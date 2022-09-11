[CmdletBinding()]
param(
    [string]$DraftPath = '_drafts',
    [string]$PostsPath = '_posts',
    [string]$ConfigPath = '_config.yml',
    [switch]$MultiplePosts,
    [switch]$PreserveDateFileName
)

#region Set Variables
$BasePath = Split-Path -Path $PSScriptRoot -Parent
$ResolvedDraftPath = Join-Path -Path $BasePath -ChildPath $DraftPath -AdditionalChildPath '*'
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameFileList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
#endregion

#region Set TimeZone
'::group::Set TimeZone'
$TimeZone = (Get-TimeZone).StandardName
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''{0}''.' -f $TimeZone
try {
    if (Test-Path -Path $ResolvedConfigPath) {
        $TimeZone = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($TimeZone)) {
            'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath,$TimeZone
        } else {
            $DefaultTimeZoneMessage
        }
    } else {
        $DefaultTimeZoneMessage
    }
}
catch {
    $DefaultTimeZoneMessage
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date),$TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'
#endregion

#region Draft Article Discovery
'::group::Draft Article Discovery'
$DraftArticles = Get-ChildItem -Path $ResolvedDraftPath -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        'Found 1 article in {0}.' -f $DraftPath
    } else {
        'Found {0} articles in {1}.' -f $DraftArticles.Count,$DraftPath
    }
    $DraftArticles.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $DraftPath
}
'::endgroup::'
#endregion

#region Checking Draft Article Date
'::group::Checking Draft Article Date'
foreach ($Article in $DraftArticles) {
    $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        '{0}: DATE : {1}' -f $FrontMatter['title'],$FrontMatter['date'].ToShortDateString()
        if ($FrontMatter['date'].ToShortDateString() -lt $CurrentDate.ToShortDateString()) {
            '::warning:: {0}: Article ''date'' is set in the past. Please update the ''date'' value to a future date.' -f $FrontMatter['title']
            '::warning:: {0}: SKIPPED' -f $FrontMatter['title']
        } elseif ($FrontMatter['date'].ToShortDateString() -eq $CurrentDate.ToShortDateString()) {
            $RenameFileList.Add($Article)
            '{0}: Including article to rename.' -f $FrontMatter['title']
        } else {
            '{0}: Article is scheduled for a future date.' -f $FrontMatter['title']
            '{0}: SKIPPED.' -f $FrontMatter['title']
        }
    } else {
        '{0}: Article does not contain a date value.' -f $FrontMatter['title']
        '{0}: SKIPPED.' -f $FrontMatter['title']
    }
}
'::endgroup::'
#endregion

#region Handling Multiple Draft Articles with Current Date
'::group::Handling Multiple Draft Articles with Current Date'
if ($RenameFileList.Count -gt 1) {
    '::warning::More than one draft article found with front matter date value of {0}.' -f $FormattedDate
    $RenameFileList = $RenameFileList | Sort-Object -Property LastWriteTimeUtc
    if ($MultiplePosts.IsPresent) {
        '::warning::Multiple draft articles will be published per day chronologically.'
    } else {
        '::warning::Multiple draft article with today''s date and ''MultiplePosts'' is not enabled. The last edited file will be published.'
        $RenameFileList = $RenameFileList | Select-Object -Last 1
    }
}
'::endgroup::'
#endregion

#region Renaming Draft Articles with Valid Date
'::group::Renaming Draft Articles with Valid Date'
foreach ($Article in $RenameFileList) {
    $NewFileName = '{0}-{1}' -f $FormattedDate,$Article.Name
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be prepended with {}.' -f $FormattedDate
        } else {
            '::warning::''PreserveDateFileName'' is not enabled. The exiting date {0} will be removed from the filename and it will be prepended with {1}.' -f $Matches[0],$FormattedDate
            $NewFileName = '{0}{1}' -f $FormattedDate,$Article.Name.Replace($Matches[0],'')
        }
    }
    'Article new filename will be {0}.' -f $NewFileName
}
'::endgroup::'
#endregion
