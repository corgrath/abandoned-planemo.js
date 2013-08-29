/*
 * Dependencies
 */

var htmlparser = require( "htmlparser2" );

var observerService = require( "./../services/observer-service.js" );
var fileTypeService = require( "./../services/file-type-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onFileRead( exports.onFileRead );

};

exports.onFileRead = function onFileRead ( file, fileContents ) {

	if ( !fileTypeService.isHTMLFile( file ) ) {
		return;
	}

	var parser = new htmlparser.Parser( {

		onopentag: function ( elementName, attributes ) {

			observerService.HTMLElementRead( file, elementName, attributes );

		}

	} );

	parser.write( fileContents );
	parser.end();

}