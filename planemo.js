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

var path = require( "path" );

var planemoCoreService = require( "./src/services/planemo-core-service.js" );
var assert = require( "./src/utils/argument-assertion-util.js" );
var observerService = require( "./src/services/observer-service.js" );
var dataCollectorService = require( "./src/services/data-collector-service.js" );
var fileService = require( "./src/services/file-service.js" );
var pluginService = require( "./src/services/plugin-service.js" );
var pluginResponseService = require( "./src/services/plugin-response-service.js" );
var defaultReporterFactory = require( "./src/factories/default-reporter-factory.js" );
var reporterService = require( "./src/services/reporter-service.js" );

/*
 * Private
 */

/*
 * Public
 */

exports.getDefaultReporterFactory = function () {
	return defaultReporterFactory.create();
};

exports.start = function ( configuration, reporters ) {

	/*
	 * Asserts
	 */

	assert.isObject( configuration, "Configuration file" );

	if ( !reporters ) {
		reporters = [exports.getDefaultReporterFactory()];
		reporterService.onVerbose( reporters, "No reporters were defined. Using the default built-in reporter." );
	}

	/*
	 * Inform the reporter we are starting
	 */

	reporterService.onStart( reporters );

	/*
	 * Get the configuration file
	 */

	planemoCoreService.validateConfiguration( configuration );

	/*
	 * Register the data collectors
	 */

	dataCollectorService.init( reporters );

	/*
	 * Go through all the plugins and register them into Planemo
	 */

	pluginService.init( reporters, configuration.plugins );

	/*
	 * Go through each source directory in the configuration file and start the analysis tool
	 */

	var sourceRoot = configuration.source.root;

	reporterService.onVerbose( reporters, "Source directory is \"" + sourceRoot + "\"." );
	reporterService.onVerbose( reporters, "Source directory is normalize \"" + path.normalize( sourceRoot ) );
	reporterService.onVerbose( reporters, "Source directory is resolve \"" + path.resolve( sourceRoot ) );

	var sourceRootDetails = fileService.breakDownPath( sourceRoot );

	var onPluginError = function ( response ) {
		pluginResponseService.handlePluginResponse( reporters, response );
	};

	observerService.directoryFound( reporters, configuration.source.ignore, sourceRootDetails.basePath, sourceRootDetails.fullPath, sourceRootDetails.directoryName, onPluginError );

	/*
	 * Summarize the errors
	 */

	var errors = pluginResponseService.getErrors()

	reporterService.onFinished( reporters, errors );

};