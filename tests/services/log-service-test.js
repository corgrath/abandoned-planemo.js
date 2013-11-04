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
var logService = require( "../../src-instrumented/services/log-service.js" );

/*
 * Mocks
 */

var mockConsole = {
	log: function ( message ) {
		this.message = message;
	},
	getLog: function () {
		return this.message;
	}
};

/*
 * Tests
 */

describe( "log service", function () {

	describe( "log ", function () {

		it( "should have correct output", function () {

			var mockDate = new Date();

			var message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. 槥ちゅ りゅにょい 裪嶥りゃきゅ.";
			var expected = "[" + mockDate.toUTCString() + "] " + message;

			logService.log( message, mockDate, mockConsole );
			expect( mockConsole.getLog() ).to.equal( expected );

		} );

	} );

	describe( "fail ", function () {

		it( "should have correct output", function () {

			var message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. 槥ちゅ りゅにょい 裪嶥りゃきゅ.";
			var expected = "\n\u001b[31m" + message + "\u001b[0m\n";

			logService.fail( message, mockConsole );
			expect( mockConsole.getLog() ).to.equal( expected );

		} );

	} );

} );