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
var fileTypeService = require( "./../services/file-type-service.js" );
var assert = require( "./../utils/argument-assertion-util.js" )

/*
 * Private
 */

function readLineContents ( reporter, path, filename, responseFunction, fileReadFunction ) {

	assert.isObject( reporter, "Reporter is undefined." );
	assert.isString( path, "Path is undefined." );
	assert.isString( filename, "File name is undefined." );
	assert.isFunction( responseFunction, "Response function is undefined." );
	assert.isFunction( fileReadFunction, "File read function is undefined." );

	var file = path + filename;

	var contents = fileService.readFile( reporter, file );

	fileReadFunction( reporter, file, contents, responseFunction );

}

/*
 * Public functions
 */

exports.init = function () {

	observerService.onFileFound( exports.onFileFound );

};

exports.onFileFound = function ( reporter, path, filename, file, responseFunction ) {

	/*
	 * Assertions
	 */

	assert.isObject( reporter, "Reporter is undefined." );
	assert.isString( path, "Path is undefined." );
	assert.isString( filename, "File name is undefined." );
	assert.isString( file, "File is undefined." );
	assert.isFunction( responseFunction, "Response function is undefined." );

	/*
	 * Check the file type
	 */

	if ( fileTypeService.isCSSFile( filename ) ) {
		readLineContents( reporter, path, filename, responseFunction, observerService.CSSFileRead );
		return;
	}

	if ( fileTypeService.isHTMLFile( filename ) ) {
		readLineContents( reporter, path, filename, responseFunction, observerService.HTMLFileRead );
		return;
	}

	if ( fileTypeService.isLESSFile( filename ) ) {
		readLineContents( reporter, path, filename, responseFunction, observerService.LESSFileRead );
		return;
	}

	if ( fileTypeService.isJavaScriptFile( filename ) ) {
		readLineContents( reporter, path, filename, responseFunction, observerService.JavaScriptFileRead );
		return;
	}

};