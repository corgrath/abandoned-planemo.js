/*
 * Dependencies
 */

var stringUtil = require( "../utils/string-util.js" );

/*
 * Public functions
 */

exports.isPlainText = function ( file ) {

	var isHTML = exports.isHTMLFile( file );
	var isJavaScript = stringUtil.endsWith( file, ".js" );
	var isLESS = exports.isLESSFile( file );
	var isCSS = exports.isCSSFile( file );

	return isHTML || isJavaScript || isLESS || isCSS;

};

exports.isHTMLFile = function ( file ) {
	return stringUtil.endsWith( file, ".html" );
};

exports.isLESSFile = function ( file ) {
	return stringUtil.endsWith( file, ".less" );
};

exports.isCSSFile = function ( file ) {
	return stringUtil.endsWith( file, ".css" );
};