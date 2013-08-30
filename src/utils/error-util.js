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