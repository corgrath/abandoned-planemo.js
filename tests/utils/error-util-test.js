/*
 * Dependencies
 */

var errorUtil = require( "../../src/utils/error-util.js" );

/*
 * Tests
 */

exports.testIsErrorObject = function ( test ) {

	var error = errorUtil.create( "This is the message" );

	test.equal( typeof error, "object" );
	test.equal( error.name, "Error" );

	test.expect( 2 );
	test.done();

}

exports.testMessage = function ( test ) {

	var message = "This is the message";
	var error = errorUtil.create( message );

	test.equal( error.message, message );

	test.expect( 1 );
	test.done();

}

exports.testData = function ( test ) {

	var message = "This is the message";
	var file = "c:\\source.js";
	var object = {
		path: "c:\\folder\\"
	}

	var error = errorUtil.create( message, {
		file: file,
		object: object
	} );

	test.equal( error.message, message );
	test.equal( error.file, file );
	test.equal( error.object, object );

	test.expect( 3 );
	test.done();

}

exports.testEmptyMessageIsInvalid = function ( test ) {

	try {
		errorUtil.create();
	} catch ( error ) {
		test.equal( error.message, "Invalid message." );
	}

	try {
		errorUtil.create( undefined );
	} catch ( error ) {
		test.equal( error.message, "Invalid message." );
	}

	test.expect( 2 );
	test.done();

}