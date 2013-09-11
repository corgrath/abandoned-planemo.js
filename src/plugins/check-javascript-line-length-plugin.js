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

var objectUtil = require( "../utils/object-util.js" );

var observerService = require( "../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onJavaScriptFileLineRead( function ( file, lineNumber, lineContents ) {

		exports.onJavaScriptFileLineRead( options, file, lineNumber, lineContents );

	} );

};

exports.onJavaScriptFileLineRead = function ( options, file, lineNumber, lineContents ) {

	if ( !options ) {
		throw new Error( "Invalid options." );
	}

	if ( !options.length ) {
		throw new Error( "No length is defined in the options." );
	}

	if ( !objectUtil.isNumber( options.length ) ) {
		throw new Error( "The length \"" + options.length + "\" is not a number." );
	}

	if ( options.length < 0 ) {
		throw new Error( "The length \"" + options.length + "\" cannot be less than 0." );
	}

	if ( lineContents.length > options.length ) {
		throw new Error( "Line \"" + lineNumber + "\" length in file \"" + file + "\" too large. Maximum is \"" + options.length + "\" but found \"" + lineContents.length + "\"." );
	}

}