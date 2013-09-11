![Planemo logotype](https://raw.github.com/corgrath/planemo-javascript-open-source-software-quality-platform/master/resources/planemo_github_version.png)



Planemo
=================================================
Planemo is a [plugin-friendly][07] [open source][06] [software quality platform][09] written in [JavaScript][11] running on the [Node.js][12] platform.



No seriously, what is it?
-------------------------------------------------
Planemo is basically a [static code analysis tool][14] written for the [Node.js platform][01]. Its main goal is to read everything in given directory (and recursively downwards) and
checks any found file (no matter if its its .js, .css, .html or whatever) and its contents against a set of rules, configurable by the user.

The whole idea is that Planemo should help your project to maintain [coding conventions][02], [best practices][03] and other fun rules your software project might have, for any source code file or languge.

Currently it has a lot of [available built in plugins to choose from][04], but it also super easy to [write your own plugin][05] and even contribute it back to the project.

Fun fact #184: The word *Planemo* comes from *[planetary-mass object][08]*!



Table of Contents
-------------------------------------------------
 * [Continuous build status](#continuous-build-status)
 * [Downloading and running Planemo](#downloading-and-running-planemo)
 * [The configuration file](#the-configuration-file)
 * [Available plugin configurations](#available-plugin-configurations)
 * [Writing your own plugins](#writing-your-own-plugins)
 * [Running the testsplugins](#running-the-tests)
 * [Writing tests](#writing-tests)
 * [Major changes](#major-changes)
 * [Contributors](#contributors)
 * [License](#license)



Continuous build status
-------------------------------------------------
Planemo is continously built by [drone.io]. You can find the build history [here][11].

[![Build Status](https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform/status.png)](https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform/latest)


[drone.io]: http://www.drone.io/
[11]: https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform


Downloading and running Planemo
-------------------------------------------------

1. Planemo runs on Node.js, so make sure you have that [installed][20]. If you want to contribute you need to
have [Git installed][21] as well.

* You can download Planemo in three different ways:

    * Via [npm][10] by typing `npm install planemo` (preferred way)
    * Via GitHub by downloading the whole project and extracting the ZIP file (there is a button on the page)
    * Via Git by typing `git clone git@github.com:corgrath/planemo-open-source-software-quality-platform.git`

* Once downloaded, install all the Node dependencies by typing in `npm install`.

* Now you should be able to start Planemo using a [configuration file][23] by using the command `node planemo <configuration file>`



The configuration file
-------------------------------------------------
In order to launch Planemo you need to specify a [JSON][13] formatted *configuration file* as the first argument. The best way to describe it is to look at a sample file, and then
look at the property explanations below to better understand what and how the different parts works.

	01	{
	02		"source":
	03			[
	04				{
	05					"basePath": "C:\\project\\",
	06					"fullPath": "C:\\project\\src\\",
	07					"directoryName": "src"
	08				}
	09			],
	10		"plugins": {
	11			"check-directory-name-plugin": {
	12				"regexp": "^[a-z]+$"
	13			},
	14			"check-file-name-plugin": {
	15				"regexp": "^[a-z|-]+\\.(?:js|html|css|less)$"
	16			}
	17		}
	18	}



Available plugin configurations
-------------------------------------------------
Not yet written.



Writing your own plugins
-------------------------------------------------
Not yet written.



Running the tests
-------------------------------------------------
You can execute the tests by running `npm test` if you are running from a [Windows Command Prompt][62] or `run_tests.bat` is you are using a [Shell][61], such as [Git Bash][63].





Writing tests
-------------------------------------------------
For obvious reasons, the [more tests we have for Planemo the happier we are]. So it is encouraged that we write supporting [unit tests] for our code.

Planemo is currently using [nodeunit][60] as its test framework. If you are planning to write tests it would be a good idea to look at [their examples] and read
their [API Documentation] to better understand how to write new or maintain old tests. If you looking for examples you can find them in the `/tests/` folder in this project.

[unit tests]: http://en.wikipedia.org/wiki/Unit_testing
[more tests we have for Planemo the happier we are]: http://en.wikipedia.org/wiki/Unit_testing#Benefits
[their examples]: https://github.com/caolan/nodeunit#usage
[API Documentation]: https://github.com/caolan/nodeunit#api-documentation



Major changes
-------------------------------------------------
Not yet written.



Contributors
-------------------------------------------------
 * Christoffer Pettersson, christoffer[at]christoffer[dot]me


License
-------------------------------------------------
 * Planemo licensed under the Apache License, Version 2.0. See the NOTICE file distributed with this work for additional information regarding copyright ownership.
 * Planemo logotype images Copyright (C) Christoffer Pettersson, christoffer[at]christoffer[dot]me. All Rights Reserved! Please contact Christoffer regarding the possible use of these images.




[01]: http://nodejs.org/
[02]: http://en.wikipedia.org/wiki/Coding_conventions
[03]: http://en.wikipedia.org/wiki/Best_practice
[04]: #available-plugin-configurations
[05]: #writing-your-own-plugins
[06]: http://en.wikipedia.org/wiki/Open-source_software
[07]: http://en.wikipedia.org/wiki/Plug-in_%28computing%29
[08]: http://en.wikipedia.org/wiki/Planemo#Planetary-mass_objects
[09]: http://en.wikipedia.org/wiki/Software_quality
[10]: https://npmjs.org/
[11]: http://en.wikipedia.org/wiki/JavaScript
[12]: http://nodejs.org/
[13]: http://en.wikipedia.org/wiki/JSON
[14]: http://en.wikipedia.org/wiki/Static_code_analysis

[20]: http://nodejs.org/
[21]: https://help.github.com/articles/set-up-git/
[22]: https://github.com/corgrath/planemo-javascript-open-source-software-quality-platform/archive/master.zip
[23]: #the-configuration-file

[60]: https://github.com/caolan/nodeunit
[61]: http://en.wikipedia.org/wiki/Shell_%28computing%29
[62]: http://en.wikipedia.org/wiki/Command_Prompt
[63]: http://git-scm.com/downloads