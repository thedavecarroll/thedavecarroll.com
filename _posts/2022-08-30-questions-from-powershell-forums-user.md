---
layout: single
title: "Questions from a PowerShell.org Forums User"
excerpt: "A PowerShell.org Forums user asked me a few questions about my PowerShell journey and here are my answers."
date: 2022-08-30
published: true
header:
  overlay_image: /assets/images/powershellforums.png
  overlay_filter: 0.7
comments: true
tags:
  - blog
  - powershell
  - powershell concepts
  - learn powershell
  - powershell beginner
  - how to
  - career
category:
  - powershell
---

## Introduction

About a week ago, I commented on a PowerShell forum post and the poster struck up a conversation in my DMs.

He is starting his own PowerShell blog and wanted to ask me some questions.
*(Insert self-deprecating comment here.)*

I thought that the questions and my responses may help pass some time for the reader, maybe even conveying something useful.

## Question 1

*What is your writing process? Do you write on subjects you are currently learning about or want to research more?*

Sometimes the writing is the easy part. \
Sometimes, like when I started writing these answers, it's a struggle.
{: .notice--info}

Most of my articles relate to teaching one or more PowerShell concepts, like my walk-throughs for some IronScripter Challenges,
pulling back the curtain to show the reader my process on how I designed solutions or code that I've written, or
showcasing my modules via introductions or deep-dives.

When Jeff Hicks asked me to participate in the [PS7Now][PS7Now]{:target="_blank"} week event to announce the general availability of PowerShell 7,
I was flabbergasted and quite flattered.
I was assigned two topics which I needed to either showcase the difference between Windows PowerShell and PowerShell 7 JSON cmdlets or,
in the case of PowerShell 7's Experimental Features, essentially be one of the first to introduce to the community.
The former article has received more visitors and page views that any of my other articles.

During my writing for those two articles, I learned a lot, especially about Experimental Features.
It seems that, even now, there's not much adoption of them for community modules.

Since this is about my writing process, I must divulge that I've just spent at least an hour trying find GitHub repos with PowerShell 7 Experimental Features.
After I was able to filter out all of the Microsoft references, it resulted in [one result][ExperimentalFeatures]{:target="_blank"}.
My DemoModule script module is returned, not my binary module [PSTemperature][PSTemperature]{:target="_blank"} despite being declared in a `psd1` file (a requirement for Experimental Features).
This tells me that the indexing or searching in GitHub isn't 100% accurate (at least based on the time I spent with it tonight).
A standard internet search returned the article, my DemoModule gist, but again not the PSTemperature repo.
{: .notice--warning}

In the next [highly popular article][ModuleVariables]{:target="_blank"}, I focus on variable scope, specifically the script scoped variable.
When you use script scoped in your module, it's available to all commands within that module.
Also, when you `Remove-Module`, the variable is removed from your session.
My Tweet announcing my article was retweeted by Don Jones and, based on the page views,
many people read it and hopefully walk away knowing how handle module variables for their own modules.

Those are two examples on why I wrote those articles, with a bit of time (more for me) going down a rabbit hole.
I'm not sure if others get distracted like I did, or shift focus to an adjacent topic.
For me, it's part of my process, one over which I have varying levels of control.

## Question 2

*Do you have a favorite resource for Powershell that has helped you learn?*

I have read parts of the de facto books on learning PowerShell.
Some, I've read much more than others.
But they are not where I've learned most what I know of PowerShell.

The majority of my knowledge has come from sources on the internet.
Microsoft is the primary resource (really they should be) and community blogs like this one are a close second.
I know that I've read more words by [Jeff Hicks][JeffHicks]{:target="_blank"} at his site than his books (sorry Jeff).

I've gotten some quick answers on StackOverflow and ServerFault, but I don't immediately gravitate to those sites.
There have been a few co-workers that taught me a few things that I must have overlooked previously, like [Filter][Filter]{:target="_blank"}.

Let's examine a quote most often attributed to Confucius.

> I hear and I forget.\
> I see and I remember.\
> I do and I learn.

This simple adage shared since third century BCE was likely a derivative of a quote from Xunzi.
Here's a [rough translation][LearnByAction]{:target="_blank"} of the original.

>"Not hearing is not as good as hearing, hearing is not as good as seeing, seeing is not as good as knowing, knowing is not as good as acting; true learning continues until it is put into action."

Both quotes, and other similar ones, point to action as the best learning tool.
I wholeheartedly agree.
I've often said that I am a taskmaster and what I mean by that is that I learn by doing a task.

As mentioned in my updated [About Me][AboutMe]{:target="_blank"} page, I learned PowerShell because I forced upon myself the task (obviously many sub-tasks) of converting my existing code.
I had a concrete thing to do and a concrete outcome—did the new code work?

Beyond daily tasks, you can be "assigned" tasks via code challenges.
The [IronScripter][IronScripter]{:target="_blank"} site, created by the Chairman, aka Jeff Hicks, provides frequent challenges most of which target beginner, intermediate, and advanced PowerShell concepts and techniques.
I've taken many of the challenges and documented some of my processes and [solutions][IronScripterSolutions]{:target="_blank"} while expounding on the lessons of the challenge.

Similarly, the yearly scripting/programming agnostic [Advent of Code][AdventOfCode]{:target="_blank"} is another site that I've participated in the challenges and learned quite a lot. In 2021, I used the challenge to help me learn more about Python.

It's okay to say Python. It's far better to know many languages and when to use each for a given task.
{: .notice--success}

## Question 3

*Did you have a mentor in your process of learning Powershell?*

No, I don't think so.
At least not a single individual.

I believe the PowerShell community at large can be considered a mentor collective.

Many times I have approached others in the community for advice on how I should proceed or the best path to achieve a given result on the PowerShell [Slack][Slack]{:target="_blank"} and [Discord][Discord]{:target="_blank"} communities, on the [PowerShell.org forums][PowerShellOrgForums]{:target="_blank"}, and on [Twitter at #PowerShell][TwitterPowerShell]{:target="_blank"}.

I would like to thank Jeff Hicks on coaching me on my first Summit presentation.
His guidance helped me keep focus which ultimately resulted, I hope, in a more engaging presentation.
{: .notice--info}

## Question 4

*Are there any concepts you wish you would have known earlier in your career with Powershell that ended up being a game-changer?*

### Modules

When I first started with PowerShell, I dot-sourced like I was communicating in Morse code.
Writing modules to combine several service or functional commands have made things much simpler.
I should have adopted the habit of writing modules sooner and saved the dots.

### Performance Tuning

Background jobs, runspaces, and threads have specific benefits for performance when you're dealing with 1K, 10K, 100K iterations.

When I send a command to all the domain controllers, I typically use background jobs (`Start-Job`) created for each DC and wait for them all to complete.
It's much faster than doing each sequentially, like using `foreach` or `ForEach-Object` to iterate through the list.
Each background job is executed in a separate process on the local machine, so even this performance tuning technique can have performance issues.

Several years ago, I used PoshRSJobs when I was harvesting data from a couple thousand workstations; it's based on [PowerShell runspace][PSRunspace]{:target="_blank"}.
I don't have the need to use runspaces often.

The PowerShell Team provided the module [ThreadJob][ThreadJob]{:target="_blank"} has a single cmdlet, `Start-ThreadJob`.
I haven't used this command, but definitely would prefer it over the previous techniques in some situations.

Another technique that would yield higher performance is simply to upgrade to the latest version of PowerShell.
When released, PowerShell 7 included an updated `ForEach-Object` adding a `Parallel` parameter.
In some scenarios, this could provide sufficient speed increase.
Many other performance enhancements were made the engine level and built-in commands.

Microsoft has provided guidance on Powershell [scripting performance][PSScriptingPerformance]{:target="_blank"}.

### Everything You Wanted to Know

As I write my PowerShell code, inevitably I need to search the internet for help.
*Disclosure: I still do.*
Often I have wind up on [Kevin Marquette][KevinMarquette]{:target="_blank"}'s site, [PowerShellExplained][PowerShellExplained]{:target="_blank"} and many of the articles are now part of Microsoft's Learning [PowerShell - Deep Dives][DeepDives]{:target="_blank"}.

The game changer here is knowing where to go to find answers.
It also includes knowing how to ask the questions (especially in a search engine).
One search result which doesn't really answer your question, but perhaps is a tangential topic, may lead you to a better way to ask your question again.

Searching the internet, while seemingly easy, is a skill that can be developed.

## Question 5

*Even with your 20+ years of experience do you still get overwhelmed with new concepts and tools?*

Overwhelmed? Absolutely.

Disparaged? Absolutely not.

Everyone's journey starts somewhere.
And learning a new concept is a new journey regardless of your years of experience.

If you have written in various scripting languages, the time it takes learning a new language should be reduced.
How much it's reduced would be determined by how many different languages you can code and how similar the new language is to one of those.

Each new concept you understand makes learning similar concepts easier to learn.

In fact, learning itself is a skill.

Get comfortable learning how you learn and focus on improving that skill.

## Summary

On face value, these questions may seem easy to answer.

Each of them requires a certain amount of self-awareness and, of course, recall.
Self-awareness comes from introspection which should naturally happen over time.
Unfortunately, time can be a hinderance to recall.
These questions have forced me to rummage through old dusty memories.
I'm sure some of them were damaged from the ravages of time.

Nonetheless, I hope this glimpse into my process, experience, and outlook will help you on your journey with PowerShell (and other technologies).
Consider it a map to a lost treasure.
You may recognize some of the landmarks, but you know that your journey would yield a different experience.
And you may even find a shorter, more direct path and create your own map to the treasure.

### Hiatus...Again

It's been over a year since I published an article.
And I wanted you to know - it wasn't you, it was me.

The last few years have been emotionally tumultuous, but I think I'm to the point where I can start publishing articles on PowerShell (and other topics) again.

Over the last couple months, I've been dipping my toes back into [BluebirdPS][BluebirdPS]{:target="_blank"}.
A new version will be released as soon as I can.

Being asked these questions, and realizing that the answers should be published on my blog, has led me to dust off the site and repair the broken build automation and comment system. In fact, I'll be publishing an update to how I blog, again as soon as I can.

## Thank you

Thank you for staying with the article.
I really would like to hear your thoughts on it.

If you have any comments or questions, please post them below.

[PS7Now]: https://jdhitsolutions.com/blog/powershell/7371/ps7now-ebook-available/
[ExperimentalFeatures]: https://github.com/search?q=ExperimentalFeatures+extension%3Apsd1+NOT+2113633+NOT+PSManageBreakpointsInRunspace+NOT+ExpTest+NOT+855960+NOT+PSDesiredStateConfiguration&type=code
[PSTemperature]: https://github.com/thedavecarroll/PSTemperature
[ModuleVariables]: https://thedavecarroll.com/powershell/how-i-implement-module-variables/
[JeffHicks]: https://jdhitsolutions.com/blog/
[Filter]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions?view=powershell-7.2#filters
[LearnByAction]: https://english.stackexchange.com/questions/226886/origin-of-i-hear-and-i-forget-i-see-and-i-remember-i-do-and-i-understand
[AboutMe]: https://thedavecarroll.com/about/
[IronScripter]: https://ironscripter.us/
[IronScripterSolutions]: https://github.com/thedavecarroll/IronScripterSolutions
[AdventOfCode]: https://github.com/thedavecarroll/AdventOfCode
[Slack]: https://aka.ms/psslack
[Discord]: https://discord.gg/powershell
[PowerShellOrgForums]: https://forums.powershell.org/
[TwitterPowerShell]: https://twitter.com/search?q=%23powershell
[PSRunspace]: https://docs.microsoft.com/en-us/powershell/scripting/developer/hosting/creating-runspaces?view=powershell-7.2
[ThreadJob]: https://docs.microsoft.com/en-us/powershell/module/threadjob/start-threadjob?view=powershell-7.2
[PSScriptingPerformance]: https://docs.microsoft.com/en-us/powershell/scripting/dev-cross-plat/performance/script-authoring-considerations?view=powershell-7.2
[KevinMarquette]: https://twitter.com/KevinMarquette
[PowerShellExplained]: https://powershellexplained.com/
[DeepDives]: https://docs.microsoft.com/en-us/powershell/scripting/learn/deep-dives/overview?view=powershell-7.2
[BluebirdPS]: https://docs.bluebirdps.dev/en/latest/
