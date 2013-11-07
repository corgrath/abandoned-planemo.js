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

var plugin = require( "../../src-instrumented/plugins/check-directory-name-plugin.js" );

/*
 * Tests
 */

describe( "check directory name plugin", function () {

	var reporters = [];

	describe( "on directory found", function () {

		var directoriesToIgnore =
			[
			];

		it( "should complain for invalid options", function () {

			expect(function () {
				plugin.onDirectoryFound( undefined );
			} ).to.throw( "No options were defined." );

		} );

		it( "should complain if no pattern option was defined", function () {

			var options = {
			};

			expect(function () {
				plugin.onDirectoryFound( options );
			} ).to.throw( "Invalid pattern option." );

		} );

		it( "should complain when found invalid directory name", function ( done ) {

			var basePath = "c:\\folder1\\";
			var fullPath = "c:\\folder1\\folder2\\";
			var directoryName = "this foldername has spaces";

			var options = {
				pattern: "^\\w+$"
			};

			plugin.onDirectoryFound( options, reporters, directoriesToIgnore, basePath, fullPath, directoryName, function ( error ) {

				expect( error.message ).to.equal( "The directory name \"this foldername has spaces\" is not valid as it does not comply with the pattern \"" + options.pattern + "\"." );
				done();
			} );

		} );

		it( "should work", function () {

			var basePath = "c:\\folder1\\";
			var fullPath = "c:\\folder1\\folder2\\";
			var directoryName = "folder2";

			var options = {
				pattern: "^\\w+$"
			};

			plugin.onDirectoryFound( options, reporters, directoriesToIgnore, basePath, fullPath, directoryName, function ( error ) {
				expect( error ).to.be.undefined;
			} );

		} );

	} );

} );