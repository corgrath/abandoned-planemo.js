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
var expect = assert.expect;

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

exports.log = function ( object, myDate, myConsole ) {

	var timestamp = getFormattedTime( myDate );

	if ( !myConsole ) {
		myConsole = console;
	}

	myConsole.log( "[" + timestamp + "] " + object );

};

exports.success = function ( object, myDate, myConsole ) {

	var timestamp = getFormattedTime( myDate );

	if ( !myConsole ) {
		myConsole = console;
	}

	myConsole.log( ANSI_GREEN + "[" + timestamp + "] " + object + ANSI_CANCEL );

};

exports.error = function ( error, _console ) {

	expect( error ).toBeType( Error );

	var message = error.message;

	if ( !_console ) {
		_console = console;
	}

	_console.log( ANSI_RED + message + ANSI_CANCEL );

	for ( var property in error ) {
		_console.log( ANSI_RED + property + " = " + JSON.stringify( error[property], null, "\t" ) + ANSI_CANCEL );
	}

	_console.log( "\n" );

};

exports.fail = function ( message, myConsole ) {

	if ( !myConsole ) {
		myConsole = console;
	}

	myConsole.log( "\n" + ANSI_RED + message + ANSI_CANCEL + "\n" );

};