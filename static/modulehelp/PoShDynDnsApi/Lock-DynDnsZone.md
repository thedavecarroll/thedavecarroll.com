---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Lock-DynDnsZone.html
permalink: /modulehelp/PoShDynDnsApi/Lock-DynDnsZone.html
schema: 2.0.0
search: false
---

# Lock-DynDnsZone

## SYNOPSIS
The `Lock-DynDnsZone` command prevents other users from making changes to the zone.

## SYNTAX

```
Lock-DynDnsZone [-Zone] <String> [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The `Lock-DynDnsZone` command prevents other users from making changes to the zone.

The Dyn term for locking a zone is freeze.

## EXAMPLES

### Example
```powershell
PS C:\> Lock-DynDnsZone -Zone anovelidea.org -Confirm:$false -Verbose
VERBOSE: Performing the operation "freeze zone" on target "anovelidea.org".
VERBOSE: API-3.7.11 : INFO : BLL : freeze: Your zone is now frozen
```

Lock the specified zone.

## PARAMETERS

### -Zone
The zone to lock, or freeze.

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
Shows what would happen if the command runs.
The command is not run.

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

### None

## NOTES

## RELATED LINKS

[Unlock-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Unlock-DynDnsZone.html)

[Update Zone (API)](https://help.dyn.com/update-zone-api/)

[Freeze / Unfreeze Zone (API)](https://help.dyn.com/freeze-unfreeze-zone-api/)