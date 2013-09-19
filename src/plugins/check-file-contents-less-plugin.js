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
var errorUtils = require( "../utils/error-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onLESSFileRead( function ( file, fileContents, responseFunction ) {
		exports.onLESSFileRead( options, file, fileContents, responseFunction );
	} );

};

exports.onLESSFileRead = function ( options, file, fileContents, responseFunction ) {

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	for ( var i in options.disallow ) {

		var pattern = options.disallow[i];

		var regexp = new RegExp( pattern );

		if ( regexp.test( fileContents ) ) {

			responseFunction( errorUtils.create( "Found disallowed pattern \"" + pattern + "\".", {
				file: file
			} ) );

		}

	}

};