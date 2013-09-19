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

var plugin = require( "../../src/plugins/check-file-name-plugin.js" );

/*
 * Tests
 */

describe( "check directory name plugin", function () {

	describe( "on file found", function () {

		it( "should complain for invalid options", function () {

			expect(function () {
				plugin.onFileFound( undefined );
			} ).to.throw( "No options were defined." );

		} );

		it( "should complain if no pattern option was defined", function () {

			var options = {
			};

			expect(function () {
				plugin.onFileFound( options );
			} ).to.throw( "Invalid pattern option." );

		} );

		it( "should complain if invalid name was found", function ( done ) {

			var path = "c:\\folder1\\";
			var fileName = "planemo file.js";

			var options = {
				pattern: "^[\\w-]+\\.js|less$"
			};

			plugin.onFileFound( options, path, fileName, function ( error ) {

				expect( error.message ).to.equal( "The file name \"" + fileName + "\" is not valid." );
				done();

			} );

		} );

		it( "should work", function () {

			var path = "c:\\folder1\\";
			var fileNames =
				[
					"planemo.js",
					"planemo.less",
					"planemo-hello.js"
				];

			var options = {
				"pattern": "^\\w+|-\\.js|less$"
			};

			for ( var i in fileNames ) {

				var fileName = fileNames[i];

				plugin.onFileFound( options, path, fileName, function ( error ) {
					expect( error ).to.be.undefined;
				} );

			}

		} );

	} );

} );