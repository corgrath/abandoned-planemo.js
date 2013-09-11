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

var plugin = require( "../src/plugins/check-javascript-line-length-plugin.js" );

/*
 * Tests
 */

exports.testOptions = function ( test ) {

	try {
		plugin.onJavaScriptFileLineRead( undefined, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "Invalid options." );
	}

	var options = {
	}

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "No length is defined in the options." );
	}

	options.length = "string";

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "The length \"string\" is not a number." );
	}

	options.length = -1;

	try {
		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "lineContents" );
	} catch ( error ) {
		test.equal( error.message, "The length \"-1\" cannot be less than 0." );
	}

	test.expect( 4 );
	test.done();

};

exports.testInvalid = function ( test ) {

	var options = {
		length: 5
	};

	try {

		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "hello world line" );

	} catch ( error ) {

		test.equal( error.message, "Line \"linenumber\" length in file \"file\" too large. Maximum is \"5\" but found \"16\"." );

	}

	test.expect( 1 );
	test.done();

}
exports.testValid = function ( test ) {

	var options = {
		length: 20
	};

	test.doesNotThrow( function () {

		plugin.onJavaScriptFileLineRead( options, "file", "linenumber", "hello world line" );

	} );

	test.expect( 1 );
	test.done();

}