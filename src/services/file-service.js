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
var nodePath = require( "path" );

var logService = require( "./log-service.js" );
var stringUtil = require( "../utils/string-util.js" );

/*
 * Public functions
 */

exports.fileExists = function log ( file ) {

	if ( !file ) {
		throw new Error( "No file was specified." );
	}

	return fs.existsSync( file ) && fs.lstatSync( file ).isFile();

};

exports.directoryExists = function log ( directory ) {

	return fs.existsSync( directory ) && fs.lstatSync( directory ).isDirectory();

};

exports.isFile = function ( file ) {

	return fs.existsSync( file ) && fs.lstatSync( file ).isFile();

}

exports.getAllItemsInDirectory = function ( directory ) {

	if ( !exports.directoryExists( directory ) ) {
		throw new Error( "The directory \"" + directory + "\" does not exist." );
	}

	var items = fs.readdirSync( directory );

	console.log( "items" );
	console.log( items );

	return items;

}

exports.getAllFilesInDirectory = function ( directory ) {

	var files =
		[
		];

	var items = exports.getAllItemsInDirectory( directory );

	for ( var i in items ) {

		var item = items[i];

		if ( exports.isFile( directory + item ) ) {
			files.push( item );
		}

	}

	return files;

}

exports.readFile = function ( file ) {

	if ( fs.existsSync( file ) ) {

		var data = fs.readFileSync( file, "UTF-8" );

		logService.log( "Read \"" + Buffer.byteLength( data, "UTF-8" ) + "\" bytes from the file \"" + file + "\"." );

		return data;

	} else {

		throw new Error( "Could not find the file \"" + file + "\"." );

	}

};

exports.prettifyDirectory = function ( directory ) {

	if ( !stringUtil.endsWith( directory, nodePath.sep ) ) {
		return directory + nodePath.sep;
	}

}