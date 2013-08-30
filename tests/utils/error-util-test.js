/*
 * Dependencies
 */

var errorUtil = require( "../../src/utils/error-util.js" );

/*
 * Tests
 */

exports.testCreateMessage = function ( test ) {

	var error = errorUtil.create( "This is the message" );

	test.equal( error.message, "This is the message" );

	test.expect( 1 );
	test.done();

}

exports.testCreateData = function ( test ) {

	var file = "c:\\source.js";
	var object = {
		path: "c:\\folder\\"
	}

	var error = errorUtil.create( "This is the message", {
		file: file,
		object: object
	} );

	test.equal( error.message, "This is the message" );
	test.equal( error.file, file );
	test.equal( error.object, object );

	test.expect( 3 );
	test.done();

}