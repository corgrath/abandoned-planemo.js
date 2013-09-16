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

var plugin = require( "../src/plugins/check-file-contents-javascript-plugin.js" );

/*
 * Tests
 */

exports.testOptions = function ( test ) {

	var options = {
	};

	try {
		plugin.onJavaScriptFileRead( undefined );
	} catch ( error ) {
		test.equal( error.message, "No options were defined." );
	}

	test.expect( 1 );
	test.done();

};

exports.testMustContains = function ( test ) {

	var options = {
		mustcontain:
			[
				"@owner \\w+ \\w+ \\(\\w{3}\\)"
			]
	}

	var file = "c:\\source.js";

	plugin.onJavaScriptFileRead( options, file, "Hello world", function ( response ) {
		test.equal( response.message, "Did not found the pattern \"" + options.mustcontain[0] + "\"." );
	} );

	test.doesNotThrow( function () {
		plugin.onJavaScriptFileRead( options, file, "\\* @owner John Doe (jdo) */" );
	} );

	test.expect( 2 );
	test.done();

};

exports.testDisallow = function ( test ) {

	var file = "c:\\folder\\file.txt";

	var options = {
		disallow:
			[
				"/\\*global.+console"
			]
	};

	plugin.onJavaScriptFileRead( options, file, "/*global console */", function ( response ) {
		test.equal( response.message, "Found the invalid pattern \"" + options.disallow[0] + "\"." );
		test.equal( response.file, file );
	} );

	plugin.onJavaScriptFileRead( options, file, "/*global pubsub, console */", function ( response ) {
		test.equal( response.message, "Found the invalid pattern \"" + options.disallow[0] + "\"." );
		test.equal( response.file, file );
	} );

	test.expect( 4 );
	test.done();

};