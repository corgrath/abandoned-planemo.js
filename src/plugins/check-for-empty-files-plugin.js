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
var fileService = require( "../services/file-service.js" );

/*
 * Public functions
 */

exports.init = function ( options ) {

	observerService.onFileFound( function ( reporters, path, fileName, responseFunction ) {
		exports.onFileFound( options, reporters, path, fileName, responseFunction );
	} );

};

exports.onFileFound = function ( options, reporters, path, fileName, responseFunction ) {

	var stat = fileService.getStat( path, fileName );

	var size = stat.size;

	if ( stat.size === 0 ) {

		responseFunction( errorUtil.create2( "The file name \"" + fileName + "\" has the size \"" + size + "\" bytes.", options.customMessage, {
			path: path,
			fileName: fileName,
			size: size
		} ) );

	}

};