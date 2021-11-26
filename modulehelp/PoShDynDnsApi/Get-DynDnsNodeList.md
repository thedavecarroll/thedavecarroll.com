---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsNodeList.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsNodeList.html
schema: 2.0.0
search: false
---

# Get-DynDnsNodeList

## SYNOPSIS
The `Get-DynDnsNodeList` command retrieves a list of all node names at or below the given zone node.

## SYNTAX

```
Get-DynDnsNodeList [-Zone] <String> [[-Node] <String>] [<CommonParameters>]
```

## DESCRIPTION
The `Get-DynDnsNodeList` command retrieves a list of all node names at or below the given zone node.

## EXAMPLES

### Example
```powershell
PS C:\> Get-DynDnsNodeList -Zone anovelidea.org
anovelidea.org
newtest.anovelidea.org
redirect.anovelidea.org
www3.anovelidea.org
```

List all of the nodes for the zone `anovelidea.org`.

## PARAMETERS

### -Zone
The zone in which to query for nodes.

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

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### System.Object[]

## NOTES

## RELATED LINKS

[Remove-DynDnsNode](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Remove-DynDnsNode.html)

[Get Node List (API)](https://help.dyn.com/get-node-list-api/)