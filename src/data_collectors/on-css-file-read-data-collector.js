/*
 * Dependencies
 */

var nodeCSS = require( "css" );
var observerService = require( "./../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onCSSFileRead( exports.onCSSFileRead );

};

exports.onCSSFileRead = function ( file, fileContents ) {

	var css = nodeCSS.parse( fileContents )

	for ( var i in css.stylesheet.rules ) {

		var rule = css.stylesheet.rules[i];

		if ( rule.type === "rule" ) {

			var selectors = rule.selectors;

			for ( var k in rule.declarations ) {

				var declaration = rule.declarations[k];

				if ( declaration.type === "declaration" ) {

					var value = declaration.value;

					if ( !value ) {
						var error = new Error( "The CSS value is undefined." );
						error.declaration = declaration;
						throw error;
					}

					observerService.CSSPropertyAndAttributeRead( file, selectors, declaration.property, declaration.value );

				} else if ( declaration.type !== "comment" ) {

					observerService.CSSCommentRead( file, declaration.comment );

				}

			}

		} else if ( rule.type === "comment" ) {
			observerService.CSSCommentRead( file, rule.comment );

		}

	}

};

