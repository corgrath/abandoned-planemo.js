/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */

/*
 * Dependencies
 */

var logService = require( "./src/services/log-service.js" );
var planemoCoreService = require( "./src/services/planemo-core-service.js" );
var observerService = require( "./src/services/observer-service.js" );
var dataCollectorService = require( "./src/services/data-collector-service.js" );
var fileService = require( "./src/services/file-service.js" );
var pluginService = require( "./src/services/plugin-service.js" );
var verboseService = require( "./src/services/verbose-service.js" );
var pluginResponseService = require( "./src/services/plugin-response-service.js" );

/**
 * Planemo main function.
 *
 * @param configurationFile - Path to the configuration file.
 * @param reporterFile - Path to a reporter file.
 */

module.exports = function ( configurationFile, reporter ) {


	/*
	 * Get the configuration file
	 */

	var configuration = planemoCoreService.getConfigurationFromArgument( configurationFile );

	/*
	 * Set the verbose setting
	 */

	verboseService.setVerbose( configuration.verbose );

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

		pluginService.register( pluginName, options );

	}

	/*
	 * Go through each source directory in the configuration file and start the analysis tool
	 */

	var sourceRoot = configuration.source.root;
	logService.log( "Source directory is \"" + sourceRoot + "\"." );

	var sourceRootDetails = fileService.breakDownPath( sourceRoot );

	observerService.directoryFound( configuration.source.ignore, sourceRootDetails.basePath, sourceRootDetails.fullPath, sourceRootDetails.directoryName, pluginResponseService.handlePluginResponse );

	/*
	 * Summarize the number of errors
	 */

	var numberOfErrors = pluginResponseService.getNumberOfErrors();

	if ( numberOfErrors > 0 ) {

		logService.fail( "Planemo static code analysis failed with \"" + numberOfErrors + "\" errors." );
		process.exit( 1 );

	} else {

		logService.success( "Planemo static code analysis done. No errors found. It's a great day!" );
		process.exit( 0 );

	}

};