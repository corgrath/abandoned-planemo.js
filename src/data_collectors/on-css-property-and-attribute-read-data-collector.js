/*
 * Dependencies
 */

var fileService = require( "./../services/file-service.js" );
var observerService = require( "./../services/observer-service.js" );
var logService = require( "./../services/log-service.js" );
var fileTypeService = require( "./../services/file-type-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onCSSPropertyAndAttributeRead( exports.onCSSPropertyAndAttributeRead );

};

exports.onCSSPropertyAndAttributeRead = function ( file, selectors, property, value ) {

	console.log( "file=" + file );
	console.log( "selectors=" + selectors );
	console.log( "property=" + property + ":" + typeof property );
	console.log( "value=" + value );

	//	process.exit();

};

