---
layout: single
title: "Introducing the PoShDynDnsApi Module"
excerpt: "PoShDynDnsApi is an unofficial PowerShell module used to interact with Dyn Managed DNS REST API."
date: 2019-01-07
comments: true
tags:
  - powershell
  - module
  - dns
  - dyn
  - rest api
  - dyndns managed service
  - dyn managed dns rest api
category:
  - powershell
---

![Connect-DynDnsSession]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnsconnect.png)
{: .full}

## Sometime in Early 2018

Manager: Hey, Dave. I need you to add all of our domains as Accepted Domains in Exchange Online.\\
Me: Okay. How many do we have?\\
Manager: Maybe 50?\\
Me \*finally gets access to Dyn and checks\*: We have over 170 in Dyn.\\
Manager: Yeah, all those.\\
Me: We will need to create a TXT record in Dyn Managed DNS to prove ownership of the domain in Azure first.\\
Manager: Do your thing.\\
Me \*sqeeeeee\*: Okay.

Narrator: And this is how Dave started tinkering with the Dyn Managed DNS REST API.

## Introducing the PoShDynDnsApi Module

The `PoShDynDnsApi` module, version 0.1.0, is now available in the [PowerShell Gallery][1]{:target="_blank"}.

PoShDynDnsApi is an unofficial PowerShell module used to interact with Dyn Managed DNS REST API.

**Notice:** I am not affiliated with Dyn and I am not paid to develop this module which began to simplify my day-to-day work. This module has become a learning tool for me to hone my PowerShell skills. I pay $7 monthly in order to have an account that allows me to have a single zone for testing the module.
{: .notice--primary}

### Commands

There are currently 28 commands available to the user.

To see complete examples and command syntax, please visit the [module help][2]{:target="_blank"} site.

#### Session

You can used the following commands to create, extend, test, or remove a session. Additionally, you can view the current session information or view the current session history.

* Connect-DynDnsSession
* Send-DynDnsSession
* Test-DynDnsSession
* Disconnect-DynDnsSession
* Get-DynDnsSession
* Get-DynDnsHistory

#### Zone

Use the following commands to create a zone by providing required parameters or by providing a zone file, and you can view the zone record. You can also remove a zone. You can view pending changes and publish them or discard them. And you can view the publish notes. Additionally, you can freeze or thaw the zone.

* Add-DynDnsZone
* Get-DynDnsZone
* Get-DynDnsZoneNotes
* Remove-DynDnsZone
* Get-DynDnsZoneChanges
* Publish-DynDnsZoneChanges
* Undo-DynDnsZoneChanges
* Lock-DynDnsZone
* Unlock-DynDnsZone

![Get-DynDnsZone]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnszone.png)

#### Record

Use the follow commands to view, add, update, or remove DNS records of the following types: A, TXT, CNAME, MX, SRV, or PTR. There is a command to create a new record object that can be used to add or update a record.

* Get-DynDnsRecord
* New-DynDnsRecord
* Add-DynDnsRecord
* Update-DynDnsRecord
* Remove-DynDnsRecord

![Get-DynDnsRecord]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnsrecord.png)

#### HttpRedirect

Use the following commands to view, create, or delete an HTTP redirect service.

* Get-DynDnsHttpRedirect
* Add-DynDnsHttpRedirect
* Remove-DynDnsHttpRedirect

#### Node

Use the following commands to list nodes and remove a node.

**Note: Add commands such as `Add-DynDnsRecord` and `Add-DynDnsHttpRedirect` will create the node prior to adding the record or service.**

* Get-DynDnsNodeList
* Remove-DynDnsNode

![Get-DynDnsNodeList]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnsnodelist.png)

#### Miscellaneous

These commands will allow you to view users, jobs, or tasks.

* Get-DynDnsUser
* Get-DynDnsTask
* Get-DynDnsJob

### More Information

Please check out the following links for more information on the Dyn Managed DNS REST API.

* [DNS API Quick-Start Guide][3]{:target="_blank"}
* [Understanding How The API Works][4]{:target="_blank"}
* [REST Resources][5]{:target="_blank"}
* [RESTful API Interface][6]{:target="_blank"}

![Disconnect-DynDnsSession]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnsdisconnect.png)

## My First REST API Interaction

I am a PowerShell developer (just now starting calling myself that) with a background in multiple scripting languages, identity management, and much of the Microsoft technology stack. I have connected to MS SQL, Oracle SQL, and mySQL databases with vbScript, PHP, and PowerShell. But, I had never connected to a REST API until I started working on proof of concepts for connecting to Dyn's API.

### PowerShell Lessons Learned

Over the course of the months I've spent developing this module, I have learned several lessons about writing better PowerShell scripts and modules.

#### Globally Scoped Module Variables

This should be avoided. Any variable declared at the module level (in the psm1 file) is scoped to the module.

#### Dot-sourcing Custom Class ps1 Files

The generally accepted way to have classes available to the module is to include them in the module's psm1 (most likely through a compile process).

#### Default Parameter Values from Read-Host

Using this essentially makes the parameter mandatory and may not be part of the `$PSBoundParameters`.

#### Cross Edition and Cross-Platform

The difference between Invoke-RestMethod and Invoke-WebRequest in Windows PowerShell and PowerShell Core posed significant roadblocks to make the module cross platform. I will blog about this process soon.

#### Plaster, PSake, and Pester

I have spent a lot of time working on my module scaffolding while writing the module. I have a good understanding of Plaster templates, have a PSake build script that at least gets me to a compiled module state, and have starting devising my logic for general unit and integration tests.

#### Provide a Solution Sooner than Later

In general, I'm a perfectionist. Everything has to be just right. This module has taken many months of coding to get it to this point, albeit not consistent coding. But I realized while talking with [Steven Maglio](http://stevenmaglio.blogspot.com/){:target="_blank"}, that I was going about it wrong. Actually, he told me it was wrong. DevOps is about quick iterations. Get something into the user's hands and update as you go along. That was the catalyst I needed to do a final, manual test (thankfully, as I had to fix a bug), then deploy to the PowerShell Gallery.

## Summary

I believe the PoShDynDnsApi module is a powerful and easy tool to manage your Dyn Managed DNS service. I hope you will, too.

If you discover issues, please submit a [bug report][7]{:target="_blank"} via GitHub.

If you would like a new feature or command that interacts with the Dyn Managed DNS REST API, please submit the [feature request][8]{:target="_blank"} via GitHub.

If you just want to comment on how much you like the module or this blog post, please leave it below.

PowerShell to the people!

[1]: http://bit.ly/PoShDynDnsApi
[2]: https://powershell.anovelidea.org/modulehelp/PoShDynDnsApi/
[3]: https://help.dyn.com/dns-api-guide/
[4]: https://help.dyn.com/understanding-works-api/
[5]: https://help.dyn.com/rest-resources/
[6]: https://help.dyn.com/rest/
[7]: https://github.com/thedavecarroll/PoShDynDnsApi/issues/new?labels=bug&template=bug_report.md&title=%5BBUG%5D
[8]: https://github.com/thedavecarroll/PoShDynDnsApi/issues/new?labels=enhancement&template=feature_request.md&title=%5BNew+Feature%5D
