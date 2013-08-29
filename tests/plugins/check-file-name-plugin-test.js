/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-file-name-plugin.js" );

/*
 * Tests
 */

exports.invalidOptions = function ( test ) {

	var options = {
	}

	try {
		plugin.onFileFound( undefined );
	} catch ( error ) {
		test.equal( error.message, "No options were defined." );
	}

	try {
		plugin.onFileFound( options );
	} catch ( error ) {
		test.equal( error.message, "Invalid regexp option." );
	}

	test.expect( 2 );
	test.done();

}

exports.invalidNames = function ( test ) {

	var path = "c:\\folder1\\";
	var fileName = "planemo file.js";

	var options = {
		regexp: "^[\\w-]+\\.js|less$"
	};

	try {
		plugin.onFileFound( options, path, fileName );
	} catch ( error ) {
		test.equal( error.message, "The file name \"planemo file.js\" is not valid." );
	}

	test.expect( 1 );
	test.done();

}

exports.validNames = function ( test ) {

	var path = "c:\\folder1\\";
	var fileNames =
		[
			"planemo.js",
			"planemo.less",
			"planemo-hello.js"
		];

	var options = {
		"regexp": "^\\w+|-\\.js|less$"
	};

	for ( var i in fileNames ) {

		var fileName = fileNames[i];

		test.doesNotThrow( function () {

			plugin.onFileFound( options, path, fileName );

		} );

	}

	test.expect( fileNames.length );
	test.done();

}