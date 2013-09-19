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

var planemoCoreService = require( "../../src/services/planemo-core-service.js" );

/*
 * Tests
 */

describe( "planemo core service", function () {

	describe( "setVerbose", function () {

		it( "should complain if no configuration file was defined", function () {

			var configuration = {
			};

			expect(function () {
				planemoCoreService.validateConfigurationObject( configuration );
			} ).to.throw( "No \"verbose\" setting was found in the configuration file." );

		} );

		it( "should complain if configuration file defined is not a string", function () {

			var configuration = {
				verbose: "This is a string"
			};

			expect(function () {
				planemoCoreService.validateConfigurationObject( configuration );
			} ).to.throw( "The \"verbose\" setting in the configuration file is not a Boolean (meaning the value is not true or false)." );

		} );

	} );

} );