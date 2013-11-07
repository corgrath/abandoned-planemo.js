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
var fileTypeService = require( "../services/file-type-service.js" );
var errorUtils = require( "../utils/error-util.js" );

/*
 * Private
 */

function testFileName ( fileName, path, pattern, customMessage, responseCallbackFunction ) {

	var regexp = new RegExp( pattern );

	var isLegalFilename = regexp.test( fileName );

	if ( !isLegalFilename ) {

		responseCallbackFunction( errorUtils.create2( "The file name \"" + fileName + "\" is not valid as it does not comply with the pattern \"" + pattern + "\".", customMessage, {
			path: path,
			fileName: fileName,
			patter: pattern
		} ) );

	}

}

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onFileFound( function ( reporters, path, fileName, file, responseCallbackFunction ) {
		exports.onFileFound( options, reporters, path, fileName, file, responseCallbackFunction );
	} );

};

exports.onFileFound = function ( options, reporters, path, fileName, file, responseCallbackFunction ) {

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( options.javascript && fileTypeService.isJavaScriptFile( fileName ) ) {
		testFileName( fileName, path, options.javascript, options.customMessage, responseCallbackFunction );
	}

	if ( options.html && fileTypeService.isHTMLFile( fileName ) ) {
		testFileName( fileName, path, options.html, options.customMessage, responseCallbackFunction );
	}

	if ( options.less && fileTypeService.isLESSFile( fileName ) ) {
		testFileName( fileName, path, options.less, options.customMessage, responseCallbackFunction );
	}

};