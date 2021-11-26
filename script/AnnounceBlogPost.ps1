
$Post = Invoke-RestMethod -Uri https://thedavecarroll.com/feed.xml | Sort-Object -Property published | Where-Object { $_.category.term -contains '["powershell"]' } | Select-Object -Last 1
if ($Post) {
    $TweetText = @'
New on my #PowerShell blog: {0}

{1}
{2}
'@ -f $Post.title.InnerText.Replace('#',''), $Post.summary.InnerText.Replace('#','').Replace('BluebirdPS','#BluebirdPS'),$Post.link.href

    Publish-Tweet -TweetText $TweetText
}
