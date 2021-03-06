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

var htmlparser = require( "htmlparser2" );

var observerService = require( "./../services/observer-service.js" );
var argument = require( "./../utils/argument-assertion-util.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onHTMLFileRead( exports.onHTMLFileRead );

};

exports.onHTMLFileRead = function onFileRead ( reporter, file, fileContents, responseFunction ) {

	argument.isObject( reporter, "Reporter is undefined." );
	argument.isString( file, "File is undefined." );
	argument.isString( fileContents, "File contents name is undefined" );
	argument.isFunction( responseFunction, "Response function is undefined." );

	var parser = new htmlparser.Parser( {

		onopentag: function ( elementName, attributes ) {

			for ( var property in attributes ) {

				observerService.HTMLPropertyValueRead( reporter, file, elementName, property, attributes[property], responseFunction );

			}

		}

	} );

	parser.write( fileContents );
	parser.end();

};