---
layout: single
title: "Search an Active Directory-integrated DNS Zone by Partial Name"
excerpt: "This article shows how you can search an AD-Integrated DNS Zone using a name or a partial name using a wildcard."
header:
  overlay_image: /assets/images/search-ad-dns/template.png
  overlay_filter: 0.9
comments: true
tags:
  - dns
  - dns zone
  - active directory
  - search dns
  - search dns wildcard
  - ad-integrated dns
category:
  - powershell
---

![Image Text]({{ site.url }}{{ site.baseurl }}/assets/images/search-ad-dns/image.png)
{: .full}

## It's Always DNS

The phrases "It's DNS" or "it's always DNS" are often a call to arms for many DNS administrators to defend their domain, quite literally.
Sometimes uttered by a customer, a different team, or the even administrator's own, the phrases usually mean `dig`ging *(pun intended)* around DNS resource records and configuration settings.

This article takes a quick look at Active Directory-integrated DNS zones and provides a method that allows you to search for a DNS record by ***partial*** name.

## DNS Management

For the administrator of a Microsoft DNS server environment, there are several tools that you can use to.

### DNS Manager MMC

dnsmgt.msc

### DnsServer PowerShell Module

```console
-Name
Specifies a node name within the selected zone. If not specified, it defaults to the root (@) node.

TABLE 4
Type:	String
Position:	2
Default value:	None
Accept pipeline input:	True
Accept wildcard characters:	False
```

https://docs.microsoft.com/en-us/powershell/module/dnsserver/get-dnsserverresourcerecord?view=win10-ps

### DnsCmd

dnscmd

https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/dnscmd

### Active Directory Service Interfaces Editor (ADSIEdit)

Danger! Danger, Will Robinson!
{: .notice--danger}

## Active Directory-Integrated DNS Zones

Don't know if this works with zone scopes.


## SearchADDnsRecord

## Summary


[1]: http://powershellgallery.com