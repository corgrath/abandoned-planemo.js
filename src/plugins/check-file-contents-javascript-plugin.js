/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );
var errorUtil = require( "../utils/error-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onJavaScriptFileRead( function ( file, comment ) {
		exports.onJavaScriptFileRead( options, file, comment );
	} );

};

exports.onJavaScriptFileRead = function ( options, file, fileContents ) {

	if ( !options ) {
		throw errorUtil.create( "No options were defined." );
	}

	if ( !options.mustcontain ) {
		throw errorUtil.create( "The option \"mustcontain\" is not defined." );
	}

	for ( var i in options.mustcontain ) {

		var pattern = options.mustcontain[i];

		var regexp = new RegExp( pattern );

		if ( !regexp.test( fileContents ) ) {
			var error = new Error( "Did not found the pattern \"" + pattern + "\"." );
			error.file = file;
			throw error;
		}

	}

}