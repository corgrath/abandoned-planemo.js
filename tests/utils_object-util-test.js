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

var objectUtil = require( "../src/utils/object-util.js" );

/*
 * Tests
 */

exports.testIsNumber = function ( test ) {

	test.equal( objectUtil.isNumber( 0 ), true );
	test.equal( objectUtil.isNumber( -1 ), true );

	try {
		objectUtil.isNumber();
	} catch ( error ) {
		test.equal( error.message, "Number is undefined." );
	}

	test.equal( objectUtil.isNumber( "Hello world" ), false );

	test.expect( 4 );
	test.done();

};