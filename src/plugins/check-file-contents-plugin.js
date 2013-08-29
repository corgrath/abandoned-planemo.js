/*
 * Dependencies
 */

var objectUtil = require( "../utils/object-util.js" );
var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onFileLineRead( function onFileLineRead ( file, lineNumber, lineContents ) {

		exports.onFileLineRead( options, file, lineNumber, lineContents );

	} );

};

exports.onFileLineRead = function ( options, file, lineNumber, lineContents ) {

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	if ( options.notAllowedToContainRegexp && !objectUtil.isArray( options.notAllowedToContainRegexp ) ) {
		throw new Error( "The \"notAllowedToContainRegexp\" has to be an array." );
	}

	for ( var i in options.notAllowedToContainRegexp ) {

		var regexp = options.notAllowedToContainRegexp[i];

		var pattern = new RegExp( regexp );

		//	console.log( "options.name " + options.name )
		//	console.log( "checking " + directoryName )
		//		console.log( "pattern [" + pattern + "]" );
		//		console.log( "lineContents [" + lineContents + "]" );

		if ( pattern.test( lineContents ) ) {
			var error = new Error( "Found the invalid pattern \"" + regexp + "\"." );
			error.file = file;
			throw error;
			//			throw new Error( "Found the invalid pattern \"" + regexp + "\".\nOn the row \"" + lineContents + "\".\nIn the file \"" + file + "\"." );
		}

	}

}