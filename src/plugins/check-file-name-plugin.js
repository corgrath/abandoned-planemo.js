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

	observerService.onFileFound( function ( path, fileName, responseFunction ) {
		exports.onFileFound( options, path, fileName, responseFunction );
	} );

};

exports.onFileFound = function ( options, path, fileName, responseFunction ) {

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( !options.pattern ) {
		throw new Error( "Invalid pattern option." );
	}

	var regexp = new RegExp( options.pattern );

	var isLegalFilename = regexp.test( fileName );

	if ( !isLegalFilename ) {

		responseFunction( errorUtils.create( "The file name \"" + fileName + "\" is not valid.", {
			path: path,
			fileName: fileName
		} ) );

	}

};