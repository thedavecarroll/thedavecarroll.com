---
title: Design Deep Dive - PoShDynDnsApi
description: In this post, I want to give you a peek into my development process for the PoShDynDnsApi module.
published: 2019-05-08
tags: ["powershell", "module", "xplat", "cross platform", "rest api", "webrequest", "httpclient", "external help", "online help", "updatable help", "dyn managed dns"]
categories: ["PowerShell"]
---

## Introduction

In January, I published the first release of the [PoShDynDnsApi]({{< relref "retired-links.md" >}}) module to the PowerShellGallery,
along with a [blog post introducing the module]({{< relref "powershell/module-poshdyndnsapi.md" >}}). It was the culmination of months of
often-distracted work that began nearly a year prior.

In this post, I want to give you a peek into my development process.

## Topics Covered

Below are the topics that I will cover in this post.

* Dyn Managed DNS Service
  * Managed DNS API
* PowerShell Web Cmdlets
  * Changes Between Windows PowerShell and PowerShell Core
  * Strictly RESTing
* Testing Tool
* Module Variables
  * Session
  * History
* API Request
  * Invoke-DynDnsRequestDesktop
  * Invoke-DynDnsRequestCore
  * Invoke-DynDnsRequest
* Output
  * Classes
  * Output Streams
  * Write-DynDnsOutput
* Help

## Dyn Managed DNS Service

When I first started working on this module, I had access to Dyn's Managed DNS through an employer. When I left them in
October 2018, I obviously lost my access to Dyn.

I wanted to continue development on the module. Originally, I contacted Dyn (turned out to be Sales) and they really had
no clue what I was talking about. I poked around their website and saw that they offered a Developer account that
provided access to the Dyn Managed DNS service with a maximum of one domain.

By the way, the Managed DNS service is not the same as Dynamic DNS (DDNS).

* The Managed DNS service fully hosts your domain, allowing you to add records, get reports per record or domain, set granular permissions, and more.
* The DDNS service allows your hosts/devices to auto-register with their service providing you access to your device via its hostname, typically `myuniquehostname.dyndns.org`.

### Managed DNS API

Dyn provides two APIs which can be used to interact with the Managed DNS Service.

* `RESTful` API
* `SOAP 1.1` API

Each API has specific requirements for establishing a session, creating resources, querying resources, modifying
resources, and deleting resources.

For more details, please visit [Dyn's DNS API Quick-Start Guide](https://help.dyn.com/dns-api-guide/).

## PowerShell Web Cmdlets

In the world of PowerShell, one typically would use the commands `Invoke-WebRequest` and `Invoke-RestMethod`, both
available since Windows PowerShell 3.0.

In fact, the Windows PowerShell version uses `Invoke-WebRequest` under the hood.

_But why not `Invoke-RestMethod`, Dave?_

Glad you asked. I'll be covering that further down in the post.

### Changes Between Windows PowerShell and PowerShell Core

The following table provides a quick overview of the major changes between the web cmdlets from Windows PowerShell and PowerShell Core.

|Version|PSEdition|Primary .NET API|Response Object|Strict Header Parsing|Headers Values|Content Headers|
|-|-|-|-|-|-|-|
|Windows PowerShell|Desktop|System.Net.WebRequest|System.Net.WebResponse|No|Single string, joined by commas|HttpWebResponse.Headers|
|PowerShell Core|Core|System.Net.Http.HttpClient (.Net 4.5+)|System.Net.Http.HttpResponseMessage|Yes|Sting array|HttpResponseMessage.Content.Headers|

The table data was distilled from a series of blog posts ([Part 1](https://get-powershellblog.blogspot.com/2017/11/powershell-core-web-cmdlets-in-depth.html), [Part 2]( https://get-powershellblog.blogspot.com/2017/12/powershell-core-web-cmdlets-in-depth.html),
and [Part 3](https://get-powershellblog.blogspot.com/2017/12/powershell-core-web-cmdlets-in-depth_24.html)) on _PowerShell Core Web Cmdlets in Depth_ by [Mark Kraus](https://www.linkedin.com/in/markekraus/). Please
check out Mark's posts for details, as he's pretty much a leading authority since he's writing most of the feature work
for them.

### Strictly RESTing

While I was developing a proof of concept in PowerShell Core, I immediately hit a wall. It seems that, in this PSEdition,
Microsoft prohibits sending a JSON payload via the GET method. This led me to initially targeting Windows PowerShell.

{{< notice type="note" >}}
I believe it was the body with GET method, but I'm not 100% sure.
There is also major differences in how the two PSEditions handle errors.
{{< /notice >}}

## Testing Tool

For testing external to PowerShell, I use the [Insomnia REST Client](https://insomnia.rest/). I find the UI to be very
clean and the application to be all that I need in a REST client. There are many REST clients like it, but this one is
mine (of choice).

![InsomniaRESTClient](/images/design-deep-dive-poshdyndnsapi-insomnia.png)

## Module Variables

My blog post in October 2018 on module variables received a lot of views, largely due to a gracious retweet from [Don Jones](https://www.linkedin.com/in/concentrateddon/). In it, I describe how I began using module variables, aka script scoped variables.

Originally, I had created globally scoped variables for the API client URL, the API version, and the authentication
token. The first was created in the module's psm1 file, while the others were created in the `Connect-DynDnsSession`.

Looking back on my original implementation, all I can say is that I was (and still am) learning.

{{< notice type="tip" >}}
There are some people, like my friend [Steven Maglio](http://stevenmaglio.blogspot.com/), who attests a globally scoped hashtable allows for quick edits and could be valuable in debugging and sanity checking.
{{< /notice >}}

### Session

The Dyn API requires an authentication token to be sent with each call, so we definitely need that in a variable. I
wanted to also include the API client URL and API version. Essentially, the following is what I had in the first
iteration of the module.

```powershell
New-Variable -Name DynDnsApiClient -Value 'https://api.dynect.net' -Scope Global -Option ReadOnly -Force
Set-Variable -Name DynDnsAuthToken -Value $Session.data.token -Scope global
Set-Variable -Name DynDnsApiVersion -Value "API-$($Session.data.version)" -Scope global
```

As I continued working on the module, I realized that having the user and customer (company) information would allow a
user to validate that the correct account was being used.

Lastly, the authentication token has an expiration. I wanted to track when the session was originally created, how long
the session has been active, and when the session has been extended.

Here is the current session variable hashtable as it stands today.

```powershell
$DynDnsSession = [ordered]@{
    ClientUrl           = 'https://api.dynect.net'
    User                = $null
    Customer            = $null
    ApiVersion          = $null
    AuthToken           = $null
    StartTime           = $null
    ElapsedTime         = $null
    RefreshTime         = $null
}
```

The `User`,`Customer`,`ApiVersion`,`AuthToken`,`StartTime`, and `ElapsedTime` properties are updated when a new session
starts.

The cool thing with `ElapsedTime` property is that it is a timer, using `[System.Diagnostics.Stopwatch]::StartNew()`.
The stopwatch continues during the PowerShell session while you have the module loaded. I reset it to `$null` when the
API session is terminated.

### History

All responses from the API includes a `job_id`. You can use it to retrieve the results from a previous job in the same
session by making a call against the URL `https://api.dynect.net/REST/Job/<job_id>/`.

I first started including the `job_id` in the Information output stream (more on that later), but realized that it was
transient and someone would have to use the common parameter `InformationAction` with each command.

I needed a way for a user to easily retrieve the `job_id`'s from previously run commands, therefore another module
variable, `$DynDnsHistory`, was born.

The instantiation is very simple, just an empty `System.Collections.ArrayList`.

```powershell
$DynDnsHistory = New-Object System.Collections.ArrayList
```

Then, during the output processing, I add the `$InformationOutput` object.

```powershell
$InformationOutput = [DynDnsHistory]::New(@{
    Command = $Command
    Status = $Status
    JobId = $JobId
    Method = $DynDnsResponse.Response.Method
    Uri = $DynDnsResponse.Response.Uri
    StatusCode = $DynDnsResponse.Response.StatusCode
    StatusDescription = $DynDnsResponse.Response.StatusDescription
    ElapsedTime = "{0:N3}" -f $DynDnsResponse.ElapsedTime
    Arguments = $FilteredArguments
})

[void]$DynDnsHistory.Add($InformationOutput)
```

I believe it provides the user enough information about the calls to the API during an active session. The `JobId`
property of the object is the same as the raw `job_id` provided in the response by the API.

## API Requests

At the heart of the module is two private functions. The first one, `Invoke-DynDnsRequest`, does the heavy lifting by
interfacing with the REST API. The second one, `Write-DynDnsOutput`, provides all output to the user; this command is
discussed further down page.

`Invoke-DynDnsRequest` is an alias which points to the correct PSEdition version of the command.

In the module's psm1, I have the following code:

```powershell
if ($PSEdition -eq 'Core') {
    Set-Alias -Name 'Invoke-DynDnsRequest' -Value 'Invoke-DynDnsRequestCore'
} else {
    Set-Alias -Name 'Invoke-DynDnsRequest' -Value 'Invoke-DynDnsRequestDesktop'
}
```

### Invoke-DynDnsRequest

As previously mentioned, the `Invoke-DynDnsRequest` command is an alias. Both `Invoke-DynDnsRequestDesktop` and
`Invoke-DynDnsRequestCore` have the same parameters and parameter sets.

The commands have two parameter sets, `Default` and `Session`.

* Default Parameter Set
  * Method
    * Validate Set: Get, Post, Put, Delete
  * UriPath
  * Body
  * SkipSessionCheck
    * Some commands make two queries against the API; it is unlikely the session will expire between the two calls.

* Session Parameter Set
  * Body
    * Validated JSON
  * SessionAction
    * Validate Set: Connect, Disconnect, Test, Send

The content is converted to JSON, and the custom `[DynDnsHttpResponse]` object is built and added to the
`[DynDnsRestResponse]` object.

```powershell
[DynDnsRestResponse]::New(
    [PsCustomObject]@{
        Response    = $Response
        Data        = $Data
        ElapsedTime = $ElapsedTime
    }
)
```

### Invoke-DynDnsRequestDesktop

The `Invoke-DynDnsRequestDesktop` is a wrapper command for `Invoke-WebRequest`. Each parameter set builds a `$RestParams`
variable that is used as a splat to `Invoke-WebRequest`.

The following code shows how I use the `[System.IO.StreamReader]` construct to handle any errors from the API.

```powershell
$StopWatch = [System.Diagnostics.Stopwatch]::StartNew()
$OriginalProgressPreference = $ProgressPreference
$ProgressPreference = 'SilentlyContinue'
try {
    $DynDnsResponse = Invoke-WebRequest @RestParams -ErrorVariable ErrorResponse
    $Content = $DynDnsResponse.Content
}
catch {
    $DynDnsResponse = $ErrorResponse.ErrorRecord.Exception.Response
    $ResponseReader = [System.IO.StreamReader]::new($DynDnsResponse.GetResponseStream())
    $Content = $ResponseReader.ReadToEnd()
    $ResponseReader.Close()
}
$ElapsedTime = $StopWatch.Elapsed.TotalSeconds
$StopWatch.Stop()
$ProgressPreference = $OriginalProgressPreference
```

{{< notice type="tip" >}}
I do not use `Invoke-RestMethod` since I want to access more than just the API response.
I want the HTTP status code, description, URI, and method used.
Some of these are available, but I would have to pass them from the `Invoke-DynDnsRequestDesktop` to the `Write-DynDnsOutput` command.
Having all of this, the data, and the elapsed time in one object is very useful.
{{< /notice >}}

### Invoke-DynDnsRequestCore

The `Invoke-DynDnsRequestCore` is a custom command based on the `System.Net.Http.HttpClient` class. This was the first
time that I've worked with this class and there were some challenges.

{{< notice type="note" >}}
The `System.Net.Http.HttpClient` class allows for reuse of the `HttpClient`, however, I dispose of each connection with each call to the API.
{{< /notice >}}

I build the `HttpClient` using the following code:

```powershell
$HttpClient = [System.Net.Http.Httpclient]::new()
$HttpClient.Timeout = [System.TimeSpan]::new(0, 0, 90)
$HttpClient.DefaultRequestHeaders.TransferEncodingChunked = $false
$Accept = [System.Net.Http.Headers.MediaTypeWithQualityHeaderValue]::new('application/json')
$HttpClient.DefaultRequestHeaders.Accept.Add($Accept)
$HttpClient.BaseAddress = [Uri]$DynDnsSession.ClientUrl
```

Then for each API call type, I add the AuthToken to the `HttpClient` (when applicable) and then build and execute the
`HttpRequest` and retrieve the `HttpResponseMessage`.

See how I build the content in the following code:

```powershell
$StopWatch = [System.Diagnostics.Stopwatch]::StartNew()
$HttpResponseMessage = $HttpClient.SendAsync($HttpRequest)
if ($HttpResponseMessage.IsFaulted) {
    $PsCmdlet.ThrowTerminatingError($HttpResponseMessage.Exception)
}
$Result = $HttpResponseMessage.Result
try {
    $Content = $Result.Content.ReadAsStringAsync().Result | ConvertFrom-Json
}
catch {
    $Content = $null
}
$ElapsedTime = $StopWatch.Elapsed.TotalSeconds
$StopWatch.Stop()
```

## Output

To process the `Invoke-DynDnsRequest` responses, I decided on writing a single function to parse the response data.
Additionally, I decided on using custom classes (first introduced in Windows PowerShell 5.0) and most of the output
streams.

### Classes

I wanted to simulate the output objects of Microsoft DNS commands, like `Resolve-DnsName`, and similar property names.
The custom classes allow me to strongly type the output objects.

I also wanted to include the raw API data, so my base class `DynDnsRawData` starts there.

Here are the custom classes currently used by the module with indentation indicating a child class.

* DynDnsRawData
  * DynDnsRecord
    * DynDnsRecord_A
    * DynDnsRecord_TXT
    * DynDnsRecord_CNAME
    * DynDnsRecord_MX
    * DynDnsRecord_SRV
    * DynDnsRecord_PTR
    * DynDnsRecord_NS
    * DynDnsRecord_SOA
  * DynDnsTask
  * DynDnsZone
  * DynDnsZoneNote
  * DynDnsZoneChanges
  * DynDnsHttpRedirect
  * DynDnsUser
* DynDnsHttpResponse
* DynDnsRestResponse
* DynDnsHistory

Here is how I create the classes used by `DynDnsRecord_A`.

```powershell
class DynDnsRawData {
    hidden [PSCustomObject]$RawData
}
class DynDnsRecord : DynDnsRawData {
    [string]$Zone
    [string]$Name
    [string]$Type
    [int]$TTL
    hidden [string]$RecordId

    DynDnsRecord () {}
    DynDnsRecord ([PSCustomObject]$DnsRecord) {
        $this.Zone = $DnsRecord.zone
        $this.Name = $DnsRecord.fqdn
        $this.Type = $DnsRecord.record_type
        $this.TTL = $DnsRecord.ttl
        $this.RecordId = $DnsRecord.record_id
        $this.RawData = $DnsRecord
    }
}
class DynDnsRecord_A : DynDnsRecord {
    [ipaddress]$Address

    DynDnsRecord_A () {  }
    DynDnsRecord_A ([PSCustomObject]$DnsRecord) {
        $this.Zone = $DnsRecord.zone
        $this.Name = $DnsRecord.fqdn
        $this.Type = $DnsRecord.record_type
        $this.TTL = $DnsRecord.ttl
        $this.Address = $DnsRecord.rdata.address
        $this.RecordId = $DnsRecord.record_id
        $this.RawData = $DnsRecord
    }
}
```

And here is a quick look at the class type names and property members.

```powershell
C:\> using module PoShDynDnsApi
C:\> [DynDnsRecord_A]::new() | Select-Object -ExpandProperty PSTypeNames
DynDnsRecord_A
DynDnsRecord
DynDnsRawData
System.Object

C:\> [DynDnsRecord_A]::new() | Get-Member -MemberType Property -Force

   TypeName: DynDnsRecord_A

Name     MemberType Definition
----     ---------- ----------
Address  Property   ipaddress Address {get;set;}
Name     Property   string Name {get;set;}
RawData  Property   psobject RawData {get;set;}
RecordId Property   string RecordId {get;set;}
TTL      Property   int TTL {get;set;}
Type     Property   string Type {get;set;}
Zone     Property   string Zone {get;set;}
```

### Output Streams

For the output streams, I use 5 out of the 6 streams available in PowerShell versions 5.0 and higher.

* Output/Success
* Verbose
* Error
  * These are the **hard** errors.
* Warning
  * Not all errors returned by the API should be considered an error. These would be **soft errors**.
* Information
  * Detailed in the `Write-DynDnsOutput` section below.

### Write-DynDnsOutput

The command `Write-DynDnsOutput` takes the response object and pulls the `status` and `job_id` from the API response.
Next, it determines the original command called using `Get-PSCallStack` and extracts the arguments, omitting the common
parameters.

The command details is then added to the `$InformationOutput` variable which is written to the Information stream and
added to the `$DynDnHistory` module variable. The Warning and Error messages are processed next.

Finally, the data is converted to the appropriate custom class and sent to standard output.

## Help

Instead of including comment-based help in the functions themselves, I elected to use the PowerShell help system. I
provide external and online help. With the help of [platyPS](https://www.powershellgallery.com/packages/platyPS), I was able to
create the external MAML-xml file and the markdown for the online help.

I plan on providing updatable help within the next release or two. PlatyPS can help with that, too.

For online help, I wrote a script that iterated through the exported commands which would build a file for each command
with the YML front matter specific to the template I created for online help on my blog.

```powershell
foreach ($Command in (Get-Command -Module $ModuleName)) {
    $Link = "modulehelp/$ModuleName/$($Command.Name).html"
    $FrontMatter = @{
        'layout' = 'onlinehelp'
        'search' = 'false'
        'classes' = 'wide'
        'permalink' = "/$Link"
    }

    $OnlineVersionUri = "https://powershell.anovelidea.org/$Link"

    $NewMarkdownHelpParams = @{
        Command             = $Command
        OutputFolder        = $OutputFolder
        Metadata            = $FrontMatter
        OnlineVersionUrl    = $OnlineVersionUri
        Force               = $true
    }

    New-MarkdownHelp @NewMarkdownHelpParams
}
```

## Summary

And that is basically how I went about creating the `PoShDynDnsApi` module. Much like this post, it was a long journey,
but one that I'm glad I started. Thank you for reading this post. I hope it can serve as a spark for your module writing.

If you have any questions, find errors (typos too!), or have suggestions that can make my module better, please leave a
comment below. Thank you, again.
