---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsJob.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsJob.html
schema: 2.0.0
search: false
---

# Get-DynDnsJob

## SYNOPSIS
The command `Get-DynDnsJob` retrieves the result from a previous job.

## SYNTAX

```
Get-DynDnsJob [-JobId] <String> [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsJob` retrieves the result from a previous job.

The JobId is in the command history which can be retrieved with the command `Get-DynDnsHistory`. It is also included in
the Information stream which can be accessed, at time of command execution, via `-InformationAction Continue` and
`-InformationVariable CommandInfo`.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsJob -JobId 836040075


User         : ######
Status       : active
CustomerName : ##########
Nickname     : owner
FirstName    : Dave
LastName     : Carroll
Email        : powershell@anovelidea.org
Phone        : 8053642175
Groups       : {Default}
```

The job with id `836040075` contained the results for a `Get-DynDnsUser` command.

## PARAMETERS

### -JobId
The JobId which corresponds to a previous API call.

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

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### DynDnsRawData

## NOTES

## RELATED LINKS

[Get-DynDnsHistory](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHistory.html)

[Get Job (API)](https://help.dyn.com/get-job/)