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

var nodePath = require( "path" );
var logService = require( "./log-service.js" );
var fileService = require( "./file-service.js" );
var errorUtil = require( "../utils/error-util.js" );
var objectUtil = require( "../utils/object-util.js" );

/*
 * Public
 */

exports.getConfigurationFromArgument = function ( configurationArgumentFile ) {

	if ( !configurationArgumentFile ) {
		throw new Error( "No configuration file was specified as an argument." );
	}

	logService.important( "Got the configuration file argument \"" + configurationArgumentFile + "\"." );

	var exists = fileService.fileExists( configurationArgumentFile );

	if ( !exists ) {
		logService.error( "The file \"" + configurationArgumentFile + "\" does not exist." );
	} else {
		logService.important( "Found the configuration file \"" + configurationArgumentFile + "\" on disk." );
	}

	var configurationFilecontents = fileService.readFile( configurationArgumentFile );

	var configuration = JSON.parse( configurationFilecontents );

	exports.validateConfigurationObject( configuration );

	return configuration;

}

exports.validateConfigurationObject = function ( configuration ) {

	if ( configuration.source === undefined ) {
		throw new Error( "The \"source\" setting in the configuration file is not defined." );
	}

	if ( configuration.source.root === undefined ) {
		throw new Error( "The \"root\" in the \"source\" setting in the configuration file is not defined." );
	}

	if ( configuration.verbose === undefined ) {
		throw errorUtil.create( "No \"verbose\" setting was found in the configuration file." );
	}

	if ( !objectUtil.isBoolean( configuration.verbose ) ) {
		throw errorUtil.create( "The \"verbose\" setting in the configuration file is not a Boolean (meaning the value is not true or false)." );
	}

};