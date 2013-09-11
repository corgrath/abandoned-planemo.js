/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */

/*
 * Dependencies
 */

var errorUtil = require( "../src/utils/error-util.js" );

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