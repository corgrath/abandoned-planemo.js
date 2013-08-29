/*
 * Dependencies
 */

var plugin = require( "../../src/plugins/check-html-attributes-plugin.js" );

/*
 * Tests
 */

exports.testNotAllowedToStartWithNotArray = function ( test ) {

	var options = {
		notAllowedToStartWith: true
	};
	var file = "c:\\source.js";
	var elementName = "div";
	var attributes = {
		"ng-click": "about()"
	};

	try {
		plugin.onHTMLElementRead( options, file, elementName, attributes );
	} catch ( error ) {
		test.equal( error.message, "The \"notAllowedToStartWith\" has to be an array." );
	}

	test.expect( 1 );
	test.done();

}

exports.testNotAllowedToStartWithValid = function ( test ) {

	var options = {
		notAllowedToStartWith:
			[
				"ng-"
			]
	};

	var file = "c:\\source.js";
	var elementName = "div";
	var attributes = {
		"ng-click": "about()"
	};

	try {
		plugin.onHTMLElementRead( options, file, elementName, attributes );
	} catch ( error ) {
		test.equal( error.message, "Found HTML element \"ng-click\" name that starts invalid in file \"c:\\source.js\"." );
	}

	test.expect( 1 );
	test.done();

}