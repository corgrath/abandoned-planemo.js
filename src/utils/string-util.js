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

var nodeUnderscoreString = require( "underscore.string" );

/*
 * Public functions
 */

exports.endsWith = function endsWith ( string, ends ) {

	if ( ends === undefined ) {
		throw new Error( "Ends cannot be undefined." );
	}

	if ( ends === "" ) {
		throw new Error( "Ends cannot be an empty String." );
	}

	return nodeUnderscoreString.endsWith( string, ends );

};

exports.startsWith = function startsWith ( string, startsWith ) {

	return nodeUnderscoreString.startsWith( string, startsWith );

};

exports.contains = function contains ( string, contains ) {

	return string.indexOf( contains ) !== -1;

};