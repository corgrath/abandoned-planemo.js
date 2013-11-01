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
 * Public functions
 */

exports.onStart = function ( reporters ) {

	reporters.forEach( function ( reporter ) {
		reporter.onStart();
	} );

};

exports.onDataCollectorRegistered = function ( reporters, dataCollectorName ) {

	reporters.forEach( function ( reporter ) {
		reporter.onDataCollectorRegistered( dataCollectorName );
	} );

};

exports.onPluginRegistered = function ( reporters, pluginName ) {

	reporters.forEach( function ( reporter ) {
		reporter.onPluginRegistered( pluginName );
	} );

};

exports.onVerbose = function ( reporters, message ) {

	reporters.forEach( function ( reporter ) {
		reporter.onVerbose( message );
	} );

};

exports.onPluginError = function ( reporters, error ) {

	reporters.forEach( function ( reporter ) {
		reporter.onPluginError( error );
	} );

};

exports.onFinished = function ( reporters, errors ) {

	reporters.forEach( function ( reporter ) {
		reporter.onFinished( errors );
	} );

};