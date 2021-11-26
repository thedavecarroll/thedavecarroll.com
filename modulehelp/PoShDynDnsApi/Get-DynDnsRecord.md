---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsRecord.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsRecord.html
schema: 2.0.0
search: false
---

# Get-DynDnsRecord

## SYNOPSIS
The command `Get-DynDnsRecord` retrieves one or all records of the specified type from a specified zone/node.

## SYNTAX

```
Get-DynDnsRecord [-Zone] <String> [[-RecordType] <String>] [[-Node] <String>] [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsRecord` retrieves one or all records of the specified type from a specified zone/node.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsRecord -Zone anovelidea.org -RecordType A


Address : 74.125.21.121
Zone    : anovelidea.org
Name    : anovelidea.org
Type    : A
TTL     : 3600
```

List all A records for the node `anovelidea.org`.

### Example 2
```powershell
PS C:\> Get-DynDnsRecord -Zone anovelidea.org -RecordType SOA


Administrator          : powershell.anovelidea.org.
SerialNumber           : 2018110400
PrimaryServer          : ns1.p01.dynect.net.
TimeToExpiration       : 604800
TimeToZoneFailureRetry : 600
TimeToZoneRefresh      : 3600
DefaultTTL             : 1800
Zone                   : anovelidea.org
Name                   : anovelidea.org
Type                   : SOA
TTL                    : 3600
```

List all NameServer (NS) records in the zone `anovelidea.org`.

## PARAMETERS

### -Zone
The zone in which to query for the specific record type.

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
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -RecordType
Specifies the record type for which to query.

The following record types are currently supported.

* A
* TXT
* CNAME
* MX
* SRV
* PTR
* SOA

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Accepted values: SOA, NS, MX, TXT, SRV, CNAME, PTR, A, All

Required: False
Position: 1
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

[Remove-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsRecord.html)

[Get A Records (API)](https://help.dyn.com/get-a-records-api/)

[Get PTR Records (API)](https://help.dyn.com/get-ptr-records-api/)

[Get CNAME Records (API)](https://help.dyn.com/get-cname-records-api/)

[Get SRV Records (API)](https://help.dyn.com/get-srv-records-api/)

[Get TXT Records (API)](https://help.dyn.com/get-txt-records-api/)

[Get MX Records (API)](https://help.dyn.com/get-mx-records-api/)

[Get NS Records (API)](https://help.dyn.com/get-ns-records-api/)

[Get SOA Records (API)](https://help.dyn.com/get-soa-records-api/)

[Get All Records (API)](https://help.dyn.com/get-all-records-api/)