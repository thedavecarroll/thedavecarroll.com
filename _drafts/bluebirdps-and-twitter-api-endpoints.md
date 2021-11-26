---
layout: single
title: "BluebirdPS and Twitter API Endpoints"
excerpt: "Learn how I provide BluebirdPS users a way to correlate Twitter API endpoints to commands."
header:
  overlay_image: /assets/images/bluebirdps/psfollowfriday-tweet.png
  overlay_filter: 0.9
comments: true
tags:
  - bluebirdps
  - get-help
  - help system
  - twitter
  - twitter client
  - twitter api
  - tweet
  - social media
  - powershell module
category:
  - powershell
---


## Introduction

When I released the first version of the [BluebirdPS][BluebirdPS]{:target="_blank"} module last year,
I included a command `Get-TwitterApiEndpoint` that was meant to be a easy way for the user to correlate the [Twitter API][TwitterAPI]{:target="_blank"}
endpoints to BluebirdPS commands.
This latest version has a command with the same name, however, it does the correlation drastically different than the previous version.

This article will discuss how I designed both versions including the pros and cons of each.

[TwitterAPI]: https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api
[BluebirdPS]: https://www.powershellgallery.com/packages/BluebirdPS

## The First Get-TwitterApiEndpoint

As I developed the first few commands, even before the module's name was solidified,
I realized that I needed a way to document the API endpoints those commands called.
I didn't want to forget and start building another command with an endpoint already used.
I also wanted an easy way to get to the API documentation in case I needed more information for troubleshooting errors.
This documentation should include how the endpoint iterates and which endpoint parameter is used by the command,
and the parameter's name for the command.

### Endpoint JSON

Eventually, I came up with the following JSON template that I could use to collect the data about a given endpoint.

```json
{
    "Resource": "help",
    "Endpoints": {
        "METHOD base_resource/resource": {
            "Function": "Verb-Noun",
            "ApiVersion": "v1.1",
            "Resource": "base_resource/resource",
            "Method": "METHOD",
            "Uri": "base_uri/base_resource/resource.json",
            "ApiReference": "URL to API Reference",
            "Description": "Description of what a call to this resource returns",
            "Iteration": "None, Page, or Cursor",
            "Parameters": [
                {
                    "Name": "param1",
                    "PSParameter": "",
                    "Implemented": true,
                    "Required": "required or optional",
                    "Description": "description of parameter 1",
                    "DefaultValue": "default value of parameter 1",
                    "MinValue": "minimum value",
                    "MaxValue": "maximum value",
                    "Example": "example of parameter 1"
                },
                {
                    "Name": "param2",
                    "PSParameter": "",
                    "Implemented": true,
                    "Required": "required or optional",
                    "Description": "description of parameter 2",
                    "DefaultValue": "default value of parameter 2",
                    "Example": "example of parameter 2"
                }
            ]
        }
    }
}
```

This template had all of the components that I thought would be useful.
The resource name, basically the category of the endpoint, and an array of endpoints.
Each endpoint data would have the API endpoint, the HTTP method and base resource with specific resource.
It would also have the PowerShell function's name, the endpoint URI, API version, link to the API documentation, description,
iteration type, and an array of parameters.

### Build Script

As I wrote the commands, I created an individual JSON file for each command.
My original build script included a step which was responsible for compiling these JSON files into a single file
that would be shipped with the module.

### Importing the Compiled JSON

When `Get-TwitterApiEndpoint` was executed, it would read the endpoint JSON and output the details to the user.
I provided a way to focus directly on a resource type or to get the information for a specific command.
Internally, the command formatted the output, as importing it changed the order of property or keys.

### Command Help

Even with this command available, I still felt compelled to include a link to the API documentation for all endpoints used
by each command in the command's help.
I use [platyPS][platyPS]{:target="_blank"} to create markdown files for each command and to compile the help into an
external MAML file that is shipped with the module.

[platyPS]: https://github.com/PowerShell/platyPS

## The Next Generation Get-TwitterApiEndpoint

I spent a considerable amount of time between releasing BluebirdPS v0.1.1 and v0.5.0 ruminating about many aspects of the module,
including the amount of work required to maintain the endpoint JSON files used by the first iteration of this command.

The endpoint files would not have changed, if at all, once created.
However, the Twitter API itself was changing.

### Just Command Help

Since I was including the HTTP method and resource URI along with the Twitter API documentation URL in each command's help,
I focused on negating the duplication of that data.
This meant that I would need to rely on `Get-Help` to access the help links.

## Pros and Cons

## Summary



Learn how to [get started with BluebirdPS][BluebirdPSGettingStarted]{:target="_blank"} today!

If you have use cases or ideas on how to use BluebirdPS, please add a topic
or join in with others in [BluebirdPS's repo discussion][BluebirdPSDiscussion]{:target="_blank"}.
I ask you to submit any [bug reports][BluebirdPSBugReport]{:target="_blank"} as you encounter errors
or a [feature request][BluebirdPSFeatureRequest]{:target="_blank"} when you have an idea that could benefit other BluebirdPS users.

I hope you’ve found this interesting or informative.
I really would like to hear your thoughts on this article.
If you have any comments or questions, please post them below.

[BluebirdPSGettingStarted]: https://docs.bluebirdps.dev/en/latest/prerequisites/
[BluebirdPSDiscussion]: https://bit.ly/BluebirdPSDiscussion
[BluebirdPSBugReport]: https://bit.ly/BluebirdPSBugReport
[BluebirdPSFeatureRequest]: https://bit.ly/BluebirdPSFeatureRequest
