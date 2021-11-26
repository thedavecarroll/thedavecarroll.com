---
layout: single
title: "Responding to an Issue Submitted for the PoShDynDnsApi Module"
excerpt: "The curtains are pulled back in this look behind-the-scenes where I respond to the first public-submitted issue for PoShDynDnsApi."
date: 2020-08-17
header:
  overlay_image: /assets/images/dyndnsrecord_bad.png
  overlay_filter: 0.9
comments: true
share: true
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

![Get-DynDnsRecord Issue]({{ site.url }}{{ site.baseurl }}/assets/images/dyndnsrecord_issue.png)
{: .full}

## The PoShDynDnsApi Module

I published the PoShDynDnsApi module to the PowerShell Gallery in January of 2019 though it feels more like 5 years than the actual 18 months or so.

Since it was published, I've written two articles about it — one announcing it and another providing a deep dive into the inner workings.
The module has been downloaded from the gallery just over 350 times.
Even with my testing and downloading, there are potentially over 340 people using it.
That's not a lot, but the main point is that it could be helping people manage their domains in *(or perhaps migrate from)* the Dyn Managed DNS service.

[Oracle made an announcement][OracleSunset] for the sunset of Dyn Managed DNS on May 31, 2022.
\\
\\
Based on this, no new features will be added to this module and I have recently updated the repo's README to reflect this.
{: .notice--warning}

I tracked the changes that I wanted to make to the module as GitHub issues and I had worked through all of the bugfix type issues.
After I decided to not add any new features, I closed the last few that targeted new functionality.

[OracleSunset]: https://www.oracle.com/corporate/acquisitions/dyn/technologies/enterprise-customer-faq.html

## First Public Issue

When I received a new GitHub issue email alert just over a week ago, excitement and nervousness overcame me.
It was the [first issue][issue11] submitted by someone in the community using any of my modules.

I followed the link and started reading it.
They had used my **bug** issue template and responded to all of its directives.
There was enough information that I could verify the behavior of the existing code.

[issue11]: https://github.com/thedavecarroll/PoShDynDnsApi/issues/11

## First Response

My first response came a few hours later after I spent time on reproducing the behavior described in the issue.

### The Issue

The command `Get-DynDnsRecord` would not return specific record types.

Reviewing the issue message, I could see that the `Node` parameter was not used.
This was key in determining the root cause.

### Investigation

`Get-DynDnsRecord` prepends the `Node` input to the `Zone` input, and if it is not provided, defaults to using the `Zone` as the `Node`.
The URI is built using: `"/REST/$($RecordType)Record/$Zone/$Fqdn/"`.

With the default `RecordType` of **All**, it uses URI `/REST/AllRecord/<zone>` or `/REST/AllRecord/<zone>/<node>` which "[r]etrieves a list of all record resources for the specified node and zone combination **as well as all records from any object below that point on the zone hierarchy**".
The bold text is the key difference between any other RecordType URI.

If you want to know more, here is the [Get All Records (API)][DynRESTAPI] documentation page.
{: .notice--info}

[DynRESTAPI]: https://help.dyn.com/get-all-records-api/

### Options

I wasn't sure of how the user was needing to use the records he was attempting to retrieve.

In my response, I provided the user with three options:

+ `Get-DynDnsRecord -RecordType All` and `Where-Object`
+ `Get-DynDnsNodeList` and `ForEach-Object`
+ `Get-DynDnsRecord -RecordType All` and `Group-Object`

The first one simply called `Get-DynDnsRecord -RecordType All` and used `Where-Object` to filter by the record type needed.
The second one used `Get-DynDnsNodeList` which would retrieve all the nodes for the zone, essentially the node tree, and
then inside a `ForEach-Object` loop, the `Get-DynDnsRecord` would be called with the `-Node` dynamically provided.
The last one called `Get-DynDnsRecord -RecordType All` and then used `Group-Object` to group the results by the record type.

### Additional Information

I provided the user with additional information on the record classes, specifically the hidden properties that are included.
I explained that `Get-DynDnsHistory` would have all of the API calls URI's included.
And I explained *(though perhaps not very clearly, as I reread my response)* that `Get-DynDnsRecord` first call retrieves a list of object URIs.
Then, the list is iterated through and the individual record is returned.

I also suggested that using [Insomnia Core][InsomniaCore] could help with understanding the calls.

[InsomniaCore]: https://insomnia.rest/download/core/?

### First Feedback

The user replied a couple of days after and said that option one would be sufficient.

Great news!

I responded the second time before he could provide this feedback.
{: .notice--info}

## Second Response

Feeling awesome that I resolved the user's issue, I bragged about it to a friend, [Steven Maglio](http://stevenmaglio.blogspot.com/){:target="_blank"}.
He happens to be an incredibly intelligent and amazing developer.
I value his opinion on most things, even more so if they fall in the realm of software development and lifecycle support.

My first response was very adequate.
But I missed the point.

The user expected one behavior and I had provided another by programming `Get-DynDnsRecord` to "match" the API.
{: .notice--danger}

The command, `Get-DynDnsRecord`, actually interacts with 9 different API endpoints, one for each `RecordType` including **All**.

Example:

```text
/REST/CNAMERecord/<zone>/<node>
/REST/AllRecord/<zone>/<node>
/REST/MXRecord/<zone>/<node>
/REST/SOARecord/<zone>/<node>
```

The second section of the URI specifies which record type to find and return.
Originally, if the `Node` parameter was not provided, I would use the provided `Zone` as the `Node`.
In the API, the node is the fully qualified domain name (FQDN) and must be in the zone hierarchy.

This works for record types that can exist at the root of the zone, such as SOA, NS, MX, A, and most others.
However, DNS by design, `CNAME` cannot exist at the root of a domain.

Well, this works, mostly.
The `AllRecord` endpoint has different behavior than the other `<type>Record` endpoints.
It will return all records *recursively* starting with the node provided or, more specifically, the FQDN provided.

The other `<type>Record` endpoints will only return records of the type from the node/FQDN provided.

I then began updating the `Get-DynDnsRecord` code to provide the expected behavior.

+ If Node is not provided:
  + Return all records in the entire zone tree filtered by RecordType.
+ If Node is provided:
  + Return records contained in the node filtered by RecordType.

I made the changes, published the module, and replied to the user.

### Second Feedback

The user updated their module to the latest version and is pleased with the new behavior.

Still great news!

## Haste Makes Waste

In my haste to publish an updated version to the gallery, I made a huge mistake.

HUGE mistake!
{: .notice--warning}

Here is the original code:

```powershell
if ($Node) {
    if ($Node -match $Zone ) {
        $Fqdn = $Node
    } else {
        $Fqdn = $Node + '.' + $Zone
    }
} else {
    $Fqdn = $Zone
}
$Records = Invoke-DynDnsRequest -UriPath "/REST/$($RecordType)Record/$Zone/$Fqdn/"
```

Here is my first attempt to fix the code:

```powershell
if ($Node) {
    if ($Node -match $Zone ) {
        $UriPath = '/REST/{0}/{1}/{1}' -f $RecordType,$Zone
    } else {
        $UriPath = '/REST/{0}/{1}/{2}.{1}' -f $RecordType,$Zone,$Node
    }
} else {
    'No node provided. {0} record types for zone tree will be returned.' -f $RecordType | Write-Verbose
    $UriPath = '/REST/AllRecord/{0}' -f $Zone
}
$Records = Invoke-DynDnsRequest -UriPath $UriPath
```

As you can see, I completely missed including the *Record* text as part of the second URI section.

I wish I could say that I caught this before I pushed the release to GitHub or even the PowerShell Gallery.
Alas, I did not.

*If only there was some way to test my code changes before pushing to GitHub or PSGallery.*

I have been lazy with my modules and have not included adequate [Pester][Pester] tests.
For much of my PowerShell history, I have done the same hacky thing that most systems administrators have done — write a function, manually test a function.
Just recently I've begun using Visual Studio Code's debugging, so at least there's that.

When I updated the code to `Get-DynDnsRecord`, I guess I only tested the 'no node provided' path.
After I published to PS Gallery, I updated the module from there to ensure everything worked as expected.

I tested `Get-DynDnsRecord` using the `Node` parameter and received a warning (actually, an API error).

```powershell
Get-DynDnsRecord -Zone anovelidea.org -Node www3
```

``` text
WARNING: API-3.7.16 : ERROR : API-A : INVALID_REQUEST : Unknown resource All (Requested URI: /REST/All/anovelidea.org/www3.anovelidea.org)
```

The requested URI was missing the rest of the text.
Instead of `All`, it should have been `AllRecord`.

After dealing with the sinking feeling in the pit of my stomach, I fixed the code and tested *(manually)* again.
I tested several paths and felt confident that I had fixed the problem I had created and that the function's behavior matched the new design.

In case you haven't published any modules (or scripts) to the PowerShell Gallery, know that you cannot overwrite an existing version.
{: .notice--info}

I bumped the version and pushed the commits to GitHub.
Then, I removed the GitHub release artifacts for the *bad* release tag and created a new release for the updated version.
Next, I published the new version to the PowerShell Gallery and unlisted the *bad* version.

**Unlisting Module in PowerShell Gallery**
\\
Since a module could be a dependency for other modules or scripts, Microsoft **does not** allow you to delete a version module.
They do provide a way to *unlist* a particular version of the module.
People can still download it if they specify the version, but a search will not include the unlisted version.
You can *unlist* a script, similarly.
{: .notice--warning}

With the new *(working)* version in GitHub and PowerShell Gallery, I was able to breathe a sigh of relief.
It was a learning experience.

[Pester]: https://pester.dev/

## Summary

Though not significantly focused on PowerShell, I wanted this article to show you how I responded to an issue discovered in one of the commands of the PoShDynDnsApi module.
It was not an issue with the usage of the command, rather, it was an issue of how I designed and initially wrote the command.

Then, in my hastiness to fix the design issue, I thoroughly botched the implementation.
I frantically corrected the botched code and published an updated version.
This left a *bad* version in the PowerShell Gallery that, luckily, I was able to unlist.

### Lessons Learned

1. Consider having others provide input on the initial design of a module.
2. Provide Pester tests with as much code coverage as possible.
3. Test code updates manually, especially when not covered by any Pester tests.
4. People do find and use your code, so provide the best code to them.

If you have any general questions on PowerShell, feel free to leave them in the comments or ask me on [Twitter][thedavecarroll].

Thank you for reading!

[thedavecarroll]: https://twitter.com/thedavecarroll
