---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/New-DynDnsRecord.html
permalink: /modulehelp/PoShDynDnsApi/New-DynDnsRecord.html
schema: 2.0.0
search: false
---

# New-DynDnsRecord

## SYNOPSIS
The `New-DynDnsRecord` creates DNS record object of the specified type.

## SYNTAX

### ARecord
```
New-DynDnsRecord -IPv4Address <IPAddress> [-TTL <Int32>] [<CommonParameters>]
```

### TXTRecord
```
New-DynDnsRecord -Text <String> [-TTL <Int32>] [<CommonParameters>]
```

### CNAMERecord
```
New-DynDnsRecord -CName <String> [-TTL <Int32>] [<CommonParameters>]
```

### MXRecord
```
New-DynDnsRecord -MailServer <String> -Preference <String> [-TTL <Int32>] [<CommonParameters>]
```

### SRVRecord
```
New-DynDnsRecord -Port <Int32> -Priority <Int32> -Target <String> -Weight <Int32> [-TTL <Int32>]
 [<CommonParameters>]
```

### SOARecord
```
New-DynDnsRecord -ResponsiblePerson <String> [-TTL <Int32>] [<CommonParameters>]
```

## DESCRIPTION
The `New-DynDnsRecord` creates DNS record object of the specified type.

The object can be used by `Add-DynDnsRecord` and `Update-DynDnsRecord` and other commands.

The output depends on the DNS record type and can be any of the following:

* A
* TXT
* CNAME
* MX
* SRV
* PTR
* SOA (ResponsiblePerson)

The Zone and Name properties are populated when returning objects from the service.

## EXAMPLES

### Example 1
```powershell
PS C:\>  New-DynDnsRecord -IPv4Address 172.16.30.9


Address : 172.16.30.9
Zone    :
Name    :
Type    : A
TTL     : 0
```

Create a DynDnsRecord_A object.

### Example 2
```powershell
PS C:\> New-DynDnsRecord -Text 'Authorization text'


Strings : {Authorization text}
Zone    :
Name    :
Type    : TXT
TTL     : 0
```

Create a DynDnsRecord_TXT object.

### Example 3
```powershell
PS C:\> New-DynDnsRecord -Target chat.anovelidea.org -Port 443 -Priority 10 -Weight 100


Target   : chat.anovelidea.org
Port     : 443
Priority : 10
Weight   : 100
Zone     :
Name     :
Type     : SRV
TTL      : 0
```

Create a DynDnsRecord_SRV object.

## PARAMETERS

### -IPv4Address
Specifies the IP address.

```yaml
Type: IPAddress
Parameter Sets: ARecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -CName
Specifies the alias, i.e. fully-qualified domain name, of the zone node.

```yaml
Type: String
Parameter Sets: CNAMERecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -MailServer
Specifies a mail server that processes mail for the domain.

```yaml
Type: String
Parameter Sets: MXRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Preference
Specifies the preference value used to prioritize mail delivery if multiple mail servers are available.

```yaml
Type: String
Parameter Sets: MXRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -ResponsiblePerson
Specifies the email address of the domain name administrator.

```yaml
Type: String
Parameter Sets: SOARecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Target
Specifies the canonical hostname of the machine providing the service.

```yaml
Type: String
Parameter Sets: SRVRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Port
Specifies the TCP or UDP port on which the service is to be found.

```yaml
Type: Int32
Parameter Sets: SRVRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Priority
Specifies the priority of the target host, lower value means more preferred.

```yaml
Type: Int32
Parameter Sets: SRVRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Weight
Specifies the relative weight for records with the same priority, higher value means more preferred.

```yaml
Type: Int32
Parameter Sets: SRVRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Text
Specifies a string of arbitrary text.

This is typically used to set the Sender Policy Framework (SPF) record or prove ownership of the zone to a third-party.

```yaml
Type: String
Parameter Sets: TXTRecord
Aliases:

Required: True
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -TTL
The Time-To-Live (TTL) to be used for the the DNS record.

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

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### DynDnsRecord

## NOTES

## RELATED LINKS
