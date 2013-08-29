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
	console.log( files );
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

///**
// * Joins a path and an item using the operating system's specific path seperator.
// *
// * @param path The base path.
// * @param item The item to be appened to the path.
// */
//
//exports.join = function ( path, item ) {
//
//	return path + nodePath.sep + item;
//
//}

exports.prettifyDirectory = function ( directory ) {

	if ( !stringUtil.endsWith( directory, nodePath.sep ) ) {
		return directory + nodePath.sep;
	}

}

//exports.writeFile = function ( file, data ) {
//
//	logService.log( "Writing \"" + Buffer.byteLength( data, "UTF-8" ) + "\" bytes to the file \"" + file + "\"." );
//
//	fs.writeFileSync( file, data, "UTF-8" );
//
//};