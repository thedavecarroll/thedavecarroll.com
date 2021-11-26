---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsRecord.html
permalink: /modulehelp/PoShDynDnsApi/Add-DynDnsRecord.html
schema: 2.0.0
search: false
---

# Add-DynDnsRecord

## SYNOPSIS
Creates a new DNS record of the specified type at the indicated zone/node level.

## SYNTAX

```
Add-DynDnsRecord [-Zone] <String> [[-Node] <String>] [-DynDnsRecord] <DynDnsRecord> [-WhatIf] [-Confirm]
 [<CommonParameters>]
```

## DESCRIPTION
Creates a new DNS record of the specified type at the indicated zone/node level.

Currently, adding the following DNS record types are supported:

* A
* TXT
* CNAME
* MX
* SRV
* PTR

## EXAMPLES

### Example 1
```powershell
PS C:\> Add-DynDnsRecord -Zone anovelidea.org -Node www -DynDnsRecord (New-DynDnsRecord -IPv4Address 74.125..21.121)

Confirm
Are you sure you want to perform this action?
Performing the operation "Adding DNS record" on target "A - www.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y

Address : 74.125.21.121
Zone    : anovelidea.org
Name    : www.anovelidea.org
Type    : A
TTL     : 3600
```

Add an A record for the hostname `www.anovelidea.org`.

### Example 2
```powershell
PS C:\> Add-DynDnsRecord -Zone anovelidea.org -DynDnsRecord (New-DynDnsRecord -Text "testing" )

Confirm
Are you sure you want to perform this action?
Performing the operation "Adding DNS record" on target "TXT - anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y


Strings : {testing}
Zone    : anovelidea.org
Name    : anovelidea.org
Type    : TXT
TTL     : 3600
```

Add a TXT record to the root of the zone `anovelidea.org`.

### Example 3
```powershell
PS C:\> Add-DynDnsRecord -Zone anovelidea.org -Node www3 -DynDnsRecord (New-DynDnsRecord -IPv4Address 74.125.21.121)

Confirm
Are you sure you want to perform this action?
Performing the operation "Adding DNS record" on target "A - www3.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y
WARNING: API-3.7.11 : ERROR : DYN : TARGET_EXISTS : make: Cannot duplicate existing record data
```

Demonstrates an attempt to add an a record that currently exists.

## PARAMETERS

### -Zone
The zone in which to create the DNS record.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Node
A node in the specified zone. If the node does not end with the domain of the zone, it will be appended.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -DynDnsRecord
A DynDnsRecord object.

```yaml
Type: DynDnsRecord
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Confirm
Prompts you for confirmation before running the command.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases: cf

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -WhatIf
Shows what would happen if the command runs. The command is not run.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases: wi

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```



### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### DynDnsRecord

## NOTES

## RELATED LINKS

[Get-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsRecord.html)

[Update-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Update-DynDnsRecord.html)

[Remove-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsRecord.html)

[Create an A Record (API)](https://help.dyn.com/create-a-record-api/)

[Create CNAME Records (API)](https://help.dyn.com/create-cname-records-api/)

[Create MX Record (API)](https://help.dyn.com/create-mx-record-api/)

[Create PTR Record (API)](https://help.dyn.com/create-ptr-record-api/)

[Create SRV Record (API)](https://help.dyn.com/create-srv-record-api/)

[Create TXT Record (API)](https://help.dyn.com/create-txt-record-api/)