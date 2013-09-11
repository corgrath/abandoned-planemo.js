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

var plugin = require( "../src/plugins/check-directory-name-plugin.js" );

/*
 * Tests
 */

exports.invalidOptions = function ( test ) {

	var options = {
	}

	try {
		plugin.onDirectoryFound( undefined );
	} catch ( error ) {
		test.equal( error.message, "No options were defined." );
	}

	try {
		plugin.onDirectoryFound( options );
	} catch ( error ) {
		test.equal( error.message, "Invalid regexp option." );
	}

	test.expect( 2 );
	test.done();

}

exports.invalidDirectoryName = function ( test ) {

	var basePath = "c:\\folder1\\";
	var fullPath = "c:\\folder1\\folder2\\";
	var directoryName = "this foldername has spaces";

	var options = {
		regexp: "^\\w+$"
	};

	try {

		plugin.onDirectoryFound( options, basePath, fullPath, directoryName );

	} catch ( error ) {

		test.equal( error.message, "The directory name \"this foldername has spaces\" is not valid." );

	}

	test.expect( 1 );
	test.done();

}

exports.success = function ( test ) {

	var basePath = "c:\\folder1\\";
	var fullPath = "c:\\folder1\\folder2\\";
	var directoryName = "folder2";

	var options = {
		regexp: "^\\w+$"
	};

	test.doesNotThrow( function () {

		plugin.onDirectoryFound( options, basePath, fullPath, directoryName );

	} );

	test.expect( 1 );
	test.done();

}