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
var fileTypeService = require( "../../src-instrumented/services/file-type-service.js" );

/*
 * Tests
 */

describe( "file-type-service", function () {

	describe( "isHTML", function () {

		it( "should be true", function () {
			expect( fileTypeService.isHTMLFile( "hello.html" ) ).to.be.true;
		} );

		it( "should be false", function () {
			expect( fileTypeService.isHTMLFile( "hello.xhtml" ) ).to.be.false;
		} );

		it( "should be false due to undefined", function () {
			expect( fileTypeService.isHTMLFile( undefined ) ).to.be.false;
		} );

		it( "should be false due to object", function () {
			expect( fileTypeService.isHTMLFile( {} ) ).to.be.false;
		} );

	} );

	describe( "isLESSFile", function () {

		it( "should be true", function () {
			expect( fileTypeService.isLESSFile( "hello.less" ) ).to.be.true;
		} );

		it( "should be false", function () {
			expect( fileTypeService.isLESSFile( "hello.lessx" ) ).to.be.false;
		} );

		it( "should be false due to undefined", function () {
			expect( fileTypeService.isLESSFile( undefined ) ).to.be.false;
		} );

		it( "should be false due to object", function () {
			expect( fileTypeService.isLESSFile( {} ) ).to.be.false;
		} );

	} );

	describe( "isCSSFile", function () {

		it( "should be true", function () {
			expect( fileTypeService.isCSSFile( "hello.css" ) ).to.be.true;
		} );

		it( "should be false", function () {
			expect( fileTypeService.isCSSFile( "hello.cssx" ) ).to.be.false;
		} );

		it( "should be false due to undefined", function () {
			expect( fileTypeService.isCSSFile( undefined ) ).to.be.false;
		} );

		it( "should be false due to object", function () {
			expect( fileTypeService.isCSSFile( {} ) ).to.be.false;
		} );

	} );

} );