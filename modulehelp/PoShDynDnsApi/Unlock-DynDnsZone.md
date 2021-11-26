---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Unlock-DynDnsZone.html
permalink: /modulehelp/PoShDynDnsApi/Unlock-DynDnsZone.html
schema: 2.0.0
search: false
---

# Unlock-DynDnsZone

## SYNOPSIS
The `Unlock-DynDnsZone` command removes the restriction that prevents other users from making changes to the zone.

## SYNTAX

```
Unlock-DynDnsZone [-Zone] <String> [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The `Unlock-DynDnsZone` command removes the restriction that prevents other users from making changes to the zone.

The Dyn term for unlocking a zone is thaw.

## EXAMPLES

### Example
```powershell
PS C:\>  Unlock-DynDnsZone -Zone anovelidea.org -Confirm:$false -Verbose
VERBOSE: Performing the operation "thaw zone" on target "anovelidea.org".
VERBOSE: API-3.7.11 : INFO : BLL : thaw: Your zone is now thawed, you may edit normally
```

Unlock the specified zone.

## PARAMETERS

### -Zone
The zone to unlock, or thaw.

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

### None

## NOTES

## RELATED LINKS

[Lock-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Lock-DynDnsZone.html)

[Update Zone (API)](https://help.dyn.com/update-zone-api/)

[Freeze / Unfreeze Zone (API)](https://help.dyn.com/freeze-unfreeze-zone-api/)