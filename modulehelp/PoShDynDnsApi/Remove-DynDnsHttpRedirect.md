---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsHttpRedirect.html
permalink: /modulehelp/PoShDynDnsApi/Remove-DynDnsHttpRedirect.html
schema: 2.0.0
search: false
---

# Remove-DynDnsHttpRedirect

## SYNOPSIS
The command `Remove-DynDnsHttpRedirect` deletes one or more existing HTTP Redirect services from the zone/node indicated.

## SYNTAX

```
Remove-DynDnsHttpRedirect [-DynDnsHttpRedirect] <DynDnsHttpRedirect[]> [-PublishWait] [-WhatIf] [-Confirm]
 [<CommonParameters>]
```

## DESCRIPTION
The command `Remove-DynDnsHttpRedirect` deletes one or more existing HTTP Redirect services from the zone/node indicated.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsHttpRedirect -Zone anovelidea.org | Remove-DynDnsHttpRedirect
WARNING: This will autopublish the HTTP redirect deletion to the zone.


Zone         : anovelidea.org
Name         : myredirect.anovelidea.org
Url          : http://www.anovelidea.org
ResponseCode : 301
IncludeUri   : True


Confirm
Are you sure you want to perform this action?
Performing the operation "Delete HTTP redirect" on target "http://www.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y
```

Retrieve all HTTP redirects and delete the ones indicated.

## PARAMETERS

### -DynDnsHttpRedirect
One or more `DynDnsHttpRedirect` objects obtained from the command `Get-DynDnsHttpRedirect`.

```yaml
Type: DynDnsHttpRedirect[]
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: True (ByValue)
Accept wildcard characters: False
```

### -PublishWait
Indicates to wait to publish the deletion of the redirect service until the next zone change.

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

### DynDnsHttpRedirect[]

## OUTPUTS

### None

## NOTES

## RELATED LINKS

[Get-DynDnsHttpRedirect](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHttpRedirect.html)

[Get HTTP Redirect (API)](https://help.dyn.com/get-http-redirect-api/)

[Delete HTTP Redirect (API)](https://help.dyn.com/delete-http-redirect-api/)