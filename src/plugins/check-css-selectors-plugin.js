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

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onCSSPropertyAndAttributeRead( function ( file, selectors, property, value ) {

		exports.onCSSPropertyAndAttributeRead( options, file, selectors, property, value );

	} );

};

exports.onCSSPropertyAndAttributeRead = function ( options, file, selectors, property, value ) {

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
				throw error;
			}

		}

	}

};