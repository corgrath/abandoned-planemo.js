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

var fileService = require( "./../services/file-service.js" );
var observerService = require( "./../services/observer-service.js" );
var logService = require( "./../services/log-service.js" );
var fileTypeService = require( "./../services/file-type-service.js" );

/*
 * Private
 */

function readLineContents ( path, filename, responseFunction, fileReadFunction ) {

	var file = path + filename;

	var contents = fileService.readFile( file );

	fileReadFunction( file, contents, responseFunction );

}

/*
 * Public functions
 */

exports.init = function () {

	observerService.onFileFound( exports.onFileFound );

};

exports.onFileFound = function onFileFound ( path, filename, responseFunction ) {

	if ( fileTypeService.isCSSFile( filename ) ) {
		readLineContents( path, filename, responseFunction, observerService.CSSFileRead );
		return;
	}

	if ( fileTypeService.isHTMLFile( filename ) ) {
		readLineContents( path, filename, responseFunction, observerService.HTMLFileRead );
		return;
	}

	if ( fileTypeService.isLESSFile( filename ) ) {
		readLineContents( path, filename, responseFunction, observerService.LESSFileRead );
		return;
	}

	if ( fileTypeService.isJavaScriptFile( filename ) ) {
		readLineContents( path, filename, responseFunction, observerService.JavaScriptFileRead );
		return;
	}

};