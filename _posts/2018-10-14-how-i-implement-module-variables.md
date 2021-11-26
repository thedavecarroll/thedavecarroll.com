---
layout: single
title: "How I Implement Module Variables"
excerpt: "Originally, I used globally scoped variables for one of my modules to keep track of session data, but now I use a module variable."
date: 2018-10-14
last_modified_at: 2018-10-16
comments: true
tags:
  - powershell
  - module
  - module variables
  - global variables
category:
  - powershell
---

![How I Implement Module Variables]({{ site.url }}{{ site.baseurl }}/assets/images/module-variables.png)
{: .full}

## Preface

Originally, I used globally scoped variables for my [PoShDynDnsApi module](https://github.com/thedavecarroll/PoShDynDnsApi){:target="_blank"}
to store the API URL, the authentication token, and the API version. These three variables were created during the initial
connection to the service then updated or removed as needed.

A week or so ago, I was talking with a previous co-worker, [Steven Maglio](http://stevenmaglio.blogspot.com/){:target="_blank"},
that just happens to be a .Net developer. We were reminiscing and checking out some PowerShell code that we'd written.
He pointed out that I could create a pseudo-namespace, a la hashtable, to store the values for all the modules variables.
At first, I was reluctant to change the method I was using for my variables. After all, my module was nearly complete - I
was just working on the help files.

But, the idea started expanding in my mind. I had thought about tracking other elements of the session with Dyn's Managed
DNS REST API, such as the user for the current session and when the session was created. Grouping the elements into a
single hashtable started making sense to me.

Since [the use of global variables are frowned upon](https://www.itprotoday.com/management-mobility/what-do-not-do-powershell-part-11){:target="_blank"},
I started searching for more information on module variables. [Mike Robbins](https://mikefrobbins.com/){:target="_blank"} wrote a blog post
last year that dealt specifically with module variables. [What is this Module Scope in PowerShell that you Speak of?](https://mikefrobbins.com/2017/06/08/what-is-this-module-scope-in-powershell-that-you-speak-of/){:target="_blank"}
is a tremendous resource on the topic.

**Full Disclosure:** The PoShDynDnsApi module is the first module I've written which really needed to use module variables.
The information in this post represents a focused attention to and research on module variables.
{: .notice--primary}

## Variables Scopes

There are four named scopes: Global, Local, Script, and Private. We will only concern ourselves with the script scope
which, as we learned from Mike's post (and those he referenced), can be considered the module scope.

Read [about_Scopes](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_scopes?view=powershell-6){:target="_blank"}
for more details.

## Module Variables, aka Script-Scoped Variables

Some modules require its commands to reference shared dynamic content. This content could be authentication or remote
service session data. It really could be anything that needs to be passed around between module commands but shouldn't
be directly accessible by the end user.

You have a few options in creating module variables - individual variables, a hashtable (sometimes referred to as
pseudo-namespace), or a combination of the two.

### Individual Module Variables

Individual module variables would be the simplest to implement, but would take a little extra coding should you want to
expose the values of the variables to the user's session.

For example, you could have the following in your script module's .psm1:

```powershell
New-Variable -Name MyAuthToken -Value "some long hash" -Scope Script -Force
New-Variable -Name MyRESTApiUrl -Value 'https://some.url.com/REST' -Scope Script -Option ReadOnly -Force
New-Variable -Name MyRESTSessionStart -Value $null -Scope Script -Force
```

And, if you needed to expose the session start variable, you could create a module function, perhaps named `Get-MySessionStartTime`,
and simply return the module variable.

```powershell
function Get-MySessionStartTime {
  $MyRESTSessionStart
}
```

### Hashtable as Module Variable, aka Pseudo-Namespace

Using a single hashtable as a module variable is similar to using individual module variables.

In your script module's .psm1, you could declare the module variable as follows:

```powershell
$DynDnsSession = [ordered]@{
    ClientUrl           = 'https://api.dynect.net'
    ApiVersion          = $null
    AuthToken           = $null
    StartTime           = $null
    RefreshTime         = $null
}
New-Variable -Name DynDnsSession  -Value $DynDnsSession -Scope Script -Force
```

Let's assume that your module will be establishing a session with a RESTful API and you will be storing the authentication
token. Inside the `Connect-MyRESTService` function, you would need to update the hashtable open successful login to the
service.

For example, the following updates the values of the specified key values.

```powershell
if ($Session.Data.status -eq 'success') {
    $DynDnsSession.AuthToken = $Session.Data.data.token
    $DynDnsSession.ApiVersion = $Session.Data.data.version
    $DynDnsSession.StartTime = [System.DateTime]::Now
...
```

Once you do this, those new values are available any command within the function for this PowerShell session.

### Exposing Module Variables

> There’s no reason for the variable to be accessible from outside of the module and having it accessible in that manner
> can only lead to trouble. - Mike Robbins

While a significant point of using module variables is to avoid the global scope, there are times when some or all of the
module variables would need to be exposed to the current PowerShell session.

You would need to create a public module function to return the desired variables.

**Warning:** Unless you want users updating the values external to the module functions, your function that returns the
module variables should not return a referenced object. Please see [Kevin Marquette's blog post on hashtables](https://kevinmarquette.github.io/2016-11-06-powershell-hashtable-everything-you-wanted-to-know-about/#copying-hashtables){:target="_blank"}.
There is also a previous [PowerShell challenge on Reddit](https://www.reddit.com/r/PowerShell/comments/6rq03i/powershell_challenge_create_a_copy_of_a_hashtable/){:target="_blank"}
that goes deep into the rabbit hole on the topic of copying a hashtable.
{: .notice--warning}

```powershell
function Get-DynDnsSession {
    [CmdLetBinding()]
    param()

    $DynDnsSession | ConvertTo-Json | ConvertFrom-Json
}
```

I use the conversion to and from Json which returns a deserialized object. For my purpose, this is an adequate solution.

### Use Cases

As you can see from the example, any number of elements can be saved, updated, and accessible to any command within the
module. The number of elements are essentially limitless, however, I would suggest grouping the type of elements tracked
to individual module variables, i.e. keep session information in one variable and perhaps module usage data in another.

|Use Cases||
|---|---|
|**Authentication Tokens**|Authentication tokens are returned for some services, namely REST or SOAP APIs. You typically need to reference this token with each call to the service. This makes the auth token a great choice to store in a module variable.|
|**Who Am I**|You can store the user name associated with the session to verify later, should a permissions issue arises.|
|**Timers**|The service session start time, refresh time, and possibly elapsed time could be useful.|
|**Other Session Data**|Perhaps you want to track the a portion of the service session command history. You could do this using LastCommand, LastCommandTime, LastCommandResults, or other elements.|

## My PoShDynDnsApi Module Variable

Here is how I'm implementing a module variable.

In my module's .psm1, I create the module variable with several keys.

```powershell
$DynDnsSession = [ordered]@{
    ClientUrl           = 'https://api.dynect.net'
    User                = $null
    Customer            = $null
    ApiVersion          = $null
    AuthToken           = $null
    StartTime           = $null
    ElapsedTime         = $null
    LastCommand         = $null
    LastCommandTime     = $null
    LastCommandResults  = $null
    RefreshTime         = $null
}
```

**Update:** A few readers wondered why I was using `New-Variable` instead of simply using `$Script:DynDnsSession` or
`$DynDnsSession` when I create the hashtable. They produce the same behavior. I suppose I was wanting to make sure
it was scoped correctly, that it was overwritten with `-Force` switch, and that it was more __PowerShell-y__.
{: .notice--info}

When `Connect-DynDnsSession` successfully creates a session, I set the value for certain keys.

```powershell
$DynDnsSession.User = $User
$DynDnsSession.Customer = $Customer
if ($Session.Data.status -eq 'success') {
    $DynDnsSession.AuthToken = $Session.Data.data.token
    $DynDnsSession.ApiVersion = $Session.Data.data.version
    $DynDnsSession.StartTime = [System.DateTime]::Now
    $DynDnsSession.ElapsedTime = [System.Diagnostics.Stopwatch]::StartNew()
    Write-DynDnsOutput -DynDnsResponse $Session
}
```

When `Disconnect-DynDnsSession` is issued, I clear the values for those  keys.

```powershell
$DynDnsSession.AuthToken = $null
$DynDnsSession.User = $null
$DynDnsSession.Customer = $null
$DynDnsSession.StartTime = $null
$DynDnsSession.ElapsedTime = $null
$DynDnsSession.RefreshTime = $null
```

Also, since each function that connects to the REST service uses the an `Invoke-WebRequest` wrapper function -
`Invoke-DynDnsRequest`, I'm able to update the LastCommandTime and LastCommand keys.

```powershell
if ($Data.status -eq 'success') {
    $DynDnsSession.LastCommandTime = [System.DateTime]::Now
}

$MyCommand = Get-PSCallStack | Where-Object {$_.Command -notmatch 'DynDnsRequest|DynDnsOutput|ScriptBlock'} | Select-Object -First 1
$DynDnsSession.LastCommand = $MyCommand.Command
```

The LastCommandResults variable is updated within the `Write-DynDnsOutput` formatter function and contains the same data as
the Information stream is provided.

The `Send-DynDnsSession` command updates the RefreshTime key.

## Conclusion

I hope that you found this post enlightening or at least it has you thinking about the topic of module variables.

Please let me know if you have a better method of handling module variables or if you have any questions or comments.