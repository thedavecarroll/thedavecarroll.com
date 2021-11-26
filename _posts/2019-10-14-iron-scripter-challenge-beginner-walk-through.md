---
layout: pages
title: "PowerShell Beginners Have to Start Somewhere"
excerpt: "Learn basic PowerShell concepts and apply them to the beginner's Iron Scripter challenge."
date: 2019-10-13
header:
  overlay_image: /assets/images/iron-scripter-beginner.png
  overlay_filter: 0.9
comments: true
toc: true
toc_label: On This Page
toc_icon: list
toc_sticky: true
share: true
tags:
  - powershell
  - powershell concepts
  - learn powershell
  - powershell beginner
  - iron scripter
  - iron scripter challenge
  - iron scripter walk-through
category:
  - powershell
---

![IronScripter]({{ site.url }}{{ site.baseurl }}/assets/images/iron-scripter-beginner.png)

## Introduction

Iron Scripter grew out of the scripting games at PowerShell Summit and the quote below comes from the introductory post
on the [Iron Scripter site][1]{:target="_blank"}.

>The Chairman has decided that it is in the best interests of his Iron Scripters, and those that wish to attain that
>valued designation,  that training continue year-round. To that end, he has commissioned a series of PowerShell
>challenges. These challenges will range in complexity and be tagged accordingly.
>
>— Iron Scripter, Let The PowerShell Challenges Begin, June 7, 2019

I've completed three of the online Iron Scripter challenges and, as I finished the last one, I decided to go back
through the ones that I skipped.

The beginner challenge seemed like a great opportunity to discuss some PowerShell concepts.

If you are new to PowerShell or just have a little knowledge or experience with it, please continue reading.

## PowerShell Concepts

In this post, you will learn about the following PowerShell concepts.

* PowerShell Editions
* Help System
  * Conceptual Help
  * Get-Help
* Commands
  * Verb-Noun Naming Convention
    * Verb
    * Noun
  * Types
    * Cmdlets
    * Functions
    * Aliases
* Variables
  * Environment Variables
* Parameters
  * Positional
  * Default Values
  * Unique Names, i.e. Shortened
* Pipeline

## PowerShell Beginners Have to Start Somewhere

Here is the [link][2]{:target="_blank"} to original "PowerShell Beginners Have to Start Somewhere" challenge.

## Challenge Directions

Get all files in a given folder including subfolders and display a result that shows the total number of files, the
total size of all files, the average file size, the computer name, and the date when you ran the command.

_This should not be written as a script or function. It should be one or two lines of PowerShell that you would type at_
_the console to generate the desired result._

## PowerShell Editions

PowerShell currently comes in three editions: Windows PowerShell, PowerShell Core, and PowerShell.

Edition | Operating System | Versions | PSEdition | .Net Version
|-|-|-|-|-|
Windows PowerShell | Windows only | 1.0-5.1 | Desktop | .Net Framework
PowerShell Core | Windows, Linux, MacOS | 6.x | Core | .Net Core 2.0
PowerShell | Windows, Linux, MacOS | 7.x | Core | .Net Core 3.0

For more information on PowerShell editions, visit Microsoft Docs entry for
[About PowerShell Editions][3]{:target="_blank"}.

For this challenge, let's assume Windows PowerShell edition will be used.
{: .notice--success}

## Help System

Before we start the challenge, you should know how to get help for the various commands and concepts that we will cover
in this post.

The first concept is PowerShell's Help system. You access it primarily via the `Get-Help` command. It is a command that
you should know how to use as it will provide you invaluable information on your PowerShell learning path.

In a PowerShell console, enter the following statement. Note that the command is not case sensitive.

```powershell
get-help
```

In the console, you should see details on the Powershell Help system.

### Conceptual Help

If you wanted to know more about PowerShell concepts, you can always use `Get-Help`. For example, if you wanted to know
more about variables, you can type the following in the console.

```powershell
get-help variables
```

The output is a list of topics that contain the word _variables_. In the list, you should see several entries that start
with _about_ with a category of _HelpFile_. This type of help is called _conceptual help_ and can provide information on
concepts or even modules. Modules, a grouping of commands for a specific task, are outside the scope for this challenge.

You can narrow your command to only search for the concept _about\_variables_.

```powershell
get-help about_variables
```

### Get-Help

As this is a challenge walk-through for beginners, we will be using `Get-Help` significantly. Let's see what the Help
system has for this command.

```powershell
Get-Help Get-Help
```

Though it seems redundant, the statement is using the command to display information about itself. At the end of the
output, you should see the following lines.

```console
REMARKS
    To see the examples, type: "Get-Help Get-Help -examples".
    For more information, type: "Get-Help Get-Help -detailed".
    For technical information, type: "Get-Help Get-Help -full".
    For online help, type: "Get-Help Get-Help -online"
```

The words after the dashes, such as `-examples`, are parameters for the `Get-Help` command. More on parameters later.

## Verb-Noun Naming Convention

You might be wondering about the `Get-Help` command itself, specifically why is there a dash between _get_ and _help_.
The names of PowerShell commands are typically (and best practice) in the form of _verb-noun_.

### Verb

The first part of the name is a verb and identifies the type of action the command does. There are standard verbs that
are allowed which are grouped based on what on the verb normally acts upon.

Use `Get-Verb` to list the verbs available and their groups. Don't worry about knowing all of the verbs.

```powershell
get-verb
```

For this challenge, we will use the verbs: _Get_, _Measure_, and _Select_.
{: .notice--success}

### Noun

The second part of the command name after the dash is the _noun_. The verb acts upon the noun. In the case of
`Get-Help`, the command will _get_ information on _help_. The noun could be _object_, _item_, _service_, _path_, or any
number of other things.

For this challenge, we will use the nouns: _ChildItem_, _Object_, and _Date_.
{: .notice--success}

## Command Types

There are several types of commands, such as cmdlets, functions, and aliases. Even PowerShell scripts are considered a
type of command just like applications, such as _notepad.exe_.

### Cmdlet

`Get-Help` is an example of a cmdlet. PowerShell *cmdlets* (pronounced _command-lets_ or _command-let_ for singular) are
commands that are typically written in .NET (or .NET Core) C# programming language and compiled.

### Function

`Get-Verb` is an example of a function. PowerShell *functions* are self-contained PowerShell statements. Basic and
advanced functions can be written. Advanced functions provides greater control over the input, processing, and output of
the command. To learn more about functions, see the conceptual help using `Get-Help about_Functions`.

For this challenge, we will not use functions.
{: .notice--success}

### Alias

A PowerShell *alias* is an alternate name for another command. Aliases are typically short forms of command names and
save you several keystrokes at the console.

There are several default aliases. To see all aliases configured in your current session, you can use `Get-Alias`. To
learn more about aliases, see the conceptual help using `Get-Help about_Aliases`.

For this challenge, we will use aliases.
{: .notice--success}

Note: When you start writing your own scripts or functions, you should always use the command's full name, and never use
aliases. Full command names are easier to read for other users of your code, or even your future self.

## Walk-Through Step 1

>Get all files in a given folder including subfolders.

A quick internet search, using _powershell list files_, should reveal that the command you would use to list files or
folders is `Get-ChildItem`. For ease of use, we will assign the output to a variable, `$files`.

I also provided a hint that we would be using a command with the noun of _ChildItem_ in the
**Verb-Noun Naming Convention** section above.
{: .notice}

By default, `Get-ChildItem` returns the top-level folders _and_ files. We only want files and we want to get all
subfolders.

If you are unsure how to tell `Get-ChildItem` to only return files or how to get all subfolders, review the output from
`Get-Help -Name Get-ChildItem -Detailed`.

The command for our first directive could look like the following.

```powershell
$files = gci -r -file
```

The command explained:

* The `$files` is the name of the variable that will receive the results from the command.
* The `gci` is an alias for `Get-ChildItem`.
* The `-r` represents the `-Recurse` switch parameter for `Get-ChildItem`.
* The `-file` switch parameter tells `Get-ChildItem` to only return files.

### Variables

Variables allow you to store the results of a command which you can reference later. There are different types of
variables - user-defined, automatic, and preference. Variables are stored in memory and may be accessed during the
current PowerShell console session. User-defined variables can be manually removed from memory.

For more information on the types of variables, see the conceptual help using `Get-Help about_Variables`,
`Get-Help about_Automatic_Variables`, and `Get-Help about_Preference_Variables`.

### Get-ChildItem Aliases

Let's look at the aliases for `Get-ChildItem`.

```powershell
Get-Alias -Definition Get-ChildItem
```

```console
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           dir -> Get-ChildItem
Alias           gci -> Get-ChildItem
Alias           ls -> Get-ChildItem
```

From this output, you can see that there are three aliases for `Get-ChildItem`.

1. The alias `dir` helps persons that are familiar with DOS commands.
2. The alias `ls` helps persons that are familiar with Linux commands.
3. And the alias `gci` is just an abbreviation for the cmdlet.

### Parameters

Parameters, such as `Recurse` and `Definition`, allow you to provide input to PowerShell commands.

#### Positional Parameters

By examining help again using `Get-Help -Name Get-ChildItem -Full`, we see that `Path` is the only parameter with a
position of _0_. This means that the first item immediately after the cmdlet name, that is not another parameter, will
be assigned to the `Path` parameter. Other cmdlets and custom functions could have one or more positional parameters.

#### Parameter Default Values

The command for the challenge technically uses a _default value_ for the `Path` parameter. After reviewing the cmdlet help
again, we see that `Path` has a default value of _current directory_. If you do not specify a path (or the `LiteralPath`
parameter), the command will automatically return results for the current directory. To learn more about default values,
see `Get-Help about_Parameters_Default_Values`.

#### Shortened Parameter Names

With one of the directives that this solution should be entered in the PowerShell console, I have chosen to use aliases
and shortened parameters.

Parameter names can be shortened, as long as they uniquely identify a parameter. For instance, `-r` is sufficient since
there are no other parameters that begin with the letter _r_. However, for `-file`, there is more than one parameter
that begins with the letter _f_. You can see from the cmdlet help, or from auto-completion at the prompt, that there are
three parameters that begin with the letter _f_, four for PowerShell Core.

* Filter
* Force
* File
* FollowSymlink (PowerShell Core)

For uniqueness, you can see that to return only files, you will need to use the full parameter name, `-File`.

Parameter names are not case sensitive.

Note: As with _aliases_, when you start writing your own scripts or functions, you should always use the parameter's
full name, and never use shortened or rely on the parameter's position.

## Walk-Through Step 2

> [D]isplay a result that shows the total number of files, the total size of all files, the average file size, the
> computer name, and the date when you ran the command.

The second step of the challenge is to display the following output.

* Total number of files
* Total size of all files
* Average file size
* The computer name
* Date when executed

We can satisfy the requirements at least a couple different ways, but there are two components that are identical for
both.

### Number, File Size, Average

When you checked out help for `Get-ChildItem`, you may recall reading that _file size_ corresponds to the `length`
property. A quick internet search, using _powershell file length sum_, should reveal the `Measure-Object` cmdlet, which
has an alias of `measure`.

Let's examine help for `Measure-Object` a slightly different way than we have previously.

```powershell
Get-Help -Name Measure-Object -Online
```

The statement above will open your default browser to the online help version for the cmdlet. We saw the `online`
switch parameter when we looked at the help for `Get-Help`.

### Measuring $files

Let's look at how we can get the first three items in the list using `Measure-Object`.

Example 2 in the online help shows how to measure files.

> This command displays the Minimum, Maximum, and Sum of the sizes of all files in the current directory, and the
> average size of a file in the directory.

For this challenge, we need the sum and the average of the length attribute. From the online help, we know that
`Average`, `Sum`, and `Property` are the parameters we need to use.

Let's use the cmdlet alias, positional parameter for `Property` (position _0_), and shortened form for the last two
parameters.

```powershell
$files | measure length -a -s
```

This results in something like the following.

```console
Count    : 11316
Average  : 11022.5791799222
Sum      : 124731506
Maximum  :
Minimum  :
Property : Length
```

Disregard the actual values, as they will be different. What is important
is that we see the average and the sum of the length, along with a _count_ property. That actually satisfies the first
three requirements for output.

## More Concepts

### Get Computer Name

Now, how do we get name of the computer? A quick search for _powershell get name of computer_ reveals a new type of
variable, `$env:COMPUTERNAME`.

#### Environment Variables

The variable `$env:COMPUTERNAME` holds the name of the local computer. It is just one of many environment variables and
is an _automatic variable_. You can see all environment variables by entering `gci env:` and find more information about
them using `get-help about_environment_variables`.

### Get Date

Given what you have learned so far about how commands are named using _verb-noun_, hopefully you can take a guess the
command you can use to get the date.

If you said `Get-Date`, then you are absolutely right.

### That Symbol Explained

The '\|' symbol is called a pipe. PowerShell uses it to denote the pipeline.

#### Pipeline

In PowerShell, multiple commands can be placed after each other, separated by the pipe, to create a pipeline. The output
from the first command feeds into the next. The output for the second command feeds into the next, and so on.

Some cmdlets and functions accept output as it is received on the pipeline. There's a lot you can learn about pipelines,
but the topic is a little more advanced than what we need to cover here. For the purpose of the challenge, just knowing
what the symbol is called and what it represents should be sufficient.

You can always see what the Help system has about pipelines using `Get-Help about_pipelines`. If that does not return
anything, you may need to update your Help system using `Update-Help` in an elevated, that is _Run as Administrator_,
PowerShell console session.

## Solution 1

In order to fulfil the last two requirements, we need to use the `Select-Object` cmdlet and create two calculated
properties for computer name and the date. Calculated properties are essentially PowerShell expressions, also called
statements, enclosed in curly braces `{}`.

The `Select-Object` has a named parameter of `Property` which just happens to also be position _0_. Furthermore, it
accepts a list of properties.

Now that we the necessary basic PowerShell concepts to complete this challenge, let's put it all together.

This solution begins differently than the ones discussed so far. This version omits the use of the `$files` variable and
is about the shortest possible.

```powershell
gci -r -file | measure length -a -s | select Count,Sum,Average,{$env:COMPUTERNAME},{Get-Date}
```

#### Solution 1 Output

```console
Count             : 11322
Sum               : 124909506
Average           : 11032.4594594595
$env:COMPUTERNAME : COMP1
Get-Date          : 10/14/2019 12:06:34 AM
```

Solution 1 was taken primarily from John Steele's response to the challenge which you can find below.

<script src="https://gist.github.com/camusicjunkie/7d7f25c1f3ebbae966493b866267dd34.js"></script>

## Solution 2

This solution is very similar to Solution 1, except that we use a _hashtable_ for the calculated properties in order to
name the properties. If you just use an expression, the expression itself is used as the name for the property.

```powershell
$files = gci -r -file
$files | measure length -a -s | select Count,Sum,Average,@{l='ComputerName';e={$env:COMPUTERNAME}},@{l='Date';e={Get-Date}}
```

#### Solution 2 Output

```console
Count        : 11322
Sum          : 124909506
Average      : 11032.4594594595
ComputerName : COMP1
Date         : 10/14/2019 12:14:44 AM
```

Use the Help system to learn more about _hashtables_.
{: .notice--info}

## Solution 3

This was the solution that I originally wrote. It outputs the same values but as a custom object. It uses a few
advanced concepts, such as _type accelerators_ and an array `count` property, that we didn't cover here.

```powershell
$files = gci -r -file
[PsCustomObject]@{ComputerName=$env:COMPUTERNAME;Time=(Get-Date);FileCount=$files.Count;TotalFileSize=($files | measure length -s).sum;AveFileSize=(($files | measure length -a).average/$files.count)}
```

This solution is also not the most efficient solution. How many inefficiencies can you spot? Feel free to leave them in
the comments below.

## Alternate Solutions

On the challenge's page, three Iron Scripters submitted their own. We've seen one; here are the other two.

#### Alternate Solution 1

<script src="https://gist.github.com/AspenForester/07545d0b47317de4e4fc6f2363392605.js"></script>

#### Alternate Solution 2

[GitHub Repo Link][4]{:target="_blank"}

## Summary

We have covered several foundational PowerShell concepts in order to complete the Iron Script's beginner challenge.

To complete the challenge, you used the commands `Get-ChildItem`, `Measure-Object`, and `Select-Object`, or more
accurately, their aliases.

Hopefully, you now have a better understanding of the PowerShell Help system and how to use `Get-Help` to learn about
concepts and commands. You learned about the _Verb-Noun_ naming convention, a few types of commands, and variables.
You also learned about parameters and their positions, default values, and that they can be shorted. And lastly, you
learned about the PowerShell pipeline which is one of the scripting languages greatest strengths.

I hope you’ve found this interesting or informative. If you have any comments or questions, please post them below.

Thanks for reading and good luck on the Iron Scripter challenges!

[1]: https://ironscripter.us
[2]: https://ironscripter.us/powershell-beginners-have-to-start-somewhere/
[3]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_editions?view=powershell-6&viewFallbackFrom=powershell-5.1
[4]: https://github.com/Dalcron/IronScripter/blob/master/JUL_15_2019_Challenge.ps1
