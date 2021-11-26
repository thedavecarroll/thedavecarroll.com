---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHttpRedirect.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsHttpRedirect.html
schema: 2.0.0
search: false
---

# Get-DynDnsHttpRedirect

## SYNOPSIS
Retrieves one or all HTTP Redirect services on the zone/node indicated.

## SYNTAX

```
Get-DynDnsHttpRedirect [-Zone] <String> [[-Node] <String>] [<CommonParameters>]
```

## DESCRIPTION
Retrieves one or all HTTP Redirect services on the zone/node indicated.

## EXAMPLES

### Example
```powershell
PS C:\> Get-DynDnsHttpRedirect -Zone anovelidea.org -Node redirect


Zone         : anovelidea.org
Name         : redirect.anovelidea.org
Url          : https://www.anovelidea.org
ResponseCode : 301
IncludeUri   : True
```

Retrieve HTTP redirect service for node `redirect.anovelidea.org`.

## PARAMETERS

### -Zone
The zone in which to create the HTTP redirect service.

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

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### DynDnsHttpRedirect

## NOTES

## RELATED LINKS

[Get-DynDnsHttpRedirect](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHttpRedirect.html)

[Add-DynDnsHttpRedirect](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsHttpRedirect.html)

[Create HTTP Redirect (API)](https://help.dyn.com/create-http-redirect-api/)