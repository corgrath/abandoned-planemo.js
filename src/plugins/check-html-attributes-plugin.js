/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );
var stringUtil = require( "../utils/string-util.js" );
var objectUtil = require( "../utils/object-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onHTMLElementRead( function ( file, elementName, attributes ) {
		exports.onHTMLElementRead( options, file, elementName, attributes );
	} );

};

exports.onHTMLElementRead = function ( options, file, elementName, attributes ) {

	if ( options.notAllowedToStartWith && !objectUtil.isArray( options.notAllowedToStartWith ) ) {
		throw new Error( "The \"notAllowedToStartWith\" has to be an array." );
	}

	for ( var attribute in attributes ) {

		if ( options.notAllowedToStartWith ) {

			if ( stringUtil.startsWith( attribute, options.notAllowedToStartWith ) ) {
				throw new Error( "Found HTML element \"" + attribute + "\" name that starts invalid in file \"" + file + "\"." );
			}

		}

	}

}