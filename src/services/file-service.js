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

var assert = require( "../utils/argument-assertion-util.js" );
var stringUtil = require( "../utils/string-util.js" );
var reporterService = require( "../services/reporter-service.js" );
var fileService = require( "../services/file-service.js" );

/*
 * Public functions
 */

exports.getResolvedPath = function ( path ) {

	return nodePath.resolve( path );

};

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

};

exports.getAllItemsInDirectory = function ( directory ) {

	if ( !exports.directoryExists( directory ) ) {
		throw new Error( "The directory \"" + directory + "\" does not exist." );
	}

	var items = fs.readdirSync( directory );

	return items;

};

exports.getAllFilesInDirectory = function ( directory ) {

	var files =
		[
		];

	var items = exports.getAllItemsInDirectory( directory );

	for ( var i in items ) {

		var item = items[i];

		if ( exports.isFile( directory + nodePath.sep + item ) ) {
			files.push( item );
		}

	}

	return files;

};

exports.readFile = function ( reporters, file ) {

	assert.isArray( reporters, "reporters" );
	assert.isString( file, "file" );

	if ( fs.existsSync( file ) ) {

		var data = fs.readFileSync( file, "UTF-8" );

		reporterService.onVerbose( reporters, "Read \"" + Buffer.byteLength( data, "UTF-8" ) + "\" bytes from the file \"" + file + "\"." );

		return data;

	} else {

		throw new Error( "Could not find the file \"" + file + "\"." );

	}

};

exports.prettifyDirectory = function ( directory ) {

	if ( !stringUtil.endsWith( directory, nodePath.sep ) ) {
		return directory + nodePath.sep;
	}

};

exports.breakDownPath = function ( fullPath ) {

	if ( !stringUtil.endsWith( fullPath, nodePath.sep ) ) {
		fullPath = fullPath + nodePath.sep;
	}

	var basePath = exports.prettifyDirectory( nodePath.dirname( fullPath ) );
	var directoryName = nodePath.basename( fullPath );

	if ( stringUtil.endsWith( directoryName, nodePath.sep ) ) {
		directoryName = directoryName.substring( 0, directoryName.length - 1 );
	}

	return {
		basePath: basePath,
		fullPath: fullPath,
		directoryName: directoryName
	}

};

exports.getFileSize = function ( file ) {

	if ( !fileService.fileExists( file ) ) {
		throw new Error( "The file \"" + file + "\" does not exist." );
	}

	var stat = fs.statSync( file );

	return stat.size;

};