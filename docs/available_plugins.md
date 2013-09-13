Available plugins
=================================================
You can enable what plugins you want Planemo to run by defining them in your configuration file.

Below is a list of all the current available plugins, a brief description of their individual options and an example.

check-directory-name-plugin
-------------------------------------------------
Checks a directory name.

 * pattern - A regular expression pattern which the directory name must comply with.

Example:

    "check-directory-name-plugin": {
        "pattern": "^[a-z]+$"
    }



check-file-name-plugin
-------------------------------------------------
Checks a file name.

 * pattern - A regular expression pattern which the file name name must comply with.

Example:

    "check-file-name-plugin": {
		"pattern": "^[a-z|-]+\\.(?:js|html|css|less)$"
	}



check-file-contents-less-plugin
-------------------------------------------------
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


