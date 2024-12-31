---
title: A PowerShell Counting Challenge Walk-through
description: Learn about the PowerShell concepts of for and foreach loops, ForEach-Object and pipelines, and the range and modulus operators in this Iron Scripter challenge walk-through.
image: /images/ironscripter/counting/three-loops.png
published: 2020-05-22
tags: ["powershell", "powershell concepts", "learn powershell", "iron scripter", "iron scripter challenge", "iron scripter walk-through"]
categories: ["PowerShell"]
---

## Introduction

The latest IronScripter challenge, [A PowerShell Counting Challenge](https://ironscripter.us/a-powershell-counting-challenge/), had challengers
learning about loops, possibly range and modulus operators, basic parameter validation, and creation of a simple custom object.

This post should serve as a walk-through, or learning guide if you will, for the Iron Scripter's challenge.

## Beginner

For the beginner challenge, the Chairman wanted the challenger to:

> Get the sum of the even numbers between 1 and 100.
> You should be able to do this in at least 3 different ways.
> Show all 3 ways.
> You don’t need to write any functions or scripts.

### Modulus

Using the modulus operator, `%`, seems to be the easiest way to determine if a number is even or odd.
It returns the remainder of a division operation and anything evenly divisible by 2 is even.

I used this in three of my beginner methods.
In these, I iterated through the range of numbers and divided each one by 2.
Then, depending on which method, I either sent the result to the pipeline or added it to a variable.

### Range Operator

For two of my beginner methods, the start and end numbers are created using the range operator - `..`.

```powershell
# example 1, numbers
PS7 > 1..4
<# result
1
2
3
4
#>

# example 2, reverse alphabetic string
PS7 > 'F'..'A'
<# result
F
E
D
C
B
A
#>

# example 3, forward alphabetic string
PS7 > 'a'..'e'
<# result
a
b
c
d
e
#>

# example 4, alphabetic string, not cast as string, produces error
PS7 > a..e
<# error
a..e: The term 'a..e' is not recognized as the name of a cmdlet, function, script file, or operable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
#>

# example 5, decimal numbers, rounded to nearest integer
PS7 > 1.1..3.7
<# result
1
2
3
4
#>
```

## Method 1

For the first method, I chose to loop using the `ForEach-Object` cmdlet which accepts input from the [pipeline](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines?view=powershell-7).

```powershell
PS> 1..100 | ForEach-Object { if ($_ % 2 -eq 0 ) {$_ } } | Measure-Object -Sum
```

```console
Count             : 50
Average           :
Sum               : 2550
Maximum           :
Minimum           :
StandardDeviation :
Property          :
```

`ForEach-Object` performs an operation on each item, an array of numbers from 1 to 100 in this case.
Within the script block, which in this example is passed as the `-Process` parameter, we evaluate each item in the array.
In the pipeline, the current item can be referenced as either `$_` or `$PSItem`.

Basically, we are performing the following operation for each number.

```powershell
PS7 > if ( 1 % 2 -eq 0) { 1 }
PS7 > if ( 2 % 2 -eq 0) { 2 }
# result
# 2
PS7 > if ( 3 % 2 -eq 0) { 3 }
PS7 > if ( 4 % 2 -eq 0) { 4 }
# result
# 4
```

Let's break down what the modulus is doing inside the `if` statement.

```powershell
PS7 >  1 % 2
# 1
PS7 >  2 % 2
# 0
PS7 >  3 % 2
# 1
PS7 >  4 % 2
# 0
```

Finally, I use the `Measure-Object` cmdlet's `-Sum` parameter to get the sum of all the even numbers.

{{< notice type="note" >}}
`$PSItem` was introduced in Windows PowerShell version 2 for greater clarity.
{{< /notice >}}

## Method 2

For my next method, I chose to loop using a `foreach` statement.

```powershell
PS7 > $evennumbers = foreach ($number in 1..100) { if ($number % 2 -eq 0 ) { $number } } ; $evennumbers | Measure-Object -Sum
```

```console
Count             : 50
Average           :
Sum               : 2550
Maximum           :
Minimum           :
StandardDeviation :
Property          :
```

The `foreach` statement, or loop, is a general way to iterate through an array of items.
When declaring the loop, you will provide a variable name for the single item and the array of items, such as `($number in 1..100)`.
Within the loop, you reference the single item variable (but you can still reference the array, if necessary).

In this example, I assign the output of the `foreach` loop to the variable `$evennumbers = foreach (...`.
This actually takes all of the output, which is still held in memory, and assigns it to an array variable.

{{< notice type="warning" >}}
There can be a lot of confusion between the `foreach` statement and the `foreach` alias of `ForEach-Object`.
The `foreach` statement essentially ignores the pipeline.
It cannot take input from the pipeline, nor can it send objects out to the pipeline.

`ForEach-Object` cmdlet honors the pipeline for input and output.
{{< /notice >}}

## Method 3

For my second method, I chose to loop using a `for` statement.

```powershell
PS7 > $sum = 0; for ($i = 1; $i -le 100; $i++) { if ($i % 2 -eq 0) {$sum += $i } }; $sum
```

```console
2550
```

The `for` statement loops through a statement based on a conditional test.
For this example, we want to iterate from 1 to 100.

* The `$i = 1` is the initialization section, which is executed prior to the loop running.
* The `$i -le 100` specifies the condition which must be true for the loop to continue running.
* The `$i++` is repeated after each iteration of the loop. The `++` is an operator increases the value by 1.

{{< notice type="warning" >}}
You see that I first created the array variable, `$sum = @()`, and then add the output within the loop, `$sum += $i`.
This way of capturing output forces PowerShell to create a new variable, that is allocate memory, and copy the old array variable and add the new output.
Each iteration will increase the memory usage and will cause performance issues when dealing with large output objects.

Sometimes, however, this is the simplest way to capture the output in a loop, especially for beginners.
{{< /notice >}}

## Method 4

For my last beginner method, I wanted to do something a little harder and forego using modulus.

A quick search for _sum of all even numbers between 1 and 100_ revealed a [Quora answer](https://www.quora.com/What-is-the-sum-of-all-even-numbers-between-1-and-100) that delved into a mathematical equation.

`S = n∗(n+1) / d`

Where

* `n` is the quantity of numbers in the series
* `d` is the common difference, 2

```powershell
PS> $firsteven = 2
PS> $lasteven = 100
PS> $quantity = $lasteven/2
PS> $sum = $quantity/2 * (($firsteven*2) + ($quantity -1) * 2)
PS> $sum
```

```console
2550
```

{{< notice type="tip" >}}
I'm not a maths guy, so this last method may not be **100.1%** accurate.
{{< /notice >}}

## Intermediate and Bonus Functions

For both of these functions, I relied on the `for` statement and the `Measure-Object` cmdlet.
You will also see that I use `Select-Object` to limit or define the properties I want in the output.

The main difference from my use of `for` in these functions and method 3 above is that I actually wanted an array of objects so I could use the `Measure-Object` cmdlet.
In method 3, I only needed the sum.

See the attached GitHub gist for my submissions for these parts of the challenge.

{{< gist id="e18d8a7d6c0f6a51acd8c46aa4a446ed">}}

## Additional Help

Check out PowerShell's help for more details on the concepts covered.

```powershell
# learn more about the ForEach-Object cmdlet and pipelines
PS7 > Get-Help ForEach-Object
PS7 > Get-Help about_pipelines

# learn more about the foreach and for statements
PS7 > Get-Help about_foreach
PS7 > Get-Help about_for

# learn more about modulus and range operators
PS7 > Get-Help about_operators

# learn more about ++ assignment operator
PS7 > Get-Help about_assignment_operators
```

## Summary

It's been a while since I completed an IronScripter challenge completely or even created a gist or post with my solution.
I know that if I had kept skipping them, my skills could diminish.

I encourage anyone reading this to go through the IronScripter challenges.

You may feel that some may be below your "level" or capability.
If that is the case, the challenge shouldn't take you long to finish.
Your solution, once shared, could be extra that bit that someone needs to gain a better understanding of **PowerShell**.

You also may feel that it is above your "level".
Everyone has been at whatever level you believe yourself to currently be.
You should push to learn more when possible.
Be sure to review past challenge solutions to see how others approached them.
It could help you by seeing other's code.

Please feel free to leave a comment or suggestion.

Thanks for reading.
