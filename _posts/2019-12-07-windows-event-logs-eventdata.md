---
layout: single
title: "Writing Windows Events with Smart EventData"
excerpt: "Learn how to write events with structured EventData."
date: 2019-12-07
header:
  overlay_image: /assets/images/windows-eventlog-eventdata-json.png
  overlay_filter: 0.9
comments: true
share: true
tags:
  - powershell
  - windows
  - event logs
  - events
  - eventdata
category:
  - powershell
---

![EventData]({{ site.url }}{{ site.baseurl }}/assets/images/windows-eventlog-eventdata-json.png)

## Introduction

I've spent quite some time researching how to create events using EventData with named Data elements. It's not easy and
is even less easier to write some PowerShell to make it "dynamic".

### EventData with Named Data

In order to enable named Data elements in your event logs, you have to go through several hoops. I won't go through them
in this post, but here are some links to various posts that can help you get started. _It's not for the faint of heart!_

First, I found [CustomProvider on GitHub][1]{:target="_blank"} which references [this blog post][2]{:target="_blank"}.

To get the Message Compiler (mc) and Resource Compiler (rc), you will need to download the
[Windows 10 SDK][3]{:target="_blank"} and install the Windows SDK for UWP Managed Apps (which required the Signing Tools
for Desktop Apps). To get the ManifestGenerator (EcGenMan), you will need to hit up the the Windows SDK archive section
and download an older version.

### EventData without Named Data

Besides super-fast XML filtering, which **cannot use wildcards**, I'm not entirely sure what the benefit of having named
Data elements would be for general use.

This got me thinking, why not pass EventData in a manner that allows you to easily parse and even search with XML?

### Planning

You obviously want to stash some event data into an event in some event log. You should consider creating an EventData
schema for each of your use cases.

**Don't forget to document and share them with your team!**

Something like the following

|Name|Description|
|-|-|
|ScriptName|The name of the PowerShell script.
|Status|The results of the execution of the PowerShell script.
|LogFile|This is were the detailed log can be found.

Also, be sure to establish the event ID ranges that you want to use for each schema.

|Event ID Range|Purpose
|-|-|
|100-199|Initialization
|200-299|Script actions
|300-399|Completion

This is a very simple schema. But with it, you would be able to search the logs with an XML filter for warning events
for your event source where the script `MyScript.ps1` generated the event.

```powershell
PS C:\ > $FilterXml = @"
<QueryList>
  <Query Id="0" Path="Application">
    <Select Path="Application">
      *[System[Provider[@Name='MyEventSource'] and (Level=3)]]
      and
      *[EventData[Data="ScriptName:MyScript.ps1"]]
    </Select>
  </Query>
</QueryList>
"@

PS C:\ > (Get-WinEvent -FilterXml $FilterXml).Message
<# Output (with Unicode escape characters)
{
    "ScriptName":  "MyScript.ps1",
    "Status":  "Something didn\u0027t go exactly right.",
    "LogFile":  "C:\\ProgramData\\MyLogs\\20191207_MyScript.log"
}
#>

PS C:\ > (Get-WinEvent -FilterXml $FilterXml).Message | ConvertFrom-Json
<# Converted Output (with ConvertFrom-Json)

ScriptName   Status                             LogFile
----------   ------                             -------
MyScript.ps1 Something didn't go exactly right. C:\ProgramData\MyLogs\20191207_MyScript.log
#>
```

You can see that creating your EventData schema would be incredibly important in being able to use XML filters.

**Note:** I'm using the ConvertFrom-Json to translate the unicode escape characters back to human readable.
{: .notice--info}

### Usage

First, download the simple module script from the [Gist EventData.psm1][4]{:target="_blank"}.

Once you import the module, you can use the two functions to create a new Windows event log provider and write events
with structured Data, though not named Data elements.

In an elevated PowerShell session, import the module.

```powershell
PS C:\ > Import-Module D:\Path\To\Events.psm1
```

### Adding a New Provider, aka Source

```powershell
PS C:\ > New-EventSource -EventLog Application -Source MyCustomEventSource
```

### Writing a New Event

In order to write a new event, first you will need an OrderedDictionary. For details, please visit
[Microsoft Docs about_Hash_Tables][5]{:target="_blank"}.

#### Create the Event Data

```powershell
PS C:\ > $EventData = [ordered]@{Program = 'MyProgram';ThisEvent = 'This is an event I want to track'; SomethingElse = 'I like the C64'}
```

Next, decide which event message format you wish to use: JSON, CSV, or XML.

**Note**: If using XML, the event message will contain the outer XML for XML document. You would need to parse it as you
would any XML.
{: .notice--info}

#### Write an Event

Next, simply write the event.

```powershell
PS C:\ > Write-WinEvent -LogName Application -Provider MyEventSource -EventId 1000 -EventType Information -EventData $EventData
```

Then check your event log for the goodness.

### How the Events Look

#### MessageFormat: JSON

Event message:

```json
{
    "ScriptName":  "MyScript.ps1",
    "Status":  "Something didn\u0027t go exactly right.",
    "LogFile":  "C:\\ProgramData\\MyLogs\\20191207_MyScript.log"
}
```

**Note**: This contains Unicode escape characters for the single quote (').
{: .notice--info}

XML View:

```xml
- <EventData>
  <Data>{ "ScriptName": "MyScript.ps1", "Status": "Something didn\u0027t go exactly right.", "LogFile": "C:\\ProgramData\\MyLogs\\20191207_MyScript.log" }</Data>
  <Data>ScriptName:MyScript.ps1</Data>
  <Data>Status:Something didn't go exactly right.</Data>
  <Data>LogFile:C:\ProgramData\MyLogs\20191207_MyScript.log</Data>
</EventData>
```

#### MessageFormat: CSV

Event message:

```csv
"Key","Value"
"ScriptName","MyScript.ps1"
"Status","Something didn't go exactly right."
"LogFile","C:\ProgramData\MyLogs\20191207_MyScript.log"
```

XML View:

```xml
- <EventData>
  <Data>"Key","Value" "ScriptName","MyScript.ps1" "Status","Something didn't go exactly right." "LogFile","C:\ProgramData\MyLogs\20191207_MyScript.log"</Data>
  <Data>ScriptName:MyScript.ps1</Data>
  <Data>Status:Something didn't go exactly right.</Data>
  <Data>LogFile:C:\ProgramData\MyLogs\20191207_MyScript.log</Data>
</EventData>
```

#### MessageFormat: XML

Event message:

```xml
<?xml version="1.0" encoding="utf-8"?><Objects><Object Type="System.Collections.Specialized.OrderedDictionary"><Property Name="Key" Type="System.String">ScriptName</Property><Property Name="Value" Type="System.String">MyScript.ps1</Property><Property Name="Key" Type="System.String">Status</Property><Property Name="Value" Type="System.String">Something didn't go exactly right.</Property><Property Name="Key" Type="System.String">LogFile</Property><Property Name="Value" Type="System.String">C:\ProgramData\MyLogs\20191207_MyScript.log</Property></Object></Objects>
```

XML View

```xml
- <EventData>
  <Data><?xml version="1.0" encoding="utf-8"?><Objects><Object Type="System.Collections.Specialized.OrderedDictionary"><Property Name="Key" Type="System.String">ScriptName</Property><Property Name="Value" Type="System.String">MyScript.ps1</Property><Property Name="Key" Type="System.String">Status</Property><Property Name="Value" Type="System.String">Something didn't go exactly right.</Property><Property Name="Key" Type="System.String">LogFile</Property><Property Name="Value" Type="System.String">C:\ProgramData\MyLogs\20191207_MyScript.log</Property></Object></Objects></Data>
  <Data>ScriptName:MyScript.ps1</Data>
  <Data>Status:Something didn't go exactly right.</Data>
  <Data>LogFile:C:\ProgramData\MyLogs\20191207_MyScript.log</Data>
  </EventData>
```

## Summary

Unless you want to spend a ton of time crafting a manifest and compiling all the pieces into a usable Windows custom
event provider, writing EventData using a structured format such as JSON or XML virtually negates the hassle, while
still providing you the option for querying with a good XML filter.

I hope you’ve found this interesting or informative. If you have any comments or questions, please post them below.

Thanks for reading! Good luck wrangling your EventData!

**Bonus:** Once things settle down with my new job and life stuff, I will incorporate these two functions into my
[PoShEvents][6]{:target="_blank"} module. If you have been paying attention to its repo, there are a couple new
functions to generate XML filters on the fly.
{: .notice--info}

[1]: https://github.com/ggcooper/CustomProvider
[2]: http://blog.dlgordon.com/2012/06/writing-to-event-log-in-net-right-way.html
[3]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[4]: https://gist.github.com/thedavecarroll/765547120aa1fa801919040f4d5d2046
[5]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-6#creating-ordered-dictionaries
[6]: https://www.powershellgallery.com/packages/PoShEvents/
