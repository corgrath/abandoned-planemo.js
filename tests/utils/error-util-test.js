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

var errorUtil = require( "../../src/utils/error-util.js" );

/*
 * Tests
 */

describe( "error util", function () {

	describe( "create", function () {

		it( "should be type error", function () {

			var error = errorUtil.create( "This is the message" );

			expect( error ).to.be.instanceof( Error );

		} );

		it( "should have correct message", function () {

			var message = "This is the message";
			var error = errorUtil.create( message );

			expect( error.message ).to.equal( message );

		} );

		it( "should have correct properties", function () {

			var message = "This is the message";
			var file = "c:\\source.js";
			var object = {
				path: "c:\\folder\\"
			}

			var error = errorUtil.create( message, {
				file: file,
				object: object
			} );

			expect( error.message ).to.equal( message );
			expect( error.file ).to.equal( file );
			expect( error.object ).to.equal( object );

		} );

		it( "should have complain if message is invalid", function () {

			expect(function () {
				errorUtil.create();
			} ).to.throw( "Invalid message." );

			expect(function () {
				errorUtil.create( undefined );
			} ).to.throw( "Invalid message." );

		} );

	} );

} );