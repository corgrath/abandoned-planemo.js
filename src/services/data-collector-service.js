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

var assert = require( "../utils/argument-assertion-util.js" );
var reporterService = require( "../services/reporter-service.js" );

/*
 * Private
 */

var dataCollectors =
	[
		"on-css-file-read-data-collector",
		"on-directory-found-data-collector",
		"on-file-found-data-collector",
		"on-html-file-read-data-collector",
		"on-javascript-file-read-data-collector"
	];

function register ( reporters, dataCollectorName ) {

	/*
	 * Assert
	 */

	assert.isObject( reporters, "Report is undefined." );

	/*
	 * Logic
	 */

	var requireFile = "../data_collectors/" + dataCollectorName;

	var collector = require( requireFile );

	collector.init();

	reporterService.onDataCollectorRegistered( reporters, dataCollectorName );

};

/*
 * Public functions
 */

exports.init = function ( reporters ) {

	for ( var i in dataCollectors ) {

		var dataCollectorFileName = dataCollectors[i];

		register( reporters, dataCollectorFileName );

	}

};