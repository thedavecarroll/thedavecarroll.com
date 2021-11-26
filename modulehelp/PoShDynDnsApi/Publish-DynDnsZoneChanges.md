---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Publish-DynDnsZoneChanges.html
permalink: /modulehelp/PoShDynDnsApi/Publish-DynDnsZoneChanges.html
schema: 2.0.0
search: false
---

# Publish-DynDnsZoneChanges

## SYNOPSIS
The `Publish-DynDnsZoneChanges` command publishes pending zone changes.

## SYNTAX

```
Publish-DynDnsZoneChanges [-Zone] <String> [[-Notes] <String>] [-Force] [-WhatIf] [-Confirm]
 [<CommonParameters>]
```

## DESCRIPTION
The `Publish-DynDnsZoneChanges` command publishes pending zone changes, which includes completing the creation of new zones.

## EXAMPLES

### Example 1
```powershell
PS C:\> Publish-DynDnsZoneChanges -Zone anovelidea.org -Notes 'Add new record to zone.' -Force -Confirm:$false
WARNING: There are no pending zone changes.

Zone           SerialNumber SerialStyle Type
----           ------------ ----------- ----
anovelidea.org   2018091400 day         Primary
```

Publish the zone changes for the initial creation of a zone.

### Example 2
```powershell
PS C:\> Publish-DynDnsZoneChanges -Zone anovelidea.org -Notes 'Initial creation of zone.' -Force -Confirm:$false
WARNING: There are no pending zone changes.

Zone           SerialNumber SerialStyle Type
----           ------------ ----------- ----
anovelidea.org   2018091400 day         Primary
```

Publish the zone changes to the zone.

## PARAMETERS

### -Zone
Publish pending changes to the specified zone.

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

### -Notes
Record any notes for the publication of this zone version, such as a reference number or short text describing why the
changes occurred.

The text **REST-Api-PoSh** will be prepended before adding to the zone change record. If the `Notes` parameter is
omitted, the Notes field will only contain **REST-Api-PoSh**.

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

### -Force
By default, the command will not publish the zone if there are no pending zone changes.

In the case of adding a new zone, Dyn does not see it as a change to the zone. Using the `-Force` parameter will publish
the zone.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
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

### DynDnsZone

## NOTES

## RELATED LINKS

[Get-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZoneChanges.html)

[Undo-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Undo-DynDnsZoneChanges.html)

[Update Zone (API)](https://help.dyn.com/update-zone-api/)