---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsZoneChanges.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsZoneChanges.html
schema: 2.0.0
search: false
---

# Get-DynDnsZoneChanges

## SYNOPSIS
The command `Get-DynDnsZoneChanges` will retrieve all unpublished changes for the current session for the specified zone.

## SYNTAX

```
Get-DynDnsZoneChanges [-Zone] <String> [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsZoneChanges` will retrieve all unpublished changes for the current session for the specified zone.

## EXAMPLES

### Example
```powershell
PS C:\> Get-DynDnsZoneChanges -Zone anovelidea.org


Zone         : anovelidea.org
UserId       : 389641
Type         : TXT
Name         : newnode.anovelidea.org
SerialNumber : 2018110400
TTL          : 3600
RecordData   : @{rdata_kx=; rdata_srv=; rdata_policy=; rdata_soa=; rdata_key=; rdata_ipseckey=; rdata_cname=;
               rdata_caa=; rdata_loc=; rdata_spf=; rdata_ptr=; rdata_alias=; rdata_ds=; rdata_naptr=; rdata_sshfp=;
               rdata_aaaa=; rdata_nsap=; rdata_dhcid=; rdata_dnskey=; rdata_cds=; rdata_txt=; rdata_ns=; rdata_dname=;
               rdata_csync=; rdata_px=; rdata_a=; rdata_cert=; rdata_rp=; rdata_tlsa=; rdata_mx=; rdata_cdnskey=}

Zone         : anovelidea.org
UserId       : 389641
Type         : A
Name         : newnode.anovelidea.org
SerialNumber : 2018110400
TTL          : 3600
RecordData   : @{rdata_kx=; rdata_srv=; rdata_policy=; rdata_soa=; rdata_key=; rdata_ipseckey=; rdata_cname=;
               rdata_caa=; rdata_loc=; rdata_spf=; rdata_ptr=; rdata_alias=; rdata_ds=; rdata_naptr=; rdata_sshfp=;
               rdata_aaaa=; rdata_nsap=; rdata_dhcid=; rdata_dnskey=; rdata_cds=; rdata_txt=; rdata_ns=; rdata_dname=;
               rdata_csync=; rdata_px=; rdata_a=; rdata_cert=; rdata_rp=; rdata_tlsa=; rdata_mx=; rdata_cdnskey=}
```

Lists all pending zone changes for the zone `anovelidea.org` for the current session.

## PARAMETERS

### -Zone
Specifies the zone for which to check for pending zone changes.

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

### DynDnsZoneChanges[]

## NOTES

## RELATED LINKS

[Publish-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Publish-DynDnsZoneChanges.html)

[Undo-DynDnsZoneChanges](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Undo-DynDnsZoneChanges.html)

[Get Zone ChangeSet (API)](https://help.dyn.com/get-zone-changeset-api/)