---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html
permalink: /modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html
schema: 2.0.0
search: false
---

# Disconnect-DynDnsSession

## SYNOPSIS
The `Disconnect-DynDnsSession` command terminates an existing, valid session with the Dyn Managed DNS REST API.

## SYNTAX

```
Disconnect-DynDnsSession [<CommonParameters>]
```

## DESCRIPTION
The `Disconnect-DynDnsSession` command terminates an existing, valid session with the Dyn Managed DNS REST API.

The command issues a session logout and removes the authentication token, user, and customer module variables.

## EXAMPLES

### Example
```powershell
PS C:\> Disconnect-DynDnsSession
```

Terminates an existing session.

## PARAMETERS

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### None

## NOTES

## RELATED LINKS

[Connect-DynDnsSession.](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Connect-DynDnsSession.html)

[Send-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Send-DynDnsSession.html)

[Test-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Test-DynDnsSession.html)

[Session Log-out (API)](https://help.dyn.com/session-log-out/)