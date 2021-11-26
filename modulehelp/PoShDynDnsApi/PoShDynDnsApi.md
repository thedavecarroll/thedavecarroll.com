---
Module Name: PoShDynDnsApi
Module Guid: 594b1a08-4339-47a2-8c89-a53d8a699bf1
Download Help Link: https://thedavecarroll.com/modulehelp/PoShDynDnsApi
Help Version: 0.2.1
Locale: en-US
classes: wide
layout: onlinehelp
permalink: /modulehelp/PoShDynDnsApi/index.html
---

# PoShDynDnsApi Module
## Description
PowerShell module used to interact with Dyn Managed DNS REST API


### [Add-DynDnsHttpRedirect](Add-DynDnsHttpRedirect.html)
The `Add-DynDnsHttpRedirect` command creates a new HTTP Redirect service on the zone/node indicated.

### [Add-DynDnsRecord](Add-DynDnsRecord.html)
The `Add-DynDnsRecord` command creates a new DNS record of the specified type at the indicated zone/node level.

### [Add-DynDnsZone](Add-DynDnsZone.html)
The `Add-DynDnsZone` command creates a primary DNS zone in the customer's Dyn DNS Managed account.

### [Connect-DynDnsSession](Connect-DynDnsSession.html)
The `Connect-DynDnsSession` command creates a new session to the Dyn Managed DNS REST API.

### [Disconnect-DynDnsSession](Disconnect-DynDnsSession.html)
The `Disconnect-DynDnsSession` command terminates an existing, valid session with the Dyn Managed DNS REST API.

### [Get-DynDnsHistory](Get-DynDnsHistory.html)
The `Get-DynDnsHistory` command shows the history of commands that are send to the Dyn Managed DNS REST API.

### [Get-DynDnsHttpRedirect](Get-DynDnsHttpRedirect.html)
The `Get-DynDnsHttpRedirect` command retrieves one or all HTTP Redirect services on the zone/node indicated.

### [Get-DynDnsJob](Get-DynDnsJob.html)
The `Get-DynDnsJob` command retrieves the result from a previous job.

### [Get-DynDnsNodeList](Get-DynDnsNodeList.html)
The `Get-DynDnsNodeList` command retrieves a list of all node names at or below the given zone node.

### [Get-DynDnsRecord](Get-DynDnsRecord.html)
The `Get-DynDnsRecord` command retrieves one or all records of the specified type from a specified zone/node.

### [Get-DynDnsSession](Get-DynDnsSession.html)
The `Get-DynDnsSession` command retrieves information about the current session.

### [Get-DynDnsTask](Get-DynDnsTask.html)
The `Get-DynDnsTask` command retrieves a list of all current DNS API tasks or a single pending API task based on the task ID.

### [Get-DynDnsUser](Get-DynDnsUser.html)
The `Get-DynDnsUser` command retrieves information on a specified user or for all users.

### [Get-DynDnsZone](Get-DynDnsZone.html)
The `Get-DynDnsZone` command will return all zones associated with the customer, or the specified zone.

### [Get-DynDnsZoneChanges](Get-DynDnsZoneChanges.html)
The `Get-DynDnsZoneChanges` command will retrieve all unpublished changes for the current session for the specified zone.

### [Get-DynDnsZoneNotes](Get-DynDnsZoneNotes.html)
The `Get-DynDnsZoneNotes` command generates a report containing the Zone Notes for the specified zone.

### [Lock-DynDnsZone](Lock-DynDnsZone.html)
The `Lock-DynDnsZone` command prevents other users from making changes to the zone.

### [New-DynDnsRecord](New-DynDnsRecord.html)
The `New-DynDnsRecord` command creates DNS record object of the specified type.

### [Publish-DynDnsZoneChanges](Publish-DynDnsZoneChanges.html)
The `Publish-DynDnsZoneChanges` command publishes pending zone changes.

### [Remove-DynDnsHttpRedirect](Remove-DynDnsHttpRedirect.html)
The `Remove-DynDnsHttpRedirect` deletes one or more existing HTTP Redirect services from the zone/node indicated.

### [Remove-DynDnsNode](Remove-DynDnsNode.html)
The `Remove-DynDnsNode` removes the indicated node, any records within the node, and any nodes underneath the node.

### [Remove-DynDnsRecord](Remove-DynDnsRecord.html)
The `Remove-DynDnsRecord` command deletes one or all records of the specified type from a specified zone/node.

### [Remove-DynDnsZone](Remove-DynDnsZone.html)
The `Remove-DynDnsZone` command immediately deletes the primary DNS zone from the customer's Dyn DNS Managed account.

### [Send-DynDnsSession](Send-DynDnsSession.html)
The `Send-DynDnsSession` command extends the current session with the Dyn Managed DNS REST API.

### [Test-DynDnsSession](Test-DynDnsSession.html)
The `Test-DynDnsSession` command verifies that a session is still active with the Dyn Managed DNS REST API.

### [Undo-DynDnsZoneChanges](Undo-DynDnsZoneChanges.html)
The `Undo-DynDnsZoneChanges` command deletes changes to the specified zone that have been created during the current session, but not yet published to the zone.

### [Unlock-DynDnsZone](Unlock-DynDnsZone.html)
The `Unlock-DynDnsZone` command removes the restriction that prevents other users from making changes to the zone.

### [Update-DynDnsRecord](Update-DynDnsRecord.html)
The `Update-DynDnsRecord` command updates an existing DNS record in the specified zone.
