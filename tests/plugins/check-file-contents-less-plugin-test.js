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

var plugin = require( "../../src-instrumented/plugins/check-file-contents-less-plugin.js" );

/*
 * Tests
 */

describe( "check file contents less plugin", function () {

	describe( "on less file read", function () {

		it( "should complain for invalid options", function () {

			expect(function () {
				plugin.onLESSFileRead();
			} ).to.throw( "No options were defined." );

		} );

		it( "should support disallow", function ( done ) {

			var doneCallback = false;

			var options = {
				disallow: [
					"-moz-",
					"-webkit-",
					"-o-",
					"-ms-"
				]
			};

			var file = "c:\\source.js";

			var fileContents = ".class { -webkit-transparency: none; } ";

			plugin.onLESSFileRead( options, file, fileContents, function ( response ) {
				doneCallback = true;
				expect( response.message ).to.equal( "Found disallowed pattern \"" + options.disallow[1] + "\"." );
				done();
			} );

		} );

	} );

} );