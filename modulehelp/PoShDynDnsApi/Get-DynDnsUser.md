---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsUser.html
permalink: /modulehelp/PoShDynDnsApi/Get-DynDnsUser.html
schema: 2.0.0
search: false
---

# Get-DynDnsUser

## SYNOPSIS
The command `Get-DynDnsUser` retrieves information on a specified user or for all users.

## SYNTAX

```
Get-DynDnsUser [[-User] <String>] [<CommonParameters>]
```

## DESCRIPTION
The command `Get-DynDnsUser` retrieves information on a specified user or for all users.

## EXAMPLES

### Example
```powershell
PS C:\> Get-DynDnsUser


User         : admin
Status       : active
CustomerName : ##########
Nickname     : AnotherUser
FirstName    : David
LastName     : Carroll
Email        : admin@anovelidea.org
Phone        : ###-###-####
Groups       : {Default}

User         : ######
Status       : active
CustomerName : ##########
Nickname     : owner
FirstName    : Dave
LastName     : Carroll
Email        : powershell@anovelidea.org
Phone        : ###-###-####
Groups       : {Default}
```

Retrieve all users associated with the company.

## PARAMETERS

### -User
The user for which to return information.

```yaml
Type: String
Parameter Sets: (All)
Aliases: ApiUserName, UserName

Required: False
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

### DynDnsUser[]

## NOTES

## RELATED LINKS

[Get User Info (API)](https://help.dyn.com/get-user-info-api/)