---
classes: wide
external help file: PoShDynDnsApi-help.xml
layout: onlinehelp
Module Name: PoShDynDnsApi
online version: https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Connect-DynDnsSession.html
permalink: /modulehelp/PoShDynDnsApi/Connect-DynDnsSession.html
schema: 2.0.0
search: false
---

# Connect-DynDnsSession

## SYNOPSIS
The `Connect-DynDnsSession` command creates a new session to the Dyn Managed DNS REST API.

## SYNTAX

```
Connect-DynDnsSession [-User] <String> [-Customer] <String> [-Password] <SecureString> [-Force]
 [<CommonParameters>]
```

## DESCRIPTION
The `Connect-DynDnsSession` command creates a new session to the Dyn Managed DNS REST API.

An authenticated and active Dyn Managed DNS session is required for all interactions with the service.

**From the Dyn page on Session Log-in**
>**WARNING:** Operating on the same resource (e.g. the same hostname or instance of a service) from more than one session at the same time may cause unexpected behavior, such as unintentional service changes or the inability to propagate new zone changes.

## EXAMPLES

### Example 1
```powershell
PS C:\> $User = Read-Host -Prompt 'Enter Dyn Managed DNS User Name'
PS C:\> $Customer = Read-Host -Prompt 'Enter Dyn Managed DNS Customer Name'
PS C:\> $Password = Read-Host -Prompt 'Enter Dyn Managed DNS Password' -AsSecureString
PS C:\> Connect-DynDnsSession -User $User -Customer $Customer -Password $Password
```

Connects to the Dyn Managed DNS API using the provided credentials.

### Example 2
```powershell
PS C:\> Connect-DynDnsSession -User $User -Customer $Customer -Password $Password
WARNING: There is a valid active session. Use the -Force parameter to logoff and create a new session.
WARNING: All unpublished changes will be discarded should you proceed with creating a new session.
PS C:\> Connect-DynDnsSession -User $User -Customer $Customer -Password $Password -Force -Verbose
VERBOSE: Existing authentication token found.
VERBOSE: API-3.7.11 : INFO : BLL : isalive: User session is still active
VERBOSE: API-3.7.11 : INFO : BLL : logout: Logout successful
VERBOSE: API-3.7.11 : INFO : BLL : login: Login successful
```

Terminates a current session and creates a new session to the Dyn Managed DNS API using the provided credentials.

## PARAMETERS

### -User
The Dyn API user (not DynID).

```yaml
Type: String
Parameter Sets: (All)
Aliases: ApiUserName, UserName

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Customer
The customer name for the Dyn API user.

```yaml
Type: String
Parameter Sets: (All)
Aliases: CustomerName

Required: True
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Password
The Dyn API user password.

```yaml
Type: SecureString
Parameter Sets: (All)
Aliases: pwd, pass

Required: True
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Force
Discards an existing, valid session before creating a new session.

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

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

### None

## OUTPUTS

### None

## NOTES

## RELATED LINKS

[Disconnect-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Disconnect-DynDnsSession.html)

[Send-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Send-DynDnsSession.html)

[Test-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Test-DynDnsSession.html)

[Get-DynDnsSession](https://thedavecarroll.com/modulehelp/PoShDynDnsApi/Get-DynDnsSession.html)

[Session Log-in (API)](https://help.dyn.com/session-log-in/)