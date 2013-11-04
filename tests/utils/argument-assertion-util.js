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

var assert = require( "../../src-instrumented/utils/argument-assertion-util.js" );

/*
 * Tests
 */

describe( "argument assertion util", function () {

	describe( "is object", function () {

		it( "should throw an error if it is wrong typr", function () {

			var name = "This is the name";

			expect(function () {
				assert.isObject( "hello", name );
			} ).to.throw( name + " is not a \"object\" but a \"string\"." );

		} );

	} );

} );