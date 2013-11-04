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
 * Private functions
 */

var ANSI_RED = "\x1b[31m";
var ANSI_GREEN = "\x1b[32m";
var ANSI_CANCEL = "\x1b[0m";

function getFormattedTime ( myDate ) {

	if ( !myDate ) {
		myDate = new Date();
	}

	return myDate.toUTCString();

}

/*
 * Public functions
 */

exports.log = function log ( object, myDate, myConsole ) {

	var timestamp = getFormattedTime( myDate );

	if ( !myConsole ) {
		myConsole = console;
	}

	myConsole.log( "[" + timestamp + "] " + object );

};

exports.success = function log ( object ) {

	var timestamp = getFormattedTime();

	console.log( ANSI_GREEN + "[" + timestamp + "] " + object + ANSI_CANCEL );

};

exports.error = function error ( error ) {

	var message = error.message;

	console.log( ANSI_RED + message + ANSI_CANCEL );

	for ( var property in error ) {
		console.log( ANSI_RED + property + " = " + JSON.stringify( error[property], null, "\t" ) + ANSI_CANCEL );
	}

	console.log( "\n" );

};

exports.fail = function error ( message, myConsole ) {

	if ( !myConsole ) {
		myConsole = console;
	}

	myConsole.log( "\n" + ANSI_RED + message + ANSI_CANCEL + "\n" );

};