---
layout: single
title: "Unique Email Domains"
excerpt: "Get unique email domains from proxyAddresses for Exchange or Azure."
date: 2018-08-17
comments: true
tags:
  - powershell
  - exchange
  - azure
category:
  - powershell
---

So you're working on getting all of your email domains that's on-prem into Azure or you simply want to ensure that your
on-prem Exchange has been configured for all the domains your user accounts utilize. Your Active Directory domain
contains over 30,000 accounts. How would you go about discovering the unique email domains?

Knowing that the Active Directory attribute proxyAddresses contains the account's SMTP addresses, we can start there.
Also, you only want to include only those domains for active accounts. [Note: The proxyAddresses also contains other
address types, but we are only concerned about SMTP for this exercise.]

First, let's get all the proxyAddresses into a variable.

```powershell
$Filter = "proxyAddresses -like '*' -and enabled -eq 'true'"
$ProxyAddresses = Get-ADUser -Filter $Filter -Properties proxyAddresses | Select-Object -ExpandProperty proxyAddresses
```

Next, we will loop through each one, matching on only SMTP addresses. We split on the @ symbol and return the domain
portion.

```powershell
$EmailDomains = $ProxyAddresses.ForEach( {
    if ($_ -match 'smtp') {
        $_.Replace('smtp:','').Split('@')[1]
    }
})
```

**Notice:** I used the ForEach() method (available in PowerShell v4 and later), which is typically faster than the
ForEach-Object cmdlet or the foreach loop. You can use whichever you choose based on your PowerShell version.
{: .notice--primary}

Finally, we use Sort-Object -Unique to get the unique domains.

```powershell
$EmailDomains | Sort-Object -Unique

anovelidea.org
chronicgoogler.com
gmail.com
```

Of course, you could have dozens or more unique domains. This short exercise can also reveal typos in domains.

Hopefully, this post was helpful to you in some way.

Have a great day!