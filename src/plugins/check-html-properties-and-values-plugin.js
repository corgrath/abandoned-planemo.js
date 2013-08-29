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

	var options = {
		"disallowValuesStartingWith": {
			"-translation$": "^DataModelViewer\\."
		}
	};

	/*
	 * disallowValuesStartingWith
	 */

	if ( options.disallowValuesStartingWith ) {

		for ( var propertyPattern in options.disallowValuesStartingWith ) {

			var propertyRegexp = new RegExp( propertyPattern );

			if ( propertyRegexp.test( property ) ) {

				var valuePattern = options.disallowValuesStartingWith[propertyPattern];

				var valueRegexp = new RegExp( valuePattern );

				if ( !valueRegexp.test( value ) ) {
					var error = new Error( "Found disallowed value \"" + value + "\" for property \"" + property + "\"." );
					error.file = file;
					error.elementName = elementName;
					error.property = property;
					error.value = value;
					throw error;
				}

			}

		}

	}

}
