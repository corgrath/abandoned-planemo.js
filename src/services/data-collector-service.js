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