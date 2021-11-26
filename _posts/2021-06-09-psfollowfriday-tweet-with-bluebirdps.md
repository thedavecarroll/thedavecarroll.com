---
layout: single
title: "#PSFollowFriday Tweet with BluebirdPS"
excerpt: "Learn how to use BluebirdPS to generate and publish a #PSFollowFriday Tweet."
date: 2021-06-09
header:
  overlay_image: /assets/images/bluebirdps/psfollowfriday-tweet.png
  overlay_filter: 0.9
comments: true
tags:
  - bluebirdps
  - twitter
  - twitter client
  - twitter api
  - tweet
  - social media
  - powershell module
category:
  - powershell
---

<blockquote class="twitter-tweet" data-theme="light"><p lang="en" dir="ltr">For today&#39;s <a href="https://twitter.com/hashtag/PowerShell?src=hash&amp;ref_src=twsrc%5Etfw">#PowerShell</a> <a href="https://twitter.com/hashtag/PSFollowFriday?src=hash&amp;ref_src=twsrc%5Etfw">#PSFollowFriday</a>, I&#39;ve pulled a random sample from <a href="https://twitter.com/ctmcisco?ref_src=twsrc%5Etfw">@ctmcisco</a>&#39;s Twitter List, Powershell.<a href="https://t.co/Ja8SzseEtS">https://t.co/Ja8SzseEtS</a><a href="https://twitter.com/bgelens?ref_src=twsrc%5Etfw">@bgelens</a> <a href="https://twitter.com/IISResetMe?ref_src=twsrc%5Etfw">@IISResetMe</a> <a href="https://twitter.com/JM2K69?ref_src=twsrc%5Etfw">@JM2K69</a> <a href="https://twitter.com/markwragg?ref_src=twsrc%5Etfw">@markwragg</a> <a href="https://twitter.com/awickham?ref_src=twsrc%5Etfw">@awickham</a> <a href="https://twitter.com/psCookieMonster?ref_src=twsrc%5Etfw">@psCookieMonster</a> <a href="https://twitter.com/DarwinTheorizes?ref_src=twsrc%5Etfw">@DarwinTheorizes</a> <a href="https://twitter.com/singhprateik?ref_src=twsrc%5Etfw">@singhprateik</a> <a href="https://twitter.com/obilogic?ref_src=twsrc%5Etfw">@obilogic</a> <a href="https://twitter.com/PSAdm?ref_src=twsrc%5Etfw">@PSAdm</a></p>&mdash; Dave Carroll (@thedavecarroll) <a href="https://twitter.com/thedavecarroll/status/1400817011194830849?ref_src=twsrc%5Etfw">June 4, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Introduction

Last year, I began exploring the [Twitter API][TwitterAPI]{:target="_blank"} and wrote a module that adhered to
PowerShell and general development best practices, one that seeks community input and involvement.

Since then I've released a few versions of the [BluebirdPS][BluebirdPS]{:target="_blank"} module and
I am using it to generate my [#PSFollowFriday][PSFollowFriday]{:target="_blank"} Tweets.

In the article that follows, I will take you through the BluebirdPS commands that I use to create these Tweets.

[TwitterAPI]: https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api
[BluebirdPS]: https://www.powershellgallery.com/packages/BluebirdPS
[PSFollowFriday]: https://twitter.com/search?q=%23PSFollowFriday&f=live

### #PSFollowFriday

[Jeff Hicks][JeffHicks]{:target="_blank"} started the #PSFollowFriday hashtag on Twitter during last August's [#PSTweetChat][PSTweetChat]{:target="_blank"}.
Anyone in the PowerShell community is welcome to suggest people or sites that engage with, or contribute in, the PowerShell online community.

[JeffHicks]: https://jdhitsolutions.com/blog/
[PSTweetChat]: https://github.com/jdhitsolutions/PSTweetChat

## BluebirdPS Hatched

My first obstacle to overcome in writing the module was [OAuth 1.0a][OAuth10a]{:target="_blank"} authentication,
which was required by the Twitter API (no v2 endpoints had been released at that time).
I wrote a PowerShell custom class, `[OAuthParameters]` and was satisfied that the class handled the job adequately.
Creating an OAuth 1.0a authentication header is no small feat.

The `[OAuthParameters]` class was my module's "rug" that "tied the room together".
With this class and several private functions that connected to the API and displayed the results as the module's framework,
I wrote many endpoint functions, as well as supporting functions.

I presented the module to two PowerShell user groups, in October and December, and it seemed to be well received.
Near the end of November, I published the first version to the PowerShell Gallery with a quick follow up
to address a few small issues discovered by Jeff Hicks.

[OAuth10a]: https://developer.twitter.com/en/docs/authentication/oauth-1-0a

## BluebirdPS Reborn

In the months that followed, I basically rewrote the entire module.

The awesome custom class `[OAuthParameters]`? Abandoned, in preference for two C# classes,
`[BluebirdPS.TwitterRequest]` and `[BluebirdPS.Authentication]`.
In fact, almost all output, from the API response to custom exceptions, are now rich objects made from C# classes.

Here are some the new features in the latest version.

- Support for [Twitter API v2: Early Access][TwitterAPIV2]{:target="_blank"}
- Complete management for:
  - Saved searches
  - List, list membership, and list subscriptions
  - User friends (following) and followers
  - User blocks, mutes, and spam reporting
  - Tweet retweets, likes, and hiding individual replies
- A new configuration framework
- An updated command session history
- C# classes for most API responses, and for request generation and authentication
- Parameter consistency has been enforced, for example all references to the UserName instead of ScreenName and Id for the numerical identifier regardless of object type.
- Nearly 20 more commands than the previous release.
- New domain for online documentation, [docs.bluebirdps.dev][DocsBluebirdPS]{:target="_blank"}.

[TwitterAPIV2]: https://developer.twitter.com/en/docs/twitter-api/early-access
[DocsBluebirdPS]: https://docs.bluebirdps.dev

Though I haven't used it to announce any articles yet (my first use case), I did find it a great help in creating my #PSFollowFriday tweets.

Let's examine how I did this.

## Creating a #PSFollowFriday Tweet

Where could I get a list of awesome PowerShell community members?
I could go though those I follow and manually generate a list, but I don't want to do that on a weekly basis.

What are my options?
Twitter lists are a good possibility.
They are curated by individuals and can be public, available for anyone to view.
I created one for speakers, organizers, and sponsors of this year's PowerShell + DevOps Global Summit.

### PowerShell List Discovery

I used my Summit list for the first automated Tweet,
but I wouldn't want to be solely responsible for creating curated lists of PowerShell community members.
I need a way to discover other user's lists.

*Unfortunately, the Twitter API does not provide an endpoint to discover lists.*

I know that I have been added to a few others' lists and that seemed like a great place to start.

The command `Get-TwitterListMembership` is what I'll use for this, but I'll need to limit the output.

```powershell
PS > Get-TwitterListMembership | Where-Object { $_.Name, $_.Description -match 'powershell' } | Select-Object -Property FullName,MemberCount,SubscriberCount
```

I want to get all of the lists but only those whose Name or Description matches "PowerShell".
I really only need the FullName (which is the user name and list slug), but I include
the member and subscriber counts.

The former will impact execution time (more on that later) while the latter will roughly gauge the list's popularity.

```text
FullName                              MemberCount SubscriberCount
--------                              ----------- ---------------
@thedavecarroll/pshsummit-2021-12656           70              49
@darkocobe/powershell-community-79170          73             452
@adouwes/powershell                           121              37
@donkojott/powershell                          28               0
@Carlosdzrz/code                               46              53
@lmakovec/powershell                           31               0
@Raptors06/posh                               174               5
@ctmcisco/powershell                          197              10
@t3hcr/powershell                             132               1
@BrettMiller_IT/powershell                    318             105
@BizarroRollins/sysadmin-powershell            94               0
@JeremyCMorgan/powershell                      37              21
@bcdady/powershell                            135               7
@abofh/powershell                               3               0
@ericvollbrecht/powershell                    128              13
@gpunktschmitz/powershell                      93              31
```

For this example, I'll use [Francisco][ctmcisco]{:target="_blank"}'s PowerShell list.

```powershell
PS > $List = Get-TwitterList -OwnerUserName ctmcisco -Slug powershell
```

[ctmcisco]: https://twitter.com/ctmcisco

### Get List Membership

Now that we have a list, we need to get the list membership using the `Get-TwitterListMember` command.

```powershell
PS > $ListMembers = $List | Get-TwitterListMember
```

### Get Twitter User for each Member

We need the Twitter user for an upcoming command and the command `Get-TwitterListMember` returns only the UserName.

```powershell
PS > $ListMembers | Get-TwitterUser
```

```text
Get-TwitterUser: D:\Users\Dave\Documents\PowerShell\Modules\BluebirdPS\0.5.1\BluebirdPS.psm1:533
Line |
 533 |          New-TwitterErrorRecord -ResponseData $ResponseData
     |          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | One or more parameters to your request was invalid.
```

Clearly, the parameter attribute, `[ValidateCount(1, 100)]`, that I included in the `Get-TwitterUser` command is having trouble with the pipeline.

You could see the complete error record and exception using the `Get-Error -Last 1` command,
but BluebirdPS's command, `Get-BluebirdPSHistory`, will display API errors in an easier format to understand.

```powershell
PS > Get-BluebirdPSHistory -Last 1 -Errors | Format-List
```

```text
Command : Get-TwitterUser
Status  : BadRequest
Errors  : The number of values in the `usernames` query parameter list [197] is not between 1 and 100
```

Based on this, we need to split up the number of users that we use for the `Get-TwitterUser` command.

#### Split-Array

I found `Split-Array` in a [StackOverflow answer][SplitArray]{:target="_blank"} and it works perfectly for this.

```powershell
PS > $ListMemberUserNames = $ListMembers | Split-Array -Size 100 | ForEach-Object { Get-TwitterUser -User $_ }
```

[SplitArray]: https://stackoverflow.com/questions/45948580/slice-a-powershell-array-into-groups-of-smaller-arrays

### Get Active Members

We have a large list of users, but we don't know how active they are on Twitter.
`Get-TwitterTimeline` can help us determine this by getting the user's Tweet timeline.
It has a `-StartTime` parameter that we will set for two weeks.

Since I know that some people have automated processes to retweet others, I want to exclude those as well.
The `-Exclude Retweets` parameter will be required.

```powershell
PS > $TimelineParams = @{ Exclude = 'Retweets'; StartTime = (Get-Date).AddDays(-14) }
PS > $ActiveUsers = $ListMemberUserNames | ForEach-Object { if ((Get-TwitterTimeline -User $_ @TimelineParams).Count -gt 0) {$_.UserName }}
```

```text
Invoke-TwitterRequest: D:\Users\Dave\Documents\PowerShell\Modules\BluebirdPS\0.5.1\BluebirdPS.psm1:2379
Line |
2379 |      Invoke-TwitterRequest -RequestParameters $Request
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Sorry, you are not authorized to see the user with id: [1331923160].
```

I received the non-terminating error above because the user with the specified id has protected their tweets, meaning only their followers can see them.

Out of 197 users, a surprising 135 have tweeted or replied in the last two weeks.

More users in a list means that getting their timelines will take longer.

The following will produce an array of 10 random users from our active list.

```powershell
PS > $FollowList = $ActiveUsers | Get-Random -Count 10 | ForEach-Object { '@{0}' -f $_ }
```

### Tweet

We have the selected list and the random users.
Now, we need to generate the full text and publish the tweet.

I would like to include the list owner, list name, and the list's URL.
All of these will come from the `$List` variable we created at the beginning of this article.

We also need to turn the array of UserNames into a string.

Lastly, we use `Publish-Tweet` to post the Tweet to Twitter.

```powershell
PS > $Tweet = @'
For today's #PowerShell #PSFollowFriday, I've pulled a random sample from @{0}'s Twitter List, {1}.
{2}

{3}
'@ -f $List.UserName,$List.Name,$List.Uri,($FollowList -join ' ')

PS > Publish-Tweet -TweetText $Tweet
```

And that's it.

But that is a lot of steps.
I'm sure that we can simplify it.

## Get-PSFollowFridayTweetText

I created the `Get-PSFollowFridayTweetText` function to handle all of the text generation.
In just two simple lines, I can now Tweet my PowerShell #PSFollowFriday suggestions.

```powershell
PS > $PSFollowFridayTweet = Get-PSFollowFridayTweetText -UserName ctmcisco -ListSlug PowerShell
PS > Publish-Tweet -TweetText $PSFollowFridayTweet
```

Here is the full gist of the `Get-PSFollowFridayTweetText` command.

<script src="https://gist.github.com/thedavecarroll/8794b49437af7c19b79c9f8e7b8478bc.js"></script>

## Summary

Generating a list of users for the #PSFollowFriday Tweet is an easy task with BluebirdPS.
Using just a few of the module's commands, we were able to discover and select a Twitter list.
We focused on active members of the list by getting each member's Tweet timeline for the last two weeks, excluding retweets.
The list of users, limited to 10 random (and active) users from the Twitter list, was combined with the Tweet template.
Finally, the Tweet text was published to Twitter.

If you curate a Twitter List of PowerShell community members, please let me know with a comment below or with a Tweet or DM.
*Bonus points, a gold star, and kudos to you if you use BluebirdPS to send me the Tweet or DM.*

Learn how to [get started with BluebirdPS][BluebirdPSGettingStarted]{:target="_blank"} today!

If you have use cases or ideas on how to use BluebirdPS, please add a topic
or join in with others in [BluebirdPS's repo discussion][BluebirdPSDiscussion]{:target="_blank"}.
I ask you to submit any [bug reports][BluebirdPSBugReport]{:target="_blank"} as you encounter errors
or a [feature request][BluebirdPSFeatureRequest]{:target="_blank"} when you have an idea that could benefit other BluebirdPS users.

I hope you’ve found this interesting or informative.
I really would like to hear your thoughts on this article.
If you have any comments or questions, please post them below.

[BluebirdPSGettingStarted]: https://docs.bluebirdps.dev/en/latest/prerequisites/
[BluebirdPSDiscussion]: https://bit.ly/BluebirdPSDiscussion
[BluebirdPSBugReport]: https://bit.ly/BluebirdPSBugReport
[BluebirdPSFeatureRequest]: https://bit.ly/BluebirdPSFeatureRequest
