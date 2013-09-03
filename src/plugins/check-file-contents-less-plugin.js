/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onLESSFileRead( function ( file, fileContents ) {
		exports.onLESSFileRead( options, file, fileContents );
	} );

};

exports.onLESSFileRead = function ( options, file, fileContents ) {

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	for ( var i in options.disallow ) {

		var pattern = options.disallow[i];

		var regexp = new RegExp( pattern );

		if ( regexp.test( fileContents ) ) {
			var error = new Error( "Found disallowed pattern \"" + pattern + "\"." );
			error.file = file;
			throw error;
		}

	}

}