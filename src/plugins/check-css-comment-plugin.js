/*
 * Dependencies
 */

var observerService = require( "../services/observer-service.js" );
var errorUtil = require( "../utils/error-util.js" );
var stringUtil = require( "../utils/string-util.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onCSSCommentRead( function ( file, comment ) {
		exports.onCSSCommentRead( options, file, comment );
	} );

};

exports.onCSSCommentRead = function ( options, file, comment ) {

	if ( !options ) {
		throw errorUtil.create( "No options were defined." );
	}

	if ( options.allowCommentedCode === undefined ) {
		throw errorUtil.create( "The option \"allowCommentedCode\" is not defined." );
	}

	if ( !options.allowCommentedCode && stringUtil.contains( comment, ":" ) ) {

		throw errorUtil.create( "Found code in comment-block.", {
			file: file,
			comment: comment
		} );

	}

}