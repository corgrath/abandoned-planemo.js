/*
 * Dependencies
 */

var nodeUnderscoreString = require( "underscore.string" );

/*
 * Public functions
 */

exports.endsWith = function endsWith ( string, ends ) {

	return nodeUnderscoreString.endsWith( string, ends );

};

exports.startsWith = function startsWith ( string, startsWith ) {

	return nodeUnderscoreString.startsWith( string, startsWith );

};

exports.contains = function contains ( string, contains ) {

	return string.indexOf( contains ) !== -1;
};
