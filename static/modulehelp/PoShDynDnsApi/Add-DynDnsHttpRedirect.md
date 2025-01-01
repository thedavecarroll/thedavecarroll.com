---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsHttpRedirect.html
permalink: /modulehelp/PoShDynDnsApi/Add-DynDnsHttpRedirect.html
schema: 2.0.0
search: false
---

# Add-DynDnsHttpRedirect

## SYNOPSIS
The command `Add-DynDnsHttpRedirect` creates a new HTTP Redirect service on the zone/node indicated.

## SYNTAX

```
Add-DynDnsHttpRedirect [-Zone] <String> [[-Node] <String>] [-Url] <String> [[-ResponseCode] <String>]
 [-IncludeUri] [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The command `Add-DynDnsHttpRedirect` creates a new HTTP Redirect service on the zone/node indicated.

**Note:** Creating a new HTTP redirect will automatically publish the change to the zone.

## EXAMPLES

### Example
```powershell
PS C:\> Add-DynDnsHttpRedirect -Zone anovelidea.org -Node newtest -Url https://www.anovelidea.org -ResponseCode 301 -IncludeUri
WARNING: This will autopublish the HTTP redirect to the zone.

Confirm
Are you sure you want to perform this action?
Performing the operation "Create HTTP redirect to https://www.anovelidea.org" on target "newtest.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y


Zone         : anovelidea.org
Name         : newtest.anovelidea.org
Url          : https://www.anovelidea.org
ResponseCode : 301
IncludeUri   : True
```

Create a new HTTP redirect service to permanently redirect newtest.anovelidea.org to https://www.anovelidea.org.

## PARAMETERS

### -Zone
The zone in which to create the HTTP Redirect service.

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

### -IncludeUri
Sets the flag indicating whether the redirection should include the originally requested URI.

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

### -Url
The target URL where the client is sent. Must begin with either `http://` or `https://`.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -ResponseCode
The HTTP response code to return for redirection.

301 - Permanent redirect

302 - Temporary redirect

```yaml
Type: String
Parameter Sets: (All)
Aliases:
Accepted values: 301, 302

Required: False
Position: 3
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

### DynDnsHttpRedirect

## NOTES

## RELATED LINKS

[Get-DynDnsHttpRedirect](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHttpRedirect.html)

[Remove-DynDnsHttpRedirect](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsHttpRedirect.html)

[Create HTTP Redirect (API)](https://help.dyn.com/create-http-redirect-api/)