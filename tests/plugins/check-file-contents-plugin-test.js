/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-file-contents-plugin.js" );

/*
 * Tests
 */

exports.testNotAllowedToContainRegexp = function ( test ) {

	var file = "c:\\folder\\file.txt";
	var lineNumber = 1;

	var options = {
		notAllowedToContainRegexp:
			[
				"/\\*global.+console"
			]
	};

	try {
		plugin.onFileLineRead( options, file, lineNumber, "/*global console */" );
	} catch ( error ) {
		test.equal( error.message, "Found the invalid pattern \"/\\*global.+console\"." );
		test.equal( error.file, file );
	}

	try {
		plugin.onFileLineRead( options, file, lineNumber, "/*global pubsuc, console */" );
	} catch ( error ) {
		test.equal( error.message, "Found the invalid pattern \"/\\*global.+console\"." );
		test.equal( error.file, file );
	}

	test.expect( 4 );
	test.done();

}