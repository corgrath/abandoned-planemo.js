![Planemo logotype](https://raw.github.com/corgrath/planemo-javascript-open-source-software-quality-platform/master/resources/planemo_github_version.png)



Planemo [we are working on creating 1.0!]
=================================================
Planemo is a [plugin-friendly][07] [open source][06] [software quality platform][09] written in [JavaScript][11] running on the [Node.js platform][01].



No seriously, what is it?
-------------------------------------------------
Planemo is basically a [static code analysis tool][14] written for the [Node.js platform][01]. Its main goal is to read everything in given directory (and recursively downwards) and
checks any found file (no matter if its its .js, .css, .html or whatever) and its contents against a set of rules, configurable by the user.

The whole idea is that Planemo should help your project to maintain [coding conventions][02], [best practices][03] and other fun rules your software project might have, for any source code file or language.

Currently it has a lot of [available built in plugins to choose from][TOC-00], but it also super easy to [write your own plugin][TOC-06] and even contribute it back to the project.

Fun fact #184: The word *Planemo* comes from *[planetary-mass object][08]*!



Table of Contents
-------------------------------------------------
 * [How the versioning works][TOC-05]
 * [Continuous build status][TOC-01]
 * Downloading and running Planemo
    * Via npm (preferred way for end users)
    * Via git clone (preferred way for plugin developers)
    * Download as a ZIP file (preferred way for people who really like ZIP files)
 * The configuration file
 * [Available plugins][TOC-00]
 * Writing your own plugin
 * Running the testsplugins
 * Writing tests
 * Found a bug or have a questions?
 * Plugin and Data Collector hooks
 * Major changes
 * Contributors
 * License


How the versioning works
-------------------------------------------------
Two things you need to know:

 * The [code on GitHub][30] should be regarded as unstable builds. We don't have any restrictions when and how things can be checked in there (within common sense though).
 * The [project on npm][28] should be regarded as the stable builds. We will only publish a new version to npm once we feel Planemo is stable and has any new end user value.



Continuous build status
-------------------------------------------------
Planemo is continuously built by [Drone.io][16]. You can find the build history [here][15].

[![Build Status](https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform/status.png)](https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform/latest)



Downloading and running Planemo
-------------------------------------------------
Planemo runs on Node.js, so make sure you have that [installed][20]. If you want to contribute you need to have [Git installed][21] as well.

### Via npm (preferred way for end users)

Since Planemo is [published on npm][28], you maybe simply type `npm install planemo`. This should download Planemo and all its dependencies.

To start Planemo you may simply type `cd node_modules/planemo/ && node planemo <configuration file>`.

### Via git clone (preferred way for plugin developers)

You can clone the Git project directly by typing `git clone git@github.com:corgrath/planemo-open-source-software-quality-platform.git`.

After it you need to install the Node.js dependencies with `npm install`.

Now you should be able to start Planemo using a [configuration file][TOC-02] by using
the command `node planemo <configuration file>`

### Download as a ZIP file (preferred way for people who really like ZIP files)

On the Planemo GitHub page there is a button on the page with the text *"Download ZIP"*.

After it you need to install the Node.js dependencies with `npm install`.

Now you should be able to start Planemo using a [configuration file][23] by using the command `node planemo <configuration file>`



The configuration file
-------------------------------------------------
In order to launch Planemo you need to specify a [JSON][13] formatted *configuration file* as the first argument. The best way to describe it is to look at a sample file, and then
look at the property explanations below to better understand what and how the different parts works.

		{
	01		"source":
				[
					{
	02					"basePath": "C:\\project\\",
	03					"fullPath": "C:\\project\\src\\",
	04					"directoryName": "src"
					}
				],
	05		"verbose": false,
	06		"plugins": {
	07			"check-directory-name-plugin": {
	08				"regexp": "^[a-z]+$"
				},
	07			"check-file-name-plugin": {
	08				"regexp": "^[a-z|-]+\\.(?:js|html|css|less)$"
				}
			}
		}

Row explanations:

 * 01: The *source* property is required to specify the starting directory which Planemo will start analyzing files in.
 * 02: The starting directory without the final folder
 * 03: The starting directory with the final folder
 * 04: The name of the final folder
 * 05: Verbose setting, meaning if you want Planemo to be verbose or not. Valid options are *true* or *false*. If you are using plugins that should show warnings instead of errors, having *verbose* to *false* is recommended.
 * 06: Here the user can define a list of plugins that should be invoked during the code analysis
 * 07: The plugin name which should be used during the analysis is specified as a property
 * 08: The the value of the property is the *options* that should be sent to the plugin



Available plugins
-------------------------------------------------
[Documentation concerning this topic can be found here.][05]

You can enable what plugins you want Planemo to run by defining them in your configuration file.

Below is a list of all the current available plugins, a brief description of their individual options and an example.

### check-directory-name-plugin
Checks a directory name.

 * pattern - A regular expression pattern which the directory name must comply with.

Example:

    "check-directory-name-plugin": {
        "pattern": "^[a-z]+$"
    }



### check-file-name-plugin
Checks a file name.

 * pattern - A regular expression pattern which the file name name must comply with.

Example:

    "check-file-name-plugin": {
		"pattern": "^[a-z|-]+\\.(?:js|html|css|less)$"
	}



### check-file-contents-less-plugin
Checks the contents of a LESS file.

 * disallow - An array of strings which must not occur in a found LESS file.

Example:

    "check-file-contents-less-plugin": {
        "disallow":
        [
            "-moz-",
            "-webkit-",
            "-o-",
            "-ms-"
        ]
    }







Writing your own plugin
-------------------------------------------------
Writing new plugins to Planemo is fairly easy. A plugin is a stand alone file that is located in the `/plugins/` folder.

To get a better understanding of how a simple plugin looks like, lets look at an existing one. The *check-directory-name-plugin.js* plugin that has the responsibility to validate directory names:

	01	/*
	02	 * Licensed under the Apache License, Version 2.0 (the "License");
	03	 * you may not use this file except in compliance with the License.
	04	 * You may obtain a copy of the License at
	05	 *
	06	 * http://www.apache.org/licenses/LICENSE-2.0
	07	 *
	08	 * Unless required by applicable law or agreed to in writing, software
	09	 * distributed under the License is distributed on an "AS IS" BASIS,
	10	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	11	 * See the License for the specific language governing permissions and
	12	 * limitations under the License.
	13	 *
	14	 * See the NOTICE file distributed with this work for additional
	15	 * information regarding copyright ownership.
	16	 */
	17
	18	/*
	19	 * Dependencies
	20	 */
	21
	22	var observerService = require( "../services/observer-service.js" );
	23	var errorUtil = require( "../utils/error-util.js" );
	24
	25	/*
	26	 * Public functions
	27	 */
	28
	29	exports.init = function ( options ) {
	30
	31		observerService.onDirectoryFound( function checkDirectoryNameOnDirectoryFound ( basePath, fullPath, directoryName, responseFunction ) {
	32			exports.onDirectoryFound( options, basePath, fullPath, directoryName, responseFunction );
	33		} );
	34
	35	};
	36
	37	exports.onDirectoryFound = function onDirectoryFound ( options, basePath, fullPath, directoryName, responseFunction ) {
	38
	39		if ( !options ) {
	40			throw errorUtil.create( "No options were defined." );
	41		}
	42
	43		if ( !options.regexp ) {
	44			throw errorUtil.create( "Invalid regexp option." );
	45		}
	46
	47		if ( !options.regexp ) {
	48			throw errorUtil.create( "Invalid regexp option." );
	49		}
	50
	51		var pattern = new RegExp( options.regexp );
	52
	53		var isLegalFilename = pattern.test( directoryName );
	54
	55		if ( !isLegalFilename ) {
	56
	57	    	responseFunction( errorUtil.create( "The directory name \"" + directoryName + "\" is not valid.", {
	58				basePath: basePath,
	59				fullPath: fullPath,
	60				directoryName: directoryName
	61			} ) );
	62
	63		}
	64
	65	}

Row explanations:

 * 01 - 16: This is the [Apache 2.0 license][29] information all source files needs to embed.
 * 22 - 23: Module dependencies are declared here
 * 29: Each Plugin needs to have a public `exports.init` function. The *argument* to the function will be the *options* the user has specified in the [*configuration file*][TOC-02]. The Plugin developer can come up with any (or no) options as they like. However, all options should be properly documented for other Planemo end users.
 * 31: In this plugin we simply hook into a new function once a new directory found is found. A plugin can hook function into a wide range of [hooks][TOC-03]. In this plugin we are only interested in the `onDirectoryFound` hook.
 * 37: This is the primary function that will be called each time Planemo finds a directory. Since we did a fancy closure hook on row 32, we now get both the user options (*options*) and the hook information details ( *basePath*, *fullPath*, *directoryName*) and a specific callback function (`responseFunction`) to our function. The reason why this function is public (meaning its declared on the export object like `export.onDirectoryFound = `) is because we want to be able to [unit test it later][TOC-04].
 * 39-45: Basic validation to make sure that the options are as we expect them to be.
 * 57: Since the plugin's responsibility is to check a directory name towards a regular expression, we also need to be able tell Planemo that this plugin has found a problem. This is simply done returning an *Error* as the first argument of the `responseFunction`.



Plugin and Data Collector hooks
-------------------------------------------------
Not yet written.



Running the tests
-------------------------------------------------
You can execute the tests by running `npm test` if you are running from a [Windows Command Prompt][27] or `run_tests.bat` is you are using a [Shell][26], such as [Git Bash][12].



Writing tests
-------------------------------------------------
For obvious reasons, the [more tests we have for Planemo the happier we are][18]. So it is encouraged that we write supporting [unit tests][17] for our code.

Planemo is currently using [nodeunit][24] as its test framework. If you are planning to write tests it would be a good idea to look at [their examples][19] and read
their [API Documentation][25] to better understand how to write new or maintain old tests. If you looking for examples you can find them in the `/tests/` folder in this project.



Found a bug or have a questions?
-------------------------------------------------
If you have found a bug and want to report it, or have any other feedback or questions, you can simply [create an issue][23].



Major changes
-------------------------------------------------
Not yet written.



Contributors
-------------------------------------------------
 * [Christoffer Pettersson][C00]



License
-------------------------------------------------
 * Planemo licensed under the Apache License, Version 2.0. See the NOTICE file distributed with this work for additional information regarding copyright ownership.
 * Planemo logotype images Copyright (C) Christoffer Pettersson, christoffer[at]christoffer[dot]me. All Rights Reserved! Please contact Christoffer regarding the possible use of these images.




[01]: http://nodejs.org/
[02]: http://en.wikipedia.org/wiki/Coding_conventions
[03]: http://en.wikipedia.org/wiki/Best_practice
[04]: http://www.github.com/
[05]: https://github.com/corgrath/planemo-open-source-software-quality-platform/blob/master/docs/available_plugins.md
[06]: http://en.wikipedia.org/wiki/Open-source_software
[07]: http://en.wikipedia.org/wiki/Plug-in_%28computing%29
[08]: http://en.wikipedia.org/wiki/Planemo#Planetary-mass_objects
[09]: http://en.wikipedia.org/wiki/Software_quality
[10]: https://npmjs.org/
[11]: http://en.wikipedia.org/wiki/JavaScript
[12]: http://git-scm.com/downloads
[13]: http://en.wikipedia.org/wiki/JSON
[14]: http://en.wikipedia.org/wiki/Static_code_analysis
[15]: https://drone.io/github.com/corgrath/planemo-open-source-software-quality-platform
[16]: http://www.drone.io/
[17]: http://en.wikipedia.org/wiki/Unit_testing
[18]: http://en.wikipedia.org/wiki/Unit_testing#Benefits
[19]: https://github.com/caolan/nodeunit#usage
[20]: http://nodejs.org/
[21]: https://help.github.com/articles/set-up-git/
[22]: https://github.com/corgrath/planemo-javascript-open-source-software-quality-platform/archive/master.zip
[23]: https://github.com/corgrath/planemo-open-source-software-quality-platform/issues
[24]: https://github.com/caolan/nodeunit
[25]: https://github.com/caolan/nodeunit#api-documentation
[26]: http://en.wikipedia.org/wiki/Shell_%28computing%29
[27]: http://en.wikipedia.org/wiki/Command_Prompt
[28]: https://npmjs.org/package/planemo
[29]: http://www.apache.org/licenses/LICENSE-2.0.html
[30]: https://github.com/corgrath/planemo-open-source-software-quality-platform


[TOC-00]: #available-plugins
[TOC-01]: #continuous-build-status
[TOC-02]: #the-configuration-file
[TOC-03]: #plugin-and-data-collector-hooks
[TOC-04]: #writing-tests
[TOC-05]: #versioning
[TOC-06]: #writing-your-own-plugins


[C00]: https://github.com/corgrath