/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 */

/*
 * Dependencies
 */

var nodeCSS = require( "css" );
var observerService = require( "./../services/observer-service.js" );
var reporterService = require( "./../services/reporter-service.js" );
var argument = require( "./../utils/argument-assertion-util.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onCSSFileRead( exports.onCSSFileRead );

};

exports.onCSSFileRead = function ( reporters, file, fileContents, responseFunction ) {

	/*
	 * String
	 */

	argument.isArray( reporters, "Reporter is undefined." );
	argument.isString( file, "File is undefined." );
	argument.isString( fileContents, "File contents is undefined." );
	argument.isFunction( responseFunction, "Reponse function is undefined." );

	/*
	 * Logic
	 */

	reporterService.onVerbose( reporters, "Will parse CSS file \"" + file + "\"." );

	var css;

	try {
		css = nodeCSS.parse( fileContents );
	} catch ( error ) {
		console.log( "File=" + file );
		throw error;
	}

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

					observerService.CSSPropertyAndAttributeRead( file, selectors, declaration.property, declaration.value, responseFunction );

				} else if ( declaration.type !== "comment" ) {

					observerService.CSSCommentRead( file, declaration.comment, responseFunction );

				}

			}

		} else if ( rule.type === "comment" ) {
			observerService.CSSCommentRead( file, rule.comment, responseFunction );

		}

	}

};

