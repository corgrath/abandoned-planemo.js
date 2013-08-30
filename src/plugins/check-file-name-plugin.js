/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onFileFound( function ( path, fileName ) {
		exports.onFileFound( options, path, fileName );
	} );

};

exports.onFileFound = function ( options, path, fileName ) {

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( !options.regexp ) {
		throw new Error( "Invalid regexp option." );
	}

	var pattern = new RegExp( options.regexp );

	var isLegalFilename = pattern.test( fileName );

	if ( !isLegalFilename ) {
		var error = new Error( "The file name \"" + fileName + "\" is not valid." );
		error.path = path;
		error.fileName = fileName;
		throw error;
	}

	if ( fileName.indexOf( ".ng" ) !== -1 ) {
		process.exit();
	}

}