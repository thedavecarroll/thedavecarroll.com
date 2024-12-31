---
title: Creating a Class Definition from an Existing Object - Part 2
description: In this second part of the Iron Scripter challenge walk-through, we convert property and class names to PascalCase, detect property types, and hide properties.
image: /images/ironscripter/class-definition/Silicone_mold_resin_cast_figure.jpg
published: 2021-01-30
tags: ["powershell", "powershell concepts", "custom class", "psobject", "pscustomobject", "learn powershell", "iron scripter", "iron scripter challenge", "iron scripter walk-through"]
categories: ["PowerShell"]
---

## A PowerShell Conversion Challenge

A few days ago I published [Part 1]({{< relref "powershell/creating-class-definition-from-object-part-1.md" >}}) of my solution to the IronScripter [PowerShell Conversion Challenge](https://ironscripter.us/a-powershell-conversion-challenge/).
If you haven't already, please check out that article, as we will be picking up where it left off.

As a quick recap, my solution satisfied 7 out of 10 of the requirements set forth by the IronScripter Chairman,
though it only solved 1 of my 6 additional requirements.

Here are the remaining challenge requirements:

- Insert placeholder for methods
- Let the user specify a method
- Be VSCode aware and insert the new class automatically into the current file

And here are my remaining requirements:

- Contained in a small module, as there will be a few helper functions.
- Use an existing `PSCustomObject` with non-conventional property names.
  - A private function would be used to enforce proper PascalCase casing and removal of punctuation (with maybe exception of period).
  - The constructor would need to be updated to include a method to do the same PascalCase casing. *(included originally in constructor requirements)*
- Should be recursive.
  - Any object that contains a property which is itself another complex object should generate a separate class definition.
- Allow user to specify which properties that will be hidden. *(slightly modified)*
- If not specified, detect the property type and include in definition.

## The Path to a Solution

I said in the first article that I will take you through my thought process as I write the code.
You may have noticed in that article that I did not traverse the list in order.
I'm taking you through the steps that I feel is the best path without having to circle back around.

### PSCustomObject

My requirements included being able to take a `PSCustomObject` as input and generate the class definition with the most appropriate type names for properties.
Having a tool that can handle this will help me greatly in other projects.

Let's see what we have so far.

```powershell
$Person = [PSCustomObject]@{
  Name = 'Dave'
  IsCool = $true
  Age = 50
  DOB = '8/11/1970'
}
$Person | ConvertTo-ClassDefinition -ClassName Person
```

```console
# class definition created by ConvertTo-ClassDefinition at 1/27/2021 9:03:46 PM for object type System.Management.Automation.PSCustomObject

class Person {

    # properties
    [System.String]$Name
    [System.Boolean]$IsCool
    [System.Int32]$Age
    [System.String]$DOB
    [System.Object]$EmptyValue

    # constructors
    Person () { }
    Person ([System.Management.Automation.PSCustomObject]$InputObject) {
        $this.Name = $InputObject.Name
        $this.IsCool = $InputObject.IsCool
        $this.Age = $InputObject.Age
        $this.DOB = $InputObject.DOB
        $this.EmptyValue = $InputObject.EmptyValue
    }

}
```

Suprisingly, it detected the data type for all properties except for the date of birth which it cast as string.

Also, if a property has no value or `$null` value, it simply uses a generic `object` type.
You can't go wrong using that type, unless maybe there is an array in a dataset encountered later.
We won't concern ourselves with that possibility.

Let's save and then dot-source the class definition and try it out.

```powershell
. .\classPerson.ps1
[Person]::new
[Person]::new($Person)
```

```console
OverloadDefinitions
-------------------
Person new()
Person new(System.Management.Automation.PSCustomObject InputObject)

Cannot find an overload for "new" and the argument count: "1".
At line:1 char:1
+ [Person]::new($Person)
+ ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], MethodException
    + FullyQualifiedErrorId : MethodCountCouldNotFindBest
```

As you can see, we received an error.
The constructor was not able to correctly interpret and accept the full name of `System.Management.Automation.PSCustomObject`.

After we shorten it to `PSCustomObject` and go through those same steps, it works as expected.

```powershell
. .\classPerson.ps1
[Person]::new($Person)
```

```console
Name IsCool Age DOB
---- ------ --- ---
Dave   True  50 8/11/1970
```

#### Detection of Data Type

As mentioned in the previous section, the data type for DOB was not automatically detected.
In fact, any type not discovered automatically will be cast as a `string`.
We can assume (maybe incorrectly) that for `PSCustomObject`s, we only have to check those properties cast as `string`.

For the purposes of the original challenge, this should be sufficient.
However, I want to use this tool to help me create class definitions for [BluebirdPS]({{< relref "retired-links.md" >}}).
The output from the TwitterAPI for several objects include different `uri` and `datetime` typed properties.

I'd like to take this time explain the design practice when creating a tool like `Resolve-PropertyType`.

> "A" PowerShell tool, aka function, should do "a" thing.
> Not two things, and not three things or more.
> Just one.

`Resolve-PropertyType` returns a string or an array.
But it doesn't apply formatting or get data or save data.
It takes the input string and then attempts to determine the best guess for the type of data.
As it goes through each `try/catch` block, it checks if the string can be cast as a specific type.
You typically handle errors in the catch block, but for this use case, we only care about successes.

Later on, when we discover that we need to include checks for additional types, and odds are that we will find new types,
we can add it to this smaller function and not get lost in hundreds of lines of code.
Many PowerShell scripters, especially the more advanced, save function definitions in separate files.

Check out the relatively simple function I wrote to handle detection the specific data types - URI, DateTime, and Twitter DateTime.

{{< gist id="a0db4e3b3c97941ddf11e161288408d7" file="Part2-Resolve-PropertyType.ps1" >}}

#### Properly PascalCase Property Names, aka A Case for PascalCase

A proper PowerShell property name should use `PascalCase` which is to capitalize the first letter of each word and forego the use of punctuation.
For instance, use `ComputerName` instead of `computerName`, `Computer Name`, or `computer_name`.
This guidance should be used not only for properties, but also parameters, the noun in function names, enums, variables, class names, etc.

We can assume that property names for .NET classes should already adhere to proper naming and capitalization convention.
Therefore, we should examine the property names only for `PSCustomObject` typed objects.
These objects are typically generated "on-the-fly" or by explicitly converting one object type to a `PSCustomObject`.
When you use `Invoke-RestMethod` and the response is a JSON string, the response is converted to a `PSCustomObject`.

This latter case is driving my design requirement of converting property names to proper PascalCase.
The output from the API calls in `BluebirdPS` return a `PSCustomObject` with property names all lowercase with underscores between words.

```powershell
Get-TwitterUser -ScreenName thedavecarroll
```

```console
id                                 : 292670084
name                               : Dave Carroll
screen_name                        : thedavecarroll
location                           : Nashville, TN
...
```

As you can see, `screen_name` does not *look* like a property on a typical PowerShell object.

Here are the desired names.

```console
Id
Name
ScreenName
Location
```

If this scenario sounds familiar, you may be recalling a recent article by Jeff Hicks, [Creating PowerShell Property Names](https://jdhitsolutions.com/blog/powershell/7937/creating-powershell-property-names/).
Jeff was playing around with the `BluebirdPS` module and called out the fact that it does not output a proper looking PowerShell object.
Obviously, I knew that the API-based commands returned the raw object from Twitter, after conversion by `Invoke-Method`.
It was a matter of releasing the minimum viable product to get it in the hands of people, maybe even awesome people like Jeff, to begin testing.
I chose to ship it without proper looking objects and several other features.

> I just want to mention that the call-out was greatly appreciated,
> mainly because it meant that someone in the PowerShell community was using BluebirdPS,
> if not to just play around with it.
> For someone so prominent in the community as Jeff Hicks to spend time on it and
> write an article about an aspect so others can learn just a little more about PowerShell,
> I was incredibly flattered and perhaps just a little flabbergasted.
>
> Jeff also submitted a few issues for BluebirdPS.
>
> Thank you, Jeff!

Here is another simple function that should convert any string, array of strings, to PascalCase.
It uses the Regex non-word token, `\W`, to match on most punctuation.
Ironically, the BluebirdPS output uses the only punctuation that Regex considers to be a "word" and I had to include it as an alternate matching pattern.
Then I use the `ToTitleCase()` method of the `TextInfo` class, that's returned as a property of the same name from `Get-Culture`, to uppercase the first letter.

When I realized that some properties were already PascalCase, I included an `if/else` statement to skip anything that was not implicitly converted.

{{< gist id="a0db4e3b3c97941ddf11e161288408d7" file="Part2-ConvertTo-PascalCase.ps1" >}}

To discover more best practices and guidelines for style, visit the unofficial [PowerShellPracticeAndStyle](https://github.com/PoshCode/PowerShellPracticeAndStyle) repo.
The [Code Layout and Formatting](https://github.com/PoshCode/PowerShellPracticeAndStyle/blob/master/Style-Guide/Code-Layout-and-Formatting.md#capitalization-conventions) document specifically discusses the capitalization conventions.

### Updated Constructor

In the original parameterized constructor, `MyClass([Object]$InputObject)`, all the *setter* statements looks like this.

```powershell
'{0}{0}$this.{1} = $InputObject.{1}' -f $Indent,$Property.Name

# after string interpolation with a property with name of PropertyName1
$this.PropertyName1 = $InputObject.PropertyName1
```

This works well for most object types.
However, now that we potentially change the property names for `PsCustomObject` typed input objects,
we need to update the constructor's setter statements.

With a bit of added logic, we use the following for specific types.

```powershell
# generic property setter, works for uri
$PropertySetter = '$InputObject.{0}' -f $Property.Name

# datetime Parse setter
$PropertySetter = '[datetime]::Parse($InputObject.{0},(Get-Culture))' -f $Property.Name

# datetime ParseExact setter
$PropertySetter = '[datetime]::ParseExact($InputObject.{0},''{1}'',(Get-Culture))' -f $Property.Name,$PropertyTypeConversion[2]
```

- The `uri` data type does not require a modification as the `new()` constructor takes a string which has already been validated.
- The Parse `datetime` requires the use of the `Parse()` static method of the `datetime` class.
  If the property was in a known format, it would use this setter.
- The ParseExact `datetime` requires the use of the `ParseExact()` static method of the `datetime` class so a specific format can be provided.
  This allows us to set the property value after converting from a datetime value in a specific format, such as the format the Twitter API returns.

The new property setter uses the property name converted to PascalCase and the `$PropertySetter` string is added resulting the following.

```powershell
'{0}{0}$this.{1} = {2}' -f $Indent,$PascalCaseProperty,$PropertySetter
```

Since we could be converting the property name to PascalCase, we need to update the property definition.

```powershell
$PropertyStatement = '{0}[{1}]${2}' -f $Indent,$PropertyTypeName,$PascalCaseProperty
```

### Hidden Properties

The last requirement I want to cover in this article *(spoiler alert there will be another part/article for this challenge)* is allowing the user to hide specific properties.
This is a simple addition of another parameter.

```powershell
[ValidateNotNullOrEmpty()]
[Alias('Hidden')]
[string[]]$HiddenProperty
```

In a class definition, to make the parameter hidden, simply add `hidden` prior to the type definition.

```powershell
hidden [String]$IdStr
```

I provide a bit of logic to the property definition section to add the `hidden` attribute based on the original name or the converted PascalCase name of the property name.

### Property Attributes

Class properties can have property attributes that defines how the property can be used, how the values contained in it are validated, and whether visible.

- hidden
  - A hidden property is not readily visible, but it is still available to the user through direct reference, `$MyObject.HiddenProperty`, and can be revealed through the use of `Get-Member -Force`.
- static
  - The static attribute can be used for a property and/or a method.
- validation
  - You can use the same validation attributes as you can for advanced functions.

Check out more information on the [hidden attribute](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hidden?view=powershell-7.1) and [static and property validation attributes](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_classes?view=powershell-7.1#static-attribute) on the Microsoft Docs site.

### One Last Thing on the PascalCase Case

As I was tidying up this article to get it ready for publishing, I discovered my original `ConvertTo-PascalCase` had a bug.
A lowercase string, without punctuation, was not properly returned as PascalCase.

I added another step to test for beginning uppercase `^[A-Z]` but that didn't seem to work either.
Until I realized that the regex operators `match` and `notmatch` are not case sensitive.
Once I changed the operator to `-cnotmatch`, it started working as needed.

## Part 2 Solution

Here is my current `ConvertTo-ClassDefinition` function.

{{< gist id="a0db4e3b3c97941ddf11e161288408d7" file="Part2-ConvertTo-ClassDefinition.ps1" >}}

And here is a sample output from `Get-TwitterUser -ScreenName thedavecarroll | ConvertTo-ClassDefinition -ClassName 'BluebirdPSUser' -HiddenProperty 'id_str'`.

{{< gist id="a0db4e3b3c97941ddf11e161288408d7" file="Part2-BluebirdPSUserClass.ps1" >}}

## Summary

I originally thought this article was going to complete the challenge but, as I mentioned above, I'm not done.

In this one, I focused on some of my own requirements, namely enforcing PascalCase for class and property names, resolution of property types that are generically cast as `string` objects, and allowing the user to specify properties to hide.

In the next article, I plan to explore and cover the remaining requirements:

- Insert placeholder for methods
- Let the user specify a method
- Be VSCode aware and insert the new class automatically into the current file
- Should be recursive.
  - Any object that contains a property which is itself another complex object should generate a separate class definition.
- Contained in a small module, as there will be a few helper functions.

I hope you’ve found this interesting or informative.
If you have any comments or questions, please post them below.

Thanks for reading and good luck on the Iron Scripter challenges!
