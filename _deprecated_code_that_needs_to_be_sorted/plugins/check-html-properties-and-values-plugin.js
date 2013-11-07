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
var stringUtil = require( "../../src/utils/string-util.js" );
var objectUtil = require( "../../src/utils/object-util.js" );
var errorUtil = require( "../../src/utils/error-util.js" );
var argument = require( "../../src/utils/argument-assertion-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onHTMLPropertyValueRead( function ( reporters, file, elementName, property, value, responseCallbackFunction ) {

		argument.isObject( options, "Options is undefined." );
		argument.isArray( reporters, "Reporters is undefined." );
		argument.isString( file, "File is undefined." );
		argument.isString( elementName, "Element name is undefined." );
		argument.isString( property, "Property name is undefined." );
		argument.isString( value, "Value name is undefined." );
		argument.isString( responseCallbackFunction, "Response callback function is undefined." );

		exports.onHTMLPropertyValueRead( options, reporters, file, elementName, property, value, responseCallbackFunction );

	} );

};

exports.onHTMLPropertyValueRead = function ( options, reporters, file, elementName, property, value, responseCallbackFunction ) {

	/*
	 * Assert
	 */

	argument.isObject( options, "Options is undefined." );
	argument.isArray( reporters, "Reporters is undefined." );
	argument.isString( file, "File is undefined." );
	argument.isString( elementName, "Element name is undefined." );
	argument.isString( property, "Property name is undefined." );
	argument.isString( value, "Value name is undefined." );
	argument.isFunction( responseCallbackFunction, "Response callback function is undefined." );

	if ( options.disallowPropertiesStartingWith && !objectUtil.isArray( options.disallowPropertiesStartingWith ) ) {
		throw new Error( "The \"disallowPropertiesStartingWith\" has to be an array." );
	}

	if ( options.disallowPropertiesStartingWith ) {

		for ( var i in options.disallowPropertiesStartingWith ) {

			if ( stringUtil.startsWith( property, options.disallowPropertiesStartingWith[i] ) ) {
				responseCallbackFunction( errorUtil.create( "Found HTML property \"" + property + "\" name that starts invalid in file \"" + file + "\".", {
					file: file,
					elementName: elementName,
					property: property,
					value: value
				} ) );
			}

		}

	}

	/*
	 * disallowValuesStartingWith
	 */

	if ( options.disallowValuesStartingWith ) {

		for ( var propertyPattern in options.disallowValuesStartingWith ) {

			var propertyRegexp = new RegExp( propertyPattern );

			if ( propertyRegexp.test( property ) ) {

				var valuePattern = options.disallowValuesStartingWith[propertyPattern];

				var valueRegexp = new RegExp( valuePattern );

				if ( !valueRegexp.test( value ) ) {

					var error = errorUtil.create( "Found disallowed value \"" + value + "\" for property \"" + property + "\".", {
						file: file,
						elementName: elementName,
						property: property,
						value: value
					} );

					responseCallbackFunction( error );

				}

			}

		}

	}

};
