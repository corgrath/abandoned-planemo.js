/*
 * Dependencies
 */

var stringUtil = require( "../utils/string-util.js" );

/*
 * Public functions
 */

exports.isHTMLFile = function ( file ) {

	return stringUtil.endsWith( file, ".html" );

};

exports.isLESSFile = function ( file ) {

	return stringUtil.endsWith( file, ".less" );

};

exports.isCSSFile = function ( file ) {

	return stringUtil.endsWith( file, ".css" );

};

exports.isJavaScriptFile = function ( file ) {

	return stringUtil.endsWith( file, ".js" );

};