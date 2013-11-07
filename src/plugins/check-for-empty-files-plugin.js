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
var assert = require( "../utils/argument-assertion-util.js" );
var fileService = require( "../services/file-service.js" );
var reporterService = require( "../services/reporter-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	var ignoredFiles = options["ignored-files"];

	//	console.log( options["ignored-files"] );

	for ( var i in ignoredFiles ) {

		ignoredFiles[i] = fileService.getResolvedPath( ignoredFiles[i] );
		//		console.log( "new ignored file is:" + ignoredFiles[i] );
		if ( !fileService.fileExists( ignoredFiles[i] ) ) {
			throw new Error( "The ignored file \"" + ignoredFiles[i] + "\" does not exist." );
		}

	}

	observerService.onFileFound( function ( reporters, path, fileName, file, responseFunction ) {
		exports.onFileFound( reporters, options.customMessage, ignoredFiles, path, fileName, file, responseFunction, undefined );
	} );

};

exports.onFileFound = function ( reporters, customMessage, ignoredFiles, path, fileName, file, responseFunction, doneCallbackFunction ) {

	assert.isArray( reporters );
	assert.isString( customMessage );
	assert.isArray( ignoredFiles );
	assert.isString( path );
	assert.isString( fileName );
	assert.isString( file );
	assert.isFunction( responseFunction );
	if ( doneCallbackFunction ) {
		assert.isFunction( doneCallbackFunction );
	}

	//	console.log( ignoredFiles );

	//	console.log( "\nfile:" + file + "\n" );

	for ( var i in ignoredFiles ) {

		var ignoredFile = ignoredFiles[i];

		//		console.log( "       file:" + file );
		//		console.log( "ignoredFile:" + ignoredFile );

		if ( ignoredFile === file ) {
			reporterService.onVerbose( reporters, "check-for-empty-files-plugin: Ignoring the file \"" + file + "\"." )
			//			console.log( "\nignoring the file:" + ignoredFile + "\n" );
			if ( doneCallbackFunction ) {
				doneCallbackFunction();
			}
			return;
		}

	}

	var size = fileService.getFileSize( file );

	if ( size === 0 ) {

		responseFunction( errorUtil.create2( "The file name \"" + fileName + "\" has the size \"" + size + "\" bytes.", customMessage, {
			path: path,
			fileName: fileName,
			file: file,
			size: size
		} ) );

	}
	//	console.log( "going to call done now" );
	//	console.log( doneCallbackFunction );
	if ( doneCallbackFunction ) {
		//		console.log( "callingall done now" );
		doneCallbackFunction();
	}

};