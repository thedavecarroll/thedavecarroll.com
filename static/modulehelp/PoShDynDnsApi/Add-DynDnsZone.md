---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsZone.html
permalink: /modulehelp/PoShDynDnsApi/Add-DynDnsZone.html
schema: 2.0.0
search: false
---

# Add-DynDnsZone

## SYNOPSIS
The `Add-DynDnsZone` command creates a primary DNS zone in the customer's Dyn DNS Managed account.

## SYNTAX

### ZoneFile
```
Add-DynDnsZone -Zone <String> [-ZoneFile <String>] [-WhatIf] [-Confirm] [<CommonParameters>]
```

### Zone
```
Add-DynDnsZone -Zone <String> -ResponsiblePerson <String> [-SerialStyle <String>] [-TTL <Int32>] [-WhatIf]
 [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The command `Add-DynDnsZone` creates a primary DNS zone in the customer's Dyn DNS Managed account.

**Note:** After creating the new zone, you must use `Publish-DynDnsZoneChanges -Zone <zone_name> -Force` to publish the
zone before adding additional records.

## EXAMPLES

### Example 1
```powershell
PS C:\> Add-DynDnsZone -Zone 'anovelidea.org' -ResponsiblePerson 'powershell@anovelidea.org' -SerialStyle day -TTL 300

Confirm
Are you sure you want to perform this action?
Performing the operation "Create DNS zone" on target "anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y

Zone           SerialNumber SerialStyle Type
----           ------------ ----------- ----
anovelidea.org            0 day         Primary

PS C:\> Publish-DynDnsZoneChanges -Zone anovelidea.org -Notes 'Creating zone for module help.' -Force
WARNING: There are no pending zone changes.

Confirm
Are you sure you want to perform this action?
Performing the operation "publish zone changes" on target "anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y

Zone           SerialNumber SerialStyle Type
----           ------------ ----------- ----
anovelidea.org   2018091600 day         Primary
```

Creates a new primary DNS zone by providing the zone name, responsible person, serial style, and default TTL.

### Example 2
```powershell
PS C:\> Add-DynDnsZone -Zone anovelidea.org -ResponsiblePerson BadEmailAddress
WARNING: The value provided for ResponsiblePerson does not appear to be a valid email. Please try again.
```

Demonstrates the use of an invalid email address for ResponsiblePerson.

### Example 3
```powershell
PS C:\> Add-DynDnsZone -Zone anovelidea.org -ZoneFile C:\Downloads\anovelidea.org.zonefile.txt

Confirm
Are you sure you want to perform this action?
Performing the operation "Create DNS zone by ZoneFile method" on target "anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y

If you plan to provide your own secondary DNS for the zone, allow notify requests from these IP addresses on your nameserver: 208.78.68.66, 2600:2003:0:1::66
Zone anovelidea.org import initiated. This task may take a several minutes to complete.
Please be sure to reassign the zone delegation to us.
Zone is not yet delegated to us
Note: Be sure to use the function Publish-DynDnsZoneChanges in order publish the domain.
```

Create a primary DNS zone by importing a file.

## PARAMETERS

### -Zone
The fully qualified name of the DNS domain for which to create the a primary zone.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -ResponsiblePerson
The email address of the person responsible for the domain.

The value provided must match the syntax for an email address.

```yaml
Type: String
Parameter Sets: Zone
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -SerialStyle
Provide the style for the zone's serial.

|Style|Description|
|-|-|
|increment|Serials are incremented by 1 on every change.|
|epoch|Serials will be the UNIX timestamp at the time of the publish.|
|day|Serials will be in the form of YYYYMMDDxx where xx is incremented by one for each change during that particular day.|
|minute|Serials will be in the form of YYMMDDHHMM.|

```yaml
Type: String
Parameter Sets: Zone
Aliases:
Accepted values: increment, epoch, day, minute

Required: False
Position: Named
Default value: day
Accept pipeline input: False
Accept wildcard characters: False
```

### -TTL
The default TTL (Time-To-Live) for records in the zone.

```yaml
Type: Int32
Parameter Sets: Zone
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -ZoneFile
The contents of a RFC1035 style Master file. A zone file for BIND or tinydns will also be accepted.

```yaml
Type: String
Parameter Sets: ZoneFile
Aliases:

Required: False
Position: Named
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

### None

## NOTES

## RELATED LINKS

[Get-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZone.html)

[Remove-DynDnsZone](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsZone.html)

[Publish-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Publish-DynDnsZoneChanges.html)

[Create Primary Zone (API)](https://help.dyn.com/create-primary-zone-api/)

[Upload Zone File (API)](https://help.dyn.com/upload-zone-file-api/)