---
layout: single
title: "Using the PSGSuite Module for G Suite"
excerpt: "Examples on how to create OUs, groups, and users with the PSGSuite PowerShell Module."
header:
  overlay_image: /assets/images/gsuite-reddit-post.png
  overlay_filter: 0.9
date: 2019-03-03
comments: true
tags:
  - psgsuite
  - g suite
  - google api
  - google cloud
  - how to
category:
  - powershell
---

![r/sysadmin]({{ site.url }}{{ site.baseurl }}/assets/images/gsuite-reddit-post.png)
{: .full}

## Introduction

About a week ago, I was scrolling through Reddit and came across a post in **r/sysadmin**,
[Get list of aliases in Gsuite/Gmail][1]{:target="_blank"}.

I took a few minutes to install and configure [PSGSuite][2]{:target="_blank"}, a module for interacting with G Suite
(Google Apps) API that I heard about sometime last year. In short order, I was able to provide a response to the post.

This module allows you to work with GSuite users, groups, sheets, and more. See the [wiki][3]{:target="_blank"} for details.

This post will take you through creating organizational units, users, and groups, and assigning users to groups, and
listing users with email aliases.

For fun, I've created a custom schema and attribute, `EmployeeType`, that will help categorize our users.

**Note:** I manually created a `/test` organizational unit and blocked automatic assignment of a license since I'm using my
personal G Suite account. I don't want any surprises at the end of the month.
{: .notice--primary}

### Disclosure

I am not affiliated with `PSGSuite` project, other than being a very new, casual user of the module. Please visit the
[GitHub repo][2]{:target="_blank"} or [wiki][3]{:target="_blank"} for help with commands or to raise an issue.

## Basic User Process

This list covers the basic workflow that we will be following.

1. Create Organizational Units
2. Create Groups
3. Create Users
4. Assign Users to Groups
5. Get User Account Info

## Setup

### PSGSuite Module

I followed the project's wiki [Initial Setup][4]{:target="_blank"} page and the configuration went smoothly and quickly.

### Custom Attribute in G Suite

Here are the basic steps I used to create the custom attribute in G Suite.

1. Login to [https://admin.google.com][5]{:target="_blank"}.
2. Go to Users.
3. Click on **Manage Custom Attributes** icon, next to Download Users.
4. Click on **ADD CUSTOM ATTRIBUTE**.
5. For Category, I used CustomUniversity. This will be the name of the custom schema that is applied to users.
6. For Description, I used 'All custom attributes for the university'.
7. Then, in the entry for Custom Fields, I used the following:

|Name|Info Type|Visibility|No. of Values|
|-|-|-|-|
|EmployeeType|text|visible to domain|single value|

Once I saved the custom schema, I verified that I had entered everything correctly by managing user attributes again and
selecting the category.

![r/sysadmin]({{ site.url }}{{ site.baseurl }}/assets/images/gsuite-custom-attribute.png)
{: .full}

### Data

I created the following data in a Google Sheets spreadsheet called **UserManagement**. These two sheets will be used to
provide the required data for all steps of the process.

#### Sheet: Users

|FullName|GivenName|FamilyName|Email|EmployeeType|
|-|-|-|-|-|-|
|Donald Edwards|Donald|Edwards|don@anovelidea.org|Staff|
|Leslie Myers|Leslie|Myers|leslie@anovelidea.org|Staff|
|Emily Jones|Emily|Jones|emily@anovelidea.org|Faculty|
|Larry Brooks|Larry|Brooks|larry@anovelidea.org|Faculty|

#### Sheet: Groups

|Name|Email|Description|OrgUnitPath
|-|-|-|-|
|Business|business@anovelidea.org|Business Department|/test/business|
|Academics|academics@anovelidea.org|Academics Department|/test/academics|

**Note:** I used [Doug Finke's NameIT][6]{:target="_blank"} module to produce random names.
{: .notice--primary}

## User Process

To begin, we need to import the module and then use the command `Get-GSDriveFileList` to find the Google Sheet where our
data is stored.

Next, we use the command `Import-GSSheet` to import our user and group data.

```powershell
# Import module
Import-Module -Name PSGSuite

# Discover spreadsheet Id in drive file list
$Spreadsheet = Get-GSDriveFileList -Filter "name = 'UserManagement'"

# Get data from each sheet from Google spreadsheet
$UserData = Import-GSSheet -SpreadsheetId $Spreadsheet.Id -SheetName 'Users'
$GroupData = Import-GSSheet -SpreadsheetId $Spreadsheet.Id -SheetName 'Groups'
```

### Create Organizational Units

We use `Get-GSOrganizationalUnit` to determine if the OU exists. And then we use `New-GSOrganizationalUnit ` to create
it if it does not.

```powershell
foreach ($Group in $GroupData) {
    $SplitPath = $Group.OrgUnitPath -Split '/'
    $ParentPath = $SplitPath[0..($SplitPath.Count -2)] -join '/'
    $OUPath = $SplitPath[-1]

    $OrgUnit = Get-GSOrganizationalUnit -SearchBase $Group.OrgUnitPath -SearchScope Base -ErrorAction SilentlyContinue
    if ($OrgUnit) {
        "Org Unit {0} exists at {1}" -f $OrgUnit.OrgUnitPath,$OrgUnit.ParentOrgUnitPath
    } else {
        "Org Unit {0} does not exist; attempting to create in {1}" -f $Group.OrgUnitPath,$ParentPath
        try {
            $GSOrgUnit = New-GSOrganizationalUnit -Name $OUPath.ToLower() -ParentOrgUnitPath $ParentPath -Description $Group.Description
            "Created {0} : {1}" -f $GSOrgUnit.OrgUnitPath,$GSOrgUnit.Description
        }
        catch {
            "Unable to create {0}" -f $Group.OrgUnitPath
        }
    }
}
```

### Create Groups

Using the command `Get-GSGroup`, we check if the group exists. If the group does not already exist, use `New-GSGroup` to
create the group from the spreadsheet.

```powershell
foreach ($Group in $GroupData) {
    $GSGroup = Get-GSGroup -Group $Group.Name -ErrorAction SilentlyContinue
    if ($GSGroup) {
        "Group {0} exists" -f $Group.Name
    } else {
        "Group {0} does not exist; attempting to create" -f $Group.Name
        try {
            $NewGSGroup = New-GSGroup -Name $Group.Name -Email $Group.Email -Description $Group.Description
            "Created {0} : {1}" -f $NewGSGroup.Name,$NewGSGroup.Description
        }
        catch {
            "Unable to create {0}" -f $Group.Name
        }
    }
}
```

### Create Users

Create the users listed in the spreadsheet.

1. First, determine the department based on the user type.
2. Using the department, set the variable for the org unit path.
3. Create the required hashtable for CustomSchemas to add the EmployeeType to the user.
4. Generate a random secure password.
5. Using the command `New-GSUser`, create the new user.
6. If the user is successfully created, use the command `New-GSUserAlias` for best effort to create an email alias based on the user's full name.

```powershell
foreach ($User in $UserData) {
    $Domain = $User.Email.Split('@')[1]
    switch ($User.UserType) {
        'Faculty' { $Department = 'Academics'}
        'Staff'   { $Department = 'Business' }
    }

    # Set OU path
    $OrgUnitPath = $GroupData.Where({$_.Name -eq $Department}).OrgUnitPath

    # Set employee type custom schema
    $CustomSchemas = @{
        CustomUniversity = @{
            EmployeeType = $User.UserType
        }
    }

    # Set a random secure string
    $Password = ConvertTo-SecureString -String (Get-RandomPassword) -AsPlainText -Force

    $NewGSUserParams = @{
        PrimaryEmail = $User.Email
        FullName = $User.FullName
        GivenName = $User.GivenName
        FamilyName = $User.FamilyName
        OrgUnitPath = $OrgUnitPath
        CustomSchemas = $CustomSchemas
        Password = $Password
    }
    $NewUser = New-GSUser @NewGSUserParams -ErrorAction SilentlyContinue
    if ($NewUser) {
        'Created user {0} with primary email {1}' -f $User.FullName,$User.Email
    } else {
        'Failed to create user {0}' -f $User.Email
    }

    New-GSUserAlias -User $NewUser.PrimaryEmail -Alias ( $NewUser.Name.FullName.Replace(' ',''),$Domain -join '@') -ErrorAction SilentlyContinue | Out-Null
}
```

The `Get-RandomPassword` function is a mock-up and currently only returns a string value.
{: .notice--primary}

### Assign Users to Groups

Next, we use `Get-GSUserList` to get a list of all users in the parent OU, and then add the user to the group with
`Add-GSGroupMember`.

```powershell
$UserToGroupList = Get-GSUserList -SearchBase '/test' -SearchScope Subtree
foreach ($User in $UserToGroupList) {
    switch -regex ($User.OrgUnitPath) {
        'academics' { $GroupName = 'Academics'}
        'business' { $GroupName = 'Business'}
    }
    try {
        Add-GSGroupMember -Identity $GroupName -Member $User.User -ErrorAction Stop | Out-Null
        'Added {0} to group {1}' -f $User.User,$GroupName
    }
    catch {
        'Failed to add {0} to group {1}' -f $User.User,$GroupName
    }
}
```

### Listing All Email Addresses Including Aliases

When I commented on the Reddit post referenced above, it was with option 1. During the writing of this post, I created
option 2 as a more real-world example of what data can be brought out of the GSUser object.

#### Option 1

This option uses the commands `Get-GSUserList` and `Get-GSUserAlias` to retrieve the data.

```powershell
Get-GSUserList -SearchBase '/test' -SearchScope Subtree | ForEach-Object {
    Get-GSUserAlias -User $_.User | Select-Object -Property PrimaryEmail,AliasValue
}
```

|PrimaryEmail|AliasValue|
|-|-|
|don@anovelidea.org|DonaldEdwards@anovelidea.org|
|emily@anovelidea.org|EmilyJones@anovelidea.org|
|larry@anovelidea.org|LarryBrooks@anovelidea.org|
|leslie@anovelidea.org|LeslieMyers@anovelidea.org|

#### Option 2

This option also uses the command `Get-GSUserList`, but it uses the more versatile command `Get-GSUser` to retrieve all
pertinent data.

```powershell
$UserList = Get-GSUserList -SearchBase '/test' -SearchScope Subtree | ForEach-Object {
    Get-GSUser -User $_.User | Select-Object -Property Name,PrimaryEmail,OrgUnitPath,Aliases,CustomSchemas,CreationTime,LastLoginTime
}
$Format = @{l='Name';e={$_.Name.FullName}},@{l='PrimaryEmail';e={$_.PrimaryEmail}},@{l='CreationTime';e={$_.CreationTime}},
    @{l='Aliases';e={$_.Aliases -join ','}},@{l='OrgUnitPath';e={$_.OrgUnitPath}},
    @{l='EmployeeType';e={$_.CustomSchemas['CustomUniversity'].EmployeeType}},@{l='LastLoginTime';e={$_.LastLoginTime}}
$UserList | Select-Object $Format | Format-Table -AutoSize
```

|Name|PrimaryEmail|CreationTime|Aliases|OrgUnitPath|EmployeeType|LastLoginTime|
|-|-|-|-|-|-|-|
|Donald Edwards|don@anovelidea.org|3/3/2019 7:13:47 PM|DonaldEdwards@anovelidea.org|/test/business|Staff|12/31/1969 6:00:00 PM|
|Emily Jones|emily@anovelidea.org|3/3/2019 7:13:53 PM|EmilyJones@anovelidea.org|/test/academics|Faculty|12/31/1969 6:00:00 PM|
|Larry Brooks|larry@anovelidea.org|3/3/2019 7:13:56 PM|LarryBrooks@anovelidea.org|/test/academics|Faculty|12/31/1969 6:00:00 PM|
|Leslie Myers|leslie@anovelidea.org|3/3/2019 7:13:50 PM|LeslieMyers@anovelidea.org|/test/business|Staff|12/31/1969 6:00:00 PM|

#### Bonus

Of course, you could easily send the data back into a Google sheet or export it to CSV or Excel.

```powershell
$UserList | Select-Object $Format | Export-GSSheet -NewSheetTitle 'AccountCreationLog' -User 'primaryadmin@anovelidea.org' -SheetName 'AccountCreation' -Launch
```

And here is what the end result will look like.

![AccountCreationLog]({{ site.url }}{{ site.baseurl }}/assets/images/gsuite-account-creation-log.png)
{: .full}

**Note:** Doug Finke also has an outstanding module, [ImportExcel][7]{:target="_blank"}, that will help you get your data
into an Excel spreadsheet.
{: .notice--primary}

## Summary

As you can see based on these relatively simple examples, there is a great deal of automation for a G Suite organization
that you can perform using the `PSGSuite` module.

I hope these examples will help you understand how to start using the `PSGSuite` module, or at least have piqued your
curiosity to learn more on your own.

If this blog post has helped you, please leave a comment below.

PowerShell to the People!

[1]: https://www.reddit.com/r/sysadmin/comments/aujdao/get_list_of_aliases_in_gsuitegmail/
[2]: https://github.com/scrthq/PSGSuite
[3]: https://github.com/scrthq/PSGSuite/wiki/
[4]: https://github.com/scrthq/PSGSuite/wiki/Initial-Setup
[5]: https://admin.google.com
[6]: https://github.com/dfinke/NameIT
[7]: https://github.com/dfinke/ImportExcel