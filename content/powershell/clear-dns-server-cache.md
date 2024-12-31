---
title: "Clear DNS Server Cache"
description: "Clear the DNS server cache on all domain controllers."
published: 2018-08-21
tags: ["powershell", "dns", "dns cache"]
categories: ["PowerShell"]
---

How often have you needed to clear the DNS server cache?

Regardless how many domain controllers in your environment, a few simple lines of PowerShell can clear the cache on all of them.

First, we need to get the name of the domain. Of course, if you already know the name, you can simply use it.

```powershell
$DomainName = Get-ADDomain | Select-Object -ExpandProperty DnsRoot
```

Next, we find all name servers in the domain and show only the hostname.

```powershell
$DomainControllers = (Resolve-DnsName -Name $DomainName -Type NS).Where({ $_.Type -eq 'NS' }).NameHost
```

Lastly, we execute the clear command for each one.

```powershell
$DomainControllers.ForEach({ Clear-DnsServerCache -ComputerName $_ -Force })
```

Of course, there are a few shortcuts you can do to get this to a one-liner.

```powershell
(Resolve-DnsName -Name (Get-ADDomain | Select-Object -ExpandProperty DnsRoot -Type NS).Where({ $_.Type -eq 'NS' }).NameHost.ForEach({ Clear-DnsServerCache -ComputerName $_ -Force })
```

For more information, please see the following Microsoft docs:

* [Clear-DnsServerCache](https://docs.microsoft.com/en-us/powershell/module/dnsserver/clear-dnsservercache)

Have a great day!
