/*
 * Dependencies
 */

var objectUtil = require( "../utils/object-util.js" );

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onJavaScriptFileLineRead( function ( file, lineNumber, lineContents ) {

		exports.onJavaScriptFileLineRead( options, file, lineNumber, lineContents );

	} );

};

exports.onJavaScriptFileLineRead = function ( options, file, lineNumber, lineContents ) {

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	if ( !options.length ) {
		throw new Error( "No length is defined in the options." );
	}

	if ( !objectUtil.isNumber( options.length ) ) {
		throw new Error( "The length \"" + options.length + "\" is not a number." );
	}

	if ( options.length < 0 ) {
		throw new Error( "The length \"" + options.length + "\" cannot be less than 0." );
	}

	if ( lineContents.length > options.length ) {
		throw new Error( "Line \"" + lineNumber + "\" length in file \"" + file + "\" too large. Maximum is \"" + options.length + "\" but found \"" + lineContents.length + "\"." );
	}

}