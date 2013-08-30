/*
 * Private functions
 */

var ANSI_RED = "\x1b[31m";
var ANSI_GREEN = "\x1b[32m";
//var ANSI_CYAN = "\x1b[36m";
//var ANSI_WHITE = "\x1b[37m";
var ANSI_CANCEL = "\x1b[0m";

function getFormattedTime () {

	return new Date().toUTCString();

}

/*
 * Public functions
 */

exports.log = function log ( object ) {

	var timestamp = getFormattedTime();

	console.log( "[" + timestamp + "] " + object );

};

exports.success = function log ( object ) {

	var timestamp = getFormattedTime();

	console.log( ANSI_GREEN + "[" + timestamp + "] " + object + ANSI_CANCEL );

};

exports.error = function error ( error ) {

	var message = error.message;

	console.log( ANSI_RED + message + ANSI_CANCEL + "\n" );

	for ( var property in error ) {
		console.log( ANSI_RED + property + " = " + JSON.stringify( error[property], null, "\t" ) + ANSI_CANCEL );
	}

};