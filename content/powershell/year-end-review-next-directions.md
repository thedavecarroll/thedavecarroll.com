---
title: A 2020 Year End Review and 2021 Directions
description: A summary of 2020, including the Bad and the Good, and what I hope for 2021.
image: /images/hiatus.jpg
published: 2021-01-18
tags: ["hiatus", "year review", "career", "life"]
categories: ["PowerShell"]
---

## A Long Time Ago

It seems an incredibly long time has passed since I wrote an article for my site.
In fact, it's been...

```powershell
New-TimeSpan -Start '8/17/2020' -End (Get-Date).Date.ToShortDateString() | Select-Object -ExpandProperty Days
```

```console
154
```

It's been 154 days since I've published the article on [responding to a GitHub issue for my PoShDynDnsApi module]({{< relref "retired-links.md" >}}).

I wanted to go over a few of the things that have been taking my time.

> Please note this article contains more personal experiences than PowerShell.
> I need to put these to paper, so to speak.
> Feel free to skip any part of this article, or just close the browser tab and binge your next show.
>
> There are, however, a few topics that might interest PowerShell community members in the [PowerShell](#powershell) section.

## The Infamous Year 2020 in Review

For me, the year 2020 was exceptional for a multitude of reasons and only a very few that were good ones.

### The Bad

January 7th, Neil Peart of [Rush](https://www.rush.com/), my favorite band, passed away from brain cancer.
The world was notified a few days later, as his family and close friends wanted private time to start their grieving.
Though not as much as the passing of Leonard Nimoy, Peart's passing hurt me considerably as his music and his lyrics has been a integral part of my life since high school.

Just 55 days later on March 2nd, my older brother, by 10 years, also passed away from brain cancer (I think it was a different type).
Originally diagnosed in September 2019 with stage 3 lunch cancer, he fought a hard 6-8 weeks, and with chemo and radiation, was able to force it into remission.
Unfortunately, it had already metastasized to his brain.
His cognitive skills and memory deteriorated over the course of the 3 weeks leading up to his death.
He kept the diagnosis of his brain cancer from family and friends and, luckily, it took him quickly.
He died in his own home under hospice care per his wishes.
Our mom was there and I was on the phone with her when it happened.

Next, the COVID-19 coronavirus began infecting and killing more and more people, eventually arriving in the US and the world declared it a pandemic.
The lockdown arrived.
My anxiety and feeling of dread grew stronger each day.
I'm an introvert, my wife an extrovert.
Lockdown and the social distancing came easy to me; for my wife, it created a struggle that I didn't realize until much later.

The previous year, I had made a difficult decision to switch career paths from systems engineering to software development.
I started working for an employer that I had previously worked, on the systems team, but this time as an intermediate developer.
My employer and I both knew that I had significant deficiencies, but we were hopeful that I would be able to quickly adapt.
I suppose due to grief and the uncertainty of the pandemic, my mind languished.
It grew harder and harder to focus on my job.
As it happened, I was not able to adapt and learn at the pace required.
I became unemployed mid-May.

I believe the last thing I was emotionally combating was my turning 50 years old in August.
That's half a century folks.
It's still hard to believe that I qualify for AARP.
Most of the time, I don't act like others of my age.
My body, on the other hand, started feeling old perhaps the year before.
Low back, shoulders, knees, feet - they all remind me of my age daily.
With the heightened stress caused by the anxiety I was feeling for the pandemic, all the grief, and the aging, I was having a harder time of remembering details of long ago events.
My father passed away on Christmas Day in 2018, in the final stage of Alzheimer's.
I'm not sure if I inherited the genetic marker for that disease.
I truly hope not.
Regardless of what my body does, I need my mind to function until it's my time to check out.

No recount (pun intended) of the year 2020 can be complete without at least a brief mention of the political and cultural strife in the United States.
Regardless of where you fall on the political spectrum, last year was, at best, tumultuous.

### The Good

Despite the shitshow that was the year 2020, I did have a few *very* good things that happened.

As evidenced from this article, the most important good thing that happened was that I survived it.
I took precautions against the virus.
I focused my mind on computing nostalgia.
*Maybe that didn't help the aging anxiety, come to think of it.*

#### Retro Computing

I found several YouTube channels on retro computing that took me back in time.

- [Adrian's Digital Basement](https://www.youtube.com/@adriansdigitalbasement)
- [The 8-Bit Guy](https://www.youtube.com/@The8BitGuy)
- [8-Bit Show and Tell](https://www.youtube.com/@8_Bit)
- [LGR](https://www.youtube.com/@LGR)
- [Jan Beta](https://www.youtube.com/@JanBeta)
- [RMC - The Cave](https://www.youtube.com/@RMCRetro)

As I watched them, my realized that I wanted to relive my early computing history.
Along with an *Atari 2600*, given to me by a close friend, and my brother's Pentium 166 system had started my collecting journey.

Over the course of last year, I have acquired the following.

- Premio Pentium 166 mid-tower
  - My brother and I both worked for the same small computer store that sold Premio's.
    I'm fairly certain that he built the computer himself, though I've added an ATI Mach64 3D RageII+ video card and an IDE2CF adapter to replace the hard drive with a compact flash card.
- Atari 2600
  - I believe that we went through two of these, replacing the first one when the game selector switch broke.
  - I bought a A/V S-Video mod kit that I haven't installed yet.
- Apple IIe Platinum Edition with floppy emulator
  - I had an Apple IIc with the small green monitor.
- TRS Color Computer 2 - CoCo2
  - I never had a TRS computer.
- NEC Multispeed PC-16 01 laptop
  - It's an earlier model than the one that I had.
- TheC64
  - Though not an old computer, it is essentially a Commodore 64 and Vic-20 in one system in the same case.
- ZX Spectrum Next
  - I was a backer for the second Kickstarter and I'm eagerly waiting for August, the expected delivery date.
- Raspberry Pi 400
  - Okay, this computer is not an old computer, but it is essentially a Raspberry Pi 4 in a keyboard, harkening back to many of the 8-bit computers of yore.

In preparation for restoring and reconditioning the older computers, I have purchased a modicum of electronics tools.
I just need to find the time to learn more electronics.
I did solder a small clock/timer kit, but it doesn't seem to work.
I have another identical kit that I will assemble soon.
The idea behind building the kit is to get experience with soldering and troubleshooting simple circuits so I can put those skills to use repairing the old systems.

#### Career Shift and New Job

When I moved back to Tennessee from California in 2016, I accepted the first systems engineer position offered just to get the income flowing.
I made a few good friends, one of which has become a best friend, while working there but the company's IT culture was toxic.
Despite the culture, I was able to learn Azure and created a Windows PowerShell workflow to merge accounts from two domains and migrate mailboxes to the cloud.

The growing disgust of the company eventually inspired me to start looking for another job and I soon realized that DevOps skills were in high demand.
As [Don Jones](https://donjones.com/soft-skills/) heavily suggests, I took charge of my career and began my journey of learning more about DevOps.

My next position seemed to be the perfect for me, joining a skill that I had with a skill I wanted: Senior Active Directory Administrator & DevOps.
However, by the time the paperwork was complete, the *DevOps* part was dropped.
It was my first foray into the level of enterprise that separated engineering from operations.
The feeling of being stifled grew as the months passed and I realized that I would never be happy in an operations only role.
I must create; I must engineer solutions.

With this newfound direction and an opportune position opening with a company where I previously worked, I made the decision shift my career from systems engineering to software development.
I'd become slightly familiar reading C# code while expanding my PowerShell knowledge.
One day, I hope to submit my first pull request to the project.
I would need to learn C# and I know that I needed to build/engineer things.
That's how I made the decision to accept the intermediate developer position, taking a $25K annual pay cut.

If you didn't skip [The Bad](#the-bad) section, you know how this turned out.

So, I found myself unemployed in May during a global pandemic.

I told several friends about my need for a position, many of which are PowerShell community members.
I shared my update my resume.
I interviewed for a few jobs but I felt I would be taking one or more steps backward on my career path.

A month passed, and another.
Then, I received an email inviting me for an interview with a company where one of the PowerShellers worked.
I had that interview and another the following day.
On my birthday, I received the call that I was hired.
It was an awesome birthday present.

Though I did not have any professional experience with infrastructure as code or AWS, I believe my extensive general Windows and technical expertise was a huge factor in their decision.
My demeanor and attitude was also a contributing factor.

At the end of August, I started as a Windows DevOps Engineer on the infrastructure engineering team at a national financial company.
I've ramped up my DevOps skills and become a contributing member of the team.
I feel welcomed by the team and I feel like a part of the team, despite working remotely.

To the person responsible for sharing my resume with his manager, I thank you.
To his manager who is now my manager, I'm so very thankful that you, and the others involved in offering me a position, wanted me on your team.

#### PowerShell

Here is a recap of my PowerShell contributions for 2020.

##### PS7Now PSBlogWeek

{{< influencer jeffhicks >}} asked me to participate in #PSBlogWeek for the PowerShell 7 #PS7Now release.
I was extremely flattered and wrote [two articles](/tags/ps7now/) in March.

##### PowerShell Conference Book, Volume 3

I contributed the chapter, **Exploring Experimental Features in PowerShell 7**, expanding on the PS7Now article on the same topic.
I also wrote [PSTemperature](https://github.com/thedavecarroll/PSTemperature), a sample binary module that demonstrates how to include experimental features.

You can purchase the digital version [here](https://leanpub.com/psconfbook3) and the physical version [here](https://www.amazon.com/dp/B08MGR749H/).
Proceeds goes to the [OnRamp Scholarship](https://events.devopscollective.org/OnRamp/Scholarship/) for the OnRamp track for the [PowerShell + DevOps Global Summit](https://events.devopscollective.org/event/powershell-devops-global-summit/).

##### BluebirdPS

Last year, I began work on a PowerShell 7 module to interact with the Twitter API.
I consulted with a few PowerShell community members and eventually settled on the name [BluebirdPS]({{< relref "retired-links.md" >}}).

If you are interested in using BluebirdPS, visit the *Getting Started: Pre-requisites* documentation page.

I want the module to be easy to use by the community and contain useful features/commands.
To that end, please feel free to submit *discussion issue*, *feature request*, or *bug report*.

##### Presentations

I gave two presentations last year, both on BluebirdPS.
You can see the [slide decks](https://github.com/thedavecarroll/Presentations) or check out the [videos](https://www.youtube.com/playlist?list=PLqfC1rgeTHyuA41oype1dT5VjzZ26KFSp).

I changed the order of topics and general approach after awesome feedback from the first presentation.
Succeeding presentations should always be adjusted from feedback and your own observations.

##### Advent of Code

Last year was the first year that I participated in the [Advent of Code](https://adventofcode.com/).
Check out my [2020 solutions](https://github.com/thedavecarroll/AdventOfCode/tree/main/2020).

Though I only completed I only 17 of the challenges, I managed to land 17th on the PowerShell leaderboard.

##### Iron Scripter Challenges

I accepted and solved, to some degree, last year four [IronScripter](https://ironscripter.us/let-the-powershell-challenges-begin/) Challenges, created by Jeff Hicks.
My [IronScripterSolutions](https://github.com/thedavecarroll/IronScripterSolutions) repo, which woefully needs to be updated, includes links to the challenges and links to my solutions.

I spent considerable time on the [Process Tree challenge](https://ironscripter.us/building-a-powershell-process-tree/), but ultimately didn't produce a function that I would consider good enough.
It did lead me to learning about the composite design pattern.

The IronScripter challenges serves to teach PowerShell concepts and techniques on how to achieve a desired outcome.
I've written a few articles as walk-throughs for specific challenges and I think they've helped others expand their PowerShell knowledge and skills.

## 2021 Directions

This year begins for me with a renewed focus on PowerShell and this blog.

Here are some of the PowerShell related items that I want to do for the rest of the year.

- Publish at least one article per month.
- Present (via pre-recorded video) at Summit
  - I'm hoping to be selected.
    If I'm not selected for a standard length presentation, hopefully I'll be selected for one or two lightning talks.
- Include more features/commands in BluebirdPS.
- Solve more IronScripter challenges.

I also want to work on my retro computing hobby.
It needs to be an active hobby and not just "collecting" hobby.

I want to become more self-sufficient and productive at work.

Lastly, I want to continue the emotional healing for last year's losses and hardships.

Thank you for spending a little bit of your time with me and this article.
I hope you are healthy and safe, and remain so.
You are an important part of the PowerShell community.

Please feel free to leave a comment below or hit me up on {{< influencer thedavecarroll social-only >}}.

Thanks for reading.
