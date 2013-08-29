/*
 * Dependencies
 */

var logService = require( "./src/services/log-service.js" );
var planemoCoreService = require( "./src/services/planemo-core-service.js" );
var observerService = require( "./src/services/observer-service.js" );
var dataCollectorService = require( "./src/services/data-collector-service.js" );
var fileService = require( "./src/services/file-service.js" );
var pluginService = require( "./src/services/plugin-service.js" );

/*
 * Get the configuration file
 */

var configuration = planemoCoreService.getConfigurationFromArgument( process.argv[2] );

/*
 * Register data collectors
 */

var dataCollectors = fileService.getAllFilesInDirectory( "./src/data_collectors/" );

for ( var i in dataCollectors ) {

	var dataCollectorFileName = dataCollectors[i];

	dataCollectorService.register( dataCollectorFileName );

}

/*
 * Go through all the plugins and register them into Planemo
 */

for ( var pluginName in configuration.plugins ) {

	var options = configuration.plugins[pluginName];
	console.log( " plugin" );
	console.log( pluginName );

	pluginService.register( pluginName, options );

}

/*
 * Go through each source directory in the configuration file and start the analysis tool
 */

for ( var i = 0; i < configuration.source.length; i++ ) {

	var source = configuration.source[i];

	var basePath = source.basePath;
	var fullPath = source.fullPath;
	var directoryName = source.directoryName;

	logService.log( "Source directory is \"" + fullPath + "\"." );

	try {

		observerService.directoryFound( basePath, fullPath, directoryName );

	} catch ( error ) {

		logService.error( error );

		console.log( error );
		throw error;

	}

}

logService.success( "Planemo static code analysis done. No errors found. It's a great day!" );