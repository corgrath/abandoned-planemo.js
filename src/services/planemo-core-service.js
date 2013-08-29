/*
 * Dependencies
 */

var logService = require( "./log-service.js" );
var fileService = require( "./file-service.js" );

/*
 * Private
 */

function validateConfiguration ( configuration ) {

	console.log( configuration );

}

/*
 * Public
 */

exports.getConfigurationFromArgument = function ( configurationArgumentFile ) {

	if ( !configurationArgumentFile ) {
		throw new Error( "No configuration file was specified as an argument." );
	}

	logService.log( "Got the configuration file argument \"" + configurationArgumentFile + "\"." );

	var exists = fileService.fileExists( configurationArgumentFile );

	if ( !exists ) {
		logService.error( "The file \"" + configurationArgumentFile + "\" does not exist." );
	} else {
		logService.log( "Found the configuration file \"" + configurationArgumentFile + "\" on disk." );
	}

	var configurationFilecontents = fileService.readFile( configurationArgumentFile );

	var configuration = JSON.parse( configurationFilecontents );

	validateConfiguration( configuration );

	return configuration;

}