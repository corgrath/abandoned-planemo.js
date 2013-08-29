/*
 * Dependencies
 */

var nodeCSS = require( "css" );
//var fileService = require( "./../services/file-service.js" );
var observerService = require( "./../services/observer-service.js" );
//var logService = require( "./../services/log-service.js" );
//var fileTypeService = require( "./../services/file-type-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onCSSFileRead( exports.onCSSFileRead );

};

exports.onCSSFileRead = function ( file, fileContents ) {

	//	console.log( "onCSSFileRead" );
	//	console.log( "file=" + file );
	//	console.log( "fileContents=" + fileContents );

	var css = nodeCSS.parse( fileContents )

	//	console.log( JSON.stringify( css, null, "\t" ) );

	for ( var i in css.stylesheet.rules ) {

		var rule = css.stylesheet.rules[i];

		if ( rule.type === "rule" ) {

			var selectors = rule.selectors;

			for ( var k in rule.declarations ) {

				var declaration = rule.declarations[k];

				if ( declaration.type === "declaration" ) {

//					console.log( "rule" );
					//					console.log( rule );
					//					console.log( "declaration" );
					//					console.log( declaration );

					var value = declaration.value;

					if ( !value ) {
						var error = new Error( "The CSS value is undefined." );
						error.declaration = declaration;
						throw error;
					}

					observerService.CSSPropertyAndAttributeRead( file, selectors, declaration.property, declaration.value );

				}

			}

		}

		//		console.log( rule );

	}

};

