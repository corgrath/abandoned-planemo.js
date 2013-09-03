/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-file-contents-javascript-plugin.js" );

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

	try {
		plugin.onJavaScriptFileRead( options );
	} catch ( error ) {
		test.equal( error.message, "The option \"mustcontain\" is not defined." );
	}

	test.expect( 2 );
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