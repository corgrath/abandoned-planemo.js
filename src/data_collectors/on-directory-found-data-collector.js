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

var fs = require( "fs" );

var fileService = require( "./../services/file-service.js" );
var logService = require( "./../services/log-service.js" );
var observerService = require( "./../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onDirectoryFound( exports.onDirectoryFound );

};

exports.onDirectoryFound = function onDirectoryFound ( basePath, fullPath, directoryName, responseFunction ) {

	if ( !basePath ) {
		throw new Error( "Base path \"" + basePath + "\" is invalid. Full path is \"" + fullPath + "\"." )
	}

	if ( !fullPath ) {
		throw new Error( "Full path \"" + fullPath + "\" is invalid." )
	}

	if ( !directoryName ) {
		throw new Error( "Full path \"" + directoryName + "\" is invalid." )
	}

	var stats = fs.statSync( fullPath );

	if ( !stats.isDirectory() ) {
		throw new Error( "Path \"" + fullPath + "\" is a directory." )
	}

	var items = fs.readdirSync( fullPath );

	// console.log( items );
	for ( var i in items ) {

		var item = items[i];
		var newDirectory = fullPath + item;
		var stat = fs.statSync( newDirectory );

		if ( stat.isDirectory() ) {

			newDirectory = fileService.prettifyDirectory( newDirectory );

			logService.log( "Found the directory \"" + newDirectory + "\"." )

			observerService.directoryFound( fullPath, newDirectory, item, responseFunction )

		} else {

			logService.log( "Found the file \"" + newDirectory + "\"." );

			observerService.fileFound( fullPath, item, responseFunction );

		}

	}

}