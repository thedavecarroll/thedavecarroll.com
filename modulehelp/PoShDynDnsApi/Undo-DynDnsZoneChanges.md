---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Undo-DynDnsZoneChanges.html
permalink: /modulehelp/PoShDynDnsApi/Undo-DynDnsZoneChanges.html
schema: 2.0.0
search: false
---

# Undo-DynDnsZoneChanges

## SYNOPSIS
The `Undo-DynDnsZoneChanges` deletes changes to the specified zone that have been created during the current session,
but not yet published to the zone.

## SYNTAX

```
Undo-DynDnsZoneChanges [-Zone] <String> [-Force] [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The `Undo-DynDnsZoneChanges` deletes changes to the specified zone that have been created during the current session,
but not yet published to the zone.

## EXAMPLES

### Example 1
```powershell
PS C:\> Undo-DynDnsZoneChanges -Zone anovelidea.org -Confirm:$false


user_id    : 389641
zone       : anovelidea.org
rdata_type : A
fqdn       : www3.anovelidea.org
rdata      : @{rdata_kx=; rdata_srv=; rdata_policy=; rdata_soa=; rdata_key=; rdata_ipseckey=; rdata_cname=; rdata_caa=; rdata_loc=; rdata_spf=; rdata_ptr=; rdata_alias=; rdata_ds=; rdata_naptr=; rdata_sshfp=; rdata_aaaa=;
             rdata_nsap=; rdata_dhcid=; rdata_dnskey=; rdata_cds=; rdata_txt=; rdata_ns=; rdata_dname=; rdata_csync=; rdata_px=; rdata_a=; rdata_cert=; rdata_rp=; rdata_tlsa=; rdata_mx=; rdata_cdnskey=}
ttl        : 3600
serial     : 2018091702
id         : 516095367
```

Delete the pending changes for the specified zone.

### Example 2
```powershell
PS C:\> Undo-DynDnsZoneChanges -Zone anovelidea.org -Confirm:$false -Force -Verbose
VERBOSE: API-3.7.11 : INFO : BLL : publish: You have not made any changes to this zone
WARNING: There are no pending zone changes.
VERBOSE: -Force switch used.
VERBOSE: Performing the operation "discard zone changes" on target "anovelidea.org".
VERBOSE: API-3.7.11 : INFO : BLL : discard: 0 zone changes discarded
```

Delete the pending changes for the specified zone, showing when no changes are pending.

## PARAMETERS

### -Zone
Delete pending changes to the specified zone.

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

### -Force
Perform the operation regardless is there are pending zone changes.

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
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters [http://go.microsoft.com/fwlink/?LinkID=113216](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### None

## NOTES

## RELATED LINKS

[Get-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZoneChanges.html)

[Publish-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Publish-DynDnsZoneChanges.html)

[Delete Zone ChangeSet (API)](https://help.dyn.com/delete-zone-change-set-api/)