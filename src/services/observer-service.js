/*
 * Dependencies
 */

var logService = require( "../services/log-service.js" );
var objectUtil = require( "../utils/object-util.js" );

/*
 * Private
 */

var observers = {
}

var KEY_DIRECTORY_FOUND = "KEY_DIRECTORY_FOUND";
var KEY_FILE_FOUND = "KEY_FILE_FOUND";
var KEY_FILE_READ = "KEY_FILE_READ";
var KEY_FILE_LINE_READ = "KEY_FILE_LINE_READ";
var KEY_ON_FILE_READ = "KEY_ON_FILE_READ";
var KEY_ON_HTML_PROPERTY_VALUE_READ = "KEY_ON_HTML_PROPERTY_VALUE_READ";
var KEY_ON_CSS_FILE_READ = "KEY_ON_CSS_FILE_READ";
var KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ = "KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ";
var KEY_ON_HTML_FILE_READ = "KEY_ON_HTML_FILE_READ";

function addObserver ( observerFunction, key ) {

	if ( !objectUtil.isFunction( observerFunction ) ) {
		throw new Error( "Got an observer that is not a function." );
	}

	if ( !objectUtil.isFunction( observerFunction ) ) {
		throw new Error( "Got an observer that is not a function." );
	}

	if ( !observers[key] ) {
		logService.log( "Creating a new array for observers associated with the key \"" + key + "\"." );
		observers[key] =
			[
			];
	}

	observers[key].push( observerFunction );

	logService.log( "Added new observer for \"" + key + "\"." );

}

function notifyAll ( key ) {

	// Delete the first argument (meaning the 'observer' argument)
	delete arguments[0];

	// Make it into an array, removing the dummy first argument
	var arguments = Array.prototype.slice.call( arguments, 1 );

	for ( var i in observers[key] ) {

		var observerFunction = observers[key][i];

		// Call the observer, using our crippled argument list
		observerFunction.apply( this, arguments );

	}

};

/*
 * Public functions
 */

/**
 * Upon a directory was found.
 *
 * @param directory The directory name.
 */

exports.onDirectoryFound = function ( observer ) {
	addObserver( observer, KEY_DIRECTORY_FOUND );
}

/**
 * Notify observers that a directory was found.
 *
 * @param directory the directory name.
 */

exports.directoryFound = function ( basePath, fullPath, directoryName ) {
	notifyAll( KEY_DIRECTORY_FOUND, basePath, fullPath, directoryName );
}

// ------------- all above is confirmed

exports.onFileFound = function ( observer ) {
	addObserver( observer, KEY_FILE_FOUND );
}

exports.fileFound = function ( path, fileName, callbackFunction ) {
	notifyAll( KEY_FILE_FOUND, path, fileName, callbackFunction );
}

exports.onFileRead = function ( observer ) {
	addObserver( observer, KEY_FILE_READ );
}

exports.fileRead = function ( file, contents, callbackFunction ) {
	notifyAll( KEY_FILE_READ, file, contents, callbackFunction );
}

exports.onFileLineRead = function ( observer ) {
	addObserver( observer, KEY_FILE_LINE_READ );
}

exports.fileLineRead = function ( file, lineNumber, lineContents, callbackFunction ) {
	notifyAll( KEY_FILE_LINE_READ, file, lineNumber, lineContents, callbackFunction );
}

exports.onFileRead = function ( observer ) {
	addObserver( observer, KEY_ON_FILE_READ );
}

exports.fileRead = function ( file, fileContents, callbackFunction ) {
	notifyAll( KEY_ON_FILE_READ, file, fileContents, callbackFunction );
}

{
	exports.onCSSFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_CSS_FILE_READ );
	}

	exports.CSSFileRead = function ( file, fileContents ) {
		notifyAll( KEY_ON_CSS_FILE_READ, file, fileContents );
	}
}

{
	exports.onHTMLFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_HTML_FILE_READ );
	}

	exports.HTMLFileRead = function ( file, fileContents ) {
		notifyAll( KEY_ON_HTML_FILE_READ, file, fileContents );
	}
}

{
	exports.onHTMLPropertyValueRead = function ( observer ) {
		addObserver( observer, KEY_ON_HTML_PROPERTY_VALUE_READ );
	}

	exports.HTMLPropertyValueRead = function ( file, elementName, property, value ) {
		notifyAll( KEY_ON_HTML_PROPERTY_VALUE_READ, file, elementName, property, value );
	}
}

{
	exports.onCSSPropertyAndAttributeRead = function ( observer ) {
		addObserver( observer, KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ );
	}

	exports.CSSPropertyAndAttributeRead = function ( file, selectors, property, value ) {
		notifyAll( KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ, file, selectors, property, value );
	}
}