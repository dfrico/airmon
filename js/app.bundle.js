var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([21,0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(1);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {}

module.exports = emptyObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(2);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef,no-inner-declarations */


var Card = function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card() {
        _classCallCheck(this, Card);

        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
    }

    _createClass(Card, [{
        key: "render",
        value: function render() {
            var infoIcon = _react2.default.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", enableBackground: "new 0 0 24 24" },
                _react2.default.createElement("path", { d: "M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10c5.523,0,10-4.477,10-10C22,6.477,17.523,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z" })
            );
            /*
            Props:
                color
                title ?
                number
            */
            return _react2.default.createElement(
                "div",
                { className: "subcard", style: { backgroundColor: this.props.color } },
                this.props.text ? _react2.default.createElement(
                    "span",
                    { className: "tooltiptext" },
                    this.props.text
                ) : "",
                _react2.default.createElement(
                    "p",
                    { className: "subcard__name" },
                    this.props.title
                ),
                _react2.default.createElement(
                    "p",
                    { className: "subcard__number" },
                    this.props.number
                )
            );
        }
    }]);

    return Card;
}(_react2.default.Component);

exports.default = Card;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Card = __webpack_require__(13);

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef,no-inner-declarations */


var Panel = function (_React$Component) {
    _inherits(Panel, _React$Component);

    function Panel() {
        _classCallCheck(this, Panel);

        return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
    }

    _createClass(Panel, [{
        key: 'getLink',
        value: function getLink(particula) {
            if (particula.indexOf('Part') >= 0) return "https://es.wikipedia.org/wiki/Part%C3%ADculas_en_suspensi%C3%B3n";else switch (particula) {
                case "SO2":
                case "CO":
                case "O3":
                case "Tolueno":
                case "Benceno":
                case "Etilbenceno":
                case "Hidrocarburos":
                case "Hexano":
                    return 'https://es.wikipedia.org/wiki/' + particula;
                case "Metano CH4":
                    return "https://es.wikipedia.org/wiki/Metano";
                case "NO":
                case "NO2":
                case "NOx":
                    return "https://www.atsdr.cdc.gov/es/toxfaqs/es_tfacts175.html#bookmark1";
                default:
                    return 'https://es.wikipedia.org/wiki/' + particula;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var colors = [// vegajs redyellowgreen
            '#0B6739', '#249753', '#69BC67', '#A7D770', '#D9EE90', '#FFFEC2', '#FDDF90', '#FBAD68', '#F26D4A', '#D5322F', '#A3062A'];
            var colors2 = ['#323993', '#4776B2', '#76AECF', '#ACD9E8', '#E0F3F8', '#FFFEC2', '#FDDF90', '#FBAD68', '#F26D4A', '#D5322F', '#A3062A'];
            var content = this.props.zone.id === 0 ? _react2.default.createElement(
                'div',
                { id: 'disclaimer' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Por favor, selecciona una zona para ver m\xE1s datos.'
                )
            ) : _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                    'p',
                    { className: 'panel__location' },
                    'Estaci\xF3n: ',
                    this.props.zone.name
                ),
                _react2.default.createElement(_Card2.default, {
                    color: colors[Math.round(this.props.zone.traffic / 10)],
                    title: "Intensidad del tráfico (%)",
                    text: "Porcentaje de intensidad de tráfico en dicha zona con respecto a su intensidad de saturación",
                    number: this.props.zone.traffic
                }),
                _react2.default.createElement(_Card2.default, {
                    color: this.props.zone.color,
                    title: "Indice de Calidad del Aire",
                    text: "El Indice de Calidad del Aire o ICA mide la cantidad de partículas contaminantes. Se mide de 0 a 100 (y más), siendo 0 el mejor valor",
                    number: this.props.zone.ica
                }),
                _react2.default.createElement(
                    'div',
                    { id: 'part_small' },
                    _react2.default.createElement(
                        'a',
                        { href: this.getLink(this.props.zone.part) },
                        '\u2197 Principal contaminante: ',
                        this.props.zone.part
                    )
                ),
                this.props.zone.humedad ? _react2.default.createElement(_Card2.default, {
                    color: colors[Math.round(this.props.zone.humedad / 10)],
                    title: "Humedad (%)",
                    number: this.props.zone.humedad
                }) : "",
                this.props.zone.temp ? _react2.default.createElement(_Card2.default, {
                    color: colors[Math.round(this.props.zone.temp / 6)],
                    title: "Temperatura (ºC)",
                    number: this.props.zone.temp
                }) : "",
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'div',
                    { className: 'info' },
                    _react2.default.createElement(
                        'div',
                        { onClick: function onClick() {
                                return _this2.props.setStore({ showGraph: true });
                            } },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Ver m\xE1s informaci\xF3n'
                        )
                    )
                )
            );
            return _react2.default.createElement(
                'div',
                { className: 'card card__panel', style: this.props.showingGraph ? { gridRow: "1 / 2" } : { gridRow: "1 / 4" } },
                _react2.default.createElement(
                    'div',
                    { className: 'panel__scroll', style: this.props.showingGraph ? { overflowY: "scroll" } : { overflowY: "hidden" } },
                    content
                )
            );
        }
    }]);

    return Panel;
}(_react2.default.Component);

exports.default = Panel;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef,no-inner-declarations */


var Graph = function (_React$Component) {
    _inherits(Graph, _React$Component);

    function Graph() {
        _classCallCheck(this, Graph);

        return _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).apply(this, arguments));
    }

    _createClass(Graph, [{
        key: "drawGraph",
        value: function drawGraph() {
            // set the dimensions and margins of the graph
            var margin = { top: 20, right: 20, bottom: 20, left: 30 },

            // width = 960 - margin.left - margin.right,
            width = d3.select(".card").node().clientWidth - 40,

            // height = 500 - margin.top - margin.bottom;
            height = d3.select(".card__graph").node().clientHeight - 40;

            // parse the date / time
            var parseTime = d3.timeParse("%Y-%m-%dT%H:00:00");

            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);

            // define the line
            var valueline = d3.line().x(function (d) {
                return x(d.date);
            }).y(function (d) {
                return y(d.ICA);
            });

            // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("#graph").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Get the data. time = "24h" o "7d"
            this.getData(this.props.zone, { time: "24h" }, function (data) {

                // format the data
                data.map(function (d, i) {
                    if (i == 14) console.log(data.length, d);
                    d.date = parseTime(d.date_t);
                });
                data = data.filter(function (d) {
                    return d.ICA;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function (d) {
                    return d.date;
                }));
                // y.domain([0, d3.max(data, function(d) { return d.ICA; })]);
                y.domain([0, 100]);

                // Add the valueline path.
                svg.append("path").data([data]).attr("class", "line").attr("d", valueline);

                // Add the X Axis
                svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

                // Add the Y Axis
                svg.append("g").call(d3.axisLeft(y));
            });
        }
    }, {
        key: "drawMultiGraph",
        value: function drawMultiGraph() {
            // let margin = {top: 20, right: 20, bottom: 20, left: 30},
            var margin = 30,

            // width = 960 - margin.left - margin.right,
            width = d3.select(".card").node().clientWidth - 40,

            // height = 500 - margin.top - margin.bottom;
            height = d3.select(".card__graph").node().clientHeight - 40,
                duration = 250;

            var lineOpacity = "0.25";
            var lineOpacityHover = "0.85";
            var otherLinesOpacityHover = "0.1";
            var lineStroke = "1.5px";
            var lineStrokeHover = "2.5px";

            var circleOpacity = '0.85';
            var circleOpacityOnLineHover = "0.25";
            var circleRadius = 3;
            var circleRadiusHover = 6;

            this.getData(this.props.zone, { time: "24h" }, function (payload) {
                var data = [{
                    name: "ICA",
                    values: [
                        // {date: "", value: ""}
                    ]
                }, {
                    name: "Trafico", values: []
                }, {
                    name: "Humedad", values: []
                }, {
                    name: "Temperatura", values: []
                    /*,{ name: "Precipitacion", values: [] },{ name: "Presión", values: [] },{ name: "Viento", values: [] }*/
                }];

                var parseDate = d3.timeParse("%Y-%m-%dT%H:00:00");
                payload.forEach(function (d) {
                    data.filter(function (a) {
                        return a.name === "ICA";
                    })[0].values.push({ date: parseDate(d.date_p), value: d['ICA'] });
                    data.filter(function (a) {
                        return a.name === "Trafico";
                    })[0].values.push({ date: parseDate(d.date_t), value: d['Traffic density (%)'] });
                    data.filter(function (a) {
                        return a.name === "Humedad";
                    })[0].values.push({ date: parseDate(d.date_m), value: d['humedad (%)'] });
                    data.filter(function (a) {
                        return a.name === "Temperatura";
                    })[0].values.push({ date: parseDate(d.date_m), value: d['temp (°C)'] });
                });

                /* Scale */
                var xScale = d3.scaleTime().domain(d3.extent(data[0].values, function (d) {
                    return d.date;
                })).range([0, width - margin]);

                var yScale = d3.scaleLinear().domain([0, 100
                // d3.max(data[0].values, d => d.value)
                ]).range([height - margin, 0]);

                var color = d3.scaleOrdinal(d3.schemeCategory10);

                /* Add SVG */
                var svg = d3.select("#graph").append("svg").attr("width", width + margin + "px").attr("height", height + margin + "px").append('g').attr("transform", "translate(" + margin + ", " + margin + ")");

                /* Add line into SVG */
                var line = d3.line().x(function (d) {
                    return xScale(d.date);
                }).y(function (d) {
                    return yScale(d.value);
                });

                var lines = svg.append('g').attr('class', 'lines');

                lines.selectAll('.line-group').data(data).enter().append('g').attr('class', 'line-group').on("mouseover", function (d, i) {
                    svg.append("text").attr("class", "title-text").style("fill", color(i)).text(d.name).attr("text-anchor", "middle").attr("x", (width - margin) / 2).attr("y", 5);
                }).on("mouseout", function (d) {
                    svg.select(".title-text").remove();
                }).append('path').attr('class', 'line').attr('d', function (d) {
                    return line(d.values);
                }).style('stroke', function (d, i) {
                    return color(i);
                }).style('opacity', lineOpacity).on("mouseover", function (d) {
                    d3.selectAll('.line').style('opacity', otherLinesOpacityHover);
                    d3.selectAll('.circle').style('opacity', circleOpacityOnLineHover);
                    d3.select(this).style('opacity', lineOpacityHover).style("stroke-width", lineStrokeHover).style("cursor", "pointer");
                }).on("mouseout", function (d) {
                    d3.selectAll(".line").style('opacity', lineOpacity);
                    d3.selectAll('.circle').style('opacity', circleOpacity);
                    d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
                });

                /* Add circles in the line */
                lines.selectAll("circle-group").data(data).enter().append("g").style("fill", function (d, i) {
                    return color(i);
                }).selectAll("circle").data(function (d) {
                    return d.values;
                }).enter().append("g").attr("class", "circle").on("mouseover", function (d) {
                    d3.select(this).style("cursor", "pointer").append("text").attr("class", "text").text("" + d.value).attr("x", function (d) {
                        return xScale(d.date) + 5;
                    }).attr("y", function (d) {
                        return yScale(d.value) - 10;
                    });
                }).on("mouseout", function (d) {
                    d3.select(this).style("cursor", "none").transition().duration(duration).selectAll(".text").remove();
                }).append("circle").attr("cx", function (d) {
                    return xScale(d.date);
                }).attr("cy", function (d) {
                    return yScale(d.value);
                }).attr("r", circleRadius).style('opacity', circleOpacity).on("mouseover", function (d) {
                    d3.select(this).transition().duration(duration).attr("r", circleRadiusHover);
                }).on("mouseout", function (d) {
                    d3.select(this).transition().duration(duration).attr("r", circleRadius);
                });

                /* Add Axis into SVG */
                var xAxis = d3.axisBottom(xScale).ticks(5);
                var yAxis = d3.axisLeft(yScale).ticks(5);

                svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + (height - margin) + ")").call(xAxis);

                svg.append("g").attr("class", "y axis")
                // .call(d3.axisLeft(y))
                .call(yAxis).append('text').attr("y", 15).attr("transform", "translate(20 0)").attr("fill", "#000").text("%");
            });
        }
    }, {
        key: "getData",
        value: function getData(zone) {
            var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var callback = arguments[2];
            // from 1 station (graph)
            var id = zone.id;

            var time = opt.time ? "?time=" + opt.time : "";
            var url = "https://dfr-nas.ddns.net/rest/api/station/" + encodeURIComponent(id) + time;
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            })
            // .then(response => console.log(response))
            .then(function (response) {
                return response.json();
            }).then(function (response) {
                callback(response.data);
            }).catch(function (e) {
                console.log("Error in fetch " + e.message);
            });
        }
    }, {
        key: "close",
        value: function close() {
            d3.select("#graph>svg").remove();
            this.props.setStore({ showGraph: false });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            d3.select("#graph>svg").remove();
            // this.drawGraph();
            this.drawMultiGraph();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            // this.drawGraph();
            this.drawMultiGraph();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var content = this.props.zone.id === 0 ? _react2.default.createElement(
                "p",
                { className: "disclaimer" },
                "Please click on a zone"
            ) : _react2.default.createElement("div", { id: "graph" });
            return _react2.default.createElement(
                "div",
                { className: "card card__graph" },
                content,
                _react2.default.createElement(
                    "svg",
                    { version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", viewBox: "0 0 60 60", id: "close", onClick: function onClick() {
                            return _this2.close();
                        } },
                    _react2.default.createElement(
                        "g",
                        { id: "X" },
                        _react2.default.createElement("line", { id: "_x5C_", fill: "none", stroke: "black", strokeWidth: "10", transform: "translate(5, 5)", strokeMiterlimit: "10", x1: "5", y1: "5", x2: "50", y2: "50", strokeLinecap: "round" }),
                        _react2.default.createElement("line", { id: "_x2F_", fill: "none", stroke: "black", strokeWidth: "10", transform: "translate(5, 5)", strokeMiterlimit: "10", x1: "5", y1: "50", x2: "50", y2: "5", strokeLinecap: "round" })
                    ),
                    _react2.default.createElement(
                        "g",
                        { id: "circle" },
                        _react2.default.createElement("circle", { id: "XMLID_16_", opacity: "0", fill: "none", strokeWidth: "3", stroke: "black", strokeMiterlimit: "10", cx: "30", cy: "30", r: "40" })
                    )
                )
            );
        }
    }]);

    return Graph;
}(_react2.default.Component);

exports.default = Graph;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _turf = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global d3 L*/


var Map = function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map() {
        _classCallCheck(this, Map);

        return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
    }

    _createClass(Map, [{
        key: 'voronoi',
        value: function voronoi(map) {
            var _this2 = this;

            L.svg().addTo(map);
            var svg = d3.select("#map").select("svg");
            svg.append("g");

            d3.csv("data/coordinates.csv").then(function (collection) {
                // {id,name,latitude,longitude}
                try {
                    var features = [];
                    // let colors = ["#FFFECE", "#FEECA4", "#FDD87D", "#FCB156", "#FB8D46", "#F94F35", "#E01F27", "#BB082D", "#7E0428"];
                    var colors = ['#0B6739', '#249753', '#69BC67', '#A7D770', '#D9EE90', '#FFFEC2', '#FDDF90', '#FBAD68', '#F26D4A', '#D5322F', '#A3062A'];

                    _this2.getStatus(function (status) {
                        Object.keys(collection).map(function (k) {
                            var obj = collection[k];
                            if (!obj.length) {
                                // not headers array, only row obj {}
                                var _status$obj$id = status[obj.id],
                                    ica = _status$obj$id.ica,
                                    part = _status$obj$id.part,
                                    traffic = _status$obj$id.traffic,
                                    temp = _status$obj$id.temp,
                                    humedad = _status$obj$id.humedad;

                                // turf.point

                                var feature = (0, _turf.point)([obj.longitude, obj.latitude], {
                                    color: colors[Math.round(ica / 10)],
                                    ica: ica,
                                    id: obj.id,
                                    name: obj.name,
                                    traffic: traffic,
                                    part: part,
                                    temp: temp,
                                    humedad: humedad
                                });
                                features.push(feature);
                            }
                        });

                        // turf.featureCollection
                        var fc = (0, _turf.featureCollection)(features);
                        L.geoJSON(fc, {
                            pointToLayer: function pointToLayer(feature, latlng) {
                                return L.circleMarker(latlng, {
                                    // radius: 1.2,
                                    radius: 2,
                                    color: "#23A480"
                                });
                            }
                        }).addTo(map);

                        _this2.voronoiPolygons = (0, _turf.voronoi)(fc); // turf.voronoi
                        _this2.voronoiPolygons.features.map(function (f, i) {
                            f.properties = features[i].properties;
                        });
                        _this2.addVoronoiLayer();
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        }
    }, {
        key: 'addVoronoiLayer',
        value: function addVoronoiLayer() {
            var _this3 = this;

            var style = function style(feature) {
                return {
                    color: _this3.props.theme === "dark" ? "#FFF" : "#DDD",
                    fillColor: feature.properties.color,
                    fillOpacity: 0.5,
                    weight: 1.4,
                    opacity: 1
                };
            };

            this.voronoiLayer = L.geoJSON(this.voronoiPolygons, {
                onEachFeature: function onEachFeature(feature, layer) {
                    layer.on({
                        click: function click() {
                            _this3.props.setStore({ station: layer.feature.properties });
                        }
                    });
                },
                style: style
            }).addTo(this.map);
        }
    }, {
        key: 'setBaseLayer',
        value: function setBaseLayer() {
            this.baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
                minZoom: 12,
                id: 'mapbox.' + this.props.theme,
                accessToken: this.token
            }).addTo(this.map);
        }
    }, {
        key: 'getStatus',
        value: function getStatus(callback) {
            var url = "https://dfr-nas.ddns.net/rest/api/status";
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                // console.log("response", response);
                callback(response);
            }).catch(function (e) {
                console.log('Error in fetch ' + e.message);
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // setting leaflet map
            this.map = L.map('map').setView([40.42, -3.7], 11.5);
            this.token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

            this.setBaseLayer();
            // this.voronoi calculates voronoi polygons AND updates voronoi layer
            this.voronoi(this.map);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // only on theme change
            // reset base layer
            this.baselayer.remove();
            this.setBaseLayer();

            // reset voronoi layer
            this.voronoiLayer.clearLayers();
            this.addVoronoiLayer();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'card card__map' },
                _react2.default.createElement('div', { id: 'map' })
            );
        }
    }]);

    return Map;
}(_react2.default.Component);

exports.default = Map;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {

            function SvgLogo(props) {
                return _react2.default.createElement(
                    "svg",
                    {
                        width: props.width ? props.width : "113px",
                        height: props.height ? props.height : "29px",
                        xmlns: "http://www.w3.org/2000/svg",
                        xmlnsXlink: "http://www.w3.org/1999/xlink"
                    },
                    _react2.default.createElement(
                        "g",
                        {
                            id: "Logo-svg",
                            stroke: "none",
                            strokeWidth: "1",
                            fill: "none",
                            fillRule: "evenodd",
                            fillOpacity: "0.465692935",
                            fontFamily: "Lobster-Regular, Lobster",
                            fontSize: "38",
                            fontWeight: "normal" },
                        _react2.default.createElement(
                            "g",
                            {
                                id: "Logo"
                                //transform="translate(-7.000000, -10.000000)"
                                , fill: "#23A480" },
                            _react2.default.createElement(
                                "text",
                                {
                                    id: "airmad" },
                                _react2.default.createElement(
                                    "tspan",
                                    {
                                        x: "0",
                                        y: "100"
                                    },
                                    "airmad"
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "header" },
                _react2.default.createElement(SvgLogo, { width: "400px", height: "150px" })
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(17);

var _Header2 = _interopRequireDefault(_Header);

var _Map = __webpack_require__(16);

var _Map2 = _interopRequireDefault(_Map);

var _Graph = __webpack_require__(15);

var _Graph2 = _interopRequireDefault(_Graph);

var _Panel = __webpack_require__(14);

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-undef,no-inner-declarations */


var Web = function (_React$Component) {
    _inherits(Web, _React$Component);

    function Web(props) {
        _classCallCheck(this, Web);

        var _this = _possibleConstructorReturn(this, (Web.__proto__ || Object.getPrototypeOf(Web)).call(this, props));

        _this.state = {
            theme: "light",
            station: { id: 0, name: "" },
            showGraph: false
        };
        return _this;
    }

    _createClass(Web, [{
        key: 'setStore',
        value: function setStore(store) {
            this.setState(store);
        }
    }, {
        key: 'changeTheme',
        value: function changeTheme() {
            // TODO: improve palette, remove themes ?
            var theme = this.state.theme === "light" ? "dark" : "light";
            var card = document.querySelectorAll('.card')[1];

            switch (theme) {
                case "dark":
                    document.body.style.backgroundColor = "#222";
                    if (card) {
                        card.style.backgroundColor = "#222";
                        card.style.color = "#fafafa";
                    }
                    break;
                case "light":
                    document.body.style.backgroundColor = "#FFF";
                    if (card) {
                        card.style.backgroundColor = "#fafafa";
                        card.style.color = "#222";
                    }
                    break;
                default:
            }

            this.setState({ theme: theme });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'card__container' },
                    _react2.default.createElement(_Map2.default, { theme: this.state.theme, setStore: this.setStore.bind(this) }),
                    _react2.default.createElement(_Panel2.default, { zone: this.state.station, setStore: this.setStore.bind(this), showingGraph: this.state.showGraph }),
                    this.state.showGraph ? _react2.default.createElement(_Graph2.default, { zone: this.state.station, setStore: this.setStore.bind(this) }) : ""
                )
            );
        }
    }]);

    return Web;
}(_react2.default.Component);

exports.default = Web;

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Web = __webpack_require__(18);

var _Web2 = _interopRequireDefault(_Web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function panel() {
    _reactDom2.default.render(_react2.default.createElement(_Web2.default, null), document.getElementById('container'));
}

document.addEventListener('DOMContentLoaded', panel());

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map