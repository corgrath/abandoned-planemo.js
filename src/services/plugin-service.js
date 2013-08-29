/*
 * Dependencies
 */

var logService = require( "../services/log-service.js" );
var fileService = require( "../services/file-service.js" );

/*
 * Public functions
 */

exports.register = function ( pluginName, options ) {

	var pluginPhysicalFileCore = "./src/plugins/" + pluginName + ".js";
	var pluginFileForRequire = "../plugins/" + pluginName + ".js";

	if ( !fileService.fileExists( pluginPhysicalFileCore ) ) {
		throw new Error( "Could not find the physical file for the plugin \"" + pluginPhysicalFileCore + "\"." );
	}

	var plugin = require( pluginFileForRequire );

	plugin.init( options );

	logService.log( "Installed the plugin \"" + pluginName + "\" is done." );

};