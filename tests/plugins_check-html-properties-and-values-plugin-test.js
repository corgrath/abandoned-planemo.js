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

var plugin = require( "../src/plugins/check-html-properties-and-values-plugin.js" );

/*
 * Tests
 */

exports.testNotAllowedToStartWithNotArray = function ( test ) {

	var options = {
		disallowPropertiesStartingWith: true
	};
	var file = "c:\\source.js";
	var elementName = "div";
	var property = "ng-click";
	var value = "ng-click";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "The \"disallowPropertiesStartingWith\" has to be an array." );
	}

	test.expect( 1 );
	test.done();

}

exports.testNotAllowedToStartWithValid = function ( test ) {

	var options = {
		disallowPropertiesStartingWith:
			[
				"ng-"
			]
	};

	var file = "c:\\source.js";
	var elementName = "div";
	var property = "ng-click";
	var value = "about();";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "Found HTML property \"ng-click\" name that starts invalid in file \"c:\\source.js\"." );
	}

	test.expect( 1 );
	test.done();

}

exports.testDisallowValuesStartingWith = function ( test ) {

	var options = {
		"disallowValuesStartingWith": {
			"-translation$": "DataModelViewer\\."
		}
	};

	var file = "c:\\page.html";
	var elementName = "p";
	var property = "data-title-translation";
	var value = "DataModelShower.Key.Value";

	try {
		plugin.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} catch ( error ) {
		test.equal( error.message, "Found disallowed value \"DataModelShower.Key.Value\" for property \"data-title-translation\"." );
		test.equal( error.elementName, elementName );
		test.equal( error.property, property );
		test.equal( error.value, value );
		test.equal( error.file, file );
	}

	test.expect( 5 );
	test.done();

}
