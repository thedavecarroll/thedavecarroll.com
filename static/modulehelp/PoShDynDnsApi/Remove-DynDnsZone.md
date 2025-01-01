---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsZone.html
permalink: /modulehelp/PoShDynDnsApi/Remove-DynDnsZone.html
schema: 2.0.0
search: false
---

# Remove-DynDnsZone

## SYNOPSIS
The `Remove-DynDnsZone` command immediately deletes the primary DNS zone from the customer's Dyn DNS Managed account.

## SYNTAX

```
Remove-DynDnsZone [-Zone] <String> [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The `Remove-DynDnsZone` command immediately deletes the primary DNS zone from the customer's Dyn DNS Managed account.

## EXAMPLES

### Example 1
```powershell
PS C:\> Remove-DynDnsZone -Zone anovelidea.org

Confirm
Are you sure you want to perform this action?
Performing the operation "Delete DNS zone and all its records" on target "anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y
```

Delete the zone.

## PARAMETERS

### -Zone
The name of the zone to delete.

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

[Get-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZone.html)

[Add-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsZone.html)

[Delete One Zone (API)](https://help.dyn.com/delete-one-zone-api/)