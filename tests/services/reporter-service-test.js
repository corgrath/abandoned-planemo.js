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
var reporterService = require( "../../src-instrumented/services/reporter-service.js" );

/*
 expect( error.message ).to.equal( "Found HTML property \"ng-click\" name that starts invalid in file \"c:\\source.js\"." );
 expect( error.file ).to.equal( file );
 expect( error.elementName ).to.equal( elementName );
 expect( error.property ).to.equal( property );
 expect( error.value ).to.equal( value );
 done();
 */

/*
 * Tests
 */

describe( "reporter service", function () {

	describe( "on start", function () {

		it( "should fail if no broadcasters are defined", function () {

			expect(function () {
				reporterService.onStart();
			} ).to.throw( "Reporters is undefined." );

		} );

		it( "should broadcast onStart", function ( done ) {

			var reporters = [
				{
					onStart: function () {
						done();
					}
				}
			];

			reporterService.onStart( reporters );

		} );

		it( "should broadcast onDataCollectorRegistered ", function ( done ) {

			var reporters = [
				{
					onDataCollectorRegistered: function () {
						done();
					}
				}
			];

			reporterService.onDataCollectorRegistered( reporters );

		} );

		it( "should broadcast onPluginRegistered  ", function ( done ) {

			var reporters = [
				{
					onPluginRegistered: function () {
						done();
					}
				}
			];

			reporterService.onPluginRegistered( reporters );

		} );

		it( "should broadcast onVerbose", function ( done ) {

			var reporters = [
				{
					onVerbose: function () {
						done();
					}
				}
			];

			reporterService.onVerbose( reporters );

		} );

		it( "should broadcast onPluginError", function ( done ) {

			var reporters = [
				{
					onPluginError: function () {
						done();
					}
				}
			];

			reporterService.onPluginError( reporters );

		} );

		it( "should broadcast onFinished", function ( done ) {

			var reporters = [
				{
					onFinished: function () {
						done();
					}
				}
			];

			reporterService.onFinished( reporters );

		} );

	} );

} );