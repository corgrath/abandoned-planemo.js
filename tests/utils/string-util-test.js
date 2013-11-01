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

var expect = require( "chai" ).expect;

var stringUtil = require( "../../src-instrumented/utils/string-util.js" );

/*
 * Tests
 */

describe( "string util", function () {

	describe( "ends with", function () {

		it( "should be able to know how a string ends", function () {
			expect( stringUtil.endsWith( "hello world", "world" ) ).to.be.true;
		} );

		it( "should complain if needle is undefined", function () {

			expect(function () {
				stringUtil.endsWith( "hello world", undefined )
			} ).to.throw();

		} );

		it( "should complain if needle is undefined with right properties", function () {

			try {
				stringUtil.endsWith( "hello world", undefined );
			} catch ( error ) {
				expect( error.message ).to.equal( "Ends cannot be undefined." );
			}

		} );

	} );

} );