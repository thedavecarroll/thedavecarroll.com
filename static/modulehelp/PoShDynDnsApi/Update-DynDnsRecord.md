---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Update-DynDnsRecord.html
permalink: /modulehelp/PoShDynDnsApi/Update-DynDnsRecord.html
schema: 2.0.0
search: false
---

# Update-DynDnsRecord

## SYNOPSIS
The `Update-DynDnsRecord` command updates an existing DNS record in the specified zone.

## SYNTAX

```
Update-DynDnsRecord [-DynDnsRecord] <DynDnsRecord> [-UpdatedDynDnsRecord] <DynDnsRecord> [-WhatIf] [-Confirm]
 [<CommonParameters>]
```

## DESCRIPTION
The `Update-DynDnsRecord` command updates an existing DNS record in the specified zone.

Currently, the following DNS record types are supported:

* A
* TXT
* CNAME
* MX
* SRV
* PTR
* SOA (ResponsiblePerson)

## EXAMPLES

### Example 1
```powershell
PS C:\> $DynDnsRecord = Get-DynDnsRecord -Zone anovelidea.org -RecordType A -Node www2
PS C:\> $UpdatedDynDnsRecord = New-DynDnsRecord -IPv4Address 74.125.21.122
PS C:\> Update-DynDnsRecord -DynDnsRecord $DynDnsRecord -UpdatedDynDnsRecord $UpdatedDynDnsRecord -Confirm:$false


Address : 74.125.21.122
Zone    : anovelidea.org
Name    : www2.anovelidea.org
Type    : A
TTL     : 3600
```

Update the DNS A record for the hostname `www2.anovelidea.org`.

### Example 2
```powershell
PS C:\> $DynDnsRecord = Get-DynDnsRecord -Zone anovelidea.org -RecordType A -Node www2
PS C:\> $UpdatedDynDnsRecord = New-DynDnsRecord -IPv4Address 74.125.21.122
PS C:\> Update-DynDnsRecord -DynDnsRecord $DynDnsRecord -UpdatedDynDnsRecord $UpdatedDynDnsRecord -Confirm:$false -Verbose
VERBOSE: The original record type matches the updated record type.
VERBOSE:
--------------------------------------------------------------------------------
Original DNS Record:
Address : 74.125.21.121
Zone    : anovelidea.org
Name    : www2.anovelidea.org
Type    : A
TTL     : 3600

VERBOSE:
--------------------------------------------------------------------------------
Update DNS Record Attributes::
Attribute Original      Updated
--------- --------      -------
Address   74.125.21.121 74.125.21.122

--------------------------------------------------------------------------------
VERBOSE: Performing the operation "Update DNS A record" on target "www2.anovelidea.org".
VERBOSE: API-3.7.11 : INFO : BLL : update: Record updated


Address : 74.125.21.122
Zone    : anovelidea.org
Name    : www2.anovelidea.org
Type    : A
TTL     : 3600
```

Update the DNS A record for the hostname `www2.anovelidea.org`. Show the original record and the proposed changes.

## PARAMETERS

### -DynDnsRecord
A DNS record which has previously been published to the zone of any supported type: A, TXT, CNAME, MX, SRV, PTR, SOA.

The value should be created using the `Get-DynDnsRecord` command.

```yaml
Type: DynDnsRecord
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -UpdatedDynDnsRecord
A valid DNS record of the same type as provided by `-DynDnsRecord`.

The value should be created using the `New-DynDnsRecord` command.

```yaml
Type: DynDnsRecord
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
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

[Add-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsRecord.html)

[Get-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsRecord.html)

[Update an A Record (API)](https://help.dyn.com/update-a-record-api/)

[Update TXT Record (API)](https://help.dyn.com/update-txt-record-api/)

[Update CNAME Records (API)](https://help.dyn.com/update-cname-records-api/)

[Update MX Record (API)](https://help.dyn.com/update-mx-record-api/)

[Update SRV Records (API)](https://help.dyn.com/update-srv-records-api/)

[Update PTR Record (API)](https://help.dyn.com/update-ptr-record-api/)

[Update SOA Record (API)](https://help.dyn.com/update-soa-record-api/)