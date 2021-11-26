---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsTask.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsTask.html
schema: 2.0.0
search: false
---

# Get-DynDnsTask

## SYNOPSIS
The command `Get-DynDnsTask` retrieves a list of all current DNS API tasks or a single pending API task based on the task ID.

## SYNTAX

```
Get-DynDnsTask [[-TaskId] <Int32>] [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsTask` retrieves a list of all current DNS API tasks or a single pending API task based on the task ID.

Pending DNS API tasks can be cancelled before they are finished.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsTask


TaskId       : 273365607
Created      : 9/13/2018 8:49:24 PM
Modified     : 9/13/2018 8:49:26 PM
CustomerName : ########
Zone         : anovelidea.org
TaskName     : ProvisionZone
Status       : complete
Message      : serving zone
Blocking     : N
Steps        : 6
StepCount    : 6
Arugments    : {}
Debug        :

<truncated>

TaskId       : 273794012
Created      : 9/16/2018 1:29:27 PM
Modified     : 9/16/2018 1:29:28 PM
CustomerName : ########
Zone         : anovelidea.org
TaskName     : ImportZonefile
Status       : complete
Message      :
Blocking     : N
Steps        : 0
StepCount    : 0
Arugments    : {@{name=privileged; value=0}, @{name=name; value=anovelidea.org}}
Debug        :
```

List all tasks for the company.

### Example 2
```powershell
PS C:\> Get-DynDnsTask -TaskId 273786284


TaskId       : 273786284
Created      : 9/16/2018 12:21:35 PM
Modified     : 9/16/2018 12:21:37 PM
CustomerName : ########
Zone         : anovelidea.org
TaskName     : ShutdownZone
Status       : complete
Message      : zone shut down
Blocking     : N
Steps        : 0
StepCount    : 0
Arugments    : {}
Debug        :
```

List the specified task.

## PARAMETERS

### -TaskId
Retrieve a specific task.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
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

### DynDnsTask

## NOTES

## RELATED LINKS

[Get All DNS Tasks (API)](https://help.dyn.com/get-all-dns-tasks-api/)

[Get One DNS Task (API)](https://help.dyn.com/get-one-dns-task-api/)