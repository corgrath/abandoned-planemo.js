/*
 * Dependencies
 */

var logService = require( "../services/log-service.js" );
var fileService = require( "../services/file-service.js" );

/*
 * Public functions
 */

exports.register = function ( dataCollectorName ) {

	var physicalFile = "./src/data_collectors/" + dataCollectorName;
	var requireFile = "../data_collectors/" + dataCollectorName;

	if ( !fileService.fileExists( physicalFile ) ) {
		logService.error( "The data collector file does not exist \"" + physicalFile + "\"." );
	}

	var collector = require( requireFile );

	collector.init();

	logService.log( "Initializion of the data collector \"" + dataCollectorName + "\" is done." );

};