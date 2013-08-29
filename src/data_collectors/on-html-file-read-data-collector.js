/*
 * Dependencies
 */

var htmlparser = require( "htmlparser2" );

var observerService = require( "./../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onHTMLFileRead( exports.onHTMLFileRead );

};

exports.onHTMLFileRead = function onFileRead ( file, fileContents ) {

	var parser = new htmlparser.Parser( {

		onopentag: function ( elementName, attributes ) {

			for ( var property in attributes ) {

				observerService.HTMLPropertyValueRead( file, elementName, property, attributes[property] );

			}

		}

	} );

	parser.write( fileContents );
	parser.end();

};