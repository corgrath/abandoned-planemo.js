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