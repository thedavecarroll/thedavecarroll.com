---
title: Download Newest Sysinternals Tools
description: Download recently updated Sysinternals tools
published: 2018-09-03
lastMod: 2018-09-05
tags: ["powershell", "sysinternals"]
categories: ["PowerShell"]
---

## Preface

I have a new laptop and have been configuring it as my primary PowerShell development system.

Today, when I was looking for a way to search for all of my GitHub repositories, I found a couple Gists from
{{< influencer "jeffhicks" >}} for [New-GitHubGist](https://gist.github.com/jdhitsolutions/06cb62bf3eb4f0a1f7d82ed39b1e56ca) and
[SendTo-Gist](https://gist.github.com/jdhitsolutions/345a6b8e4c47440df5fb1dbcb987cb3e).
Knowing Jeff is a prolific PowerShell blogger, I dug a little deeper and found his
[post](http://jdhitsolutions.com/blog/powershell/4895/friday-fun-a-sysinternals-powershell-workflow/)
on using a PowerShell workflow to download Sysinternals.

That made me realize --- I didn't have Sysinternals installed.

## Sysinternals Required

I needed to install Sysinternals suite, but being that I'm a "find a PowerShell way" person, I started searching.

First off, Jeff's workflow, while very enlightening, was a bit overkill for my purpose and I wanted to not be heavy
handed with downloading all tools.

My search revealed
[Robin CM's IT Blog post](https://rcmtech.wordpress.com/2017/01/10/get-or-update-sysinternals-tools-with-powershell/)
which I used as a basis for my two functions.

### Get-Sysinternals

The first function, `Get-Sysinternals`, simply retrieves the full list of Sysinternals files from
[Sysinternals Live](https://live.sysinternals.com). The function parses each file and produces an array
of objects with Name, Length, LastWriteTime, and Updated.

The LastWriteTime property will be used to update the local file after downloading.

The Updated property will be used for comparing the remote web file with the local file.
__For some reason, even though I was writing the LastWriteTime, on a few of the files it was off by a few minutes or seconds.__

{{< notice type="important" >}}
I discovered the reason why I thought the local files timestamps were off.
As it turns out, I've discovered 3 distinct timestamps for the four files.
I suspect that there are three backend servers hosting the content at `live.sysinternals.com`.
![Three different responses from Get-Sysinternals](/images/get-sysinternals-discrepancy.png "Three different responses from Get-Sysinternals")
{{< /notice >}}

{{< notice type="note" >}}
I have added a parameter `-InstallLocation` in order to retrieve the locally installed files.
{{< /notice >}}

### Update-Sysinternals

The `Update-Sysinternals` function requires a installation path. It validates it (creating the folder if necessary), uses the
`Get-Sysinternals` function to get a current list, gets the files from the installation path, and compares the two.

It then proceeds to download the newer files. After each file is downloaded, the function updates the LastWriteTime of
the local file.

I included a `-Force` switch just in case someone needed to get the latest and have the LastWriteTime updated, or to replace
corrupted files.

{{< notice type="warning" >}}
Please note that I changed the name from `Sync-Sysinternals` to `Update-Sysinternals`.
I also added a new switch parameter `IgnoreDownloadErrors` that will not display errors in downloading the individual files.
I also added the option to include the `InstallLocation` to the PATH system environment variable.
Lastly, I changed the output types, some to `Write-Warning` and some to `Write-Output`, including a total download statement.
{{< /notice >}}

## Scheduling

You could save these files and dot source them in a script that you schedule via Scheduled Tasks or PowerShell Scheduled Jobs.

## Split Method

Originally, I had developed and tested these functions in PowerShell Core 6.1 RC.
It was only after I posted that I decided to test in PowerShell 5.1.
I was so bent on getting the code done and this blog post written, that I cut corners, and it decided to cut back.

Between the two editions, the `.Split()` method apparently works a little different.

|PSEdition | |
|-|-|
|PowerShell 5.1 | `.Split('<br>')` splits on each character |
|PowerShell Core | `.Split('<br>')` splits on the entire string |

## Gist

You can see both updated functions here:

{{< gist id="85873332f0d326cd800a040aa408dbbb" >}}

## Summary

These two functions will allow me (and hopefully you) to keep your local Sysinternals folder up-to-date.

Feel free to subscribe to my RSS feed to keep notified when I post something new. The link is located in the site's footer.

Thanks for reading!

{{< notice type="note" >}}
I added the Twitter card to see if it's really usable.
I'd like to include the tweets for each blog post so Twitter users would have a way to like a post after they read it.
Let me know what you think about this idea in the comments below.
Thanks!
{{< /notice >}}

![Not a Twitter Card](/images/sysinternals/notatwittercard.png)
