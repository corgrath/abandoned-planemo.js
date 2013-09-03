/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-javascript-line-length-plugin.js" );

/*
 * Tests
 */

exports.testOptions = function ( test ) {

	try {
		plugin.onJavaScriptFileLineRead( undefined, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "Invalid options." );
	}

	var options = {
	}

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "No length is defined in the options." );
	}

	options.length = "string";

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "The length \"string\" is not a number." );
	}

	options.length = -1;

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "The length \"-1\" cannot be less than 0." );
	}

	test.expect( 4 );
	test.done();

};

exports.testInvalid = function ( test ) {

	var options = {
		length: 5
	};

	try {

		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "hello world line" );

	} catch ( error ) {

		test.equal( error.message, "Line \"linenumber\" length in file \"file\" too large. Maximum is \"5\" but found \"16\"." );

	}

	test.expect( 1 );
	test.done();

}
exports.testValid = function ( test ) {

	var options = {
		length: 20
	};

	test.doesNotThrow( function () {

		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "hello world line" );

	} );

	test.expect( 1 );
	test.done();

}