---
layout: single
title: "Download Newest Sysinternals Tools"
excerpt: "Download recently updated Sysinternals tools"
date: 2018-09-03
last_modified_at: 2018-09-05
comments: true
tags:
  - powershell
  - sysinternals
category:
  - powershell
---

## Preface

I have a new laptop and have been configuring it as my primary PowerShell development system.

Today, when I was looking for a way to search for all of my GitHub repositories, I found a couple Gists from
[Jeff Hicks](https://jdhitsolutions.com/blog/){:target="_blank"} for
[New-GitHubGist](https://gist.github.com/jdhitsolutions/06cb62bf3eb4f0a1f7d82ed39b1e56ca){:target="_blank"} and
[SendTo-Gist](https://gist.github.com/jdhitsolutions/345a6b8e4c47440df5fb1dbcb987cb3e){:target="_blank"}. Knowing Jeff
is a prolific PowerShell blogger, I dug a little deeper and found his
[post](http://jdhitsolutions.com/blog/powershell/4895/friday-fun-a-sysinternals-powershell-workflow/){:target="_blank"}
on using a PowerShell workflow to download Sysinternals.

That made me realize --- I didn't have Sysinternals installed.

## Sysinternals Required

I needed to install Sysinternals suite, but being that I'm a "find a PowerShell way" person, I started searching.

First off, Jeff's workflow, while very enlightening, was a bit overkill for my purpose and I wanted to not be heavy
handed with downloading all tools.

My search revealed
[Robin CM's IT Blog post](https://rcmtech.wordpress.com/2017/01/10/get-or-update-sysinternals-tools-with-powershell/){:target="_blank"}
which I used as a basis for my two functions.

### Get-Sysinternals

The first function, `Get-Sysinternals`, simply retrieves the full list of Sysinternal files from
[Sysinternals Live](https://live.sysinternals.com){:target="_blank"}. The function parses each file and produces an array
of objects with Name, Length, LastWriteTime, and Updated.

The LastWriteTime property will be used to update the local file after downloading.

The Updated property will be used for comparing the remote web file with the local file.
__For some reason, even though I was writing the LastWriteTime, on a few of the files it was off by a few minutes or seconds.__

**Update**
I discovered the reason why I thought the local files timestamps were off. As it turns out, I've discovered 3 distinct
timestamps for the four files. I suspect that there are three backend servers hosting the content at `live.sysinternals.com`.
![Three different responses from Get-Sysinternals](/assets/images/get-sysinternals-discrepancy.png "Three different responses from Get-Sysinternals")
{: .notice--primary}

**Note:** I have added a parameter `-InstallLocation` in order to retrieve the locally installed files.
{: .notice--primary}

### Update-Sysinternals

The `Update-Sysinternals` function requires a installation path. It validates it (creating the folder if necessary), uses the
`Get-Sysinternals` function to get a current list, gets the files from the installation path, and compares the two.

It then proceeds to download the newer files. After each file is downloaded, the function updates the LastWriteTime of
the local file.

I included a `-Force` switch just in case someone needed to get the lastest and have the LastWriteTime updated, or to replace
corrupted files.

Please note that I changed the name from `Sync-Sysinternals` to `Update-Sysinternals`. I also added a new switch parameter
`IgnoreDownloadErrors` that will not display errors in downloading the individual files.
I also added the option to include the `InstallLocation` to the PATH system environment variable. Lastly, I changed the
output types, some to `Write-Warning` and some to `Write-Output`, including a total download statement.
{: .notice--primary}

## Scheduling

You could save these files and dot source them in a script that you schedule via Scheduled Tasks or PowerShell Scheduled
Jobs.

## Split Method

Originally, I had developed and tested these functions in PowerShell Core 6.1 RC. It was only after I posted that I
decided to test in PowerShell 5.1. I was so bent on getting the code done and this blog post written, that I cut corners,
and it decided to cut back.

Between the two editions, the `.Split()` method apparently works a little different.

|PSEdition |
|-|-|
|PowerShell 5.1 | `.Split('<br>')` splits on each character
|PowerShell Core | `.Split('<br>')` splits on the entire string

## Gist

You can see both updated functions here:

<script src="https://gist.github.com/thedavecarroll/85873332f0d326cd800a040aa408dbbb.js"></script>

## Summary

These two functions will allow me (and hopefully you) to keep your local Sysinternals folder up-to-date.

Feel free to subscribe to my RSS feed to keep notified when I post something new. The link is located in the site's footer.

Thanks for reading!

**Notice**
I added the Twitter card to see if it's really usable. I'd like to include the tweets for each blog post so Twitter users
would have a way to like a post after they read it. Let me know what you think about this idea in the comments below. Thanks!
{: .notice--primary}

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">I&#39;ve been configuring a new laptop and needed a PowerShell way to download the latest Sysinternals tools. I created two functions and have detailed them in a new blog post. <a href="https://t.co/UuKo137aLH">https://t.co/UuKo137aLH</a></p>&mdash; Dave Carroll (@thedavecarroll) <a href="https://twitter.com/thedavecarroll/status/1036752418732756992?ref_src=twsrc%5Etfw">September 3, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>