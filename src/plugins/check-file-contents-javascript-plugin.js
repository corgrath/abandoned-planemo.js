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
var errorUtil = require( "../utils/error-util.js" );
var objectUtil = require( "../utils/object-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onJavaScriptFileRead( function ( file, comment ) {
		exports.onJavaScriptFileRead( options, file, comment );
	} );

};

exports.onJavaScriptFileRead = function ( options, file, fileContents ) {

	if ( !options ) {
		throw errorUtil.create( "No options were defined." );
	}

	if ( options.disallow && !objectUtil.isArray( options.disallow ) ) {
		throw new Error( "The \"disallow\" has to be an array." );
	}

	/*
	 * mustcontain
	 */

	if ( options.mustcontain ) {

		for ( var i in options.mustcontain ) {

			var pattern = options.mustcontain[i];

			var regexp = new RegExp( pattern );

			if ( !regexp.test( fileContents ) ) {
				var error = new Error( "Did not found the pattern \"" + pattern + "\"." );
				error.file = file;
				throw error;
			}

		}
	}

	/*
	 * disallow
	 */

	if ( options.disallow ) {

		for ( var i in options.disallow ) {

			var pattern = options.disallow[i];

			var regexp = new RegExp( pattern );

			if ( regexp.test( fileContents ) ) {
				var error = new Error( "Found the invalid pattern \"" + pattern + "\"." );
				error.file = file;
				throw error;
			}

		}
	}

}