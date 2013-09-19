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

var plugin = require( "../../src/plugins/check-html-properties-and-values-plugin.js" );

/*
 * Tests
 */

describe( "check html properties and values plugin", function () {

	describe( "on html property value read", function () {

		it( "should complain if disallow not array", function () {

			var options = {
				disallowPropertiesStartingWith: true
			};
			var file = "c:\\source.js";
			var elementName = "div";
			var property = "ng-click";
			var value = "ng-click";

			expect(function () {
				plugin.onHTMLPropertyValueRead( options, file, elementName, property, value, function ( error ) {
				} );
			} ).to.throw( "The \"disallowPropertiesStartingWith\" has to be an array." );

		} );

		it( "should complain if it finds properties that starts invalid", function ( done ) {

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

			plugin.onHTMLPropertyValueRead( options, file, elementName, property, value, function ( error ) {
				expect( error.message ).to.equal( "Found HTML property \"ng-click\" name that starts invalid in file \"c:\\source.js\"." );
				expect( error.file ).to.equal( file );
				expect( error.elementName ).to.equal( elementName );
				expect( error.property ).to.equal( property );
				expect( error.value ).to.equal( value );
				done();
			} );

		} );

		it( "should complain if it finds values that starts invalid", function ( done ) {

			var options = {
				"disallowValuesStartingWith": {
					"-translation$": "DataModelViewer\\."
				}
			};

			var file = "c:\\page.html";
			var elementName = "p";
			var property = "data-title-translation";
			var value = "DataModelShower.Key.Value";

			plugin.onHTMLPropertyValueRead( options, file, elementName, property, value, function ( error ) {
				expect( error.message ).to.equal( "Found disallowed value \"DataModelShower.Key.Value\" for property \"data-title-translation\"." );
				expect( error.file ).to.equal( file );
				expect( error.elementName ).to.equal( elementName );
				expect( error.property ).to.equal( property );
				expect( error.value ).to.equal( value );
				done();
			} );

		} );

	} );

} );