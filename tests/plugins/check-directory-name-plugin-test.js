/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-directory-name-plugin.js" );

/*
 * Tests
 */

exports.invalidOptions = function ( test ) {

	var options = {
	}

	try {
		plugin.onDirectoryFound( undefined );
	} catch ( error ) {
		test.equal( error.message, "No options were defined." );
	}

	try {
		plugin.onDirectoryFound( options );
	} catch ( error ) {
		test.equal( error.message, "Invalid regexp option." );
	}

	test.expect( 2 );
	test.done();

}

exports.invalidDirectoryName = function ( test ) {

	var basePath = "c:\\folder1\\";
	var fullPath = "c:\\folder1\\folder2\\";
	var directoryName = "this foldername has spaces";

	var options = {
		regexp: "^\\w+$"
	};

	try {

		plugin.onDirectoryFound( options, basePath, fullPath, directoryName );

	} catch ( error ) {

		test.equal( error.message, "The directory name \"this foldername has spaces\" is not valid." );

	}

	test.expect( 1 );
	test.done();

}

exports.success = function ( test ) {

	var basePath = "c:\\folder1\\";
	var fullPath = "c:\\folder1\\folder2\\";
	var directoryName = "folder2";

	var options = {
		regexp: "^\\w+$"
	};

	test.doesNotThrow( function () {

		plugin.onDirectoryFound( options, basePath, fullPath, directoryName );

	} );

	test.expect( 1 );
	test.done();

}