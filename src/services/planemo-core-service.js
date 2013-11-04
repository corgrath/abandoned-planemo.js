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

var assert = require( "../utils/argument-assertion-util.js" );
var logService = require( "./log-service.js" );
var fileService = require( "./file-service.js" );

/*
 * Private
 */

function validateConfigurationSourceIgnore ( configuration ) {

	assert.isArray( configuration.source.ignore, "configuration.source.ignore" );

	for ( var i in configuration.source.ignore ) {

		var directory = configuration.source.ignore[i];

		if ( !fileService.directoryExists( directory ) ) {
			throw new Error( "The ignored directory \"" + directory + "\" does not exist." );
		}

	}

}

/*
 * Public
 */

exports.resolveRelativePaths = function ( configuration ) {

	if ( configuration && configuration.source && configuration.source.root ) {
		configuration.source.root = fileService.getResolvedPath( configuration.source.root );
		logService.log( "The root path has been resolved to \"" + configuration.source.root + "\"." );
	}

	if ( configuration && configuration.source && configuration.source.ignore ) {

		for ( var i in configuration.source.ignore ) {

			configuration.source.ignore[i] = fileService.getResolvedPath( configuration.source.ignore[i] );
			logService.log( "The ignored path has been resolved to \"" + configuration.source.ignore[i] + "\"." );

		}

	}

};

exports.validateConfiguration = function ( configuration ) {

	if ( configuration.source === undefined ) {
		throw new Error( "The \"source\" setting in the configuration file is not defined." );
	}

	if ( configuration.source.root === undefined ) {
		throw new Error( "The \"root\" in the \"source\" setting in the configuration file is not defined." );
	}

	if ( !fileService.directoryExists( configuration.source.root ) ) {
		throw new Error( "The root directory \"" + configuration.source.root + "\" does not exist." );
	}

	validateConfigurationSourceIgnore( configuration );

};