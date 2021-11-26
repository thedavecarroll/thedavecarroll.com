---
layout: single
title: "Creating a Class Definition from an Existing Object - Part 1"
excerpt: "Learn about PowerShell objects and classes in this first part of an Iron Scripter challenge walk-through."
date: 2021-01-26
header:
  overlay_image: /assets/images/ironscripter/class-definition/Silicone_mold_resin_cast_figure.jpg
  overlay_filter: 0.9
comments: true
tags:
  - powershell
  - powershell concepts
  - custom class
  - psobject
  - pscustomobject
  - learn powershell
  - iron scripter
  - iron scripter challenge
  - iron scripter walk-through
category:
  - powershell
---

![Image Text](/assets/images/ironscripter/class-definition/Silicone_mold_resin_cast_figure.jpg)
{: .full}

## A PowerShell Conversion Challenge

The first IronScripter Challenge for this year was released a few weeks ago.
The goal for [A PowerShell Conversion Challenge][IronScripterChallenge]{:target="_blank"} is to write a tool that will generate a class definition based on an existing object.

I've distilled the requirements into the following list:

- Copy selected properties
- Insert placeholder for methods
- Work from pipeline
- Allow user to specify a new class name
- Support Windows PowerShell 5.1 and PowerShell 7.x

[IronScripterChallenge]: https://ironscripter.us/a-powershell-conversion-challenge/

### Bonus Requirements

For a greater challenge, we are encouraged to include the following requirements:

- Allow the user to include or exclude properties
- Include a placeholder for a constructor
- Let the user specify a method
- Be VSCode aware an insert the new class automatically into the current file
- Support cross-platform

## A New Approach

I'll be taking a new approach to solving and documenting my progress.
Normally, I complete the solution, then I go back and document.
This time, I will be writing this article as I go.
I hope that you can learn how to approach this and future challenges by seeing the progression of my thought process.

## My Solution Process

My first thoughts for a solution beyond the challenge parameters:

- Contained in a small module, as there will be a few private functions.
- Use an existing `PSCustomObject` with non-conventional property names.
  - A private function would be used to enforce proper PascalCase casing and removal of punctuation (with maybe exception of period).
- Should be recursive.
  - Any object that contains a property which is itself another complex object should generate a separate class definition.
- Generate two constructors:
  - One empty constructor to create a clean instance of the class.
  - One constructor that will use the input object to populate a new instance.
    - This may require a hidden method (for PascalCase enforcement).
- Allow user to specify hidden properties.
- If not specified, detect the property type and include in definition.

Let's begin.

### Objects and Classes

Though I think this challenge is probably for the intermediate or advanced PowerShell user, I want to give quick introduction to PowerShell objects and classes.

For decades, most command line programs have produced output to the console/screen using the standard out (STDOUT) and standard error (STDERR) streams.
The output (for both streams) are typically textual representations of data.

PowerShell, in contrast, outputs rich objects to the console.
These objects are .NET objects or component object model (COM) objects.
Objects are comprised of several components, or members.

A class defines what members an object contains.
An object is an instantiated instance of a class.

As an example, the blueprint of a house can be considered to be the class definition.
The blueprint defines the dimensions and materials that should be used in the construction of the house.
Once construction is complete, the house is a physical representation of the blueprint, or an instance of a house.
Multiple houses can be constructed using the same blueprint.

#### What's in a PowerShell Object

We can examine the members of an object using the `Get-Member` command.

```powershell
Get-Process | Get-Member
```

```console
   TypeName: System.Diagnostics.Process

Name                       MemberType     Definition
----                       ----------     ----------
Handles                    AliasProperty  Handles = Handlecount
Name                       AliasProperty  Name = ProcessName
...
Parent                     CodeProperty   System.Object Parent{get=GetParentProcess;}
...
Disposed                   Event          System.EventHandler Disposed(System.Object, System.EventArgs)
ErrorDataReceived          Event          System.Diagnostics.DataReceivedEventHandler ErrorDataReceived(System.Object, System.Diagnostics.DataReceivedEventArgs)
Exited                     Event          System.EventHandler Exited(System.Object, System.EventArgs)
OutputDataReceived         Event          System.Diagnostics.DataReceivedEventHandler OutputDataReceived(System.Object, System.Diagnostics.DataReceivedEventArgs)
...
CloseMainWindow            Method         bool CloseMainWindow()
Dispose                    Method         void Dispose(), void IDisposable.Dispose()
Equals                     Method         bool Equals(System.Object obj)
GetHashCode                Method         int GetHashCode()
GetType                    Method         type GetType()
InitializeLifetimeService  Method         System.Object InitializeLifetimeService()
Kill                       Method         void Kill(), void Kill(bool entireProcessTree)
Refresh                    Method         void Refresh()
Start                      Method         bool Start()
...
__NounName                 NoteProperty   string __NounName=Process
...
BasePriority               Property       int BasePriority {get;}
Container                  Property       System.ComponentModel.IContainer Container {get;}
Id                         Property       int Id {get;}
MachineName                Property       string MachineName {get;}
MaxWorkingSet              Property       System.IntPtr MaxWorkingSet {get;set;}
MinWorkingSet              Property       System.IntPtr MinWorkingSet {get;set;}
...
PSConfiguration            PropertySet    PSConfiguration {Name, Id, PriorityClass, FileVersion}
PSResources                PropertySet    PSResources {Name, Id, Handlecount, WorkingSet, NonPagedMemorySize, PagedMemorySize, PrivateMemorySize, VirtualMemorySize, Threads.Count, TotalProcessorTime}
...
CommandLine                ScriptProperty System.Object CommandLine {get=…
Company                    ScriptProperty System.Object Company {get=$this.Mainmodule.FileVersionInfo.CompanyName;}
CPU                        ScriptProperty System.Object CPU {get=$this.TotalProcessorTime.TotalSeconds;}
...
```

We retrieve the running processes using the `Get-Process` command and,
using the power of the PowerShell pipeline (the `'|'` symbol), send the output (which is an object) to the next command, `Get-Member`.

As you can see, there is a wealth of information in the truncated output.
We see multiple `MemberType` values and the definition for each member, including the type of data held in the property.

For instance, the process Id (PID) must have a type of `int`, or integer.
The definition includes `get` which means that you can only retrieve the value of the property.
For properties that include `set` in the definition, such as `MaxWorkingSet`, you can also set the value of the property.
The `get` and `set` are the object's *getter* and *setter*, respectively.

#### A Short Class on PowerShell Classes

Windows PowerShell 5 introduced custom classes adding syntax to define classes and other user defined types.

PowerShell classes can be simple, with just a few properties (and a default parameter-less constructor), or they can be quite complex.
In a class definition, you can include hidden classes, static methods, property validation, inheritance, and more.

> I'll be using a few classes from the PoShDynDnsApi module.
> It contains several custom classes.
> Check out [the repo][PoShDynDnsApi]{:target="_blank"} for details.

[PoShDynDnsApi]: shttps://github.com/thedavecarroll/PoShDynDnsApi/blob/main/PoShDynDnsApi/Classes/PoShDynDnsApi.Class.ps1

In the following example, the class `DynDnsRawData` contains a hidden property `RawData` with a type of `PSCustomObject`.
Despite the hidden attribute, this class is perhaps one of the simplest you will see.

```powershell
class DynDnsRawData {
    hidden [PSCustomObject]$RawData
}
```

This next example, the `DynDnsRecord` class inherits from the class above, as denoted by the inclusion of `: DynDnsRawData`.
Inheritance, in PowerShell classes, essentially means that the members of the inherited class are attached to the class currently being defined.

```powershell
class DynDnsRecord : DynDnsRawData {
    [string]$Zone
    [string]$Name
    [string]$Type
    [int]$TTL
    hidden [string]$RecordId

    DynDnsRecord () {}
    DynDnsRecord ([PSCustomObject]$DnsRecord) {
        $this.Zone = $DnsRecord.zone
        $this.Name = $DnsRecord.fqdn
        $this.Type = $DnsRecord.record_type
        $this.TTL = $DnsRecord.ttl
        $this.RecordId = $DnsRecord.record_id
        $this.RawData = $DnsRecord
    }
}
```

We are defining 4 viewable properties and a hidden property in the `DynDnsRecord` class.
Due to inheritance, it actually has 2 hidden properties, as it also has `RawData`.

A constructor is used to create an instance of the class and may require a number of parameters.
Multiple constructors may be present on a given class, and constructors are always named the same as the class.

This class definition includes 2 constructors.

- One constructor is empty `DynDnsRecord () {}`, meaning the class can be instantiated as an object without input and all properties will be null.
- The other constructor has a single parameter, the `$DnsRecord` of type `PSCustomObject`.
  If the object passed into the constructor does not contain the properties referenced in the constructor scriptblock, the instantiation will fail throwing an error.

```powershell
[DynDnsRecord]::new() | Get-Member
```

```console
   TypeName: DynDnsRecord

Name        MemberType Definition
----        ---------- ----------
Equals      Method     bool Equals(System.Object obj)
GetHashCode Method     int GetHashCode()
GetType     Method     type GetType()
ToString    Method     string ToString()
Name        Property   string Name {get;set;}
TTL         Property   int TTL {get;set;}
Type        Property   string Type {get;set;}
Zone        Property   string Zone {get;set;}
```

So we see the 4 viewable properties, but we also see 4 methods even though we didn't define them.
As it turns out, these methods are coming from another, implied inheritance.

If you use `Get-Member -Force`, you will see the member `pstypenames`.
Let's take a look at it.

```powershell
[DynDnsRecord]::new().pstypenames
```

```console
DynDnsRecord
DynDnsRawData
System.Object
```

So, our custom class, `DynDnsRecord` inherits from `DynDnsRawData` which inherits from `System.Object`.
In actuality, all custom classes will inherit from `System.Object`.
The `System.Object` class defines the 4 methods.

As mentioned in the previous section, a class member has a *getter* and can have a *setter*.
These are basically hidden methods, which you probably noticed when you used `Get-Member -Force`.
The member names begin with `get_` and `set_` with the latter having a `void` output, meaning that no output will be generated.

Hopefully, that should be enough of a primer to continue with writing the solution for the challenge.
However, if you are unsure or just want to learn more, check out the [about_Classes][aboutClasses]{:target="_blank"} conceptual help at Microsoft Docs.

[aboutClasses]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_classes

## My Solution

Let's start mocking up some code for the requirements in an order that makes sense.

### Support Cross-Platform

The first requirement that we need to keep in mind is that our solution must run on multiple platforms, such as on Windows, Linux, and MacOS.
However, we also need to support Windows PowerShell 5.1.

At minimum we can include a `#Requires` statement.
This may change later, but at least it's a start.

```powershell
#Requires -Version 5.1
```

Visit the Microsoft Docs to learn more about the [#Requires][Requires]{:target="_blank"} statement.
It can require much more than just a specific PowerShell version.

If we have code that is specific to given edition, we would need to detect it and branch code blocks based on it.

Here is an example of executing code based on the PowerShell edition, exposed as the automatic variable `$PSEdition`.

```powershell
if ($PSEdition -eq 'Core') {
    Set-Alias -Name 'Invoke-DynDnsRequest' -Value 'Invoke-DynDnsRequestCore'
} else {
    Set-Alias -Name 'Invoke-DynDnsRequest' -Value 'Invoke-DynDnsRequestDesktop'
}
```

[Requires]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_requires?view=powershell-7.1

### Parameters

We will need several parameters to handle the following requirements:

- Work from pipeline
  - In order to accept an object through the pipeline, we need to have a parameter, let's call it `$Object` and add a parameter attribute of `ValueFromPipeline`.
- Allow user to specify a new class name
  - A simple `string` parameter sensibly named `ClassName` should be sufficient.
- Copy selected properties
  - If we want to specify certain properties, we know that we will need a `string` parameter and because there can be more than one, it will need to be an array of strings. We also want to provide a way for the user to convert all object properties to class properties.
- Allow the user to include or exclude properties
  - We'll provide a similar parameter for excluded properties.

```powershell
param(
    [Parameter(ValueFromPipeline)]
    [object]$Object,

    [string]$ClassName,

    [string[]]$IncludeProperty = '*',

    [string[]]$ExcludeProperty
)
```

The `ValueFromPipeline` is just one parameter attribute.
Read about it and more in the online help page [About Functions Advanced Parameters][ValueFromPipeline]{:target="_blank"}.

[ValueFromPipeline]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters?view=powershell-7.1#valuefrompipeline-argument

### A Partial Solution

As I said in near the beginning of this article, I'm trying a different process to write both the article and the code.
Due to life and work responsibilities, it has taken me a while to get to the point of having a function that does part of the requirements.

Instead of adding more and more to this article, I want to stop here and reveal what I have have so far.

#### Alternate Way to Get Class Members

I originally used `Get-Member` to pull out properties, and was intending on using it for methods.

As I grew impatient with myself and finishing this article, I decided to look at a few of the published solutions,
namely those of [Jeff Hicks][JeffHicks]{:target="_blank"} and [Doug Finke][DougFinke]{:target="_blank"}.

That's when I realized that by using `Get-Member` I was losing a great deal of power and ease in the PowerShell object structure.
There was a member type of `MemberSet`.

Consider the following.

```powershell
(Get-Process) | Get-Member -MemberType MemberSet -Force
```

```console
   TypeName: System.Diagnostics.Process

Name              MemberType Definition
----              ---------- ----------
psadapted         MemberSet  psadapted {SafeHandle, Handle, BasePriority, ExitCode, HasExited, StartTime, ExitTime, Id,...
psbase            MemberSet  psbase {SafeHandle, Handle, BasePriority, ExitCode, HasExited, StartTime, ExitTime, Id, Ma...
psextended        MemberSet  psextended {PSConfiguration, PSResources, Name, SI, Handles, VM, WS, PM, NPM, Path, Comman...
psobject          MemberSet  psobject {BaseObject, Members, Properties, Methods, ImmediateBaseObject, TypeNames, get_Ba...
PSStandardMembers MemberSet  PSStandardMembers {DefaultDisplayPropertySet}
```

We can use the `psobject` member to access properties, methods, type names, and more.

```powershell
(Get-Process)[0].psobject.Properties | Select-Object -First 1
```

```console
ReferencedMemberName : ProcessName
ConversionType       :
MemberType           : AliasProperty
TypeNameOfValue      : System.String
IsSettable           : False
IsGettable           : True
Value                : ACMON
Name                 : Name
IsInstance           : False
```

My original solution used `TypeName.Split('.')[-1]` to get the last part of the property type.
By using the `psobject.properties`, I can easily reference `TypeNameOfValue`.

[JeffHicks]: https://jdhitsolutions.com/blog/powershell/8059/solving-the-powershell-conversion-challenge/
[DougFinke]: https://github.com/dfinke/IronScripterNewClass
[PSObject]: https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.psobject?view=powershellsdk-7.0.0

#### Building the Class Definition

I'm a big fan of using the `System.Text.StringBuilder` class to build complex string output.
Though with the `AppendFormat` method we can use the composite formatter of .NET, it does not add a new line.
The `AppendLine` method can easily do this.
We just have to wrap the text and input that we want to append as a full line in parentheses.
To output the full text from the `StringBuilder` object, we simply call the `ToString()` method.

The [format operator][f_operator]{:target="_blank"},`-f`, exposes the composite formatter to PowerShell commands.
Basically, it allows you to specify fixed text with one or more placeholders which are replaced by one or more strings usually derived from objects.

Here is how I start building the string for the class definition.

```powershell
$ClassDefinition = [StringBuilder]::new()
[void]$ClassDefinition.AppendLine(('# class definition created by {0} at {1} for object type {2}' -f $MyInvocation.MyCommand,(Get-Date),$ObjectType))
[void]$ClassDefinition.AppendLine('')
[void]$ClassDefinition.AppendLine(('class {0}' -f $BaseClassName))
```

[f_operator]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_operators?view=powershell-7.1#format-operator--f

### Part 1 Solution

My current solution handles 7 out of 10 of the requirements set forth by the IronScripter Chairman.
It handles only 1 of my 6 additional requirements.

Here are a couple samples, followed by the code listing.

```powershell
Get-CimInstance -ClassName Win32_OperatingSystem | ConvertTo-ClassDefinition -IncludeProperty Caption,CSName,Version,InstallDate -ClassName MyOS
```

```console
# class definition created by ConvertTo-ClassDefinition at 1/25/2021 11:40:12 PM for object type Microsoft.Management.Infrastructure.CimInstance#root/cimv2/Win32_OperatingSystem

class MyOS {

    # properties
    [string]$Caption
    [CimInstance#DateTime]$InstallDate
    [string]$CSName
    [string]$Version

    # constructors
    MyOS () { }
    MyOS ([Microsoft.Management.Infrastructure.CimInstance#root/cimv2/Win32_OperatingSystem]$InputObject) {
        $this.Caption = $InputObject.Caption
        $this.InstallDate = $InputObject.InstallDate
        $this.CSName = $InputObject.CSName
        $this.Version = $InputObject.Version
    }

}
```

```powershell
Get-Process | ConvertTo-ClassDefinition -ClassName ANewClass -IncludeProperty StartTime,Id,Name -ExcludeProperty Id
```

```console
# class definition created by ConvertTo-ClassDefinition at 1/26/2021 12:04:44 AM for object type System.Diagnostics.Process

class ANewClass {

    # properties
    [System.String]$Name
    [System.DateTime]$StartTime

    # constructors
    ANewClass () { }
    ANewClass ([System.Diagnostics.Process]$InputObject) {
        $this.Name = $InputObject.Name
        $this.StartTime = $InputObject.StartTime
    }

}
```

<script src="https://gist.github.com/thedavecarroll/a0db4e3b3c97941ddf11e161288408d7.js?file=Part1-ConvertTo-ClassDefinition.ps1"></script>

## Summary

We have covered several foundational PowerShell concepts in our progress of completing this challenge.
Hopefully, you should have a better understanding of PowerShell objects and classes,
including a two ways to examine the object members, `Get-Member` and the `psobject` property.

We reviewed how to restrict the code to a specific version of PowerShell or higher, and how to accept input from the pipeline.

Lastly, we learned how to use the `StringBuilder` class and the `-f` operator to build our class definition.

I will continue to work on this as I have a need for this very thing for my Twitter API module, [BluebirdPS][BluebirdPS]{:target="_blank"}.
I need an easy way to create several classes based on the `PSCustomObject`s that are returned from the API.
This tool will definitely help with that.

I hope you’ve found this interesting or informative.
If you have any comments or questions, please post them below.

Thanks for reading and good luck on the Iron Scripter challenges!

[BluebirdPS]: https://bit.ly/BluebirdPS
