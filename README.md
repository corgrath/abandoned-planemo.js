![Planemo logotype](https://raw.github.com/corgrath/planemo-javascript-open-source-software-quality-platform/master/resources/planemo_github_version.png)



Planemo
=================================================
Planemo is a plugin-friendly Open Source Software Quality Platform written in [JavaScript][JavaScript]  [JavaScript].

[JavaScript]: http://en.wikipedia.org/wiki/JavaScript


No seriously, what is it?
-------------------------------------------------
Planemo is basically a [static code analysis tool][00] written for the [Node.js platform][01]. Its main goal is to read everything in given directory (and recursively downwards) and
checks all the found files (no matter if its its .js, .css, .html or whatever) and check them against a set of rules, configurable by the user.

The whole idea is that Planemo should help your project to maintain [coding conventions][02], [best practices][03] and other fun rules your software project might have, for any source code or any languge.

Currently it has a lot of [available built in plugins to choose from][04], but it also super easy to [write your own plugin][05] and even contribute it back to the project.

[00]: http://en.wikipedia.org/wiki/Static_code_analysis
[01]: http://nodejs.org/
[02]: http://en.wikipedia.org/wiki/Coding_conventions
[03]: http://en.wikipedia.org/wiki/Best_practice
[04]: #available-plugin-configurations
[05]: #writing-your-own-plugins



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



Continuous build status
-------------------------------------------------
Planemo is continously built by [drone.io][10]. You can find the build history [here][11].

[![Build Status](https://drone.io/github.com/corgrath/planemo-javascript-open-source-software-quality-platform/status.png)](https://drone.io/github.com/corgrath/planemo-javascript-open-source-software-quality-platform/latest)


[10]: https://www.drone.io
[11]: https://drone.io/github.com/corgrath/planemo-javascript-open-source-software-quality-platform


Downloading and running Planemo
-------------------------------------------------

1. Planemo runs on Node.js, so make sure you have that [installed][20]. If you want to contribute you need to
have [Git installed][21] as well.

2. Download the whole Planemo GitHub project, either by [downloading][22] and extracting a ZIP copy of the project (there is a button on the page) or using the `git clone` command.

3. Download Node dependencies by typing in `npm install`.

4. Now you should be able to start Planemo using a [configuration file][23] by using the command `node planemo <configuration file>`

[20]: http://nodejs.org/
[21]: https://help.github.com/articles/set-up-git/
[22]: https://github.com/corgrath/planemo-javascript-open-source-software-quality-platform/archive/master.zip
[23]: #the-configuration-file




The configuration file
-------------------------------------------------
Not yet written.



Available plugin configurations
-------------------------------------------------
Not yet written.



Writing your own plugins
-------------------------------------------------
Not yet written.



Running the tests
-------------------------------------------------
Planemo is currently using [nodeunit][60] as its test framework.

You can execute the tests by running `npm test` if you are running from a [Windows Command Prompt][62] or `run_tests.bat` is you are using a [Shell][61], such as [Git Bash][63].

[60]: https://github.com/caolan/nodeunit
[61]: http://en.wikipedia.org/wiki/Shell_%28computing%29
[62]: http://en.wikipedia.org/wiki/Command_Prompt
[63]: http://git-scm.com/downloads

Writing tests
-------------------------------------------------
Not yet written.



Major changes
-------------------------------------------------
Not yet written.


