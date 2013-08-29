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

	observerService.onHTMLPropertyValueRead( function ( file, elementName, property, value ) {
		exports.onHTMLPropertyValueRead( options, file, elementName, property, value );
	} );

};

exports.onHTMLPropertyValueRead = function ( options, file, elementName, property, value ) {

	if ( options.disallowPropertiesStartingWith && !objectUtil.isArray( options.disallowPropertiesStartingWith ) ) {
		throw new Error( "The \"disallowPropertiesStartingWith\" has to be an array." );
	}

	if ( options.disallowPropertiesStartingWith ) {

		if ( stringUtil.startsWith( property, options.disallowPropertiesStartingWith ) ) {
			throw new Error( "Found HTML property \"" + property + "\" name that starts invalid in file \"" + file + "\"." );
		}

	}

}