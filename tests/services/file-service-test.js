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
var fileService = require( "../../src-instrumented/services/file-service.js" );

/*
 * Tests
 */

describe( "file service", function () {

	var separator = nodePath.sep;

	describe( "breakDownPath", function () {

		it( "should be able to break down a path into more details", function () {

			var separator = nodePath.sep;

			var path = "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3";

			var actual = fileService.breakDownPath( path );

			expect( actual.basePath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator );
			expect( actual.fullPath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3" + separator );
			expect( actual.directoryName ).to.equal( "folder3" );

		} );

		it( "should be able to break down a path into more details ending with separator", function () {

			var path = "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3" + separator;

			var actual = fileService.breakDownPath( path );

			expect( actual.basePath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator );
			expect( actual.fullPath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3" + separator );
			expect( actual.directoryName ).to.equal( "folder3" );

		} );

	} );

	describe( "getResolvedPath ", function () {

		/*
		 * It's a lame test. Not sure if we can make this any smarter.
		 */

		it( "should return a resolved version of the path", function () {

			var actual = fileService.getResolvedPath( __dirname + separator + "made-up-folder" + separator );

			expect( actual ).to.not.equal( __dirname );

		} );

	} );

	describe( "directoryExists", function () {

		it( "should be able find directory", function () {

			var actual = fileService.directoryExists( __dirname );

			expect( actual ).to.be.true;

		} );

		it( "should not be able find directory", function () {

			var actual = fileService.directoryExists( __dirname + separator + "does-not-exist" + separator );

			expect( actual ).to.be.false;

		} );

	} );

	describe( "fileExists", function () {

		it( "should throw an error if the no file was given", function () {

			expect(function () {
				fileService.fileExists();
			} ).to.throw( "No file was specified." );

		} );

		it( "should return true if a file exists", function () {

			var actual = fileService.fileExists( __dirname + separator + "read_file_test.txt" );

			expect( actual ).to.be.true;

		} );

	} );

	describe( "getAllFilesInDirectory ", function () {

		it( "should throw error if directory doe snot exist", function () {

			var resolvedPath = fileService.getResolvedPath( __dirname + separator + "does-not-exist" + separator );

			expect(function () {
				fileService.getAllFilesInDirectory( resolvedPath );
			} ).to.throw( "The directory \"" + resolvedPath + "\" does not exist." );

		} );

		it( "should be able to get all items in the working directory", function () {

			var actual = fileService.getAllFilesInDirectory( __dirname );

			expect( actual.length ).to.equal( 5 );

		} );

	} );

	describe( "readFile ", function () {

		it( "should complain on no reporters", function () {

			expect(function () {
				fileService.readFile()
			} ).to.throw( "reporters is undefined." );

		} );

		it( "should complain on no file", function () {

			expect(function () {
				fileService.readFile( [] )
			} ).to.throw( "file is undefined." );

		} );

		it( "should be able to read the file", function () {

			var file = __dirname + separator + "read_file_test.txt";

			var actual = fileService.readFile( [], file );

			expect( actual ).to.equal( "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n\n槥ちゅ りゅにょい 裪嶥りゃきゅ." );

		} );

		it( "should throw an error if the file does not exist", function () {

			var file = __dirname + separator + "read_file_test_does_not_exist.txt";

			expect(function () {
				fileService.readFile( [], file );
			} ).to.throw( "Could not find the file \"" + file + "\"." );

		} );

	} );

} );