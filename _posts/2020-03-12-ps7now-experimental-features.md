---
layout: single
title: "PowerShell 7 Experimental Features"
excerpt: "New features that are not production ready are deemed experimental in nature. Users can choose to opt-in for an experimental feature on an individual basis."
date: 2020-03-12
header:
  overlay_image: /assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-enabled.png
  overlay_filter: 0.9
comments: true
tags:
  - ps7now
  - powershell 7
  - pwsh
  - experimental features
  - experimental
category:
  - powershell
---

## #PS7Now! PowerShell 7 Is Here!

This [#PSBlogWeek][PSBlogWeek]{:target="_blank"} focuses on the official release of **PowerShell 7** — the newest,
fastest, and best PowerShell putting the spotlight on PowerShell's Experimental Features.

Get [#PS7Now][PS7Now]{:target="_blank"} to experience them yourself!

[PSBlogWeek]: https://twitter.com/search?q=%23PSBlogWeek&f=live
[PS7Now]: https://twitter.com/search?q=PS7Now&f=live

## Experimental Features Defined

After becoming open-source software, the PowerShell community requested a mechanism for users to
try out new features and provide early feedback to feature developers.
This discussion took place in PowerShell [RFC0029][RFC0029]{:target="_blank"} which was finalized
and implemented in PowerShell Core 6.1.

New features that are not production ready are deemed experimental in nature.
Users can choose to opt-in for an experimental feature on an individual basis.
Administrators can choose to opt-in at the system level.

Please note that user configuration will take precedence over system configuration.
{: .notice--warning}

Using the built-in support for experimental features, developers can roll out an alternate command or a parameter to their modules.

Experimental features are not limited to the PowerShell engine itself.

[RFC0029]: https://github.com/PowerShell/PowerShell-RFC/blob/master/5-Final/RFC0029-Support-Experimental-Features.md

## Experimental Feature Commands

Commands to discover, enable, and disable experimental features are provided to the user.

### Get-ExperimentalFeature

The command `Get-ExperimentalFeature` will display a list of discovered experimental features.
These features can come from the PowerShell engine itself or from modules.
You can see where the experimental feature is defined by looking at the *Source* column in the command's output.

Also, features can be specific to an operating system as the following illustrates.
Notice the `PSUnixFileStat` feature in the Linux output.

#### Experimental Features on Windows

![Get-ExperimentalFeature on Windows](/assets/images/ps7now/pwsh-7-windows-experimentalfeatures.png "Get-ExperimentalFeature on Windows")

#### Experimental Features on Linux

![Get-ExperimentalFeature on Linux](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures.png "Get-ExperimentalFeature on Linux")

Experimental feature discovery targets the paths in `$env:PSModulePath`.

### Enable-ExperimentalFeature

The `Enable-ExperimentalFeature` command turns on one or more experimental features for the current user or all users.

Enabling a feature will add it to an array in the `ExperimentalFeatures` key in the Powershell configuration file, `powershell.config.json`.
If you do not specify a `Scope`, it will default to `CurrentUser`.

For Windows, the user configuration file will be saved in the `$HOME\Documents\PowerShell` folder.\\
For Linux, the user configuration file will be saved in the `$HOME\.config\powershell` folder.

**Note:**
On my system, I re-target my *Documents* folder to a separate volume.
The PowerShell configuration file is saved there and is not in the `$HOME` hierarchy.
{: .notice--info}

You can turn on all experimental features in one line.
In the following example, I've added a sanity check by getting the content of the configuration file.

![Enable-ExperimentalFeature All on Windows](/assets/images/ps7now/pwsh-7-windows-experimentalfeatures-enable-all.png "Enable-ExperimentalFeature All on Windows")

{% capture notice-2 %}

#### Restart Sessions

Take note of the warning message that serves as a reminder to restart the PowerShell session.
In fact, I believe you will need to close all console sessions (those of the same version and platform,
that is) before the change will take effect.

Don't forget the stop the terminal in Visual Studio Code.

{% endcapture %}

<div class="notice--warning">{{ notice-2 | markdownify }}</div>

### Disable-ExperimentalFeature

The `Disable-ExperimentalFeature` command turns off the experimental feature.

As with enabling, when you disable one or more features, you must close all PowerShell sessions and start a new session.

Disabling the feature removes its entry from the enabled feature list in the appropriate configuration file.
The ExperimentalFeatures key will remain even if you disable all experimental features.

## PSUnixFileStat In Action

Now that we've talked about Experimental Features and how to enable/disable them, let's take one out for a spin.

One of the features that Linux admins would probably appreciate is the `PSUnixFileStat` feature.
Let's get some information about it.

![PSUnixFileStat Information](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-psunixfilestat-info.png "PSUnixFileStat Information")

The default output for `Get-ChildItem` looks the same on Windows or Linux.

![Get-ChildItem Before Enabling PSUnixFileStat](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-psunixfilestat-get-childitem-before.png "Get-ChildItem Before Enabling PSUnixFileStat")

The output doesn't help the Linux admin with permissions.
Let's enable the feature and correct that.

![Enable-ExperimentalFeature PSUnixFileStat on Linux](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-enable-psunixfilestat.png "Enable-ExperimentalFeature PSUnixFileStat on Linux")

I close all PowerShell sessions in my WSL instance and start a new one.
And now to see the difference.

![Get-ChildItem After Enabling PSUnixFileStat](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-psunixfilestat-get-childitem-after.png "Get-ChildItem After Enabling PSUnixFileStat")

Those new UnixMode entries look much more useful (and are super cool).

***This is PowerShell on Linux!***

## PSCommandNotFoundSuggestion In Action

Let's take a quick look at another experimental feature.

![PSCommandNotFoundSuggestion Sample Output](/assets/images/ps7now/pwsh-7-ubuntu-experimentalfeatures-pscommandnotfoundsuggestion.png "PSCommandNotFoundSuggestion Sample Output")

I meant to type *git*, not *get*.

With the PSCommandNotFoundSuggestion experimental feature enabled, PowerShell can suggest commands
when we have a typo or just space out.

*Thanks, PowerShell!*

## Adding Support for an Experimental Feature to Your Module

As I mentioned at the beginning of this article, experimental features are not limited to the PowerShell engine.

In fact, there are a couple delivered with **PowerShell 7** within the modules `Microsoft.PowerShell.Utility` and `PSDesiredStateConfiguration`.

I wanted to provide the community a working demo of experimental features, but I couldn't find any online.

*My google-foo is strong, but it either failed me this time or there are no current examples in the wild.*
{: .notice--info}

I wrote a very simple demo module that contains experimental features.
You can find it at the bottom of this article.

![Experimental Features Demo Module](/assets/images/ps7now/pwsh-7-experimentalfeatures-demo.png "Experimental Features Demo Module")

### Module Manifest

In the [Module Experimental Feature][ModuleManifestRFC0029]{:target="_blank"} section of RFC0029, I found
where experimental feature support can be added to a module manifest.

In the `PrivateData.PSData` section, there is a new ExperimentalFeatures entry which allows an array
of hashtables with Name and Description.
This metadata has been incorporated into the necessary components to update the `PSModuleInfo` object.

[ModuleManifestRFC0029]: https://github.com/PowerShell/PowerShell-RFC/blob/master/5-Final/RFC0029-Support-Experimental-Features.md#module-experimental-feature

### Feature Naming

When I was creating the demo module, I originally created a feature name like *PSDemoFeature*.
I quickly discovered this was not the correct naming scheme for experimental features.

It became evident when I tested my demo module manifest.

```powershell
PS> Test-ModuleManifest 'C:\Program Files\PowerShell\Modules\DemoExperimentalFeatures\DemoExperimentalFeatures.psd1'
Test-ModuleManifest: One or more invalid experimental feature names found: PSDemoExpFeature. A module experimental feature name should follow this convention: 'ModuleName.FeatureName'.
```

Be sure to use the proper naming scheme for your experimental features.
The name must be in the format of *ModuleName.FeatureName*.

The name of PowerShell engine experimental features is *PS*DescriptiveText.
Once I realized this, I removed the *PS* from my feature names to reduce any confusion.
{: .notice--info}

### Experimental Attribute

The [about_Experimental_Feature][about_Experimental_Feature]{:target="_blank"} documentation goes
into detail on how to use the new `Experimental` attribute.

```powershell
[Experimental(NameOfExperimentalFeature, ExperimentAction)]
```

This attribute can be used for the function or any parameter.

The `ExperimentAction` is an `enum` with values of `Hide` or `Show`.

`Show` will allow the experimental feature to be used when it's enabled.
`Hide` will prohibit the experimental feature to be used when it's enabled.

They can be used to provide mutual exclusivity between different versions of a command or parameter.

[about_Experimental_Feature]: https://docs.microsoft.com/en-gb/powershell/module/microsoft.powershell.core/about/about_experimental_features?view=powershell-7

### Additional Information

Refer to the [about_Experimental_Feature][about_Experimental_Feature]{:target="_blank"} documentation
for examples of `C#` and how to check if an experimental feature is enabled.

The latter would be necessary when you don't need mutual exclusivity and when writing Pester tests for your code.

*When I get extra time, I'll add another function that uses the experimental feature check.*
{: .notice--info}

### Demo Module with Experimental Features (Mutually Exclusive)

<script src="https://gist.github.com/thedavecarroll/3a498559a47396be70fc3a4f5be0f07f.js"></script>

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

I believe module developers will start delivering experimental features as they migrate to
**PowerShell 7**, especially if their modules support mission critical automation and processes.

***Thank you for taking the time to read this article and for being part of the PowerShell community.***

***You are the reason we do what we do!***

<!-- If you have any comments or questions, please post them below. -->

If you haven't already, begin your journey with **PowerShell 7** now!

**Comments Appear to be Down**
I just realized that my comments aren't working.
I'll be looking into that as soon as I can.
Until I get them back online, you can reach out to me on Twitter or via a comment on the GitHub Gist.
{: .notice--warning}
