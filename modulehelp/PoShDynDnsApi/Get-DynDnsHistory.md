---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsHistory.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsHistory.html
schema: 2.0.0
search: false
---

# Get-DynDnsHistory

## SYNOPSIS
The command `Get-DynDnsHistory` shows the history of commands that are sent to the Dyn Managed DNS REST API.

## SYNTAX

### Default (Default)
```
Get-DynDnsHistory [-First <Int32>] [-Last <Int32>] [<CommonParameters>]
```

### SkipLast
```
Get-DynDnsHistory [-First <Int32>] [-Last <Int32>] [-SkipLast <Int32>] [<CommonParameters>]
```

### Skip
```
Get-DynDnsHistory [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsHistory` shows the history of commands that are sent to the Dyn Managed DNS REST API.

The following properties are included:

|Property|Description|
|-|-|
|Timestamp|When the command was executed
|Command|The name of the command
|Status|The result from the Dyn API
|JobId|The job id for this particular call to the Dyn API
|Method|The REST method for this call
|Body|The JSON body sent by the call
|Uri|The full URL used in the call
|StatusCode|The HTTP status code
|StatusDescription|A description of the status code
|ElapsedTime|The elapsed time for the command to return results from the Dyn API, in seconds.
|Arguments|The arguments used by the command. Note, the common parameters are omitted, as well as a few others.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsHistory

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Test-DynDnsSession
Status            : success
JobId             : 1888466029
Method            : GET
Body              :
Uri               : https://api.dynect.net/REST/Session/
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.505
Arguments         : {}

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Test-DynDnsSession
Status            : success
JobId             : 1888466048
Method            : GET
Body              :
Uri               : https://api.dynect.net/REST/Session/
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.466
Arguments         : {}

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Get-DynDnsZoneChanges
Status            : success
JobId             : 1888466071
Method            : Get
Body              :
Uri               : https://api.dynect.net/REST/ZoneChanges/anovelidea.org
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.461
Arguments         : {Zone}

Timestamp         : 7/4/2019 5:52:19 PM
Command           : Publish-DynDnsZoneChanges
Status            : success
JobId             : 1888466252
Method            : Put
Body              : {
                      "publish": true,
                      "notes": "REST-Api-PoSh: Test HTTP redirect deletion"
                    }
Uri               : https://api.dynect.net/REST/Zone/anovelidea.org
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.564
Arguments         : {Zone}

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Test-DynDnsSession
Status            : success
JobId             : 1888466029
Method            : GET
Body              :
Uri               : https://api.dynect.net/REST/Session/
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.505
Arguments         : {}

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Test-DynDnsSession
Status            : success
JobId             : 1888466048
Method            : GET
Body              :
Uri               : https://api.dynect.net/REST/Session/
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.466
Arguments         : {}

Timestamp         : 7/4/2019 5:52:15 PM
Command           : Get-DynDnsZoneChanges
Status            : success
JobId             : 1888466071
Method            : Get
Body              :
Uri               : https://api.dynect.net/REST/ZoneChanges/anovelidea.org
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.461
Arguments         : {Zone}

Timestamp         : 7/4/2019 5:52:19 PM
Command           : Publish-DynDnsZoneChanges
Status            : success
JobId             : 1888466252
Method            : Put
Body              : {
                      "publish": true,
                      "notes": "REST-Api-PoSh: Test HTTP redirect deletion"
                    }
Uri               : https://api.dynect.net/REST/Zone/anovelidea.org
StatusCode        : OK
StatusDescription : OK
ElapsedTime       : 0.564
Arguments         : {Zone}
```

List all the commands sent to the Dyn Managed DNS REST API.

## PARAMETERS

### -First
Gets only the first 'n' command results.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Last
Gets only the last 'n' command results.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Skip
Ignores the first 'n' command results and then gets the remaining results.

```yaml
Type: Int32
Parameter Sets: Skip
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -SkipLast
Ignores the last 'n' command results.

```yaml
Type: Int32
Parameter Sets: SkipLast
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

### None

## OUTPUTS

### DynDnsHistory

## NOTES

## RELATED LINKS
