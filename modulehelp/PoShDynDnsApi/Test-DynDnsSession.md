---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Test-DynDnsSession.html
permalink: /modulehelp/PoShDynDnsApi/Test-DynDnsSession.html
schema: 2.0.0
search: false
---

# Test-DynDnsSession

## SYNOPSIS
The `Test-DynDnsSession` command verifies that a session is still active with the Dyn Managed DNS REST API.

## SYNTAX

```
Test-DynDnsSession [<CommonParameters>]
```

## DESCRIPTION
The `Test-DynDnsSession` command verifies that a session is still active with the Dyn Managed DNS REST API.

If there is no authentication token session variable, this will return `False`.

## EXAMPLES

### Example
```powershell
PS C:\>  Test-DynDnsSession
True
```

Verify if there is an active, valid session.

## PARAMETERS

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### System.Boolean

## NOTES

## RELATED LINKS

[Connect-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Connect-DynDnsSession.html)

[Disconnect-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html)

[Send-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Send-DynDnsSession.html)

[Get-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsSession.html)

[Session Active (API)](https://help.dyn.com/session-active/)