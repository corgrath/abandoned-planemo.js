/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onCSSPropertyAndAttributeRead( function ( file, selectors, property, value ) {

		exports.onCSSPropertyAndAttributeRead( options, file, selectors, property, value );

	} );

};

exports.onCSSPropertyAndAttributeRead = function ( options, file, selectors, property, value ) {

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	for ( var i in options.disallow ) {

		var pattern = new RegExp( options.disallow[i] );

		for ( var k in selectors ) {

			var selector = selectors[k];

			if ( pattern.test( selector ) ) {
				var error = new Error( "Found the invalid pattern \"" + pattern + "\" in in selector \"" + selector + "\"." );
				error.file = file;
				error.selectors = selectors;
				error.property = property;
				error.value = value;
				throw error;
			}

		}

	}

};