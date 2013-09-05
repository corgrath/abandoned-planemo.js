/*
 * Dependencies
 */

var plugin = require( "../src/plugins/check-file-contents-javascript-plugin.js" );

/*
 * Tests
 */

exports.testOptions = function ( test ) {

	var options = {
	};

	try {
		plugin.onJavaScriptFileRead( undefined );
	} catch ( error ) {
		test.equal( error.message, "No options were defined." );
	}

	test.expect( 1 );
	test.done();

}

exports.testMustContains = function ( test ) {

	var options = {
		mustcontain:
			[
				"@owner \\w+ \\w+ \\(\\w{3}\\)"
			]
	}

	var file = "c:\\source.js";
	var fileContents = "Hello world!";

	try {
		plugin.onJavaScriptFileRead( options, file, fileContents );
	} catch ( error ) {
		test.equal( error.message, "Did not found the pattern \"" + options.mustcontain[0] + "\"." );
	}

	try {

	} catch ( error ) {
		test.equal( error.message, "Did not found the pattern \"" + options.mustcontain[0] + "\"." );
	}

	test.doesNotThrow( function () {
		plugin.onJavaScriptFileRead( options, file, "\\* @owner John Doe (jdo) */" );
	} );

	test.expect( 2 );
	test.done();

}

exports.testDisallow = function ( test ) {

	var file = "c:\\folder\\file.txt";

	var options = {
		disallow:
			[
				"/\\*global.+console"
			]
	};

	try {
		plugin.onJavaScriptFileRead( options, file, "/*global console */" );
	} catch ( error ) {
		test.equal( error.message, "Found the invalid pattern \"" + options.disallow[0] + "\"." );
		test.equal( error.file, file );
	}

	try {
		plugin.onJavaScriptFileRead( options, file, "/*global pubsub, console */" );
	} catch ( error ) {
		test.equal( error.message, "Found the invalid pattern \"" + options.disallow[0] + "\"." );
		test.equal( error.file, file );
	}

	test.expect( 4 );
	test.done();

}