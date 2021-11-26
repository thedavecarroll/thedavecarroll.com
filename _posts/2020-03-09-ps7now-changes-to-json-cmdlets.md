---
layout: single
title: "PowerShell 7 Changes to JSON Cmdlets"
excerpt: "We wanted to cover some of the changes that demonstrate the efficacy of adopting the newest, fastest, and best PowerShell. This article focuses on the JSON cmdlets - **ConvertFrom-Json**, **ConvertTo-Json**, and the new addition **Test-Json**."
date: 2020-03-09
header:
  overlay_image: /assets/images/ps7now/pwsh-7-json-cmdlets.png
  overlay_filter: 0.7
comments: true
share: true
tags:
  - psblogweek
  - ps7now
  - powershell7
  - pwsh
  - convertfrom-json
  - convertto-json
  - test-json
  - json
  - json-schema
  - json schema
category:
  - powershell
---

![PowerShell 7 JSON Cmdlets]({{ site.url }}{{ site.baseurl }}/assets/images/ps7now/pwsh-7-json-cmdlets.png)
{: .full}

## #PS7Now! PowerShell 7 Is Here!

Part of [#PSBlogWeek][PSBlogWeek]{:target="_blank"}, this article is one of many from several community members and PowerShell bloggers, like me, that focus on a given topic.

The topic of this #PSBlogWeek is **PowerShell 7**.

**Quick Note:**\\
I was incredibly flattered when Jeff asked me to participate in this #PSBlogWeek.
Though I'm relatively new to the blogging scene, I've been using Windows PowerShell well over 10 years.
Most recently and beyond this blog, I've participated in several [IronScripter][IronScripter]{:target="_blank"}
challenges, contributed a chapter on soft skills in the [PowerShell Conference Book, Volume 2][PSConfBook2]{:target="_blank"},
and been part of conversations within the PowerShell community.
\\
\\
But enough about me, I'm sure you want [#PS7Now][PS7Now]{:target="_blank"}!
{: .notice--info}

With the official release of **PowerShell 7**, we wanted to cover some of the changes that demonstrate the efficacy of adopting the newest, fastest, and best PowerShell.

In this article, we will be looking at the JSON cmdlets - `ConvertFrom-Json`, `ConvertTo-Json`, and the new addition `Test-Json`*.

\* `Test-Json` was technically introduced in PowerShell Core 6.2.
{: .notice--info}

[PSBlogWeek]: https://twitter.com/search?q=%23PSBlogWeek&f=live
[PS7Now]: https://twitter.com/search?q=PS7Now&f=live
[IronScripter]: https://ironscripter.us/category/challenge/
[PSConfBook2]: http://bit.ly/3aYIshr

## PowerShell 7 Changes to JSON Cmdlets

The `Convert*-Json` cmdlets were introduced with Windows PowerShell 3.0 in late 2012.
Since the release of Windows PowerShell 5.1 in early 2017, there have been several improvements to the cmdlets, including updates to the underlying dependencies.

Many of these improvements have been driven by community members just like you via the [PowerShell GitHub repository][PowerShellRepo]{:target="_blank"} through issues, comments, voting, and even pull requests.
{: .notice--success}

Now, without further adieu, let's check them out.

[PowerShellRepo]: https://github.com/PowerShell/PowerShell

## ConvertFrom-Json

Comparing the syntax for the `ConvertFrom-Json` cmdlets from Windows PowerShell 5.1 and **PowerShell 7**, we can see that the new cmdlet has three new parameters.

```powershell
PS> Get-Command -Name ConvertFrom-Json -Syntax

# Windows PowerShell 5.1
ConvertFrom-Json [-InputObject] <string> [<CommonParameters>]

# PowerShell 7
ConvertFrom-Json [-InputObject] <string> [-AsHashtable] [-Depth <int>] [-NoEnumerate] [<CommonParameters>]
```

We won't be focusing on the existing parameters (which, in reality is just one), but we will examine each of the new ones in greater detail in the next few sections.

### -AsHashtable

Originally introduced in PowerShell Core 6.0 and updated in later releases, this switch parameter allows the cmdlet to overcome a few limitations of outputting converted JSON to a `[PsCustomObject]`.

Specifically, a `[PsCustomObject]` has the following limitations:

* Property names cannot be empty
* Property names are case insensitive
* Slower than a `[Hashtable]` to add new properties
* Slower than a `[Hashtable]` to search

What was the original behavior for the cmdlet in 5.1?

```powershell
PS> $validJson = @'
{
  "array": [
    1,
    2,
    3
  ],
  "boolean": true,
  "null": null,
  "number": 123,
  "object": {
    "a": "b",
    "c": "d"
  },
  "string": "Hello World",
  "String": "Party On!",
  "" : "Empty Property Name1"
}
'@

PS> $validJson | ConvertFrom-Json
ConvertFrom-Json : Cannot convert the JSON string because a dictionary that was converted from the string contains the
duplicated keys 'string' and 'String'.
At line:1 char:14
+ $validJson | ConvertFrom-Json
+              ~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (:) [ConvertFrom-Json], InvalidOperationException
    + FullyQualifiedErrorId : DuplicateKeysInJsonString,Microsoft.PowerShell.Commands.ConvertFromJsonCommand
```

Despite using valid JSON input, the older cmdlet would stop your code in its tracks.
*No bueno.*

Now, what about the new cmdlet behavior?

```powershell
PS> $validJson | ConvertFrom-Json
ConvertFrom-Json: Cannot convert the JSON string because it contains keys with different casing. Please use the -AsHashTable switch instead. The key that was attempted to be added to the existing key 'string' was 'String'.
```

This returns a very succinct and descriptive error *(due to the new default `$ErrorView` of `ConciseView` in **PowerShell 7**)*.

As suggested by the error message, the `-AsHashtable` switch will come to the rescue!

```powershell
PS> $validJson | ConvertFrom-Json -AsHashtable

Name                           Value
----                           -----
array                          {1, 2, 3}
null
String                         Party On!
                               Empty Property Name1
boolean                        True
string                         Hello World
object                         {a, c}
number                         123
```

The addition of this parameter makes `ConvertFrom-Json` play nicer with valid JSON and will give you a way to speed up your code when dealing with large datasets by manipulating the hashtable instead.

If you want to see how the community contributed to this parameter, check out issues [#3623][3623]{:target="_blank"} and [#3159][3159]{:target="_blank"}.
{: .notice--success}

[3159]: https://github.com/PowerShell/PowerShell/issues/3159
[3623]: https://github.com/PowerShell/PowerShell/issues/3623

### -Depth

Introduced in PowerShell Core 6.2, this parameter allows you to set the maximum depth of JSON input.
It was named to align with a similar parameter of `ConvertTo-Json`.

In 5.1, if you attempted to convert a greater depth than 101, you would get a `ConvertFrom-Json : RecursionLimit exceeded. (606)` error and a sea of red in your console.

In **PowerShell 7**, `Get-Help -Name ConvertFrom-Json -Full` reveals that `-Depth` parameter accepts type `[Int32]` and has a default value of _1024_.
This is already a great improvement over the older cmdlet.

A discussion in issue [#3182][3182]{:target="_blank"}, which continued into pull request [#8199][8199]{:target="_blank"}, focused on increasing the default value.
The decision was to add the parameter to allow the user to exceed the default depth, up to `[int]::MaxValue`.

Now let's see it in action.

```powershell
PS> $depth = 1025
PS> $val = ""
PS> $end="null"
PS> 1..$depth | % {
  $val += '{"' + $_+'":'
  $end += '}'
}

PS> $val + $end  | ConvertFrom-Json
```

This fails with the below error.

```console
ConvertFrom-Json: Conversion from JSON failed with error: The reader's MaxDepth of 1024 has been exceeded.
```

But by specifying an appropriate `-Depth`, the command will convert the JSON input correctly.

```powershell
PS> $val + $end  | ConvertFrom-Json -Depth 1025
```

If you consistently deal with JSON having a depth larger than 1024, you should consider using `$PSDefaultParameterValues` near the beginning of your scripts.
Here is an example of doubling the default maximum depth.

```powershell
$PSDefaultParameterValues=@{"ConvertFrom-Json:Depth"=2048}
```

[3182]: https://github.com/PowerShell/PowerShell/issues/3182
[8199]: https://github.com/PowerShell/PowerShell/pull/8199

### -NoEnumerate

The last parameter for `ConvertFrom-Json` we are going to examine is `-NoEnumerate`.

From the [Microsoft documentation][convertfromjsondocs]{:target="_blank"}:

>Specifies that output is not enumerated.
>
>Setting this parameter causes arrays to be sent as a single object instead of sending every element separately.
>This guarantees that JSON can be round-tripped via ConvertTo-Json.

Previous to **PowerShell 7**, the default behavior for the `ConvertFrom-Json` cmdlet was to *not enumerate* arrays by default.
This lead to confusion as it went against the behavior of how other cmdlets sent multiple objects through the pipeline.

Consider the following:

```powershell
# Windows PowerShell 5.1
PS> ('[1,2]' | ConvertFrom-Json | Measure-Object).Count
1
```

The array, i.e. collection, of two integers should be seen as having two members in the output, but that is not the case.

After a discussion beginning in issue [#3424][3424]{:target="_blank"}, the PowerShell committee decided on a [breaking change][breakingchange]{:target="_blank"} for the cmdlet to align it with the others.
{: .notice--success}

*The new behavior is to unwrap collections by default.*

To handle the previous behavior, the `-NoEnumerate` switch was added to the cmdlet, which aligns to the implementation in the `Write-Output` object.

Let's perform the same actions as the example above:

```powershell
# PowerShell 7
PS> ('[1,2]' | ConvertFrom-Json | Measure-Object).Count
2

PS> ('[1,2]' | ConvertFrom-Json -NoEnumerate | Measure-Object).Count
1
```

Incidentally, I believe the issue referenced above was the most discussed for the `ConvertFrom-Json` cmdlet.

*Your voice matters!*

[convertfromjsondocs]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json?view=powershell-7
[3424]: https://github.com/PowerShell/PowerShell/issues/3424
[breakingchange]: https://github.com/PowerShell/PowerShell/blob/master/docs/dev-process/breaking-change-contract.md

## ConvertTo-Json

Now, let's compare the syntax for the `ConvertTo-Json` cmdlets from Windows PowerShell 5.1 and **PowerShell 7**.

```powershell
PS> Get-Command -Name ConvertTo-Json -Syntax

# Windows PowerShell 5.1
ConvertTo-Json [-InputObject] <Object> [-Depth <int>] [-Compress] [<CommonParameters>]

# PowerShell 7
ConvertTo-Json [-InputObject] <Object> [-Depth <int>] [-Compress] [-EnumsAsStrings] [-AsArray] [-EscapeHandling <StringEscapeHandling>] [<CommonParameters>]
```

This cmdlet also has three new parameters *(though, I'm sure it was just a coincidence)*.
Likewise, we will examine each of these new parameters in the following sections.

### -EnumsAsStrings

JSON is used heavily in serialization, which essentially is translating a complex object to a simple object (typically a string representation) and vice versa.
Serialization is used extensively in web applications and APIs.

{% capture notice-2 %}

#### Enum Backgrounder

An enumerated type, or `enum`, is a data type that enables a variable to be a set of predefined constants.
The value of the enum is a zero-based index, beginning with the first item.

For example, if you wanted to define a selection of car types in a script, you could use the following to create the enum then retrieve its value:

```powershell
PS> enum CarTypes {
   Compact
  MidSize
  Intermediate
  SUV
  Luxury
}

PS> [CarTypes]::SUV.value__
3
```
{% endcapture %}

<div class="notice--info">{{ notice-2 | markdownify }}</div>

The `-EnumsAsStrings` parameter instructs the cmdlet to output enums as their string representations, so as to ensure the data remains meaningful.

Continuing with the `Enum` example above, the following statements demonstrate this usefulness of this switch.

```powershell
PS> [CarTypes]::SUV,[CarTypes]::Compact | ConvertTo-Json
[
  3,
  0
]

PS> [CarTypes]::SUV,[CarTypes]::Compact | ConvertTo-Json -EnumsAsStrings
[
  "SUV",
  "Compact"
]
```

### -AsArray

The `-AsArray` switch, suggested in issue [#6327][6327]{:target="_blank"}, instructs the cmdlet to wrap the output object in array brackets.
This guarantees that the pipeline input can be treated as an array, whether it's a single item or not.

```powershell
# single item
PS> "one" | ConvertTo-Json
"one"

PS> "one" | ConvertTo-Json -AsArray
[
  "one"
]
```

[6327]: https://github.com/PowerShell/PowerShell/issues/6327

### -EscapeHandling

The last parameter for `ConvertTo-Json` that we will cover is `-EscapeHandling` which was introduced in PowerShell Core 6.2.

Issue [#7693][7693]{:target="_blank"} identifies unexpected behavior from Windows PowerShell 5.1 and PowerShell Core 6 in how special characters are escaped.
{: .notice--success}

While the default behavior remains unchanged, this parameter allows the user to properly escape non-ASCII and HTML characters.

Possible values with an example for each are:

```powershell
# Default - Only control characters are escaped.
PS> @{ 'abc' = "'def'" } | ConvertTo-Json -EscapeHandling Default
{
  "abc": "'def'"
}

# EscapeNonAscii - All non-ASCII and control characters are escaped.
PS> @{ 'newline' = "`n" } | ConvertTo-Json -EscapeHandling EscapeNonAscii
{
  "newline": "\n"
}

# EscapeHtml - HTML (<, >, &, ', ") and control characters are escaped.
PS> @{ 'Html' = '<a href="https://powershell.anovelidea.org">Thanks for reading my blog!</a>' } | ConvertTo-Json -EscapeHandling EscapeHtml
{
  "Html": "\u003ca href=\u0022https://powershell.anovelidea.org\u0022\u003eThanks for reading my blog!\u003c/a\u003e"
}
```

[7693]: https://github.com/PowerShell/PowerShell/issues/7693

## Introducing Test-Json

The last JSON cmdlet that we will examine is the `Test-Json`.
It allows you to validate JSON input against proper syntax and against a defined JSON Schema.

Before we discuss the `Test-Json` cmdlet, let's take a short detour to gain a better understanding of JSON Schema.

### JSON Schema

For some of you, this will be the first time that you're hearing about JSON Schema.

In fact, I had worked with JSON for a while before realizing, just last year, that there is an [IETF JSON Schema draft][jsonschemadraft]{:target="_blank"}.
This draft serves to define the structure of a given JSON object type.

Prior to this, the contents of a JSON object were at the discretion of the developer or scripter.
Within small teams, there could be some differences between two objects that ultimately refer to the same type.

Let's take an example of a Person object.

```console
Name
Age
Date of Birth
```

This Person object is fairly simple.
Perhaps too simple.

Where do you put the first name? Or last name? Nickname?

Writing unit tests or even code against the moving target of the previous Person object in this team would be tedious and prone to failures or bugs.

Consider the following new Person object JSON schema.

```json
$personSchema = @'
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "required": [ "firstName", "lastName", age ],
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "nickName": {
      "type": "string",
      "description": "The person's nick name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than eighteen.",
      "type": "integer",
      "minimum": 18
    }
  }
}
'@
```

This schema will ensure the team will use consistent property names and data types for each property. *Actually, there is an error I introduced purposefully that we will discover shortly.*

[jsonschemadraft]: http://json-schema.org/specification.html

### Validate JSON Basic Syntax with Test-Json

As I mentioned previously, the `Test-Json` cmdlet has two primary functions.
The first is to validate the syntax of the JSON input.

Before this cmdlet, the only *PowerShell* way to validate JSON was to use `ConvertFrom-Json | ConvertTo-Json` in the pipeline.
For reasons gleaned from the sections above for both of these cmdlets, this method was often fallible.

```powershell
PS> $personSchema | Test-Json
Test-Json: Cannot parse the JSON.
False

PS> (Get-Error).Exception.InnerException.Message
Unexpected character encountered while parsing value: a. Path 'required[1]', line 6, position 41.
```

Ah! I completely forgot to enclose the required field *age* in double quotes.

```json
# bad syntax
  "required": [ "firstName", "lastName", age ],

# valid syntax
  "required": [ "firstName", "lastName", "age" ],
```

After making the change above, let's see the updated output.

```powershell
PS> $personSchema | Test-Json
True
```

Much better.

### Validate JSON Schema with Test-Json

Continuing with the Person schema that we defined above, let's focus on the second function of the `Test-Json` cmdlet.
That is, we will test a JSON object against the Person schema that we have defined.

```powershell
PS> $self = @'
{
  "firstName": "Dave",
  "lastName": "Carroll"
}
'@

PS> $self | Test-Json -Schema $personSchema
Test-Json: PropertyRequired: #/age
False
```

Looks like I forgot to include my age in the object.
Let's correct that.

```powershell
PS> $self = @'
{
  "firstName": "Dave",
  "lastName": "Carroll",
  "age": 1000
}
'@

PS> $self | Test-Json -Schema $personSchema
True
```

Though the JSON object is validated correctly against the schema, an age of 1000 is highly unlikely.
We can adjust the schema to handle real world data.

```json
  "age": {
      "description": "Age in years which must be equal to or greater than eighteen.",
      "type": "integer",
      "minimum": 18,
      "maximum": 120
    }
```

Let's try that again.

```powershell
PS> $self | Test-Json -Schema $personSchema
Test-Json: NumberTooBig: #/age
False
```

*We don't have to correct my age in the example.*

And that's how you validate JSON objects in **PowerShell 7**, both for syntax and against a predefined schema.

In my blog post on [Writing Windows Events with Smart EventData][jsoneventdata]{:target="_blank"},
I mention using EventData schema for each event type that you want to write.
\\
\\
Using JSON Schema and the `Test-Json` cmdlet would help your team with documentation and implementation of consistent Smart EventData.
{: .notice--info}

[jsoneventdata]: http://bit.ly/38hFiDZ

## Community Input

If you're interested in seeing how much the PowerShell community has shaped the present (and future) of PowerShell,
check out the [PowerShell GitHub BI Community Dashboard][PSGitHubBI]{:target="_blank"} page with with
*Pull Requests and Issues By Community and Microsoft*.

[PSGitHubBI]: http://bit.ly/2SMofDf

## #PS7Now #PSBlogWeek Contributors

Be sure to watch for more [#PS7Now][PS7Now]! [#PSBlogWeek][PSBlogWeek] articles from my fellow contributors and myself.
And be sure to follow us on Twitter and add our blogs to your feed reader.
We can help you on your PowerShell enlightenment journey, along with many others in the PowerShell community.

| Author | Twitter | Blog |
| :----- | :----- | :----- |
|Adam Bertram|[@adbertram](https://twitter.com/adbertram)|[https://adamtheautomator.com/](https://adamtheautomator.com/) |
|Dave Carroll| [@thedavecarroll](https://twitter.com/thedavecarroll)|[https://powershell.anovelidea.org/](https://powershell.anovelidea.org/) |
|Josh Duffney|[@joshduffney](https://twitter.com/joshduffney)|[http://duffney.io/](http://duffney.io/) |
|Dan Franciscus|[@danfranciscus](https://twitter.com/danfranciscus)|[https://winsysblog.com/](https://winsysblog.com/) |
|Jeff Hicks|[@jeffhicks](https://twitter.com/jeffhicks)|[https://jdhitsolutions.com/](https://jdhitsolutions.com/) |
|Mike Kanakos|[@MikeKanakos](https://twitter.com/MikeKanakos)|[https://www.networkadm.in/](https://www.networkadm.in/) |
|Josh King|[@WindosNZ](https://twitter.com/WindosNZ)|[https://toastit.dev/](https://toastit.dev/) |
|Thomas Lee|[@doctordns](https://twitter.com/doctordns)|[https://tfl09.blogspot.com/](https://tfl09.blogspot.com/) |
|Tommy Maynard|[@thetommymaynard](https://twitter.com/thetommymaynard)|[https://tommymaynard.com/](https://tommymaynard.com/) |
|Jonathan Medd|[@jonathanmedd](https://twitter.com/jonathanmedd)|[https://www.jonathanmedd.net/](https://www.jonathanmedd.net/) |
|Prateek Singh|[@singhprateik](https://twitter.com/singhprateik)|[https://ridicurious.com/](https://ridicurious.com/) |

## Summary

As you can see, there have been a great number of improvements with just these cmdlets.
Imagine all of the other commands and their improvements.
It's a great time for scripters of all experience levels.

Thank you for your interest in the JSON cmdlets in **PowerShell 7**.
And thank you for being part of the community.
You are the reason we do what we do.

I hope you've found this interesting or informative.
If you have any comments or questions, please post them below.

Thanks for reading!

And, if you haven't already, begin your journey with **PowerShell 7** now!
