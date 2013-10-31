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

var assert = require( "assert" );
var reporterService = require( "../services/reporter-service.js" );

/*
 * Private
 */

function register ( reporters, pluginName, options ) {

	/*
	 * Asserts
	 */

	assert( reporters, "Reporters is undefined." );
	assert( pluginName, "Plugin name is undefined." );
	assert( options, "Options is undefined." );

	var pluginFileForRequire = "../plugins/" + pluginName + ".js";

	var plugin = require( pluginFileForRequire );

	plugin.init( options );

	reporterService.onPluginRegistered( reporters, pluginName );

};

/*
 * Public functions
 */

exports.init = function ( reporters, plugins ) {

	/*
	 * Asserts
	 */

	assert( reporters, "Reporters is not defined." );
	assert( plugins, "Array of plugins is undefined." );

	/*
	 * Go through all the plugins
	 */

	for ( var pluginName in plugins ) {

		var options = plugins[pluginName];

		register( reporters, pluginName, options );

	}

};