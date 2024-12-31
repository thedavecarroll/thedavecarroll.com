---
title: Where are the PowerShell People on Mastodon?
description: If you are like many others, you may have been contemplating which Mastodon instance to join, but which one?
published: 2022-11-29
tags: ["mastodon", "fediverse", "twitter", "twitter-api", "powershell", "bluebirdps", "github-actions", "gh-actions"]
categories: ["PowerShell"]
---

## Mastodon

In light of recent events with Twitter, you may have heard about a different micro-blogging site called [Mastodon](https://joinmastodon.org/).
It has been around for a few years, 2016 to be exact, so it's definitely not *new*.

And it's technically not *a* site, as the heart and possibly the main draw of Mastodon is that it has multiple instances
all run by individuals, typically not large corporations.
Each instance can establish its own Code of Conduct and Terms of Services.
Some instances require an invite, others do not.
They are connected through federation to what's know as the [Fediverse](https://en.wikipedia.org/wiki/Fediverse).

This explanation definitely falls short in describing Mastodon's history and capabilities.
It is meant to be a brief introduction as there have been many bloggers writing about Mastodon over the last month.
I don't want to waste any more time explaining what it is, how to create an account, or whatever.

## Enter BluebirdPS

<img src="/images/powershell-people-on-mastodon/bluebirdps-logo.jpg" alt="BluebirdPS Logo" width="150" height="150">

Many Twitter users are creating accounts on various Mastodon instances.
With Twitter all of your followers and following and content is/was in one place
which makes/made it easier to find and share with communities that focus on your interests.

With Mastodon, even though there is federation between *(most)* instances,
you need to know the instance name to follow anyone.
For instance *(pun intended)*, my Mastodon account is `@thedavecarroll@fosstodon.org`
which can also be represented as [https://fosstodon.org/@thedavecarroll](https://fosstodon.org/@thedavecarroll).

Users that are creating accounts have been providing their Mastodon account references in their Twitter user profiles and in tweets.
Anecdotally, it's best practice to leave a *forwarding address* as doing so will help others find you.

But what if you wanted to find *your* followers in the Mastodon federation?
[BluebirdPS]({{< relref "retired-links.md" >}}) can help with that.

In BluebirdPS v0.8.0, I included a command called `Find-TwitterMastodonLinks` that will find Mastodon account references for you.

For Users, matches will be discovered in any part of the `Name`, `Description`, or included `Url` entities.
For Tweets, matches will be discovered in the Tweet `Text` or included `Url` entities.

I want to show you how you can use the command to make custom queries as your filtering criteria.

## PowerShell Community Discovery

In order to find which Mastodon instances PowerShell community members have been using the most, we need to first find the community members.
We can do this several ways.

### Users

The quickest set of data that you can use would be your followers or those you follow.

```powershell
$Followers = Get-TwitterFollowers -IncludeExpansions
```

![Get-TwitterFollowers Errors](/images/powershell-people-on-mastodon/get-twitterfollowers-errors-1.png "Get-TwitterFollowers Errors")

And that produced a few lines of red.
The errors are for tweets that may have been deleted or from account that protects their tweets (prevents public access).

![Get-TwitterFollowers Protected Tweets](/images/powershell-people-on-mastodon/get-twitterfollowers-errors-2.png "Get-TwitterFollowers Protected Errors")

Let's try again.

```powershell
$Followers = Get-TwitterFollowers -IncludeExpansions -ErrorAction SilentlyContinue
```

And that yielded 1395 objects for me.
However, since we used the `IncludeExpansions` switch, we also retrieved tweets the users may have pinned to their profiles.

```powershell
$Followers.Where{$_.GetType() -match 'User'}.Count
# 1147
$Followers.Where{$_.GetType() -match 'Tweet'}.Count
# 248
```

So, this is all of my followers and (unfortunately?) I know that some of them are not part of the PowerShell community.

```powershell
$Followers.Where{$_.GetType() -match 'User' -and $_.Description -match 'PowerShell|pwsh'}.Count
# 234
```

By adding a match for `PowerShell` or `pwsh` for Description for users, we see that out of 1147 users,
only 234 seem to focus on PowerShell enough to include it in their profile description.

Now, using the same criteria to search the pinned tweets, we find 35 (out of 248).

```powershell
 $Followers.Where{$_.GetType() -match 'Tweet' -and $_.Text -match 'PowerShell|pwsh'}.Count
# 35
```

Now we can combine the two and see that the count matches from the two previous filters.

```powershell
$PowerShellRegex = 'PowerShell|pwsh'
$Followers.Where{$_.Description -match $PowerShellRegex -or $_.Text -match $PowerShellRegex}.Count
# 269
```

I'm going to add friends, which is those users that I follow and include them in the searches.

```powershell
$Friends = Get-TwitterFriends -IncludeExpansions -ErrorAction SilentlyContinue
$MyPowerShellTwitterUsers = $Followers + $Friends |
  Where-Object {$_.Description -match $PowerShellRegex -or $_.Text -match $PowerShellRegex}
$MyPowerShellTwitterUsers.Where{$_.GetType() -match 'User'}.Count
# 529
$MyPowerShellTwitterUsers.Where{$_.GetType() -match 'Tweet'}.Count
# 86
```

Next, we will use `Find-TwitterMastodonLinks` to search through those 615 users and tweets for any Mastodon account references.
However, we do need to think about filtering out false positives.
That is to say, there are some domains and sites that use the same `@account@domain.tld` or `https://domain.tld/@account` scheme.

Here is the list that have been identified so far: `youtube.com`, `medium.com`, `withkoji.com`, `counter.social`, and `twitter.com`

{{< notice type="important" >}}
CounterSocial, `counter.social` domain, is a closed Mastodon instance.
Unless you are on that instance, you won't be able to follow users on that instance.
{{< /notice >}}

```powershell
$IgnoreDomain = 'youtube.com', 'medium.com', 'withkoji.com', 'counter.social', 'twitter.com'
$MastodonAccounts = $MyPowerShellTwitterUsers |
  Find-TwitterMastodonLinks -IgnoreDomain $IgnoreDomain
$MastodonAccounts.count
# 34
```

And that gives us 34 Twitter users that have PowerShell or pwsh in their profile description, display name, urls,
or in their pinned tweets text or urls.
Ideally, we would need a larger sample but based on what we do have, here is a list of the Mastodon instances that have at least one PowerShell community member.

```powershell
$MastodonAccounts |
  Group-Object MastodonInstance |
  Sort-Object Count -Descending |
  Format-Table Count,Name -AutoSize
```

```text
Count Name
----- ----
    7 infosec.exchange
    5 fosstodon.org
    5 mastodon.social
    3 hachyderm.io
    2 dataplatform.social
    2 spletzer.com
    1 4bes.dev
    1 boothcomputing.social
    1 home.social
    1 mas.to
    1 masto.ai
    1 mastodon.nu
    1 nrw.social
    1 social.ataxya.net
    1 tech.lgbt
    1 twit.social
```

If you were to look at `$MastodonAccounts`, there may appear to be duplicates.
There is a property in the `[BluebirdPS.TwitterMastodonReference]` class, `TwitterElement`,
that contains what matched on the Twitter side.

For the Twitter user, `sassdawe`, you see below that they matched on Name and a UrlEntity.

```powershell
$MastodonAccounts.Where{$_.TwitterUserName -eq 'sassdawe'}
```

```text
TwitterUserName        : sassdawe
TwitterUser            : @sassdawe@infosec.exchange
TwitterUrl             : https://twitter.com/sassdawe
TwitterElement         : Name
MastodonUser           : @sassdawe
MastodonInstance       : infosec.exchange
MastodonAccountAddress : @sassdawe@infosec.exchange
MastodonUrl            : https://infosec.exchange/@sassdawe
IsValidDomain          : True

TwitterUserName        : sassdawe
TwitterUser            : @sassdawe@infosec.exchange
TwitterUrl             : https://twitter.com/sassdawe
TwitterElement         : UrlEntity
MastodonUser           : @sassdawe
MastodonInstance       : infosec.exchange
MastodonAccountAddress : @sassdawe@infosec.exchange
MastodonUrl            : https://infosec.exchange/@sassdawe
IsValidDomain          : True
```

### Recent Tweets

We can use a similar method, though perhaps more direct, to search the last 7 days of tweets for Mastodon account references.

```powershell
$SearchTweet = Search-Tweet -SearchString '(#PowerShell OR #pwsh)' -IncludeExpansions -ErrorAction SilentlyContinue
$SearchTweet.Count
# 4926
$MastodonAccountFromTweetSearch = $SearchTweet |
  Find-TwitterMastodonLinks -IgnoreDomain $IgnoreDomain
$MastodonAccountFromTweetSearch.Count
# 66
```

Almost 5000 tweets and users *(by using the `IncludeExpansions` switch)*, so that should be a better sample.
And less than 5 seconds later, we find a disappointing 66 *(still better than 35 when we searched users)*.

```powershell
$MastodonAccounts + $MastodonAccountFromTweetSearch |
  Sort-Object MastodonAccountAddress -Unique |
  Group-Object MastodonInstance |
  Sort-Object Count -Descending |
  Format-Table Count,Name -AutoSize
```

We combine the two lists, drop any duplications, and group by the instance name to get the number of PowerShell community members on that instance.

```text

Count Name
----- ----
   19 infosec.exchange
    7 mastodon.social
    6 fosstodon.org
    4 dataplatform.social
    4 hachyderm.io
    3 techhub.social
    2 twit.social
    2 mastodon.online
    2 mastodon.nu
    2 mas.to
    2 home.social
    2 chaos.social
    2 tech.lgbt
    1 nrw.social
    1 social.ataxya.net
    1 phpc.social
    1 social.ohmyposh.dev
    1 spletzer.com
    1 sfba.social
    1 mstdn.social
    1 mastodon.cloud
    1 mastodon.uno
    1 masto.ai
    1 infosec.exchang
    1 det.social
    1 defcon.social
    1 dbatools.io
    1 boothcomputing.social
    1 mstdn.io
    1 4bes.dev
```

### Lists

You can also search any curated lists you own or public lists that others curate.
I won't get into detail for these as the basics will be the same.

You would use these commands to discover lists and get their memberships.

- Get-TwitterList
- Get-TwitterListMember
- Get-TwitterListSubscriber

## Create Export File

Once you have a list, you need to save it as a CSV file with specific headers.
You will need to have `Account address` and `Show boosts` at minimum.
The easiest way to create this is by using calculated properties for `Select-Object`.

```powershell
$MastodonAccounts + $MastodonAccountFromTweetSearch |
  Sort-Object -Property MastodonAccountAddress -Unique |
  Select-Object -Property @{
    label='Account address'
    expression = { $_.MastodonAccountAddress }
  },
  @{
    label='Show boosts'
    expression = { $true }
  } |
  Export-CSV -Path $MastodonCSVFile
```

The two variables could contain identical entries.
To only get the unique entries, we can use the `Sort-Object` command and its `Unique` switch.

{{< notice type="tip" >}}
`Show boosts` is a boolean and allows you to see when the user boosts others' toots/posts.
Beginning with Mastodon version 4 and higher, there are other fields that will be present
if you were to export your follows on an instance with that version.
They are not required for a successful import.
{{< /notice >}}

## Your Own Criteria

Here are the basic steps that you would need to perform in order to generate your own CSV.

1. Get Users or Tweets from which ever command as appropriate.
2. Filter on your own criteria.
3. Use `Find-TwitterMastodonLinks` to discover the Mastodon accounts.
4. Create CSV file.
5. Login into your instance and use the import tool.

## GitHub Actions

If that seems like a lot of trouble to go through, [Chrissy LeMaire](https://bsky.app/profile/funbucket.dev) has worked on
a few GitHub Actions that will help in the automated discovery, import, and export.

- [Exodus](https://github.com/marketplace/actions/twitter-exodus)
  - Searches lists, hashtags, account followers and more for Mastodon links in their name, bio or pinned tweet.
  - Saves information as CSV that can be imported.
  - Powered by [BluebirdPS]({{< relref "retired-links.md" >}}).
- [Influx](https://github.com/marketplace/actions/mastodon-influx)
  - Imports CSV files into your Mastodon account.
  - Categories imported - follows, mutes, account blocks, lists, bookmarks, and domain blocks.
- [Fossilize](https://github.com/marketplace/actions/mastodon-fossilize)
  - Automated backup of your Mastodon account items.
  - Categories exported - follows, mutes, account blocks, lists, bookmarks, domain blocks, followers, posts.

## Summary

Hopefully this article has been helpful to you, whether learning how to use BluebirdPS to find Mastodon accounts
or learning about Exodus and Fossilize.
The latter can help you migrate to a new Mastodon instance should you discover one you prefer over your current one.

In any case, I hope to see you around the Mastodon neighborhood.

Thank you for reading this article.
I really would like to hear your thoughts on it.

If you have any comments or questions, please post them below.
