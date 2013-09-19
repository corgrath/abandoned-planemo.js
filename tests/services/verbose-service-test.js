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

var verboseService = require( "../../src/services/verbose-service.js" );

/*
 * Tests
 */

describe( "verbose service", function () {

	describe( "isVerbose", function () {

		it( "should have correct default value", function () {

			expect( verboseService.isVerbose(), true ).to.be.true;

		} );

	} );

	describe( "setVerbose", function () {

		it( "should complain if no value was defined", function () {

			expect(function () {
				verboseService.setVerbose();
			} ).to.throw( "Verbose is undefined." );

			expect(function () {
				verboseService.setVerbose( "This is a String." );
			} ).to.throw( "Verbose is not a Boolean." );

		} );

		it( "should should remember the set value", function () {

			verboseService.setVerbose( true );

			expect( verboseService.isVerbose() ).to.be.true;

		} );

	} );

} );