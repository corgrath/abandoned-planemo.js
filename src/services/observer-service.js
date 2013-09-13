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
var objectUtil = require( "../utils/object-util.js" );

/*
 * Private
 */

var observers = {
}

var KEY_DIRECTORY_FOUND = "KEY_DIRECTORY_FOUND";
var KEY_FILE_FOUND = "KEY_FILE_FOUND";
var KEY_FILE_READ = "KEY_FILE_READ";
var KEY_ON_FILE_READ = "KEY_ON_FILE_READ";
var KEY_ON_HTML_PROPERTY_VALUE_READ = "KEY_ON_HTML_PROPERTY_VALUE_READ";
var KEY_ON_CSS_FILE_READ = "KEY_ON_CSS_FILE_READ";
var KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ = "KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ";
var KEY_ON_HTML_FILE_READ = "KEY_ON_HTML_FILE_READ";
var KEY_ON_LESS_FILE_READ = "KEY_ON_LESS_FILE_READ";
var KEY_ON_CSS_COMMENT_READ = "KEY_ON_CSS_COMMENT_READ";
var KEY_ON_JAVASCRIPT_FILE_READ = "KEY_ON_JAVASCRIPT_FILE_READ";
var KEY_JAVASCRIPT_FILE_LINE_READ = "KEY_JAVASCRIPT_FILE_LINE_READ";

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

exports.directoryFound = function ( basePath, fullPath, directoryName, responseFunction ) {
	notifyAll( KEY_DIRECTORY_FOUND, basePath, fullPath, directoryName, responseFunction );
}

// ------------- all above is confirmed
{
	exports.onFileFound = function ( observer ) {
		addObserver( observer, KEY_FILE_FOUND );
	}

	exports.fileFound = function ( path, fileName, responseFunction ) {
		notifyAll( KEY_FILE_FOUND, path, fileName, responseFunction );
	}
}

{
	exports.onFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_FILE_READ );
	}

	exports.fileRead = function ( file, fileContents, responseFunction ) {
		notifyAll( KEY_ON_FILE_READ, file, fileContents, responseFunction );
	}
}

{
	exports.onCSSFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_CSS_FILE_READ );
	}

	exports.CSSFileRead = function ( file, fileContents, responseFunction ) {
		notifyAll( KEY_ON_CSS_FILE_READ, file, fileContents, responseFunction );
	}
}

{
	exports.onJavaScriptFileLineRead = function ( observer ) {
		addObserver( observer, KEY_JAVASCRIPT_FILE_LINE_READ );
	}

	exports.JavaScriptFileLineRead = function ( file, lineNumber, lineContents, responseFunction ) {
		notifyAll( KEY_JAVASCRIPT_FILE_LINE_READ, file, lineNumber, lineContents, responseFunction );
	}
}

{
	exports.onHTMLFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_HTML_FILE_READ );
	}

	exports.HTMLFileRead = function ( file, fileContents, responseFunction ) {
		notifyAll( KEY_ON_HTML_FILE_READ, file, fileContents, responseFunction );
	}
}

{
	exports.onJavaScriptFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_JAVASCRIPT_FILE_READ );
	}

	exports.JavaScriptFileRead = function ( file, fileContents, responseFunction ) {
		notifyAll( KEY_ON_JAVASCRIPT_FILE_READ, file, fileContents, responseFunction );
	}
}

{
	exports.onLESSFileRead = function ( observer ) {
		addObserver( observer, KEY_ON_LESS_FILE_READ );
	}

	exports.LESSFileRead = function ( file, fileContents, responseFunction ) {
		notifyAll( KEY_ON_LESS_FILE_READ, file, fileContents, responseFunction );
	}
}

{
	exports.onHTMLPropertyValueRead = function ( observer ) {
		addObserver( observer, KEY_ON_HTML_PROPERTY_VALUE_READ );
	}

	exports.HTMLPropertyValueRead = function ( file, elementName, property, value, responseFunction ) {
		notifyAll( KEY_ON_HTML_PROPERTY_VALUE_READ, file, elementName, property, value, responseFunction );
	}
}

{
	exports.onCSSPropertyAndAttributeRead = function ( observer ) {
		addObserver( observer, KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ );
	}

	exports.CSSPropertyAndAttributeRead = function ( file, selectors, property, value, responseFunction ) {
		notifyAll( KEY_ON_CSS_PROPERTY_AND_ATTRIBUTE_READ, file, selectors, property, value, responseFunction );
	}
}

{
	exports.onCSSCommentRead = function ( observer ) {
		addObserver( observer, KEY_ON_CSS_COMMENT_READ );
	}

	exports.CSSCommentRead = function ( file, comment, responseFunction ) {
		notifyAll( KEY_ON_CSS_COMMENT_READ, file, comment, responseFunction );
	}
}