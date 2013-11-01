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

var objectUtil = require( "../../src-instrumented/utils/object-util.js" );

/*
 * Tests
 */

describe( "object util", function () {

	describe( "is number", function () {

		it( "should return true", function () {

			expect( objectUtil.isNumber( 0 ) ).to.be.true;
			expect( objectUtil.isNumber( -1 ) ).to.be.true;

		} );

		it( "should return false", function () {

			expect( objectUtil.isNumber( "Hello world" ) ).to.be.false;

		} );

		it( "should complain if not a number", function () {

			expect(function () {
				objectUtil.isNumber();
			} ).to.throw( "Number is undefined." );

		} );

	} );

} );