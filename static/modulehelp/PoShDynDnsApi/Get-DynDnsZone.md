---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZone.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsZone.html
schema: 2.0.0
search: false
---

# Get-DynDnsZone

## SYNOPSIS
The command `Get-DynDnsZone` will return all zones associated with the customer, or the specified zone.

## SYNTAX

```
Get-DynDnsZone [[-Zone] <String>] [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsZone` will return all zones associated with the customer, or the specified zone.

## EXAMPLES

### Example
```powershell
PS C:\> Get-DynDnsZone

Zone           SerialNumber SerialStyle Type
----           ------------ ----------- ----
anovelidea.org   2018110400 day         Primary
```

List all zones associated with the customer.

## PARAMETERS

### -Zone
Specifies a zone for which to retrieve information. If this is omitted, all zones associated with the customer will be
returned.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### DynDnsZone[]

## NOTES

## RELATED LINKS

[Add-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsZone.html)

[Remove-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsZone.html)

[Get Zone(s) (API)](https://help.dyn.com/get-zones-api/)