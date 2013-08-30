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

exports.onDirectoryFound = function onDirectoryFound ( basePath, fullPath, directoryName ) {

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

			observerService.directoryFound( fullPath, newDirectory, item )

		} else {

			logService.log( "Found the file \"" + newDirectory + "\"." );

			observerService.fileFound( fullPath, item );

		}

	}

}