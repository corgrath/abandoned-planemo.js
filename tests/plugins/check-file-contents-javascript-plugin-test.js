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

var plugin = require( "../../src/plugins/check-file-contents-javascript-plugin.js" );

/*
 * Tests
 */

describe( "check file contents javascript plugin", function () {

	describe( "on file found", function () {

		it( "should complain for invalid options", function () {

			expect(function () {
				plugin.onJavaScriptFileRead( undefined );
			} ).to.throw( "No options were defined." );

		} );

		it( "should support must contain 1", function ( done ) {

			var options = {
				mustcontain:
					[
						"@owner \\w+ \\w+ \\(\\w{3}\\)"
					]
			};

			var file = "c:\\source.js";

			plugin.onJavaScriptFileRead( options, file, "Hello world", function ( response ) {
				expect( response.message ).to.equal( "Did not found the pattern \"" + options.mustcontain[0] + "\"." );
				done();
			} );

		} );

		it( "should support must contain 2", function () {

			var options = {
				mustcontain:
					[
						"@owner \\w+ \\w+ \\(\\w{3}\\)"
					]
			};

			var file = "c:\\source.js";

			plugin.onJavaScriptFileRead( options, file, "\\* @owner John Doe (jdo) */", function ( response ) {
				expect( response ).to.be.undefined;
			} );

		} );

		it( "should support disallow 1", function ( done ) {

			var file = "c:\\folder\\file.txt";

			var options = {
				disallow:
					[
						"/\\*global.+console"
					]
			};

			plugin.onJavaScriptFileRead( options, file, "/*global console */", function ( response ) {
				expect( response.message ).to.equal( "Found the invalid pattern \"" + options.disallow[0] + "\"." );
				expect( response.file ).to.equal( file );
				done();
			} );

		} );

		it( "should support disallow 2", function ( done ) {

			var file = "c:\\folder\\file.txt";

			var options = {
				disallow:
					[
						"/\\*global.+console"
					]
			};

			plugin.onJavaScriptFileRead( options, file, "/*global pubsub, console */", function ( response ) {
				expect( response.message ).to.equal( "Found the invalid pattern \"" + options.disallow[0] + "\"." );
				expect( response.file ).to.equal( file );
				done();
			} );

		} );

	} );

} );