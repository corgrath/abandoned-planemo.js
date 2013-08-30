/*
 * Public functions
 */

exports.create = function ( message, data ) {

	var error = new Error( message );

	for ( var property in data ) {

		error[property] = data[property];

	}

	return error;

};