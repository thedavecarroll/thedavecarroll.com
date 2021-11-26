# ------------------------------------------------------------------------------
# update jekyll
Remove-Item .\gemfile.lock

# ------------------------------------------------------------------------------
# setup add upstream to remote
#
git remote add upstream https://github.com/mmistakes/minimal-mistakes.git

# ------------------------------------------------------------------------------
# pull updated files from upstream remote
#
git fetch upstream
git merge upstream/main --allow-unrelated-histories

# ------------------------------------------------------------------------------
# find staged files
#
$Staged = git status -s -uno

# ------------------------------------------------------------------------------
# removing unneeded staged files
#
$Unstage = 'docs/|test/|screenshot|\.github'

'Removing files matching: {0}' -f $Unstage
$Incoming = $Staged | Where-Object { $_ -match '^A\s'}
foreach ($file in $Incoming) {
    if ($file -match $Unstage) {
        $filename = $file.split(' ',2)[1].trim()
        git reset $filename | Out-Null
    }
}

# ------------------------------------------------------------------------------
# do not auto merge these files
#
$SkipMerge = '_config|gitignore|\.travis\.yml|index\.html|LICENSE|main\.scss|_variables|single|home|author-profile-custom-links|archive-single|navigation\.yml|staticman\.yml|README|ui-text\.yml'

'Auto-merging files not matching: {0}' -f $SkipMerge
$Conflicts = $Staged | Where-Object { $_ -match '^AA\s' }
foreach ($file in $Conflicts) {
    if ($file -notmatch $SkipMerge) {
        $filename = $file.split(' ',2)[1].trim()
        #$filename
        git checkout --theirs $filename | Out-Null
        git add $filename | Out-Null
    }
}
