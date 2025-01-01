---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZoneNotes.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsZoneNotes.html
schema: 2.0.0
search: false
---

# Get-DynDnsZoneNotes

## SYNOPSIS
The `Get-DynDnsZoneNotes` command generates a report containing the Zone Notes for the specified zone.

## SYNTAX

```
Get-DynDnsZoneNotes [-Zone] <String> [[-Limit] <Int32>] [[-Offset] <Int32>] [<CommonParameters>]
```

## DESCRIPTION
The `Get-DynDnsZoneNotes` command generates a report containing the Zone Notes for the specified zone.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsZoneNotes -Zone anovelidea.org

Zone         : anovelidea.org
Timestamp    : 9/16/2018 9:37:12 PM
Type         : publish
User         : ######
SerialNumber : 2018091701
Note         : anovelidea.org
                add A 74.125.21.121
               Test publish from web UI

<truncated>

Zone         : anovelidea.org
Timestamp    : 9/16/2018 2:43:11 PM
Type         : task
User         : ######
SerialNumber : 0
Note         : Results of ImportZonefile 273800391 (complete):

               warn_line9 : overrode NS at anovelidea.org. : NS ns1.p01.dynect.net.
               warn_line10 : overrode NS at anovelidea.org. : NS ns2.p01.dynect.net.
               warn_line11 : overrode NS at anovelidea.org. : NS ns3.p01.dynect.net.
               warn_line12 : overrode NS at anovelidea.org. : NS ns4.p01.dynect.net.
```

Return all notes for the specified zone.

### Example 2
```powershell
PS C:\> Get-DynDnsZoneNotes -Zone anovelidea.org -Limit 1


Zone         : anovelidea.org
Timestamp    : 9/16/2018 9:37:12 PM
Type         : publish
User         : ######
SerialNumber : 2018091701
Note         : anovelidea.org
                add A 74.125.21.121
               Test publish from web UI
```

Return the last note for the specified zone.

## PARAMETERS

### -Limit
Specifies the number of notes to be retrieved. The Dyn Managed REST API returns a maximum of 1000 notes.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Offset
Specifies the count of the most recent notes to skip. Defaults to 0.

```yaml
Type: Int32
Parameter Sets: (All)
Aliases:

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Zone
Specifies the name of the zone for which to retrieve the notes.

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

### DynDnsZoneNote[]

## NOTES

## RELATED LINKS

[Get Zone Notes (API)](https://help.dyn.com/get-zone-notes-api/)