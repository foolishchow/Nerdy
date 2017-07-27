/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "../assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/vue-loader/lib/component-normalizer.js ***!
  \**************************************************/
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/spa/components/resize.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computed: {
        isWin: function isWin() {
            return this.$store.state.config.os == 'win';
        }
    },
    methods: {
        handleMouseMove: function handleMouseMove(event, ref) {
            var target = event.target;
            while (target && target !== this.$refs[ref]) {
                target = target.parentNode;
            }
            var rect = target.getBoundingClientRect();
            var bodyStyle = document.body.style;
            if (this.resize.in) return;
            if (rect.width > 12 && rect.right - event.pageX < 12 && rect.right - event.pageX > 1) {
                bodyStyle.cursor = 'col-resize';
                this.resize.can = true;
                this.resize.trigger = this.$refs[ref];
            } else if (!this.viewModel.inResize) {
                bodyStyle.cursor = '';
                this.resize.can = false;
                this.resize.trigger = null;
            }
        },
        handleMouseDown: function handleMouseDown(event, cb) {
            var _this = this;

            if (this.resize.can && !this.resize.in) {
                this.resize.in = true;
                var rect = this.resize.trigger.getBoundingClientRect();
                this.dragState = {
                    startMouseLeft: event.clientX,
                    startWidth: rect.right - rect.left
                };
                this.resize.trigger.querySelector('._container').style.overflowY = 'hidden';

                var handleMouseUp = function handleMouseUp(event) {
                    if (_this.resize.in) {
                        var width = _this.resize.trigger.style.width;
                        document.body.style.cursor = '';
                        if (_this.isWin) _this.resize.trigger.querySelector('._container').style.overflowY = 'scroll';
                        _this.resize.in = false;
                        _this[cb](parseInt(width.replace(/px$/gi, '')));
                    }
                    document.removeEventListener('mousemove', _handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };
                var _handleMouseMove = function _handleMouseMove(event) {
                    var deltaLeft = event.clientX - _this.dragState.startMouseLeft;
                    var width = _this.dragState.startWidth + deltaLeft;
                    var stop = false;
                    var minWidth = _this.resize.min;
                    if (width < minWidth - 1) {
                        width = minWidth;
                        stop = true;
                    }
                    if (_this.isWin) _this.resize.trigger.style.width = Math.min(width, 295) + 'px';

                    if (stop) {
                        document.body.style.cursor = 'e-resize';
                    } else {
                        document.body.style.cursor = 'col-resize';
                    }
                };
                document.addEventListener('mousemove', _handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        }
    }
};

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/spa/components/index.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _filter = __webpack_require__(/*! ./filter */ 20);

var _filter2 = _interopRequireDefault(_filter);

var _editor = __webpack_require__(/*! ./editor.vue */ 32);

var _editor2 = _interopRequireDefault(_editor);

var _cate = __webpack_require__(/*! ./cate.vue */ 31);

var _cate2 = _interopRequireDefault(_cate);

var _appTitle = __webpack_require__(/*! ./app-title.vue */ 29);

var _appTitle2 = _interopRequireDefault(_appTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Vue) {
    Vue.component(_appTitle2.default.name, _appTitle2.default);
    Vue.component(_editor2.default.name, _editor2.default);
    Vue.component(_cate2.default.name, _cate2.default);
    (0, _filter2.default)(Vue);
};

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./src/spa/store/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(/*! ./modules/config */ 21);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _window = window,
    Vuex = _window.Vuex;


var store = new Vuex.Store({
    modules: {
        config: _config2.default
    }
});

exports.default = store;

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/spa/utils/clickoutside.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _window = window,
    Vue = _window.Vue;

var on = function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
}();

var nodeList = [];
var ctx = '@@clickoutsideContext';

var startClick = void 0;

on(document, 'mousedown', function (e) {
    return startClick = e;
});

on(document, 'mouseup', function (e) {
    nodeList.forEach(function (node) {
        return node[ctx].documentHandler(e, startClick);
    });
});
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
exports.default = {
    bind: function bind(el, binding, vnode) {
        var id = nodeList.push(el) - 1;
        var documentHandler = function documentHandler(mouseup, mousedown) {
            if (!vnode.context || el.contains(mouseup.target) || vnode.context.popperElm && (vnode.context.popperElm.contains(mouseup.target) || vnode.context.popperElm.contains(mousedown.target))) return;

            if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
                vnode.context[el[ctx].methodName]();
            } else {
                el[ctx].bindingFn && el[ctx].bindingFn();
            }
        };
        el[ctx] = {
            id: id,
            documentHandler: documentHandler,
            methodName: binding.expression,
            bindingFn: binding.value
        };
    },
    update: function update(el, binding) {
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },
    unbind: function unbind(el) {
        var len = nodeList.length;

        for (var i = 0; i < len; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
    }
};

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/spa/utils/message.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var confirm = function confirm(obj) {
    return function (msg, callback) {
        message.send("confirm", {
            type: 'question',
            message: msg
        }, function (event, arg) {
            if (callback != undefined) callback(arg);
        });
    }.bind(obj);
};
var alert = function alert(obj) {
    return function (msg, callback) {
        message.send("alert", {
            type: 'info',
            message: msg
        }, function (event, arg) {
            if (callback != undefined) callback(arg);
        });
    }.bind(obj);
};
var db = function db(obj) {
    return function (method, arg, callback) {
        message.send("db", {
            method: method,
            arg: arg
        }, function (event, arg) {
            if (callback != undefined) callback(arg);
        });
    }.bind(obj);
};

var config = function config(obj) {
    return function (method, arg, callback) {
        message.send('config', {
            method: method,
            arg: arg
        }, function (event, arg) {
            if (callback != undefined) callback(arg);
        });
    }.bind(obj);
};
var install = function install(Vue) {
    if (install.installed) return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        $confirm: {
            get: function get() {
                return confirm(this);
            }
        },
        $alert: {
            get: function get() {
                return alert(this);
            }
        },
        $db: {
            get: function get() {
                return db(this);
            }
        },
        $config: {
            get: function get() {
                return config(this);
            }
        }
    });
};

var Message = { install: install };

exports.default = Message;

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*************************!*\
  !*** ./src/spa/app.vue ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-d0a37fa4","scoped":false,"hasInlineConfig":false}!postcss-loader!../../~/vue-loader/lib/selector?type=styles&index=0!./app.vue */ 27)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vue-loader/lib/selector?type=script&index=0!./app.vue */ 10),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-d0a37fa4"}!../../~/vue-loader/lib/selector?type=template&index=0!./app.vue */ 40),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./~/lodash.debounce/index.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = debounce;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 1)))

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!**************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/monaco-loader/Monaco.vue ***!
  \**************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MonacoLoader = __webpack_require__(/*! ./MonacoLoader */ 17);

var _MonacoLoader2 = _interopRequireDefault(_MonacoLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//

var debounce = __webpack_require__(/*! lodash.debounce */ 8);
exports.default = {
    props: {
        value: {
            type: String,
            default: '// code \n'
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: '100%'
        },
        code: {
            type: String,
            default: '// code \n'
        },
        srcPath: {
            type: String
        },
        language: {
            type: String,
            default: 'javascript'
        },
        theme: {
            type: String,
            default: 'vs'
        }, // vs, hc-black,vs-dark
        options: {
            type: Object,
            default: function _default() {}
        },
        highlighted: {
            type: Array,
            default: function _default() {
                return [{
                    number: 0,
                    class: ''
                }];
            }
        },
        changeThrottle: {
            type: [Number, String],
            default: 0
        }
    },
    mounted: function mounted() {
        this.fetchEditor();
    },
    destroyed: function destroyed() {
        this.destroyMonaco();
    },

    computed: {
        style: function style() {
            var width = this.width,
                height = this.height;

            var fixedWidth = width.toString().indexOf('%') !== -1 ? width : width + 'px';
            var fixedHeight = height.toString().indexOf('%') !== -1 ? height : height + 'px';
            return {
                width: fixedWidth,
                height: fixedHeight
            };
        },
        editorOptions: function editorOptions() {
            return Object.assign({}, this.defaults, this.options, {
                value: this.value,
                language: this.language,
                theme: this.theme
            });
        }
    },
    data: function data() {
        return {
            defaults: {
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: false,
                glyphMargin: true,
                fontSize: 14
            }
        };
    },

    watch: {
        highlighted: {
            handler: function handler(lines) {
                this.highlightLines(lines);
            },

            deep: true
        },
        language: function language() {
            window.monaco.editor.setModelLanguage(this.editor.getModel(), this.language);
        },
        value: function value(val, oldVal) {
            if (val != oldVal && this.editor && val != this.editor.getValue()) {
                this.editor.setValue(val);
            }
        }
    },
    methods: {
        highlightLines: function highlightLines(lines) {
            var _this = this;

            if (!this.editor) {
                return;
            }
            lines.forEach(function (line) {
                var className = line.class;
                var highlighted = _this.$el.querySelector('.' + className);
                if (highlighted) {
                    highlighted.classList.remove(className);
                }
                var number = parseInt(line.number);
                if (!_this.editor && number < 1 || isNaN(number)) {
                    return;
                }
                var selectedLine = _this.$el.querySelector('.view-lines [linenumber="' + number + '"]');
                if (selectedLine) {
                    selectedLine.classList.add(className);
                }
            });
        },
        editorHasLoaded: function editorHasLoaded(editor, monaco) {
            var _this2 = this;

            this.editor = editor;
            this.monaco = monaco;
            this.editor.onDidChangeModelContent(function (event) {
                return _this2.codeChangeHandler(editor, event);
            });
            this.$emit('mounted', editor);
        },

        codeChangeHandler: function codeChangeHandler(editor) {
            if (this.codeChangeEmitter) {
                this.codeChangeEmitter(editor);
            } else {
                this.codeChangeEmitter = debounce(function (editor) {
                    this.$emit('codeChange', editor);
                    this.$emit('input', editor.getValue());
                }, this.changeThrottle);
                this.codeChangeEmitter(editor);
            }
        },
        fetchEditor: function fetchEditor() {
            _MonacoLoader2.default.load(this.srcPath, this.createMonaco);
        },
        createMonaco: function createMonaco() {
            this.editor = window.monaco.editor.create(this.$el, this.editorOptions);
            this.editorHasLoaded(this.editor, window.monaco);
            window.onresize = this.layout.bind(this);
        },
        destroyMonaco: function destroyMonaco() {
            if (typeof this.editor !== 'undefined') {
                this.editor.dispose();
            }
        },
        layout: function layout() {
            var _this3 = this;

            setTimeout(function () {
                _this3.editor && _this3.editor.layout();
            }, 15);
        }
    }
};

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/app.vue ***!
  \*************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    data: function data() {
        return {
            config: {
                cateWidth: 130,
                noteWidth: 180,
                hiddenCate: false
            },
            inited: false,
            dragImg: '../assets/img/plan.png'
        };
    },
    created: function created() {
        this.getConfig();
        //            this.$confirm('确定加载这个文件么!',function(result){
        //                console.info(result)
        //            })
    },

    methods: {
        updateConfig: function updateConfig(obj, callback) {
            this.config = obj;
            this.$config('update', obj, callback);
        },
        getConfig: function getConfig() {
            var _this = this;

            this.$config('get', {}, function (obj) {
                _this.inited = true;
                if (obj == null) {
                    obj = {
                        'cateWidth': 130,
                        'noteWidth': 180
                    };
                    _this.updateConfig(obj, function () {});
                } else {
                    _this.config = obj;
                }
            });
        },
        setTitleSize: function setTitleSize(val) {
            this.config.titleSize = val;
        }
    },
    computed: {
        os: function os() {
            return this.$store.state.config.os;
        }
    }
};

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/app-title.vue ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//

exports.default = {
    props: {
        align: {
            type: String,
            default: 'left'
        }
    },
    name: 'app-title',
    data: function data() {
        return {};
    }
};

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/cate-list.vue ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resize = __webpack_require__(/*! ./resize */ 2);

var _resize2 = _interopRequireDefault(_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_resize2.default],
    data: function data() {
        return {
            viewModel: {
                edit: false,
                needSelect: false
            },
            model: {
                cates: []
            },
            resize: {
                can: false,
                in: false,
                min: 130
            }
        };
    },
    created: function created() {
        this.query();
    },

    computed: {
        dragged: function dragged() {
            return this.$store.state.config.dragged;
        },
        dragEnter: function dragEnter() {
            return this.$store.state.config.dragEnter;
        },
        _cateWidth: function _cateWidth() {
            return this.$store.state.config.cateWidth + 'px';
        },
        _inputWidth: function _inputWidth() {
            return this.$store.state.config.cateWidth - 46 + 'px';
        },
        noteList: function noteList() {
            return this.$store.state.config.noteList;
        },
        cateId: function cateId() {
            return this.$store.state.config.cateId;
        },
        hiddenCate: function hiddenCate() {
            return this.$store.state.config.hiddenCate;
        },
        commit: function commit() {
            return this.$store.commit;
        },
        selectedCate: function selectedCate() {
            if (this.cateId == 'all') return { id: 'all', title: '所有' };
            var i = 0;
            while (this.model.cates[i].id != this.cateId) {
                i++;
            }
            return this.model.cates[i];
        }
    },
    updated: function updated() {
        if (this.$refs['cate-edit'] && this.$refs['cate-edit'][0]) {
            if (this.viewModel.needSelect) {
                this.viewModel.needSelect = false;
                this.$refs['cate-edit'][0].select();
            }
        }
    },

    methods: {
        wrapDragover: function wrapDragover(event) {
            this.commit('dragEnter', null);
        },
        dragover: function dragover(event, cate) {
            var note = this.dragged.data;
            if (note.cateId != cate.id) {
                event.dataTransfer.dropEffect = 'move';
                this.commit('dragEnter', cate.id);
            } else {
                event.dataTransfer.dropEffect = 'none';
                this.commit('dragEnter', null);
            }
        },
        updateWidth: function updateWidth(width) {
            this.commit('cateWidth', width);
        },
        query: function query() {
            var _this = this;

            this.$db('cates.query', {}, function (data) {
                _this.model.cates = data;
            });
        },
        deleteCate: function deleteCate() {
            var _this2 = this;

            if (this.cateId == 'all') return;
            var _deleteCate = function _deleteCate() {
                var i = 0;
                while (_this2.model.cates[i].id != _this2.cateId) {
                    i++;
                }
                _this2.$db('cates.delete', _this2.cateId, function (_ref) {
                    var success = _ref.success;

                    if (success) {
                        _this2.query();
                        var id = i == 0 ? 'all' : _this2.model.cates[i - 1].id;
                        _this2.commit('cateId', id);
                    }
                });
            };
            if (this.noteList.length > 0) {
                this.$confirm('确认删除该分类么?', function (result) {
                    if (result) _deleteCate();
                });
            } else {
                _deleteCate();
            }
        },
        modify: function modify() {
            if (this.cateId == 'all') return;
            if (!this.viewModel.edit) {
                this.viewModel.edit = true;
                this.viewModel.needSelect = true;
            } else {
                this.saveModify();
            }
        },
        selectCate: function selectCate(cate) {
            var _this3 = this;

            if (this.cateId == cate.id) return;
            if (this.viewModel.edit) {
                this.saveModify().then(function (result) {
                    if (result) {
                        _this3.commit('cateId', cate.id);
                    }
                });
            } else {
                this.commit('cateId', cate.id);
            }
        },
        saveModify: function saveModify(event) {
            var _this4 = this;

            var cate = this.selectedCate;
            cate.title = cate.title.replace(/^\s|\s$/gi, '');
            ;
            return new Promise(function (resolve) {
                _this4.viewModel.insave = false;
                if (cate.title == '') {
                    _this4.$alert('\u5206\u7EC4\u540D\u4E0D\u80FD\u4E3A\u7A7A');
                    _this4.$refs['cate-edit'][0].select();
                    resolve(false);
                    return false;
                }
                var has = false;
                _this4.model.cates.forEach(function (item) {
                    if (item.title == cate.title && item.id != cate.id) has = true;
                });
                if (has) {
                    _this4.$alert('\u5DF2\u7ECF\u6709\u4E00\u4E2A\u5206\u7EC4\u540D\u4E3A >> ' + cate.title + ' <<');
                    _this4.$refs['cate-edit'][0].select();
                    resolve(false);
                    return false;
                } else {
                    _this4.$db('cates.update', cate, function (data) {
                        Vue.nextTick(function () {
                            _this4.viewModel.edit = false;
                        });
                        _this4.$refs['cate-list'].focus();
                        resolve(true);
                    });
                }
            });
        },
        addCate: function addCate() {
            var _this5 = this;

            var indexOf = function indexOf(string, list) {
                var has = false;
                list.forEach(function (item) {
                    if (item.title == title) has = true;
                });
                return has;
            };
            var title = '新建分组',
                i = 0;
            while (indexOf(title, this.model.cates)) {
                i++;
                title = '新建分组 ' + i;
            }
            this.$db('cates.add', { title: title }, function (id) {
                _this5.commit('cateId', id);
                _this5.viewModel.edit = true;
                _this5.viewModel.needSelect = true;
                _this5.query();
            });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/cate.vue ***!
  \*************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cateList = __webpack_require__(/*! ./cate-list.vue */ 30);

var _cateList2 = _interopRequireDefault(_cateList);

var _noteList = __webpack_require__(/*! ./note-list.vue */ 33);

var _noteList2 = _interopRequireDefault(_noteList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
    components: { cateList: _cateList2.default, noteList: _noteList2.default },
    name: 'left-main',
    data: function data() {
        return {};
    }
};

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!***************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/editor.vue ***!
  \***************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Monaco = __webpack_require__(/*! ../../monaco-loader/Monaco.vue */ 28);

var _Monaco2 = _interopRequireDefault(_Monaco);

var _editor = __webpack_require__(/*! ./editor.js */ 19);

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    mixins: [_editor2.default],
    name: 'editor',
    components: {
        MonacoEditor: _Monaco2.default
    },
    data: function data() {
        return {
            editor: null,
            msg: '',
            preview: ''
        };
    },

    computed: {
        monaco_path: function monaco_path() {
            return window.manaco_path;
        },
        noteId: function noteId() {
            return this.$store.state.config.noteId;
        },
        commit: function commit() {
            return this.$store.commit;
        },
        showEdit: function showEdit() {
            return this.$store.state.config.showEdit;
        },
        showPreview: function showPreview() {
            return this.$store.state.config.showPreview;
        },
        mode: function mode() {
            return this.$store.state.config.mode;
        },
        refreshFlag: function refreshFlag() {
            return this.$store.state.config.refreshFlag;
        },
        title: function title() {
            var result = '';
            var arr = this.msg.split(/\n/);
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.replace(/^\s|\s$/gi, '') != '') {
                    result = item.replace(/^\s|\s$/gi, '').replace(/^#/gi, '').replace(/^\s|\s$/gi, '');
                    break;
                }
            }
            return result;
        },
        description: function description() {
            return '';
        },
        hiddenCate: function hiddenCate() {
            return this.$store.state.config.hiddenCate;
        }
    }

};

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/note-list.vue ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resize = __webpack_require__(/*! ./resize */ 2);

var _resize2 = _interopRequireDefault(_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_resize2.default],
    data: function data() {
        return {
            viewModel: {},
            resize: {
                can: false,
                in: false,
                min: 210
            }
        };
    },
    created: function created() {
        this.query();
    },

    methods: {
        changeNoteId: function changeNoteId(note) {
            this.commit('noteId', note.id);
        },
        toggleCate: function toggleCate() {
            this.commit('hiddenCate', !this.hiddenCate);
        },
        updateWidth: function updateWidth(width) {
            this.commit('noteWidth', width);
        },
        query: function query() {
            var _this = this;

            var condition = {
                clause: 'cateId = ?',
                params: [this.cateId]
            };
            if (this.cateId == 'all') {
                condition = {
                    clause: '1 = 1',
                    params: []
                };
            }
            this.$db('notes.query', condition, function (data) {
                _this.commit('noteList', data);
                if (data.length == 0) {
                    _this.commit('noteId', null);
                    return;
                }
                var hasThisNote = false;
                data.forEach(function (item) {
                    if (item.id == _this.noteId) hasThisNote = true;
                });
                if (!hasThisNote) _this.commit('noteId', data[0].id);
            });
        },
        addNote: function addNote() {
            var _this2 = this;

            if (this.mode == 'preview') this.commit('mode', 'edit');
            this.$db('notes.add', { title: '新建文档', cateId: this.cateId }, function (id) {
                _this2.commit('noteId', id);
                _this2.query();
            });
        },
        deleteNote: function deleteNote() {
            var _this3 = this;

            if (this.noteId == null) return;
            this.$confirm('确定删除这个文档么?', function (result) {
                if (result) {
                    _this3.$db('notes.delete', { id: _this3.noteId }, function () {
                        _this3.commit('refreshFlag', '');
                    });
                }
            });
        },
        NoteDragstart: function NoteDragstart(event, note) {
            this.commit('dragged', { type: 'note', data: note });
            event.dataTransfer.setDragImage(document.getElementById('drag'), 20, 20);
        },
        NoteDragend: function NoteDragend(event) {
            var _this4 = this;

            if (this.dragEnter == null) {
                event.dataTransfer.dropEffect = 'none';
            } else {
                this.$db('notes.updateCate', { id: this.dragged.data.id, cate_id: this.dragEnter }, function (result) {
                    _this4.commit('dragged', null);
                    _this4.commit('dragEnter', null);
                    _this4.commit('refreshFlag');
                });
            }
        },
        NoteWrapDragenter: function NoteWrapDragenter() {
            this.commit('dragEnter', null);
        }
    },
    computed: {
        dragged: function dragged() {
            return this.$store.state.config.dragged;
        },
        dragEnter: function dragEnter() {
            return this.$store.state.config.dragEnter;
        },
        hiddenCate: function hiddenCate() {
            return this.$store.state.config.hiddenCate;
        },
        _noteWidth: function _noteWidth() {
            return this.$store.state.config.noteWidth + 'px';
        },
        cateId: function cateId() {
            return this.$store.state.config.cateId;
        },
        noteId: function noteId() {
            return this.$store.state.config.noteId;
        },
        commit: function commit() {
            return this.$store.commit;
        },
        refreshFlag: function refreshFlag() {
            return this.$store.state.config.refreshFlag;
        },
        noteList: function noteList() {
            return this.$store.state.config.noteList;
        },
        mode: function mode() {
            return this.$store.state.config.mode;
        }
    },
    watch: {
        cateId: function cateId(val) {
            this.query();
        },
        refreshFlag: function refreshFlag() {
            this.query();
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(/*! ./spa/store */ 4);

var _store2 = _interopRequireDefault(_store);

var _message = __webpack_require__(/*! ./spa/utils/message.js */ 6);

var _message2 = _interopRequireDefault(_message);

var _clickoutside = __webpack_require__(/*! ./spa/utils/clickoutside */ 5);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _index = __webpack_require__(/*! ./spa/components/index.js */ 3);

var _index2 = _interopRequireDefault(_index);

var _app = __webpack_require__(/*! ./spa/app.vue */ 7);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_message2.default);

// const {vueDragula} = window;

Vue.directive('click-outside', _clickoutside2.default);

(0, _index2.default)(Vue);

var App = Vue.extend(_app2.default);
window.app = new App({
    store: _store2.default
}).$mount("#root");

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./src/monaco-loader/MonacoLoader.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /* For now: default to cdn. */
    load: function load() {
        var srcPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min';
        var callback = arguments[1];

        if (window.monaco) {
            callback();
            return;
        }
        var config = {
            baseUrl: srcPath
            // paths: {
            //     vs: srcPath + '/vs'
            // }
        };
        var loaderUrl = srcPath + '/vs/loader.js';
        var onGotAmdLoader = function onGotAmdLoader() {

            // if (window.LOADER_PENDING) {
            //     window.require.config(config);
            // }
            var loader = global.require(loaderUrl);
            loader.require.config(config);

            // Load monaco
            loader.require(['vs/editor/editor.main'], function () {
                callback();
            });
            self.module = undefined;
            // workaround monaco-typescript not understanding the environment
            self.process.browser = true;

            // Call the delayed callbacks when AMD loader has been loaded
            if (window.LOADER_PENDING) {
                window.LOADER_PENDING = false;
                var loaderCallbacks = window.LOADER_CALLBACKS;
                if (loaderCallbacks && loaderCallbacks.length) {
                    var currentCallback = loaderCallbacks.shift();
                    while (currentCallback) {
                        currentCallback.fn.call(currentCallback.window);
                        currentCallback = loaderCallbacks.shift();
                    }
                }
            }
        };

        // Load AMD loader if necessary
        if (window.LOADER_PENDING) {
            // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
            //  delay to call callbacks except the first one
            window.LOADER_CALLBACKS = window.LOADER_CALLBACKS || [];
            window.LOADER_CALLBACKS.push({
                window: this,
                fn: onGotAmdLoader
            });
        } else {
            if (typeof window.require === 'undefined') {
                var loaderScript = window.document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = loaderUrl;
                loaderScript.addEventListener('load', onGotAmdLoader);
                window.document.body.appendChild(loaderScript);
                window.LOADER_PENDING = true;
            } else {
                onGotAmdLoader();
            }
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../~/webpack/buildin/global.js */ 1)))

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./src/spa/components/date.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    Date.prototype.Format = function (fmt) {
        fmt = fmt ? fmt : "yyyy-MM-dd HH:mm:ss"; //HH:mm:ss
        var o = {
            "M+": this.getMonth() + 1,
            /*月份*/
            "d+": this.getDate(),
            /*日*/
            "H+": this.getHours(),
            /*小时*/
            "h+": this.getHours() % 12,
            /*小时*/
            "m+": this.getMinutes(),
            /*分*/
            "s+": this.getSeconds(),
            /*秒*/
            "q+": Math.floor((this.getMonth() + 3) / 3),
            /*季度*/
            "S": this.getMilliseconds() /*毫秒*/
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    };
    Date.prototype.secondBefore = function (num) {
        var time = (this.getTime() / 1000 - num - 1) * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.secondAfter = function (num) {
        var time = (this.getTime() / 1000 + parseInt(num)) * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.mimuteBefore = function (num) {
        var time = this.getTime() - num * 1000 * 60;
        this.setTime(time);
        return this;
    };
    Date.prototype.mimuteAfter = function (num) {
        var time = this.getTime() + parseInt(num) * 60 * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.hourBefore = function (num) {
        var time = this.getTime() - num * 1000 * 60 * 60;
        this.setTime(time);
        return this;
    };
    Date.prototype.hourAfter = function (num) {
        var time = this.getTime() + parseInt(num) * 60 * 60 * 1000;
        this.setTime(time);
        return this;
    };
    Date.prototype.dayBefore = function (num) {
        var time = this.getTime() - num * 1000 * 60 * 60 * 24;
        this.setTime(time);
        return this;
    };
    Date.prototype.datAfter = function (num) {
        var time = this.getTime() + parseInt(num) * 60 * 60 * 1000 * 24;
        this.setTime(time);
        return this;
    };
};

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/spa/components/editor.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _window = window,
    markdown = _window.markdown,
    Vue = _window.Vue;
exports.default = {
    mounted: function mounted() {
        this.create();
    },

    methods: {
        modeTo: function modeTo(val) {
            this.commit('mode', val);
            this.$refs['monaco-editor'].layout();
        },
        create: function create() {
            this.initEditor();
            this.initPreview();
            if (this.noteId != null) {
                this.queryNote();
            }
        },
        queryNote: function queryNote() {
            var _this = this;

            if (this.noteId != null) {
                this.$db('note_detail.query', { parent_id: this.noteId }, function (data) {
                    _this.msg = data.text;
                    // this.$refs['monaco-editor'].setValue(data.text);
                    // this.editor.setValue(data.text);
                    // this.editor.clearHistory()
                    // this.editor.refresh();
                    _this.initPreview();
                });
            } else {}
        },
        initPreview: function initPreview() {
            this.preview = markdown.parse({ content: this.msg }).html;
        },
        initEditor: function initEditor() {
            if (this.editor == null) {}
        },
        codeChange: function codeChange(editor) {
            var value = editor.getValue();
            if (value != this.msg) {
                this.msg = value;
                this.initPreview();
                this.updateNotes();
            }
        },
        updateNotes: function updateNotes() {
            var _this2 = this;

            this.$db('note_detail.update', {
                text: this.msg,
                parent_id: this.noteId,
                title: this.title,
                description: this.description
            }, function (data) {
                _this2.commit('refreshFlag', new Date().getTime());
            });
        }
    },
    watch: {
        noteId: function noteId() {
            // this.commit('mode', 'preview');
            this.queryNote();
        },
        showEdit: function showEdit(val) {
            if (val) {
                Vue.nextTick(function () {
                    // this.editor.focus();
                    // this.editor.refresh()
                });
            }
        },
        msg: function msg(val, old) {},
        hiddenCate: function hiddenCate() {
            this.$refs['monaco-editor'].layout();
        }
    }
};

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/spa/components/filter.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _date = __webpack_require__(/*! ./date */ 18);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _date2.default)();

exports.default = function (Vue) {
    Vue.filter('date', function (value) {
        var date = new Date(value),
            today = new Date();
        if (date.Format('yyyy-MM-dd') == today.Format('yyyy-MM-dd')) {
            return date.Format('HH:mm');
        } else {
            return date.Format('yyyy/MM/dd');
        }
    });
};

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!*****************************************!*\
  !*** ./src/spa/store/modules/config.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _window = window,
    message = _window.message;

var state = {
    cateWidth: 130,
    noteWidth: 180,
    hiddenCate: false,
    cateId: 'all',
    noteId: null,
    noteDetail: '',
    mode: 'preview',
    showEdit: false,
    showPreview: true,
    noteList: [],
    refreshFlag: new Date().getTime(),
    dragged: null,
    dragEnter: null,
    os: ''
};

var update = function update(data) {
    message.send('config', {
        method: 'update',
        arg: data
    }, function (event, arg) {});
};
var mutations = {
    cateWidth: function cateWidth(state, width) {
        state.cateWidth = width;
        update(state);
    },
    noteWidth: function noteWidth(state, width) {
        state.noteWidth = width;
        update(state);
    },
    hiddenCate: function hiddenCate(state, val) {
        state.hiddenCate = val;
        update(state);
    },
    cateId: function cateId(state, val) {
        state.cateId = val;
        update(state);
    },
    noteId: function noteId(state, val) {
        state.noteId = val;
        update(state);
    },
    noteDetail: function noteDetail(state, val) {
        state.noteDetail = val;
        // update(state)
    },
    mode: function mode(state, val) {
        state.mode = val;
        if (val != 'preview') {
            state.showEdit = true;
        } else {
            state.showEdit = false;
        }
        if (val != 'edit') {
            state.showPreview = true;
        } else {
            state.showPreview = false;
        }
        update(state);
    },
    refreshFlag: function refreshFlag(state) {
        state.refreshFlag = new Date().getTime();
    },
    noteList: function noteList(state, val) {
        state.noteList = val;
    },
    dragged: function dragged(state, val) {
        state.dragged = val;
    },
    dragEnter: function dragEnter(state, val) {
        state.dragEnter = val;
    }
};
var init = function init() {
    message.send('config', {
        method: 'get',
        arg: {}
    }, function (event, arg) {
        delete arg.dragEnter;
        Object.assign(state, arg);
    });
};

init();
exports.init = init;
exports.default = {
    state: state,
    mutations: mutations
};

/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-2e3aa5ba","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/note-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-30bff5b6","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-34567553","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/editor.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-3d8a5a66","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-4896a9b5","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-d0a37fa4","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/app.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/monaco-loader/Monaco.vue ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vue-loader/lib/selector?type=script&index=0!./Monaco.vue */ 9),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-0ffe7cee"}!../../~/vue-loader/lib/selector?type=template&index=0!./Monaco.vue */ 34),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/app-title.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-30bff5b6","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./app-title.vue */ 23)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./app-title.vue */ 11),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-30bff5b6"}!../../../~/vue-loader/lib/selector?type=template&index=0!./app-title.vue */ 36),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/cate-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-3d8a5a66","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate-list.vue */ 25)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate-list.vue */ 12),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-3d8a5a66"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate-list.vue */ 38),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./src/spa/components/cate.vue ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-4896a9b5","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate.vue */ 26)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate.vue */ 13),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-4896a9b5"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate.vue */ 39),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/spa/components/editor.vue ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-34567553","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./editor.vue */ 24)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./editor.vue */ 14),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-34567553"}!../../../~/vue-loader/lib/selector?type=template&index=0!./editor.vue */ 37),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/note-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-2e3aa5ba","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./note-list.vue */ 22)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./note-list.vue */ 15),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-2e3aa5ba"}!../../../~/vue-loader/lib/selector?type=template&index=0!./note-list.vue */ 35),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-0ffe7cee"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/monaco-loader/Monaco.vue ***!
  \*********************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: (_vm.style)
  })
},staticRenderFns: []}

/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-2e3aa5ba"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/note-list.vue ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "note-list",
    staticClass: "note-list",
    style: ({
      width: _vm._noteWidth
    }),
    attrs: {
      "tabindex": "1"
    },
    on: {
      "mousedown": function($event) {
        _vm.handleMouseDown($event, 'updateWidth')
      },
      "mousemove": function($event) {
        _vm.handleMouseMove($event, 'note-list')
      }
    }
  }, [_c('app-title', {
    style: ({
      paddingLeft: (!_vm.hiddenCate || _vm.isWin) ? '0px' : '75px'
    })
  }, [_c('span', {
    staticClass: "iconfont icon-yincangdaohang",
    on: {
      "click": _vm.toggleCate
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-iconfontshanchu6",
    on: {
      "click": _vm.deleteNote
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-bianji1",
    on: {
      "click": _vm.addNote
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "note-container _container",
    attrs: {
      "tabindex": "30002"
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        _vm.deleteNote($event)
      },
      "dragover": function($event) {
        _vm.NoteWrapDragenter()
      }
    }
  }, [_c('div', {
    staticClass: "note-root"
  }, _vm._l((_vm.noteList), function(note) {
    return _c('div', {
      staticClass: "note",
      class: note.id == _vm.noteId ? ' active' : '',
      attrs: {
        "draggable": !_vm.resize.can
      },
      on: {
        "click": function($event) {
          _vm.changeNoteId(note)
        },
        "dragstart": function($event) {
          _vm.NoteDragstart($event, note)
        },
        "dragend": function($event) {
          _vm.NoteDragend($event)
        }
      }
    }, [_c('h5', [_vm._v(_vm._s(note.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm._f("date")(note.last_update_date)) + " " + _vm._s(note.description))])])
  }))])], 1)
},staticRenderFns: []}

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-30bff5b6"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-title",
    class: 'align-' + _vm.align
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 37 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-34567553"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/editor.vue ***!
  \**********************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('app-title', [_c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mode != 'both'),
      expression: "mode != 'both'"
    }],
    staticClass: "iconfont icon-liangping",
    on: {
      "click": function($event) {
        _vm.modeTo('both')
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mode != 'preview'),
      expression: "mode != 'preview'"
    }],
    staticClass: "iconfont icon-preview",
    on: {
      "click": function($event) {
        _vm.modeTo('preview')
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mode != 'edit'),
      expression: "mode != 'edit'"
    }],
    staticClass: "iconfont icon-bianji",
    on: {
      "click": function($event) {
        _vm.modeTo('edit')
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "e-wrap"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.noteId != null && _vm.showEdit),
      expression: "noteId != null && showEdit"
    }],
    staticClass: "editor-wrap"
  }, [_c('MonacoEditor', {
    ref: "monaco-editor",
    attrs: {
      "language": "markdown",
      "src-path": _vm.monaco_path,
      "change-throttle": "300"
    },
    on: {
      "codeChange": _vm.codeChange
    },
    model: {
      value: (_vm.msg),
      callback: function($$v) {
        _vm.msg = $$v
      },
      expression: "msg"
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.noteId != null && _vm.showPreview),
      expression: "noteId != null && showPreview"
    }],
    staticClass: "preview-wrap"
  }, [_c('div', {
    staticClass: "markdown-body",
    domProps: {
      "innerHTML": _vm._s(_vm.preview)
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.noteId == null),
      expression: "noteId == null"
    }],
    staticClass: "empty-wrap"
  })])], 1)
},staticRenderFns: []}

/***/ }),
/* 38 */
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-3d8a5a66"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/cate-list.vue ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.hiddenCate),
      expression: "!hiddenCate"
    }],
    ref: "cate-list",
    staticClass: "cate-list",
    style: ({
      width: _vm._cateWidth
    }),
    attrs: {
      "tabindex": "0"
    },
    on: {
      "mousedown": function($event) {
        _vm.handleMouseDown($event, 'updateWidth')
      },
      "mousemove": function($event) {
        _vm.handleMouseMove($event, 'cate-list')
      }
    }
  }, [_c('app-title'), _vm._v(" "), _c('div', {
    staticClass: "cate-container _container",
    attrs: {
      "tabindex": "30001"
    },
    on: {
      "keyup": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.modify($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        _vm.deleteCate($event)
      }],
      "dragenter": function($event) {
        _vm.wrapDragover($event)
      }
    }
  }, [_c('div', {
    staticClass: "nav-group"
  }, [_c('h5', {
    staticClass: "nav-group-title"
  }, [_vm._v("Notes")]), _vm._v(" "), _c('span', {
    staticClass: "nav-group-item ",
    class: _vm.cateId == 'all' ? 'active' : '',
    on: {
      "click": function($event) {
        _vm.selectCate({
          id: 'all'
        })
      }
    }
  }, [_vm._v("所有")]), _vm._v(" "), _vm._l((_vm.model.cates), function(cate) {
    return [(_vm.cateId == cate.id && _vm.viewModel.edit) ? _c('span', {
      staticClass: "nav-group-item active"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (cate.title),
        expression: "cate.title"
      }, {
        name: "click-outside",
        rawName: "v-click-outside",
        value: (_vm.saveModify),
        expression: "saveModify"
      }],
      ref: "cate-edit",
      refInFor: true,
      staticClass: "cate-edit",
      style: ({
        width: _vm._inputWidth
      }),
      domProps: {
        "value": (cate.title)
      },
      on: {
        "keyup": [function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          $event.stopPropagation();
          _vm.saveModify($event, cate)
        }, function($event) {
          $event.stopPropagation();
        }],
        "input": function($event) {
          if ($event.target.composing) { return; }
          cate.title = $event.target.value
        }
      }
    })]) : _c('span', {
      staticClass: "nav-group-item ",
      class: [{
        'active': _vm.cateId == cate.id
      }, {
        'dragenter': _vm.dragEnter == cate.id
      }],
      on: {
        "click": function($event) {
          _vm.selectCate(cate)
        },
        "dblclick": _vm.modify,
        "dragstart": function($event) {
          _vm.dragstart($event, cate)
        },
        "dragover": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.dragover($event, cate)
        }
      }
    }, [_vm._v(_vm._s(cate.title))])]
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "cate-add-wrap"
  }, [_c('span', {
    staticClass: "cate-add",
    on: {
      "click": _vm.addCate
    }
  }, [_c('span', {
    staticClass: "iconfont icon-tianjia"
  }), _vm._v("添加类别\n            ")])])], 1)
},staticRenderFns: []}

/***/ }),
/* 39 */
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-4896a9b5"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "cate-wrap",
    staticClass: "left-wrap clearfix"
  }, [_c('cate-list'), _vm._v(" "), _c('note-list')], 1)
},staticRenderFns: []}

/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!********************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-d0a37fa4"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/app.vue ***!
  \********************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: 'app ' + _vm.os
  }, [(_vm.inited) ? _c('div', {
    staticClass: "wrap"
  }, [_c('left-main', {
    attrs: {
      "cate-width": _vm.config.cateWidth,
      "note-width": _vm.config.noteWidth,
      "cate-id": _vm.config.cateId,
      "hidden-cate": _vm.config.hiddenCate
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "flex-editor"
  }, [_c('editor')], 1)], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticStyle: {
      "position": "absolute",
      "width": "0",
      "height": "0",
      "z-index": "-1"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "30px",
      "height": "auto"
    },
    attrs: {
      "id": "drag",
      "src": _vm.dragImg
    }
  })])])
},staticRenderFns: []}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map