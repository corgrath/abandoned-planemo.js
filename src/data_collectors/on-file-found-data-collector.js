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

	if ( !fileTypeService.isPlainText( filename ) ) {
		logService.log( "Will not parse conents of file \"" + filename + "\" since it is not plain text." );
		return;
	}

	var file = path + filename;

	var contents = fileService.readFile( file );

	observerService.fileRead( file, contents );

};