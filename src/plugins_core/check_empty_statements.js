/*
 * Dependencies 
 */

var observerService = require("../services/observer_service.js");

/*
 * Public functions
 */

exports.validateOptions = function () {
};

exports.init = function () {

	observerService.onFileRead(exports.onFileRead);

};

exports.onFileRead = function (file, contents, callbackFunction) {

	var regexpResults = /;\s*;/g.exec(contents);

	if (regexpResults) {

		callbackFunction({
			message: "Found an empty statement.",
			lineContents: regexpResults.input
		});
		return;

	}

	callbackFunction(undefined);

}