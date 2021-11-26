---
layout: single
title: "Creating a Class Definition from an Existing Object - Part 3"
excerpt: "Wrapping up this series, we add methods and recursive capability to the ConvertTo-ClassDefinition function for this Iron Scripter challenge walk-through."
date: 2021-02-02
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

In this article, the last in a series on my solution to the IronScripter [PowerShell Conversion Challenge][IronScripterChallenge]{:target="_blank"},
I will be exploring and solving for the remaining requirements.

## Last Week, On Creating a Class Definition

In [part 1][SolutionPart1]{:target="_blank"}, I covered the basics for PowerShell objects and classes,
the `Get-Member` command, the `Requires` statement, `ValueFromPipeline` to accept input from the pipeline, and the `StringBuilder` class.
It solved 7 primary requirements and 1 personal requirement.

In [part 2][SolutionPart2]{:target="_blank"}, I covered converting property and class names to PascalCase, detecting property types, and hiding properties.
It solved 3 personal requirements.

Primary challenge requirements:

- Insert placeholder for methods
- Let the user specify a method
- Be VSCode aware and insert the new class automatically into the current file

My personal requirements:

- Should be recursive.
  - Any object that contains a property which is itself another complex object should generate a separate class definition.
- Contained in a small module, as there will be a few helper functions.

[SolutionPart1]: https://powershell.anovelidea.org/powershell/creating-class-definition-from-object-part-1/
[SolutionPart2]: https://powershell.anovelidea.org/powershell/creating-class-definition-from-object-part-2/
[IronScripterChallenge]: https://ironscripter.us/a-powershell-conversion-challenge/

## Unexpected Release of Article

Just a quick note that this article was originally published on Feb 1 through an egregious error on my part.
I must have git-staged all the files for the blog and didn't noticed when I pushed it up.
I had created part of the outline in my `_posts` folder instead of the safer `_drafts` folder.

This unexpected release has merely spurred me on toward completing it.

> My site is static generated html using Jekyll, GitHub Pages, and Travis-CI.
> If you are interested in learning how it all ties together, check out the [How I Blog][HowIBlog]{:target="_blank"} article I posted in August 2018.

[HowIBlog]: https://powershell.anovelidea.org/blog/how-i-blog/

## Method Classes

Let's take care of 2 primary requirements right off the start.
We need to provide a way for the user to add one or more methods the class definition.

A class method is basically a function, with a name, typed parameters, and an output type.
The output type must be declared, even if it's `[void]`.

We will need to add a new parameter, `$Method`, and allow it to accept an array of strings.
For the purposes of this challenge, I don't think we need to go further than just adding the basic structure.
The PowerShell developer will need to update each method block created.

In the following example, the user will need to update the method `OutputTypeName`, the `TypeName` of the parameters, and will need to fill in the rest of the code.
The `return $Output` is a reminder that this method will require output.

```powershell
[OutputTypeName] UpdateProfile (
    [TypeName]$Param1,
    [TypeName]$Param2
) {
    # your code
    return $Output
}
```

If the user wanted to simply updated a property without showing output, they can update the method resemble the following.

```powershell
[void] UpdateProfile (
    [TypeName]$Param1
) {
    $this.Property1 = $Param1
}
```

Look at the final solution for details.

## Huge Bug

As I was validating the addition of the code to include methods, I discovered that,
while I thought I was allowing the user to provide properties to include or exclude regardless if the user provided the original property name or the PascalCase property name,
it was not honoring the PascalCase portion.

I managed to fix the issue which you can see in detail in the full solution listing below.

## Recursive

One of my requirements was that the class should be recursive.
That is to say that any object that contains a property which is itself another complex object *(PSCustomObject)* should generate a separate class definition.
And the class name for the child classes should include the class name from the upstream object.
This requirement was entirely selfish on my part, as I know that there are several nested objects in the BluebirdPS output returned by the Twitter API.

I thought this would be a tough requirement to resolve, but it took me just a few minutes.
It's taking me longer to type this than the 1 line of code below that added recursion.

```powershell
$PascalCaseProperties[$PascalCaseProperty].Value | ConvertTo-ClassDefinition -ClassName "$BaseClassName$PascalCaseProperty"
```

## Simple Module

My final requirement was to wrap the commands into a module.
I could use `New-ModuleManifest` and create a manifest based module.
But it's late and I want to get this complete.
The simplest way to make these three functions into a module is simply add them into a single file and save it with an extension of `psm1`.
This type of module is called a script module.

## Part 3 - The Final Solution

So, if you were keeping track, I still have one primary requirement outstanding.
I haven't looked into what it would take to have the output added to the currently opened file in VS Code.
My cheat is simple sending the output to the clipboard.
*I could have used used `Set-Clipboard`, but `clip` saves me several characters as I use it extensively.*

```powershell
Import-Module .\IronScripterSolutions\2021-01-05\Part3-ClassDefinition.psm1
$TwitterUser = Get-TwitterUser -ScreenName thedavecarroll
$TwitterUser | ConvertTo-ClassDefinition -ClassName BluebirdPSUser | clip
```

Here is the module.

<script src="https://gist.github.com/thedavecarroll/a0db4e3b3c97941ddf11e161288408d7.js?file=Part3-ClassDefinition.psm1"></script>

And here is sample output from the following command.
This shows how you can add methods, include files, exclude properties, and hide properties.
And you can see the method names are properly converted to PascalCase.

```powershell
Get-TwitterUser -ScreenName thedavecarroll | ConvertTo-ClassDefinition -ClassName BluebirdPSUser -Method UpDate-proFile,Set_Location -IncludeProperty Id,ScreenName,DefaultProfile,Location,Lang,Id_str -ExcludeProperty Lang -HiddenProperty id_str
```

<script src="https://gist.github.com/thedavecarroll/a0db4e3b3c97941ddf11e161288408d7.js?file=Part3-BluebirdPSUserClass-AddMethods.ps1"></script>

And, the *coup de grâce*, sample output from a fully functioning recursive function.

<script src="https://gist.github.com/thedavecarroll/a0db4e3b3c97941ddf11e161288408d7.js?file=Part3-BluebirdPSUserClass-Recursive.ps1"></script>

## Summary

In this article, we finished up the IronScripter PowerShell Conversion Challenge.
We covered class methods (just a little), discovered and corrected a bug, made the primary function recursive, and turned the three commands into a script module.
Feel free to use any of the code, no warranty guaranteed or implied.
Personally, I know that when I return to BluebirdPS development, I'll definitely be using this tool to generate custom classes.

I hope you’ve found this interesting or informative.
I really would like to hear your thoughts on this article.
If you have any comments or questions, please post them below.

Thanks for reading and good luck on the Iron Scripter challenges!
