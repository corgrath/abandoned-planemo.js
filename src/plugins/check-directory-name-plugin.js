/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onDirectoryFound( function checkDirectoryNameOnDirectoryFound ( basePath, fullPath, directoryName ) {
		exports.onDirectoryFound( options, basePath, fullPath, directoryName );
	} );

};

exports.onDirectoryFound = function onDirectoryFound ( options, basePath, fullPath, directoryName ) {

	//	console.log( "lol" );
	//	console.log( options )
	//	console.log( "basePath=" + basePath );
	//	console.log( "fullPath=" + fullPath );
	//	console.log( "directoryName=" + directoryName );

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( !options.regexp ) {
		throw new Error( "Invalid regexp option." );
	}

	var pattern = new RegExp( options.regexp );

	var isLegalFilename = pattern.test( directoryName );

	//	console.log( "options.name " + options.name )
	//	console.log( "checking " + directoryName )
	//	console.log( "isLegalFilename " + isLegalFilename )

	if ( !isLegalFilename ) {
		throw new Error( "The directory name \"" + directoryName + "\" is not valid." );
	}

}