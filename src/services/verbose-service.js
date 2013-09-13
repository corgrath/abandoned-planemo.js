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
var errorUtil = require( "../utils/error-util.js" );
var objectUtil = require( "../utils/object-util.js" );

/*
 * Private
 */

// Default value is true
var verbose = true;

/*
 * Public functions
 */

exports.setVerbose = function ( v ) {

	if ( v === undefined ) {
		throw errorUtil.create( "Verbose is undefined." );
	}

	if ( !objectUtil.isBoolean( v ) ) {
		throw errorUtil.create( "Verbose is not a Boolean." );
	}

	// Set the setting
	verbose = v;

	// Inform the user about the change
	logService.important( "Verbose is not set to \"" + v + "\"." );

};

exports.isVerbose = function () {

	if ( verbose === undefined ) {
		throw errorUtil.create( "Verbose is undefined." );
	}

	return verbose;

};