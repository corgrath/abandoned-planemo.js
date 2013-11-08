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

var logService = require( "../services/log-service.js" );

/*
 * Public functions
 */

exports.create = function () {

	return {

		onStart: function ( version ) {

			logService.log( "[on-start] Starting Planemo, version " + version + "." );

		},

		onVerbose: function ( message ) {

			logService.log( "[on-verbose] " + message );

		},

		onDataCollectorRegistered: function ( dataCollectorName ) {

			logService.log( "[on-data-collector-registered] Registered the data collector \"" + dataCollectorName + "\"." );

		},

		onPluginRegistered: function ( pluginName ) {

			logService.log( "[on-plugin-registered] Registered the plugin \"" + pluginName + "\"." );

		},

		onPluginError: function ( error ) {

			logService.error( error );

		},

		onFinished: function ( errors ) {

			if ( errors.length > 0 ) {

				logService.fail( "[on-finished] Planemo static code analysis failed with \"" + errors.length + "\" errors." );

			} else {

				logService.success( "[on-finished] Planemo static code analysis done. No errors found. Happy times!" );

			}

		}

	}

};