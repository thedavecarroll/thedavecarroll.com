---
title: ForEach-Object -WhatIf
description: While working on my PoShDynDnsApi module, I came across an issue...I checked out the ForEach-Object and saw that it supports -WhatIf and -Confirm parameters.
image: /images/foreach-object-whatif.png
published: 2018-09-19
tags: ["powershell", "foreach-object", "function", "ad hoc function"]
categories: ["PowerShell"]
---

## Preface

While working on my [PoShDynDnsApi]({{< relref "retired-links.md" >}}) module, I came across an issue with
with a function I had predominantly borrowed from a [TechNet blog post from Jamie Nelson](https://blogs.technet.microsoft.com/janesays/2017/04/25/compare-all-properties-of-two-objects-in-windows-powershell/).
Specifically, in my function `Update-DynDnsRecord` that called the `Compare-ObjectProperties` function, when I used the
`-WhatIf` parameter, I unexpectedly received the following:

```console
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: ipaddress Address {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Name {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: int TTL {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Type {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Zone {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: ipaddress Address {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Name {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: int TTL {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Type {get;set;}".
What if: Performing the operation "Retrieve the value for property 'Name'" on target "InputObject: string Zone {get;set;}".
```

The `Compare-ObjectProperties` seemed to be throwing these additional What If statements. I saw where the `ForEach-Object`
alias of `%` was used a few times and determined that these two lines were the cause.

```powershell
$objprops = $ReferenceObject | Get-Member -MemberType Property,NoteProperty | % Name
$objprops += $DifferenceObject | Get-Member -MemberType Property,NoteProperty | % Name
```

## ForEach-Object

### -WhatIf

I checked out the `ForEach-Object` [docs page](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object?view=powershell-5.1)
and saw that it supports `-WhatIf` and `-Confirm` parameters. That's something that I had never considered. In fact, the
more I read, the more I realized that `ForEach-Object` was much more than a simple iterative command.

### -Begin, -Process, and -End

`ForEach-Object` provides a ParameterSet that includes the parameters `-Begin`, `-Process`, and `-End`, all as ScriptBlocks.

>Hey! Those look like the processing methods of an advanced function.

In fact, comparing the processing methods to the parameters revealed they served basically the same purpose.

### Ad Hoc Advanced Function But with Caveats

That the `ForEach-Object` cmdlet could be used essentially as an ad hoc advanced function was an epiphany.

This wasn't as miraculous of a discovery as I had originally thought the further testing I performed.

#### Script Blocks and -WhatIf

I had hoped that I could provide `-Begin`, `-Process`, and `-End` parameters along with `-WhatIf` as illustrated in the
following code:

```powershell
PS C:\> 'testing1','testing2' |  ForEach-Object -Begin {
    Write-Output 'Starting'
    } -Process {
        Write-Output "Processing $_"
    } -End { Write-Output 'Ending'
    } -WhatIf
```

What I expected was not how PowerShell responded.

```console
ForEach-Object : The -WhatIf and -Confirm parameters are not supported for script blocks.
At line:1 char:26
+ ... esting2' |  ForEach-Object -Begin { write-Output 'Starting' } -Proces ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
+ CategoryInfo          : InvalidOperation: (:) [ForEach-Object], InvalidOperationException
+ FullyQualifiedErrorId : NoShouldProcessForScriptBlockSet,Microsoft.PowerShell.Commands.ForEachObjectCommand
```

You cannot use the script blocks and WhatIf. Okay, I wondered if there were other restrictions.

#### Script Blocks and -Verbose

In checking how `-Verbose` was handled, I discovered the following:

```powershell
PS C:\> 'testing1','testing2' |  ForEach-Object -Begin {
    Write-Output 'Starting'
    } -Process {
        Write-Output "Processing $_"
        Write-Verbose -Message 'Process block'
    } -End {
        Write-verbose -Message 'Ending' -Verbose
    } -Verbose
Starting
Processing testing1
Processing testing2
VERBOSE: Ending
```

`Foreach-Object` didn't pass the `-Verbose` common parameter to any code within the script blocks.

## Conclusion

Now that I know that `ForEach-Object` supports `-WhatIf` and `-Confirm` parameters, I am better equipped to handle them
in my future functions and scripts.

Also, I debunked my original thought that `ForEach-Object` could be a viable replacement for an advanced function.  Not
passing `-Verbose` and potentially other common parameters (I didn't test any others) is, to me, a significant
deal-breaker.

{{< notice type="note" >}}
I never considered forgoing advanced functions, just that the cmdlet could be an ad hoc supplement.
{{< /notice >}}

This doesn't mean that we shouldn't consider using the `-Begin`, `-Process`, and `-End` script block parameters, as I'm
sure there are use cases when they make perfect sense. The PowerShell team thought so, otherwise they wouldn't have
included them in the cmdlet.

My discovery and exploration of the `ForEach-Object` cmdlet and a few of its parameters, increased my understanding of it
and PowerShell. I hope it helps you as well.

## Further Reading

In a [guest post](https://blogs.technet.microsoft.com/heyscriptingguy/2014/07/08/getting-to-know-foreach-and-foreach-object/)
on the __Hey, Scripting Guy!__ blog, MVP and Honorary Scripting Guy [Boe Prox](https://learn-powershell.net/) [@proxb](https://www.linkedin.com/in/boeprox/) examines the ForEach-Object cmdlet compared to the ForEach statement.
