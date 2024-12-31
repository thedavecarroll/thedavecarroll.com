---
title: How I Blog
description: What technologies are used in my blog?
published: 2018-08-26
lastMod: 2020-06-18
tags: ["blog", "jekyll", "travis ci", "github", "staticman"]
categories: ["blog"]
---

Someone asked what I used to produce this blog. This post will provide the methodology and details.

## The Decision to Blog

I've hosted a personal website on various platforms since early 2000.
I've used FTP, SFTP, FrontPage, WebDAV, Dreamweaver, WordPress, and probably some others that I've forgotten about.
Using WordPress, I had performance issues when the MySQL database was not located near the web host.

Even with a stance of 'update all the plugins', it was not enough to protect my site from hackers.
Late in 2015, my site was hacked and it took me months to realize since they were just hosting hidden pages and hidden SEO info.
Once I realized what had happened to my site, I converted it to a static hosted by (don't judge) Google Sites.
It solved the problem of a vulnerable site and poor performance.

I've been toying around with the idea of creating a blog for PowerShell for a few years now, ever since I started
working with another PowerShell blogger, {{< influencer "michaelsimmons" >}}, who publishes [I Love PowerShell](https://ilovepowershell.com).

As I was learning how to build my own modules, with finesse --- not just thrown together, I kept finding enlightening
posts on blogs like {{< influencer "kevmar" >}} and {{< influencer "warrenframe" >}}.
They just happen to be using GitHub Pages, Jekyll, and the Minimal Mistakes Jekyll theme.

This new (to me) tech stack would provide an easy way to add content (not like Google Sites) and still provide a static site with decent performance.
Thoughts started falling into place and I saw the efficiency and learning opportunities.

> I'm going to blog. And I'm going to use that tech stack.

## Editor and Source Control

I use Visual Studio Code to edit my blog, PowerShell code, and scripts in other languages.

Git for Windows allows me to create local source controlled folders and to interact with GitHub.
Even if you don't opt to use GitHub (free for public repositories), you can still use Git locally.

## GitHub and GitHub Pages

I'm fully convinced that source control is necessary for code, and a blog is really nothing but code.
Therefore, it was an easy decision to use a GitHub repository for my blog and then to configure it to publish using GitHub Pages.

Visit GitHub Help for more information on how to [create a GitHub account](https://help.github.com/articles/signing-up-for-a-new-github-account/), [create a repository](https://help.github.com/articles/create-a-repo/), and
information on [GitHub Pages](https://help.github.com/articles/what-is-github-pages/).

### Repository

Perhaps due to OCD, I created a repository to match the custom domain that I'm using for my GitHub Pages.
Actually, naming folders based on the hostname is a habit that I got in several years ago
It clearly identifies that the content should be that website.

#### Custom Domain

I've had the domain `anovelidea.org` since early 2000, and since I didn't want to use the default domain of `*.github.io`,
I opted to use the Custom Domain setting for my repo and created `powershell.anovelidea.org`.

#### Branches

Every git or GitHub repository can have multiple branches.
Branches are typically used to develop new features or work on fixes without touching the rest of the code.

Each branch of my repo plays a role in the production of my blog.

| Branch | Purpose |
|-|-|
| main | I push commits to this branch when I make changes to the blog, e.g. publish new posts or approve comments.|
| gh-pages | After Travis-CI builds the site, it pushes to this branch which GitHub, in turn, publishes to GitHub Pages.|
| comments | The Staticman API creates pull requests for this branch when a new comment is submitted.|

## Jekyll Framework

Jekyll is [one of the most used](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/) static site generators.
It's built on Ruby and renders content with Markdown and Liquid templates.

GitHub Pages deploy sites using Jekyll and provides a [handful of themes](https://help.github.com/articles/about-jekyll-themes-on-github/).

Check out the [Jekyll](https://jekyllrb.com/) site for more details.

## Minimal Mistakes

The theme that I chose for simplicity is Minimal Mistakes by Michael Rose at [Made Mistakes](ttps://mademistakes.com/).
He provides a [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes) demo site that can show you the theme's capabilities.

The cool thing about most of the Jekyll themes is that they, themselves, are in GitHub repos.
You can download the full repo or fork it and have a site up and running in short order.

### Custom Layouts and Includes

The Jekyll framework is essentially a given structure of folders with code snippets that build the static HTML files when Jekyll is instructed to do so.
Layouts, includes, CSS, html, Markdown files, and more are stitched together and, barring any compilation errors,
the result is several html files, CSS, and other assets that is your site.
You could conceivably take those files and FTP them to a third-party hosting provider, but where is the fun in that?

#### Configuration

Jekyll uses what's called `front matter` YAML in the template files and in the configuration file, `_config.yml`.
This allows each post and page to have different elements.

#### Layouts and Includes

I've updated or added the following layout and includes files from the base theme.

| File | Modifications |
|-|-|
| _layouts\home.html | Replaced archive-single include with posts-lists |
| _layouts\onlinehelp.html | New layout based on single, removed title header, page metadata, and other elements not required |
| _layouts\pages.html | New layout based on single, added code to display published and updated date, removed environment requirement |
| _layouts\single.html | Added `classes: wide` to the front matter, added code to display published and updated date, removed environment requirement |
| _includes\analytics.html | Removed environment requirement |
| _includes\archive-single.html | Included new include file posts-date |
| _includes\posts-date.html | New include, displays published and updated date |
| _includes\posts-list.html | Based on archive-single, added posts-tags-list and posts-date |
| _includes\posts-tags-list.html | Based on tag-list, uses post.tags instead of page.tags |

### Code Syntax

Though I'm using the `air` skin for my theme, I didn't like the default color scheme the skin provided.
Using the theme's documentation, I was able to replace the code syntax highlighting color variables with another skin's by updating the file `_sass\_variables.scss`.

### My Modules

I wanted to provide a quick place to see my modules and what features they possess.
I originally created markdown tables for each, but then decided to use a data file.

Jekyll uses a `_data` folder to store data that could be used by the framework.
At build time, it will import all files in this folder and provide the data as variables.

#### Sample data

<pre>
- name: PoShEvents
  description: 'PowerShell module to query Windows Event Logs.'
  help: 'External file'
  onlinehelp: true
  updatablehelp: true
  pester: false
  build: false
  psgallery: true
</pre>

In my `_pages\modules.html` file, I added the html and Liquid code to loop through each section in the data file.
Instead of manually adding markdown or html code, which can become tedious, I now simply add another section in the
data file, `_data\mymodules.yml`.
On next build, the page will include the new module.

## Google Analytics

The theme has built-in support for Google Analytics.
You simply add your site's tracking ID to the `_config.yml` configuration file.

## Visitor Comments

The Minimal Mistakes theme includes several options for visitor comments: disqus, discourse, facebook, google-plus, staticman, staticman_v2, and custom.
After checking into them, I saw that the theme author used Staticman V2.
It seemed the best way to go and it keeps the comments within your grasp and local(ish) to the site.

{{< notice type="note" >}}
The theme author has developed **reply-to** comments but has not incorporated them into the Minimal Mistakes theme.
When I want to get under the hood again of the theme, I will look at implementing it for this site.
{{< /notice >}}

### Staticman API Webhook

For Staticman to work, there are a few quick configuration steps needed that are laid out in the [Staticman documentation](https://staticman.net/docs/).

Additionally, you will need a `staticman.yml` configuration file.
This file is included in the theme's repo.

### Moderation

Comment forms are magnets for bots and malicious users.
The theme provides a few tricks to filter comments down to the real users wanting to leave a message.
Beyond that, I use the optional moderation provided by Staticman which creates a pull request to the `comments` branch.
I get a notification that a PR is waiting for me, login to GitHub, even on mobile, and merge the pull request to approve the message.

The pull request for a comment is saved to `_data\comments\<title-slug\comment-<date-time-stamp>.yml`.
The visitor's email is stored as a hash value to keep it relatively safe.

### Gravatar

The theme will use the [Gravatar](https://en.gravatar.com/support/what-is-gravatar/) service to provide a graphic that the user has previously configured.

## Jekyll Build

As Jekyll runs on Ruby, you will need to have a system that can run Ruby and the Jekyll gems.

### Build System : Windows Subsystem for Linux

Instead of going down the Ruby on Windows avenue, I opted to learn a little about the new Windows Subsystem for Linux on Windows 10.
This method produced a few errors that I had to overcome.
I'll most likely post on that setup separately.
While I used this method initially, I have all but abandoned it for now.

### Build System : Google Cloud Platform

I looked for a free hosting solution to have a Linux VM and, what I'm hoping, it appears that Google Cloud Platform will
give you enough free credits per month to have a single, small VM running the whole time.
I had configured it to the point of being able execute the `jekyll build` command successfully.

I had even configured dynamic DNS for the VM to register its IP address with my domain at Google Domains.
Hey, at least I know how to do that now.

The problem I faced was that I need a way to kick off the build after I pushed changes into the branch --- automatically, if possible.
But that would entail me creating a listener on the VM that could be triggered by the branch status change.
I felt I had explored that rabbit hole enough and backed out quickly.

I still needed an automated build system.

### Build System : Travis CI

Enter Travis CI. The CI stands for **Continuous Integration** (Continuous Integration/Continuous Delivery) and
is part of the CI/CD model that I want to learn about.
It drives true DevOps.

On GitHub, I configured the Travis CI service for my blog repo.

{{< notice type="note" >}}
Travis CI [announced in May](https://docs.travis-ci.com/user/open-source-on-travis-ci-com/) that open source projects would be able to use `travis-ci.com`.
Sometime soon, I'll work on upgrading to the new method which uses GitHub Apps and has greater benefits.
{{< /notice >}}

With the integration service setup, whenever the main branch changes, that is when I push changes or when a PR from
the comments branch is merged, the service notifies Travis CI that it needs to create a build.

#### Travis Configuration File

In my `.travis.yml` configuration file, I set the build script to execute (chmod), set which branch to clone, and
whether to use a cache for the bundler. Additionally I set it to deploy to the gh-pages branch after the build phase
completes.

#### Build

When notified of a change, Travis spins up an Ubuntu Linux container, installs all dependencies (from self updating
cache), clones the main branch of my blog repo, runs the `/script/cibuild` bash script I created, then deploys to the
gh-pages branch.

##### script/cibuild

{{< gist id="74438e76f6d0de1a77d09bcd956d4203" >}}

## Conclusion

Spinning up a blog in this manner takes patience and determination, but the rewards include learning new technologies, such as GitHub, Ruby, and Jekyll.
It's taken me several steps toward automation, CI/CD, and DevOps.

Remember, because all of this is hosted publicly by GitHub, you can see everything in [my site's repository](https://github.com/thedavecarroll/thedavecarroll.com).
Check out the closed Pull Requests. Check out the folder structure and the files.

I hope this post was informative. Feel free to leave a comment below.

{{< update date="2018-08-29" >}}
I used the code from [Coder's Block](https://codersblock.com/blog/customizing-github-gists) to change the color syntax of GitHub Gists.
{{< /update >}}

{{< update date="2020-06-18" >}}
Updated references of master branch to main.
{{< /update >}}
