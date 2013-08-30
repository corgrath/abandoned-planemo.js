/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );
var errorUtil = require( "../utils/error-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onDirectoryFound( function checkDirectoryNameOnDirectoryFound ( basePath, fullPath, directoryName ) {
		exports.onDirectoryFound( options, basePath, fullPath, directoryName );
	} );

};

exports.onDirectoryFound = function onDirectoryFound ( options, basePath, fullPath, directoryName ) {

	if ( !options ) {
		throw new Error( "No options were defined." );
	}

	if ( !options.regexp ) {
		throw new Error( "Invalid regexp option." );
	}

	var pattern = new RegExp( options.regexp );

	var isLegalFilename = pattern.test( directoryName );

	if ( !isLegalFilename ) {

		throw errorUtil.create( "The directory name \"" + directoryName + "\" is not valid.", {
			basePath: basePath,
			fullPath: fullPath,
			directoryName: directoryName
		} );

	}

}