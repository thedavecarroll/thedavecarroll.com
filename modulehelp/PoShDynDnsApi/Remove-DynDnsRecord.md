---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsRecord.html
permalink: /modulehelp/PoShDynDnsApi/Remove-DynDnsRecord.html
schema: 2.0.0
search: false
---

# Remove-DynDnsRecord

## SYNOPSIS
The command `Remove-DynDnsRecord` deletes one or all records of the specified type from a specified zone/node.

## SYNTAX

```
Remove-DynDnsRecord [-DynDnsRecord] <DynDnsRecord[]> [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The command `Remove-DynDnsRecord` deletes one or all records of the specified type from a specified zone/node.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-DynDnsRecord -RecordType A -Node newtest | Remove-DynDnsRecord


Address : 216.146.46.11
Zone    : anovelidea.org
Name    : newtest.anovelidea.org
Type    : A
TTL     : 60


Confirm
Are you sure you want to perform this action?
Performing the operation "Delete DNS A record" on target "newtest.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y
Address : 216.146.46.10
Zone    : anovelidea.org
Name    : newtest.anovelidea.org
Type    : A
TTL     : 60


Confirm
Are you sure you want to perform this action?
Performing the operation "Delete DNS A record" on target "newtest.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): n
```

Retrieve all A records for the node `newtest.anovelidea.org` and delete the first record.

## PARAMETERS

### -DynDnsRecord
One or more DNS records retrieved by the command `Get-DynDnsRecord`.

```yaml
Type: DynDnsRecord[]
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: True (ByValue)
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

### DynDnsRecord[]

## OUTPUTS

### None

## NOTES

## RELATED LINKS

[Get-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsRecord.html)

[Add-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Add-DynDnsRecord.html)

[Update-DynDnsRecord](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Update-DynDnsRecord.html)

[Delete A Records (API)](https://help.dyn.com/delete-a-records-api/)

[Delete CNAME Records (API)](https://help.dyn.com/delete-cname-records-api/)

[Delete MX Records (API)](https://help.dyn.com/delete-mx-records-api/)

[Delete PTR Records (API)](https://help.dyn.com/delete-ptr-records-api/)

[Delete SRV Records (API)](https://help.dyn.com/delete-srv-records-api/)

[Delete TXT Records (API)](https://help.dyn.com/delete-txt-records-api/)
