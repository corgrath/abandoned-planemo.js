/*
 * Dependencies
 */

var observerService = require( "./../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onFileRead( exports.onFileRead );

};

exports.onFileRead = function onFileRead ( file, contents ) {

	var lines = contents.split( "\n" );

	if ( lines.length !== 0 ) {

		for ( var i in lines ) {

			var lineNumber = (i + 1);
			var lineContents = lines[i].substring( 0, lines[i].length - 1 );

			observerService.fileLineRead( file, lineNumber, lineContents );
			//			observerService.fileLineRead( file, lineNumber, lineContents, function ( error ) {
			//
			//				if ( error ) {
			//					error.file = file;
			//					error.lineNumber = lineNumber;
			//					error.lineContents = lineContents;
			//				}
			//
			//				callbackFunction( error );
			//
			//			} );

		}

	}

};