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

var assert = require( "assert" );

var logService = require( "./log-service.js" );
var fileService = require( "./file-service.js" );

/*
 * Public
 */

exports.validateConfiguration = function ( configuration ) {

	if ( configuration.source === undefined ) {
		throw new Error( "The \"source\" setting in the configuration file is not defined." );
	}

	if ( configuration.source.root === undefined ) {
		throw new Error( "The \"root\" in the \"source\" setting in the configuration file is not defined." );
	}

};