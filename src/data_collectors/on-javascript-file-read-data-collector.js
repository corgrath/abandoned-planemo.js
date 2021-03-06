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

var observerService = require( "./../services/observer-service.js" );

/*
 * Public functions
 */

exports.init = function () {

	observerService.onJavaScriptFileRead( exports.onJavaScriptFileRead );

};

exports.onJavaScriptFileRead = function onFileRead ( file, contents, responseFunction ) {

	if ( contents.length > 0 ) {

		var lines = contents.split( "\n" );

		if ( lines.length !== 0 ) {

			for ( var i in lines ) {

				var lineNumber = (i + 1);
				var lineContents = lines[i].substring( 0, lines[i].length - 1 );

				observerService.JavaScriptFileLineRead( file, lineNumber, lineContents, responseFunction );

			}

		}

	}

};