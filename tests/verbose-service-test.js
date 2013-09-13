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

var verboseService = require( "../src/services/verbose-service.js" );

/*
 * Tests
 */

/*
 * Its important that this test is executed first, since verbose-service has a global state.
 */

exports.testIsVerboseDefaultValue = function ( test ) {

	test.equal( verboseService.isVerbose(), true );

	test.expect( 1 );
	test.done();

};

exports.testSetVerbose = function ( test ) {

	try {
		verboseService.setVerbose();
	} catch ( error ) {
		test.equal( error.message, "Verbose is undefined." );
	}

	try {
		verboseService.setVerbose( "This is a String." );
	} catch ( error ) {
		test.equal( error.message, "Verbose is not a Boolean." );
	}

	test.doesNotThrow( function () {

		verboseService.setVerbose( true );
		test.equal( verboseService.isVerbose(), true );

	} );

	test.expect( 4 );
	test.done();

};
