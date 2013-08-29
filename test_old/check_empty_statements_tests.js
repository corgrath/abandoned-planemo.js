/*
 * Dependencies
 */

var plugin = require("../../src/plugins/check_empty_statements.js");

/*
 * Tests
 */

exports.invalid1 = function (test) {

	plugin.onFileRead(undefined, ";;", function (error) {

		test.ok(error);
		test.expect(1);
		test.done();

	});

};

exports.invalid2 = function (test) {

	plugin.onFileRead(undefined, "  ;  ;   ", function (error) {

		test.ok(error);
		test.expect(1);
		test.done();

	});

};

exports.valid1 = function (test) {

	plugin.onFileRead(undefined, ";", function (error) {

		test.ok(!error);
		test.expect(1);
		test.done();

	});

};

exports.valid2 = function (test) {

	plugin.onFileRead(undefined, ";  ()  ;", function (error) {

		test.ok(!error);
		test.expect(1);
		test.done();

	});

};