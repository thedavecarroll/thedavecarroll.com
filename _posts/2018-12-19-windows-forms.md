---
layout: single
title: "Windows Forms"
excerpt: "Recently, I was tasked to provide a GUI for a PowerShell script. Okay, I think I tasked myself, but it was an interesting
foray into the .Net [System.Windows.Forms] class...One of the common threads I noticed in the handful of scripts I found was that they really didn't offer options for
parameters. I've been a big proponent for creating tools, aka functions, since I first began writing PowerShell code. So,
I set out gathering some tools that I thought I would need."
date: 2018-12-19
comments: true
tags:
  - WindowsForms
  - Forms
  - DataGridView
  - PowerShell GUI
category:
  - powershell
---

## Introduction

![Windows Forms]({{ site.url }}{{ site.baseurl }}/assets/images/windows-form-example.png)
{: .full}

It's been too long since I've posted any content and I wanted to get something out to let you know that I'm still here.
{: .notice--primary}

Recently, I was tasked to provide a GUI for a PowerShell script. Okay, I think I tasked myself, but it was an interesting
foray into the .Net `[System.Windows.Forms]` class.

As one does to find script inspiration - some might call this a starting point - I took to my favorite search engine and
found numerous scripts built with [SAPIEN Technologies PowerShell Studio](https://www.sapien.com/software/powershell_studio){:target="_blank"}
as well as manually coded scripts on GitHub.

Since a requirement for my task was that I could not use any external application, I was forced to use the manually
coded option.

## Functions

One of the common threads I noticed in the handful of scripts I found was that they really didn't offer options for
parameters. I've been a big proponent for creating tools, aka functions, since I first began writing PowerShell code. So,
I set out gathering some tools that I thought I would need. **The functions I created are by no means complete, nor is
the list comprehensive.**

Basically, my GUI script needed to be able to the following:

* Create a form
* Display some controls
  * Header, used as a section label
  * Buttons, which must performs some actions
* Display columnar data in a grid
  * Highlight certain rows based on a value of a cell
* Display the current status in the status bar of the form

### Create a form

The first thing I needed to do was instantiate a new form object. I wrote `New-WindowsForm` to handle this. At minimum, I needed
to provide the title for the form (which is displayed in the title bar of the form) and the height and width (in pixels).
I decided to also add a switch (`-NoIcon`) that would hide the default icon in the title bar. By default, hard-coded that
is, the form will autosize and provide scrollbars.

I then wrote `Set-WindowsForm` that allows me to add an array of labels, an array of buttons, a data grid view, a status
strip, and a script block for the on load event.

### Display some controls

I wrote `New-FormLabel` and `New-FormButton` both with text to display, height, width, x-axis draw starting point, and
y-axis draw starting point. For `New-FormButton`, I also included a parameter for action (a scriptblock) and an
anchorstyle (this lets the close button always be on the right side connected to the edge of the form).

The button's action could be a very complex scriptblock that can load a file to use, set the filename for a log, update
the data, and update the status bar.

### Display columnar data

The `[System.Windows.Forms.DataGridView]` class was used to display my data and to highlight the rows that needed it. I
wrote `New-DataGridView` to instantiate an instance of the class. With `Update-DataGridView`, I'm able to pass in the
data, a DataGridView object, and a `[hashtable]` that I use for to determine how to highlight the row. This part was
very tricky.

```powershell
$RowHighlight = @{
    'Cell' = 'ProcessName'
    'Values' = @{
        'PowerShell' = 'Green'
        'Chrome' = 'Red'
    }
}
```

Then in the `Update-DataGridView`, I have this code:

```powershell
if ($RowHighlight) {
  $Cell = $RowHighlight['Cell']
  foreach ($Row in $DataGridView.Rows) {
    [string]$CellValue = $Row.Cells[$Cell].Value
    Write-Verbose ($CellValue.Gettype()) -Verbose
    if ($RowHighlight['Values'].ContainsKey($CellValue)) {
      Write-Verbose "Setting row based on $Cell cell of $CellValue to $($RowHighlight['Values'][$CellValue]) color"
      $Row.DefaultCellStyle.BackColor = $RowHighlight['Values'][$CellValue]
    } else {
      Write-Verbose "Setting $Cell cell for $CellValue to $($RowHighlight['Values'].Default) color"
      $Row.DefaultCellStyle.BackColor = $RowHighlight['Values']['Default']
    }
  }
}
```

Actually, this function is the only one that provides Verbose output at the moment. If I find myself using this ad hoc
module often, I'll spiffy it up with plenty `Write-Verbose` and `Write-Warning` statements.

### Display the current status in the status bar of the form

Refreshing the data would take some time. Loading a file or writing a file would take some time. I wanted to be able to
tell the user (myself, at this point) that things were happening. Enter the `[System.Windows.Forms.StatusStrip]` class.

In a similar fashion as the form, I created `New-StatusStrip` and a `Set-StatusStrip` functions. The first creates a,
more-or-less, _empty_ object. The latter function does all of the heavy lifting. It will display the operation, progress,
and the progress values.

## The Module and Example Script

Now that we have the tools you need to create a quick GUI, let's create the script that will use them. This simple script
will display the form, load specific processes highlighting them based on what we want, and provide a way to refresh the
data.

Here is the module and example script.

<script src="https://gist.github.com/thedavecarroll/f7e7eced888d34eeb2776536c333d3b5.js"></script>

## In Action

Here is a demonstration on how this works.

![Windows Forms example in action]({{ site.url }}{{ site.baseurl }}/assets/images/windows-form-in-action.gif "Windows Forms example in action")

## Bonus

Something else that most forms provide is a way to open a file and to save a file. I have included `Get-OpenFileDialog`
and `Set-SaveFileDialog` to do just that. These are currently very basic and could use some long-term care (more
parameters).

## Next Steps

If I use this ad hoc module more, I would need to convert it to fully formed module, via plaster template. I know many
improvements can be made on accepting more properties for the various components. Again, this was a quick proof-of-concept.

## Summary

And that's how I came to write an ad hoc (not fully baked, developed, bare-boned, or whatever you want to call it) module
for displaying a GUI using the `[System.Windows.Forms]` class.

I hope you've found this interesting or informative. If you have any comments or questions, please post them below.

Thanks for reading!