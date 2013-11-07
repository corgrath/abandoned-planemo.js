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

var observerService = require( "../../src/services/observer-service.js" );
var argument = require( "../../src/utils/argument-assertion-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	argument.isObject( options, "Options is undefined." );

	observerService.onCSSPropertyAndAttributeRead( function ( reporter, file, selectors, property, value, responseCallbackFunction ) {

		argument.isObject( reporter, "Reporter is undefined." );
		argument.isString( file, "File is undefined." );
		argument.isString( selectors, "Selectors name is undefined." );
		argument.isString( property, "Property name is undefined." );
		argument.isString( value, "Value name is undefined." );
		argument.isString( responseCallbackFunction, "Response callback function is undefined." );

		exports.onCSSPropertyAndAttributeRead( options, reporter, file, selectors, property, value );

	} );

};

exports.onCSSPropertyAndAttributeRead = function ( options, reporters, file, selectors, property, value, responseCallbackFunction ) {

	argument.isObject( reporters, "Reporters is undefined." );
	argument.isString( file, "File is undefined." );
	argument.isString( selectors, "Selectors name is undefined." );
	argument.isString( property, "Property name is undefined." );
	argument.isString( value, "Value name is undefined." );
	argument.isString( responseCallbackFunction, "Response callback function is undefined." );

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	for ( var i in options.disallow ) {

		var pattern = new RegExp( options.disallow[i] );

		for ( var k in selectors ) {

			var selector = selectors[k];

			if ( pattern.test( selector ) ) {
				var error = new Error( "Found the invalid pattern \"" + pattern + "\" in in selector \"" + selector + "\"." );
				error.file = file;
				error.selectors = selectors;
				error.property = property;
				error.value = value;
				responseCallbackFunction( error );
			}

		}

	}

};