---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsSession.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsSession.html
schema: 2.0.0
search: false
---

# Get-DynDnsSession

## SYNOPSIS
The command `Get-DynDnsSession` retrieves information about the current session.

## SYNTAX

```
Get-DynDnsSession [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsSession` retrieves information about the current session.

The output includes the start time (set when connected using `Connect-DynDnsSession`) and refresh time (set when refreshed
when using `Send-DynDnsSession`). The ElapsedTime property has a running `[System.Diagnostics.Stopwatch]` instance.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsSession


ClientUrl   : https://api.dynect.net
User        : ######
Customer    : ########
ApiVersion  : 3.7.11
AuthToken   : ******************************************************************=
StartTime   : 11/10/2018 10:33:51 PM
ElapsedTime : @{IsRunning=True; Elapsed=; ElapsedMilliseconds=3278473; ElapsedTicks=6377654595}
RefreshTime : 11/10/2018 11:28:29 PM
```

Retrieve information regarding the current session with the Dyn Managed DNS API.

## PARAMETERS

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### System.Object

## NOTES

## RELATED LINKS

[Connect-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html)

[Disconnect-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html)

[Send-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Send-DynDnsSession.html)