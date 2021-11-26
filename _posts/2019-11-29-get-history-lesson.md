---
layout: single
title: "Get-History Lesson"
excerpt: "Learn about the default PowerShell history cmdlets and concepts."
date: 2019-11-29
header:
  overlay_image: /assets/images/clock.jpg
  overlay_filter: 0.9
comments: true
share: true
tags:
  - powershell
  - powershell concepts
  - learn powershell
  - powershell beginner
  - get-history
  - Microsoft.PowerShell.Commands.HistoryInfo
category:
  - powershell
---

## A Quick History Lesson

Today, I did a significant amount of work in a PowerShell session and, even though most of what I did was copy/pasted
from a file (open in VS Code), I wanted to grab only the essential commands from the session.

Instead of scrolling or arrowing up (which is actually using PowerShell history, by default), you can list all of the
commands that you have executed in your session, up to a predefined maximum.

**Note:** All of the output is from PowerShell 7.0.0-preview.6.\\
\\
Preview 6 dropped last week on 11/21/2019, as announced by [Steve Lee][1]{:target="_blank"}. If you are a fan of
PowerShell and you don't know Steve, you have some homework to do.
{: .notice--info}

## Historical Facts

As with most commands, you can find more about it through PowerShell's powerful help system.

### Conceptual Help

Most PowerShell concepts have an "about_*" help file that could be considered a primer for the topic.

```powershell
Get-Help about_History
```

```console
ABOUT HISTORY

Short Description

Describes how to get and run commands in the command history.

Long Description

When you enter a command at the command prompt, PowerShell saves the
command in the command history. You can use the commands in the history as
a record of your work. And, you can recall and run the commands from the
command history.

History Cmdlets

PowerShell has a set of cmdlets that manage the command history.

  Cmdlet           Alias   Description
  ---------------- ------- --------------------------------------------
  Get-History      h       Gets the command history.
  Invoke-History   r       Runs a command in the command history.
  Add-History              Adds a command to the command history.
  Clear-History    clhy    Deletes commands from the command history.

<TRUNCATED>
```

### Cmdlet Help

Next, let's examine the cmdlets.

```powershell
Get-Help Get-History -ShowWindow
```

You should skim through the help for the rest of the cmdlets to familiarize yourself with what they do. I will provide
examples for `Get-History` and `Invoke-History` further down the page.

### Preference Variable

As we learned from the conceptual help, the `$MaximumHistoryCount` preference variable default value is 4096, since
Windows PowerShell 3.0. This is how many commands that PowerShell will save for the session.

You can change this in your `$profile` to a maximum of 32767. You can verify this is the maximum via the following
command and seeing the MaxRange attribute.

```powershell
 (Get-Variable MaximumHistoryCount).Attributes
 ```

## History Class

PowerShell can access command history through the `Microsoft.PowerShell.Commands` namespace with the `[HistoryInfo]`
class.

The class has the following properties.

| Property | Type | Description |
-|-|-|
| Id | `[long]` | Id of the history entry |
| CommandLine | `[string]` | String of the command |
| ExecutionStatus | `[System.Management.Automation.Runspaces.PipelineState]` | Execution status of associated pipeline |
| StartExecutionTime | `[datetime]` | Start time of associated pipeline |
| EndExecutionTime | `[datetime]` | End time of associated pipeline |
| Duration | `[timespan]` | Calculated timespan from start and end time |

**Note:** The `Duration` property was first available in PowerShell Core 6.1. It is displayed by default in
`Get-History` output since PowerShell 7.0.0-preview.2.
\\
\\
It was added by PowerShell community member [Keith Hill][3]{:target="_blank"}. Anyone can contribute to make PowerShell
even greater!
{: .notice--success}

## Get-History

When you run `Get-History` or its alias `h`, you should see something similar to following output. That is to say, your
specific data will be different, but the same properties should be present. For versions below 7 preview 2, you will
only see the `Id` and `CommandLine` properties.

```console
  Id     Duration CommandLine
  --     -------- -----------
   7        0.001 Clear-History
   8        0.077 Get-Command -Noun History
   9        0.001 $PSVersionTable.PSVersion.ToString()
  10       10.001 Start-Sleep -Seconds 10
```

But wait, there's more!

Piping the command to `Format-List`, you'll see all of the properties.

```console
Id                 : 7
CommandLine        : Clear-History
ExecutionStatus    : Completed
StartExecutionTime : 11/20/2019 10:53:25 PM
EndExecutionTime   : 11/20/2019 10:53:25 PM
Duration           : 00:00:00.0016020

Id                 : 8
CommandLine        : Get-Command -Noun History
ExecutionStatus    : Completed
StartExecutionTime : 11/20/2019 10:53:55 PM
EndExecutionTime   : 11/20/2019 10:53:55 PM
Duration           : 00:00:00.0770803

Id                 : 9
CommandLine        : $PSVersionTable.PSVersion.ToString()
ExecutionStatus    : Completed
StartExecutionTime : 11/20/2019 10:54:10 PM
EndExecutionTime   : 11/20/2019 10:54:10 PM
Duration           : 00:00:00.0015147

Id                 : 10
CommandLine        : Start-Sleep -Seconds 10
ExecutionStatus    : Completed
StartExecutionTime : 11/20/2019 10:54:28 PM
EndExecutionTime   : 11/20/2019 10:54:38 PM
Duration           : 00:00:10.0010661
```

### Send Specific Historical Commands to the Clipboard

Now that we know how to get the commands from history, here is how you can get exactly what you want into your
clipboard.

```powershell
# short version
h 75,76,77,61,62,63,65,74 | select -exp CommandLine | clip

# full version
Get-History -Id 75,76,77,61,62,63,65,74 | Select-Object -ExpandProperty CommandLine | clip
```

This grabbed the history of the lines I typed/pasted in, in the order I wanted them, expanded the CommandLine property,
and sent it to the clipboard.

Pretty simple.

**Note:** By the way, I use `| clip` a lot instead of using the mouse to select and copy. Doing this has save me a considerable
amount of time and without error.
{: .notice--primary}

### Get a Range of HistoryInfo Entries

I just learned while writing this post that you can get a range of history entries.

```powershell
# short version
h 44 -c 7

# long version
Get-History -Id 44 -Count 7
```

The `Id` that you supply is the **last** entry. The `Count` is the number of preceding history entries, including the
`Id`.

## Invoke-History

The Cmdlet `Invoke-History` runs commands from the session history.

### Re-execute Specific Historical Commands

What if I wanted to re-execute those lines in the same order?

```powershell
# short version
75,76,77,61,62,63,65,74 | % {r $_ }

# full version
75,76,77,61,62,63,65,74 | ForEach-Object { Invoke-History -Id $_ }
```

### Send History into the Pipeline

If you remember from the help for `Invoke-History`, you'll see that `Id` can accept pipeline input via `ByPropertyName`.
This means that you could do the following.

```powershell
h 75 | r
```

This will execute the command associated with history entry with `Id` of 75.

Unfortunately, you cannot send an array of `[HistoryInfo]` objects into `Invoke-History` as it only accepts a single
instance.

## A Better History

If you want better control and multi-session spanning history, you should use `PSReadLine`. And if you are using
PowerShell 6 or higher, or are running Windows 10 October 2018 Update (build 1809) or higher, you already have
`PSReadLine` installed and are most likely using it.

Here are the properties that have something do to with history.

* AddToHistoryHandler
* HistoryNoDuplicates
* HistorySavePath
* HistorySaveStyle
* HistorySearchCaseSensitive
* HistorySearchCursorMovesToEnd
* HistoryStringComparison
* MaximumHistoryCount

Getting this list was a little tricky, but here's how you can do it.
_This method will help you digging into other objects as well._

```powershell
# get the object type from the command output
(Get-PSReadLineOption).GetType().FullName

# get all of the attributes from the object type
[Microsoft.PowerShell.PSConsoleReadLineOptions] | Format-List

# get the list of all properties
([Microsoft.PowerShell.PSConsoleReadLineOptions]).DeclaredProperties

# get the list of all properties, where the Name property contains the word history
([Microsoft.PowerShell.PSConsoleReadLineOptions]).DeclaredProperties.Name.Where{$_ -match 'history'}
```

To learn more about `PSReadLine`, check out the [README file][4]{:target="_blank"} for the project's GitHub repo.

Here are a few blog posts about `PSReadLine`, albeit dated. They should, however, still provide relevant information.

* [Towards a better console - PSReadLine for PowerShell command line editing][5]{:target="_blank"}
* [PSReadLine - A free PowerShell console extension][6]{:target="_blank"}
* [Change PowerShell’s Tab Complete][7]{:target="_blank"}

## Summary

We used PowerShell's Help system to view conceptual help and the help for the `*-History` cmdlets. We saw examples of
using the two primary cmdlets, `Get-History` and `Invoke-History`, including how to save or re-execute specific
commands.

I hope you’ve found this interesting or informative. If you have any comments or questions, please post them below.

Thanks for reading!

Credit: The overlay is a clock image from <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@fabrizioverrecchia?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Fabrizio Verrecchia"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Fabrizio Verrecchia</span></a>.
{: .notice--primary}

[1]: https://twitter.com/Steve_MSFT/status/1197686473090142208?s=20
[2]: https://github.com/PowerShell/PowerShell/releases/tag/v7.0.0-preview.2
[3]: https://twitter.com/r_keith_hill
[4]: https://github.com/PowerShell/PSReadLine/blob/master/README.md
[5]: https://www.hanselman.com/blog/TowardsABetterConsolePSReadLineForPowerShellCommandLineEditing.aspx
[6]: https://4sysops.com/archives/psreadline-a-free-powershell-console-extension/
[7]: https://www.learnpwsh.com/change-powershells-tab-complete-behavior/
