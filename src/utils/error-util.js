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
 * Public functions
 */

exports.create = function ( message, data ) {

	if ( !message ) {
		throw new Error( "Invalid message." );
	}

	var error = new Error( message );

	for ( var property in data ) {

		error[property] = data[property];

	}

	return error;

};

exports.create2 = function ( message, customMessage, data ) {

	if ( !message ) {
		throw new Error( "Invalid message." );
	}

	var error = new Error( message );
	console.log( "customMessage=" + customMessage )
	if ( customMessage ) {
		error.customMessage = customMessage;
	}

	for ( var property in data ) {

		error[property] = data[property];

	}

	return error;

};