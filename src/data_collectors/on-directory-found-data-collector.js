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

var assert = require( "assert" );
var fs = require( "fs" );

var fileService = require( "./../services/file-service.js" );
var observerService = require( "./../services/observer-service.js" );
var reporterService = require( "./../services/reporter-service.js" );
var objectUtil = require( "./../utils/object-util.js" );
var stringUtil = require( "./../utils/string-util.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onDirectoryFound( exports.onDirectoryFound );

};

exports.onDirectoryFound = function onDirectoryFound ( reporters, directoriesToIgnore, basePath, fullPath, directoryName, responseCallbackFunction ) {

	/*
	 * Validation
	 */

	assert( reporters );

	if ( !directoriesToIgnore ) {
		throw new Error( "Directories to ignore is undefined." );
	}

	if ( !objectUtil.isArray( directoriesToIgnore ) ) {
		throw new Error( "Directories to ignore is not an Array." );
	}

	if ( !basePath ) {
		throw new Error( "Base path \"" + basePath + "\" is invalid. Full path is \"" + fullPath + "\"." )
	}

	if ( !fullPath ) {
		throw new Error( "Full path \"" + fullPath + "\" is invalid." )
	}

	if ( !directoryName ) {
		throw new Error( "Full path \"" + directoryName + "\" is invalid." )
	}

	if ( !responseCallbackFunction ) {
		throw new Error( "Response callback function is undefined." )
	}

	if ( !objectUtil.isFunction( responseCallbackFunction ) ) {
		throw new Error( "Response callback function is not a function." )
	}

	var stats = fs.statSync( fullPath );

	if ( !stats.isDirectory() ) {
		throw new Error( "Path \"" + fullPath + "\" is a directory." )
	}

	/*
	 * Logic
	 */

	var items = fs.readdirSync( fullPath );

	to_next_item_in_directory: for ( var i in items ) {

		var item = items[i];
		var newDirectory = fullPath + item;
		var file = fullPath + item;

		if ( fileService.directoryExists( newDirectory ) ) {

			newDirectory = fileService.prettifyDirectory( newDirectory );

			reporterService.onVerbose( reporters, "Found the directory \"" + newDirectory + "\" (\"" + fileService.getResolvedPath( newDirectory ) + "\")." );

			/*
			 * Check if we should ignore the folder
			 */

			for ( var k in directoriesToIgnore ) {

				var directoryToIgnore = directoriesToIgnore[k];

				if ( stringUtil.startsWith( newDirectory, directoryToIgnore ) ) {
					reporterService.onVerbose( reporters, "Ignoring to go into folder \"" + newDirectory + "\" (\"" + fileService.getResolvedPath( newDirectory ) + "\")." );
					continue to_next_item_in_directory;
				}

			}

			observerService.directoryFound( reporters, directoriesToIgnore, fullPath, newDirectory, item, responseCallbackFunction )

		} else {

			reporterService.onVerbose( reporters, "Found the file \"" + file + "\"." );

			observerService.fileFound( reporters, fullPath, item, file, responseCallbackFunction );

		}

	}

};