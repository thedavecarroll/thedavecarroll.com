---
classes: wide
external help file: PoShEvents-help.xml
layout: onlinehelp
Module Name: poshevents
online version: https://thedavecarroll.com/modulehelp/PoShEvents/Get-GPOProcessingEvent.html
permalink: /modulehelp/PoShEvents/Get-GPOProcessingEvent.html
schema: 2.0.0
search: false
---

# Get-GPOProcessingEvent

## SYNOPSIS
Queries the specific computer or group of computers for group policy processing events.

## SYNTAX

```
Get-GPOProcessingEvent [[-ComputerName] <String[]>] [[-Credential] <PSCredential>] [[-StartTime] <DateTime>]
 [[-EndTime] <DateTime>] [[-MaxEvents] <Int64>] [-Oldest] [-Raw] [-GroupPolicy <Object[]>] [<CommonParameters>]
```

## DESCRIPTION
Queries the specific computer or group of computers for group policy processing events.

## EXAMPLES

### Example 1
```
PS C:\> Get-GPOProcessingEvent -MaxEvents 10 | Out-GridView
```

This command will show the last 10 group policy processing events on the local system in gridview.
You can then sort or enter additional criteria in the gridview.

## PARAMETERS

### -ComputerName
Gets events from the event logs on the specified computer(s).
Type the NetBIOS name, an Internet Protocol (IP) address, or the fully qualified domain name of the computer.
The default value is the local computer.

```yaml
Type: String[]
Parameter Sets: (All)
Aliases: IPAddress, __Server, CN

Required: False
Position: 0
Default value: None
Accept pipeline input: True (ByPropertyName, ByValue)
Accept wildcard characters: False
```

### -Credential
Specifies a user account that has permission to perform this action.
The default value is the current user.

Type a user name, such as User01 or Domain01\User01.
Or, enter a PSCredential object, such as one generated by the Get-Credential cmdlet.
If you type a user name, you will be prompted for a password.
If you type only the parameter name, you will be prompted for both a user name and a password.

```yaml
Type: PSCredential
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -EndTime
Specifies the end of the time period for the event log query.

```yaml
Type: DateTime
Parameter Sets: (All)
Aliases:

Required: False
Position: 3
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -MaxEvents
Specifies the maximum number of events this function returns.
Enter an integer.
The default is to return all the events in the logs.

```yaml
Type: Int64
Parameter Sets: (All)
Aliases:

Required: False
Position: 4
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Oldest
Returns the events in oldest-first order.
By default, events are returned in newest-first order.

```yaml
Type: SwitchParameter
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: False
Accept pipeline input: False
Accept wildcard characters: False
```

### -StartTime
Specifies the beginning of the time period for the event log query.

```yaml
Type: DateTime
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -GroupPolicy
Provide the function all group policy objects in order to have the friendly name presented in the event output.

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Raw
Use this switch to provide the raw event log record for the function.

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

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### System.String[]

## OUTPUTS

### System.Object

## NOTES

## RELATED LINKS
