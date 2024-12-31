---
title: Updatable Help
description: Updatable Help on GitHub Pages with platyPS.
published: 2018-08-25
tags: ["update-help", "updatable help", "tls", "ssl", "platyps", "powershell"]
categories: ["PowerShell"]
---

PowerShell has provided a way to update the help files for modules since version 3.0.

Since creating my first two modules, I have tried adding updatable help support, but came across a few issues. Tonight,
I finally resolved them for my module PoShEvents.

## GitHub Bad, GitHub Pages Good

My module repository is in GitHub, and I originally thought that I could simply use the Raw view for my updatable help.
After all, I was successfully serving the online help version using the markdown files straight out of GitHub.

GitHub, as it turns out, hosts their files in a way that is not compatible for updatable help.

I am now using GitHub Pages for this blog and I wanted to give updatable help another try. This method of hosting works
as intended.

## Building Updatable Help

Like most others, I have opted to use the module [platyPS](https://github.com/PowerShell/platyPS) to
create my help files.

This post focuses on solving the issues I had with updatable help. For instructions on how to use `platyPS` see any of
these sites.

* [Module Tools - Adding Cmdlet Help With PlatyPS](https://overpoweredshell.com/Module-Tools-Adding-Cmdlet-Help-With-PlatyPS/)
* [Convert PowerShell Help to a Website](https://ntsystems.it/post/converting-powershell-help-a-website)

I had already created the markdown files that I was serving via GitHub for online help and moved those into my blog
repository structure. I used `Update-MarkdownHelp` to update them and noticed that my Jekyll front matter was largely
untouched -- some entries were out of order.

When I originally created the help files, I did not include the `-WithModulePage` switch. I ran the `New-MarkdownHelp`
and generated a clean set of help files into a temp folder just to harvest the module page. After placing the file into
the correct path, I updated the front matter for Download Help Link, Help Version, and Locale.

{{< notice type="info" >}}
I also added additional front matter YAML to be used by Jekyll, namely layout, classes, and permalink.
{{< /notice >}}

As the content for the help files had previously been updated, I didn't have to do that again. If you're starting from a
clean or initial run of `New-MarkdownHelp`, you will need to update the content manually.

Then, I recreated the external help file.

```powershell
New-ExternalHelp -Path .\powershell.anovelidea.org\modulehelp\PoShEvents -OutputPath .\PoShEvents\PoShEvents\en-US\ -Force
```

## Testing Updatable Help

Once you have created the necessary help files, you will need to test that it will successully update the module help.

### Local Source

First, let's see if we can `Update-Help` from the local source.

```powershell
Update-Help -Module PoShEvents -SourcePath .\powershell.anovelidea.org\modulehelp\PoShEvents\ -Force -Verbose
```

```console
VERBOSE: Performing the operation "Update-Help" on target "PoShEvents, Current Version: 0.2.1, Available Version: 0.2.1, UICulture: en-US".
VERBOSE: PoShEvents: Updated C:\PowerShell\GitHub\PoShEvents\PoShEvents\en-US\about_PoShEvents.help.txt. Culture en-US Version 0.2.1
VERBOSE: PoShEvents: Updated C:\PowerShell\GitHub\PoShEvents\PoShEvents\en-US\PoShEvents-help.xml. Culture en-US Version 0.2.1
```

This proves that the updatable help works when pulling from the local source.

### Online Source

If the local source test is successful, you will need to upload the `*HelpInfo.xml`, `*HelpContent.cab`, and
`*HelpContent.zip` help files to the location indicated by the module's `HelpInfoUri`. After this is done, you should
verify that you can access the URL successfully by using `Invoke-WebRequest`. Ideally, the StatusCode should be 200.

```powershell
$ModInfo = Get-Module -Name PoShEvents | Select-Object -Property Name,Guid,HelpInfoURI
(Invoke-WebRequest -Uri "$($ModInfo.HelpInfoUri)$($ModInfo.Name)_$($ModInfo.Guid)_HelpInfo.xml").StatusCode
```

My result was not ideal.

```console
Invoke-WebRequest : The request was aborted: Could not create SSL/TLS secure channel.
```

I wished that I could say I immediately tested with `Invoke-WebRequest`. That would have saved me about an hour going
down the rabbithole of trying to trace the `Update-Help` command. It would really be nice if `Update-Help` revealed more
internal workings when you use the `-Verbose` switch.

## TLS

Checking the security protocol that my default PowerShell session used, I saw why my testing failed. I included the
TLS 1.2 protocol and tested the URL again successfully.

```csharp
[Net.ServicePointManager]::SecurityProtocol
```

```console
Ssl3, Tls
```

```csharp
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls,[Net.SecurityProtocolType]::Tls11,[Net.SecurityProtocolType]::Tls12
```

{{< notice type="note" >}}
A quick search revealed that on February 8, 2018, [GitHub discontinued the use of TLS 1.0 and TLS 1.1](https://githubengineering.com/crypto-removal-notice/).
{{< /notice >}}

```powershell
Update-Help -Name PoShEvents -Verbose -Force
```

```console
VERBOSE: Resolving URI: "https://powershell.anovelidea.org/modulehelp/PoShEvents"
VERBOSE: Your connection has been redirected to the following URI: "http://powershell.anovelidea.org/modulehelp/PoShEvents/"
VERBOSE: Performing the operation "Update-Help" on target "PoShEvents, Current Version: 0.2.1, Available Version: 0.2.1, UICulture: en-US".
VERBOSE: PoShEvents: Updated C:\PowerShell\GitHub\PoShEvents\PoShEvents\en-US\about_PoShEvents.help.txt. Culture en-US Version 0.2.1
VERBOSE: PoShEvents: Updated C:\PowerShell\GitHub\PoShEvents\PoShEvents\en-US\PoShEvents-help.xml. Culture en-US Version 0.2.1
```

## Setting Strong Cryptography for .Net Framework

Setting `[Net.ServicePointManager]::SecurityProtocol`, as I did, only applies to the current PowerShell session. To make
the change permanent, I updated the registry.

```powershell
# set strong cryptography on 64 bit .Net Framework (version 4 and above)
Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord

# set strong cryptography on 32 bit .Net Framework (version 4 and above)
Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord
```

## Conclusion

By using GitHub Pages, platyPS, and the appropriate TLS protocol, I'm finally serving updatable help for my module
[PoShEvents](https://github.com/thedavecarroll/PoShEvents).