---
title: Questions from a PowerShell.org Forums User
description: A PowerShell.org Forums user asked me a few questions about my PowerShell journey and here are my answers.
image: /images/powershellforums.png
published: 2022-08-30
lastMod: 2022-09-12
tags: ["blog", "powershell", "powershell concepts", "learn powershell", "powershell beginner", "how to", "career"]
categories: ["PowerShell"]
---

## Introduction

About a week ago, I commented on a PowerShell forum post and the poster struck up a conversation in my DMs.

He is starting his own PowerShell blog and wanted to ask me a few questions.
*(Insert self-deprecating comment here.)*

I thought that the questions and my responses may help provide some insight for others.

## 1. What is your writing process? Do you write on subjects you are currently learning about or want to research more?

>Sometimes the writing is the easy part.\
>Sometimes, like when I started writing these answers, it's a struggle.

Most of my articles relate to teaching one or more PowerShell concepts, like my walk-throughs for some of the IronScripter Challenges,
pulling back the curtain to show the reader my process on how I designed solutions or code that I've written, or
showcasing my modules via introductions or deep-dives.

When Jeff Hicks asked me to participate in the [#PS7Now](https://leanpub.com/ps7now/) week event to announce the general availability of PowerShell 7,
I was flabbergasted and quite flattered.
I was assigned two topics which I needed to either showcase the difference between Windows PowerShell and PowerShell 7 JSON cmdlets or,
in the case of PowerShell 7's Experimental Features, be one of the first community bloggers to introduce the concept to the community.
The former article has received more visitors and page views that any of my other articles.

During my writing for those two articles, I learned a lot, especially about Experimental Features.
It seems that, even now, there's not much adoption of them for community modules.

{{< notice type="note" >}}
Since this is about my writing process, I must divulge that I've just spent at least an hour trying to find GitHub repos with PowerShell 7 Experimental Features.
After I was able to filter out all of the Microsoft references, it resulted in [one result](https://github.com/search?q=ExperimentalFeatures+extension%3Apsd1+NOT+2113633+NOT+PSManageBreakpointsInRunspace+NOT+ExpTest+NOT+855960+NOT+PSDesiredStateConfiguration&type=code).
My DemoModule script module is returned, not my binary module [PSTemperature](https://github.com/thedavecarroll/PSTemperature) despite being declared in a `psd1` file (a requirement for Experimental Features).
This tells me that the indexing or searching in GitHub isn't 100% accurate (at least based on the time I spent with it tonight).
A standard internet search returned the article, my DemoModule gist, but again not the PSTemperature repo.
{{< /notice >}}

In the next [highly popular article]({{< relref "powershell/how-i-implement-module-variables.md" >}}), I focus on variable scope, specifically the script scoped variable.
When you use script scoped in your module, it's available to all commands within that module.
Also, when you `Remove-Module`, the variable is removed from your session.
My article announcement Tweet was retweeted by Don Jones and, based on the page views,
many people continue to read it and hopefully walk away knowing how handle module variables for their own modules.

Those are two examples on why I wrote those articles, with a bit of time (more for me) going down a rabbit hole.
I'm not sure if others get distracted like I did, or shift focus to an adjacent topic.
For me, it's part of my process, one over which I have varying levels of control.

Most often, I solve the problem/challenge, write the module, or master the commands before I start writing an article.
For a few articles, I began writing the article when I began the challenge.
This allowed me to capture my thought process on how to tackle the challenge.

## 2. Do you have a favorite resource for PowerShell that has helped you learn?

I have read parts of the de facto books on learning PowerShell.
Some, I've read much more than others.
But they are not where I've learned most what I know of PowerShell.

The majority of my knowledge has come from sources on the internet.
Microsoft is the primary resource (really they should be) and community blogs like this one are a close second.
I know that I've read more words by {{< influencer "jeffhicks" >}} at {{< influencer "jeffhicks" >}} than his books (sorry Jeff).

I've gotten some quick answers on StackOverflow and ServerFault, but I don't immediately gravitate to those sites.
And there have been a few co-workers that taught me a few things that I must have overlooked previously, like [Filter](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-7.2#filters).

Let's examine a quote most often attributed to Confucius.

> I hear and I forget.\
> I see and I remember.\
> I do and I learn.

This simple adage shared since third century BCE was likely a derivative of a quote from Xunzi, a follower of Confucius.
Here's a [rough translation](https://english.stackexchange.com/questions/226886/origin-of-i-hear-and-i-forget-i-see-and-i-remember-i-do-and-i-understand) of the original.

>"Not hearing is not as good as hearing, hearing is not as good as seeing, seeing is not as good as knowing, knowing is not as good as acting; true learning continues until it is put into action."

Both quotes, and other similar ones, point to action as the best learning tool.
I wholeheartedly agree.
I've often said that I am a taskmaster and by that I mean I learn by doing a task.

As mentioned in my updated [About Me]({{< relref "about.md" >}}) page, I learned PowerShell by forcing upon myself the task (obviously many sub-tasks) of converting my existing VBScript code.
I had a concrete thing to do and a concrete outcome—did the new code work?

Beyond daily tasks, you can be "assigned" tasks via code challenges.
The [IronScripter](https://ironscripter.us/) site, created by The Chairman, aka Jeff Hicks, provides frequent challenges most of which target beginner, intermediate, and advanced PowerShell concepts and techniques.
I've taken many of the challenges and documented some of my processes and [solutions](https://github.com/thedavecarroll/IronScripterSolutions) while expounding on the lessons of the challenge.

Similarly, the yearly scripting/programming language agnostic [Advent of Code](https://adventofcode.com/) is another site/event that I've participated in the challenges and learned quite a lot. In 2021, I used the challenge to help me learn more about Python.

>It's okay to say Python. It's far better to know many languages and when to use each for a given task.

The past years' challenges from IronScripter and Advent of Code are still available.
Assign yourself the task of checking them out.

## 3. Did you have a mentor in your process of learning PowerShell?

No, I don't think so.
At least not a single individual.

I believe the PowerShell community at large can be considered a mentor collective.

Many times I have approached others in the community for advice on how I should proceed or the best path to achieve a given result on the PowerShell [Slack](https://aka.ms/psslack) and [Discord](https://discord.gg/powershell) communities, on the [PowerShell.org forums](https://forums.powershell.org/), and on [Twitter at #PowerShell]({{< relref "retired-links.md" >}}).

{{< notice type="important" >}}
I would like to thank Jeff Hicks on coaching me on my first Summit presentation.
His guidance helped me keep focus which ultimately resulted, I hope, in a more engaging presentation.
{{< /notice >}}

## 4. Are there any concepts you wish you would have known earlier in your career with PowerShell that ended up being a game-changer?

### Modules

When I first started with PowerShell, I dot-sourced like I was communicating in Morse code.
Writing modules to combine several service or functional commands would have made things much simpler.
I should have adopted the habit of writing modules sooner and saved the dots.

### Performance Tuning

Background jobs, runspaces, and threads have specific benefits for performance when you're dealing with 1K, 10K, 100K iterations.

When I send a command to all the domain controllers, I typically use background jobs (`Start-Job`) created for each DC and wait for them all to complete.
It's much faster than processing them sequentially, like using `foreach` or `ForEach-Object` to iterate through the list.
Each background job is executed in a separate process on the local machine, so even this performance tuning technique can have performance issues.

Several years ago, I used PoshRSJobs when I was harvesting data from a couple thousand workstations; it's based on [PowerShell runspace](https://docs.microsoft.com/en-us/powershell/scripting/developer/hosting/creating-runspaces?view=powershell-7.2).
In my current position, I don't have the need to use runspaces often.

The PowerShell Team provided the module [ThreadJob](https://docs.microsoft.com/en-us/powershell/module/threadjob/start-threadjob?view=powershell-7.2) which has a single cmdlet, `Start-ThreadJob`.
I haven't used this command, but definitely would prefer it over the previous techniques in some situations.

Another technique that would yield higher performance is simply to upgrade to the latest version of PowerShell.
When released, PowerShell 7 included an updated `ForEach-Object` adding a `Parallel` parameter.
In some scenarios, this could provide sufficient speed increase.
Many other performance enhancements were made the engine level and built-in commands.

Microsoft has provided guidance on PowerShell [scripting performance](https://docs.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations?view=powershell-7.2).

### Everything You Wanted to Know

As I write my PowerShell code, inevitably I need to search the internet for help.
*Disclosure: I still do.*
Often I have wound up on {{< influencer "kevmar" >}}, [PowerShellExplained](https://powershellexplained.com/).
Many of the articles are now part of Microsoft's Learning [PowerShell - Deep Dives](https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/overview).

The game changer here is knowing where to go to find answers.
It also includes knowing how to ask the questions (especially in a search engine).
One search result which doesn't really answer your question, perhaps because it's a tangential topic, may lead you to a better way to ask your question again.

Searching the internet, while seemingly easy, is a skill that can be developed.

## 5. Even with your 20+ years of experience do you still get overwhelmed with new concepts and tools?

Overwhelmed? Absolutely.

Disparaged? Absolutely not.

Everyone's journey starts somewhere.
And learning a new concept is a new journey regardless of your years of experience.

If you have written in various scripting languages, the time it takes learning a new language should be reduced.
How much it's reduced would be determined by your fluency in the many different languages and how similar the new language is to one of those.

Each new concept you understand makes learning similar concepts easier to learn.

In fact, learning itself is a skill.

Get comfortable learning how *you* learn and focus on improving that skill.

## Summary

On face value, these questions may seem easy to answer.

Each of them requires a certain amount of self-awareness and, of course, recall.
Self-awareness comes from introspection which should naturally happen over time.
Unfortunately, time can be a hindrance to recall.
These questions have forced me to rummage through old, dusty memories and I'm sure some of them were damaged from the ravages of time.

Nonetheless, I hope this glimpse into my process, experience, and outlook will help you on your journey with PowerShell (and other technologies).

Consider it a map to a lost treasure.
You may recognize some of the landmarks, but you know that your journey would yield a different experience.
You may even find a shorter, more direct path and create your own map to the treasure for someone else to find.

### Hiatus...Again

It's been over a year since I published an article.
And I wanted you to know - it wasn't you, it was me.

The last few years have been emotionally tumultuous, but I think I'm to the point where I can start publishing articles on PowerShell (and other topics) again.

Over the last couple months, I've been dipping my toes back into [BluebirdPS]({{< relref "retired-links.md" >}}) and a new version should be released soon.

Being asked these questions, and realizing that the answers should be published on my blog, has led me to dust off the site and repair the broken build automation and comment system.
In fact, I'll be publishing an update to how I blog, again as soon as I can.

{{< notice type="important" >}}
Thank you
{{< /notice >}}

Thank you for reading this article.
I really would like to hear your thoughts on it.

If you have any comments or questions, please post them below.

{{< update date="2022-09-05" >}}
Minor changes to formatting.
{{< /update >}}
