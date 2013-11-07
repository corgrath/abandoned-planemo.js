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
var nodePath = require( "path" );

var plugin = require( "../../src-instrumented/plugins/check-for-empty-files-plugin.js" );

/*
 * Tests
 */

describe( "check-for-empty-files-plugin", function () {

	var reporters = [];
	var customMessage = "";

	it( "should complain if found empty file", function ( done ) {

		var ignoredFiles = [];
		var path = __dirname;
		var fileName = "empty_files.txt";
		var file = path + nodePath.sep + fileName;

		plugin.onFileFound( reporters, customMessage, ignoredFiles, path, fileName, file, function ( error ) {

			var size = 0;

			expect( error.message ).to.equal( "The file name \"" + fileName + "\" has \"" + size + "\" bytes in size." );
			done();

		} );

	} );

	it( "should not complain since the file should be ignored", function ( done ) {

		var path = __dirname;
		var fileName = "empty_files.txt";
		var file = path + nodePath.sep + fileName;
		var ignoredFiles = [
			path + nodePath.sep + fileName
		];

		var numberOfErrors = 0;
		//		console.log( "file2=" + file );
		plugin.onFileFound( reporters, customMessage, ignoredFiles, path, fileName, file, function () {

			numberOfErrors++;

		}, function () {
			//			console.log( "TEST DONE" );
			expect( numberOfErrors ).to.equal( 0 );
			done();
		} );

	} );

} );