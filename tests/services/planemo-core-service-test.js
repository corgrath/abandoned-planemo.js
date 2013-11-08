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
var planemoCoreService = require( "../../src-instrumented/services/planemo-core-service.js" );

/*
 * Tests
 */

describe( "planemo core service", function () {

	describe( "validateConfigurationObject", function () {

		it( "should complain if source is not defined", function () {

			var configuration = {
			};

			expect(function () {
				planemoCoreService.validateConfiguration( configuration );
			} ).to.throw( "The \"source\" setting in the configuration file is not defined." );

		} );

		it( "should complain if source root is not defined", function () {

			var configuration = {
				source: {
				}
			};

			expect(function () {
				planemoCoreService.validateConfiguration( configuration );
			} ).to.throw( "The \"root\" in the \"source\" setting in the configuration file is not defined." );

		} );

		it( "should complain if source root is not defined", function () {

			var configuration = {
				source: {
				}
			};

			expect(function () {
				planemoCoreService.validateConfiguration( configuration );
			} ).to.throw( "The \"root\" in the \"source\" setting in the configuration file is not defined." );

		} );

		it( "should complain if an ignored source directory does not exist", function () {

			var faultyIgnoredDirectoryPath = "This is not a valid directory path";

			var configuration = {
				source: {
					root: __dirname,
					ignore: [
						__dirname,
						faultyIgnoredDirectoryPath
					]
				}
			};

			expect(function () {
				planemoCoreService.validateConfiguration( configuration );
			} ).to.throw( "The ignored directory \"" + faultyIgnoredDirectoryPath + "\" does not exist." );

		} );

		it( "should all pass", function () {

			var configuration = {
				source: {
					root: __dirname,
					ignore: [
						__dirname,
						__dirname
					]
				}
			};

			expect(function () {
				planemoCoreService.validateConfiguration( configuration );
			} ).to.not.throw();

		} );

	} );

} );