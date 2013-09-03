/*
 * Dependencies
 */

var fileService = require( "./../services/file-service.js" );
var observerService = require( "./../services/observer-service.js" );
var logService = require( "./../services/log-service.js" );
var fileTypeService = require( "./../services/file-type-service.js" );

/*
 * Private
 */

function readLineContents ( path, filename, fileReadFunction ) {

	var file = path + filename;

	var contents = fileService.readFile( file );

	fileReadFunction( file, contents );

}

/*
 * Public functions
 */

exports.init = function () {

	observerService.onFileFound( exports.onFileFound );

};

exports.onFileFound = function onFileFound ( path, filename ) {

	if ( fileTypeService.isCSSFile( filename ) ) {
		readLineContents( path, filename, observerService.CSSFileRead );
		return;
	}

	if ( fileTypeService.isHTMLFile( filename ) ) {
		readLineContents( path, filename, observerService.HTMLFileRead );
		return;
	}

	if ( fileTypeService.isLESSFile( filename ) ) {
		readLineContents( path, filename, observerService.LESSFileRead );
		return;
	}

	if ( fileTypeService.isJavaScriptFile( filename ) ) {
		readLineContents( path, filename, observerService.JavaScriptFileRead );
		return;
	}

};