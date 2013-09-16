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

var observerService = require( "../src/services/observer-service.js" );
var stringUtil = require( "../src/utils/string-util.js" );
var objectUtil = require( "../src/utils/object-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onHTMLPropertyValueRead( function ( file, elementName, property, value ) {
		exports.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} );

};

exports.onHTMLPropertyValueRead = function ( options, file, elementName, property, value ) {

	if ( options.disallowPropertiesStartingWith && !objectUtil.isArray( options.disallowPropertiesStartingWith ) ) {
		throw new Error( "The \"disallowPropertiesStartingWith\" has to be an array." );
	}

	if ( options.disallowPropertiesStartingWith ) {

		for ( var i in options.disallowPropertiesStartingWith ) {

			if ( stringUtil.startsWith( property, options.disallowPropertiesStartingWith[i] ) ) {
				throw new Error( "Found HTML property \"" + property + "\" name that starts invalid in file \"" + file + "\"." );
			}

		}

	}

	var options = {
		"disallowValuesStartingWith": {
			"-translation$": "^DataModelViewer\\."
		}
	};

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
					var error = new Error( "Found disallowed value \"" + value + "\" for property \"" + property + "\"." );
					error.file = file;
					error.elementName = elementName;
					error.property = property;
					error.value = value;
					throw error;
				}

			}

		}

	}

}
