/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onFileFound( function checkFileNameOnFileFound ( path, fileName ) {
		exports.onFileFound( options, path, fileName );
	} );

};

exports.onFileFound = function ( options, path, fileName ) {

//	console.log( "options=" + options );
	//	console.log( "path=" + path );
	//	console.log( "fileName=" + fileName );
	//	console.log( " options.regexp =" + options.regexp );

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( !options.regexp ) {
		throw new Error( "Invalid regexp option." );
	}

	var pattern = new RegExp( options.regexp );

	var isLegalFilename = pattern.test( fileName );

	//	console.log( "options.name " + options.name )
	//	console.log( "checking " + directoryName )
	//	console.log( "isLegalFilename " + isLegalFilename )

	if ( !isLegalFilename ) {
		throw new Error( "The file name \"" + fileName + "\" is not valid." );
	}

}