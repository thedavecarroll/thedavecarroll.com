---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsNode.html
permalink: /modulehelp/PoShDynDnsApi/Remove-DynDnsNode.html
schema: 2.0.0
search: false
---

# Remove-DynDnsNode

## SYNOPSIS
The command `Remove-DynDnsNode` removes the indicated node, any records within the node, and any nodes underneath the node.

## SYNTAX

```
Remove-DynDnsNode [-Zone] <String> [-Node] <String> [-Force] [-WhatIf] [-Confirm] [<CommonParameters>]
```

## DESCRIPTION
The command `Remove-DynDnsNode` removes the indicated node, any records within the node, and any nodes underneath the node.

>**NOTE:** Use this method ONLY for cleaning up a zone. Regular node or record deletes should use the Delete A Records (API) method. Once all node records are removed, the node is automatically removed.

## EXAMPLES

### Example
```powershell
PS C:\> Remove-DynDnsNode -Zone anovelidea.org -Node newnode.anovelidea.org
WARNING: The node (newnode.anovelidea.org) contains records or services. Use the -Force switch if you wish to proceed.

PS C:\> Remove-DynDnsNode -Zone anovelidea.org -Node newnode.anovelidea.org -Force


--------------------------------------------------------------------------------
PROCEEDING WILL DELETE ALL RECORDS AND SERVICES CONTAINED WITHIN THE NODE
THIS INCLUDES ALL CHILD NODES
--------------------------------------------------------------------------------

Zone records for newnode.anovelidea.org:
----------------------------------------
Strings : {NewTest}
Zone    : anovelidea.org
Name    : newnode.anovelidea.org
Type    : TXT
TTL     : 3600

Address : 127.0.0.1
Zone    : anovelidea.org
Name    : newnode.anovelidea.org
Type    : A
TTL     : 3600

--------------------------------------------------------------------------------



Confirm
Are you sure you want to perform this action?
Performing the operation "Delete node, child nodes, and all records" on target "newnode.anovelidea.org".
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "Y"): y
```

Remove the node `newnode.anovelidea.org` from the zone `anovelidea.org`. The example illustrates that the `-Force` switch
must be used if the node contains any records or child nodes.

## PARAMETERS

### -Zone
The zone in which to delete the specified node, records, and child nodes.

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

### -Node
A node in the specified zone. If the node does not end with the domain of the zone, it will be appended.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Force
The `-Force` switch is required if the node contains any records or other nodes. When provided, it will allow the deletion
of the node and all records and nodes it contains.

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
Shows what would happen if the command runs.
The command is not run.

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

[Get-DynDnsNodeList](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsNodeList.html)

[Delete Zone Node (API)](https://help.dyn.com/delete-zone-node-api/)