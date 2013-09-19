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

var expect = require( "chai" ).expect;
var nodePath = require( "path" );
var fileService = require( "../../src/services/file-service.js" );

/*
 * Tests
 */

describe( "file service", function () {

	describe( "breakDownPath", function () {

		it( "should be able to break down a path into more details", function () {

			var separator = nodePath.sep;

			var path = "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3" + separator;

			var actual = fileService.breakDownPath( path );

			console.log( "actual.directoryName=[" + actual.directoryName + "]" );

			expect( actual.basePath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator );
			expect( actual.fullPath ).to.equal( "c:" + separator + "folder1" + separator + "folder2" + separator + "folder3" + separator );
			expect( actual.directoryName ).to.equal( "folder3" );

		} );

	} );

} );