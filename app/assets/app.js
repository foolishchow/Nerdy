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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
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
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/spa/components/index.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _filter = __webpack_require__(/*! ./filter */ 39);

var _filter2 = _interopRequireDefault(_filter);

var _editor = __webpack_require__(/*! ./editor.vue */ 16);

var _editor2 = _interopRequireDefault(_editor);

var _cate = __webpack_require__(/*! ./cate.vue */ 15);

var _cate2 = _interopRequireDefault(_cate);

var _appTitle = __webpack_require__(/*! ./app-title.vue */ 36);

var _appTitle2 = _interopRequireDefault(_appTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Vue) {
    Vue.component(_appTitle2.default.name, _appTitle2.default);
    Vue.component(_editor2.default.name, _editor2.default);
    Vue.component(_cate2.default.name, _cate2.default);
    (0, _filter2.default)(Vue);
};

/***/ }),
/* 2 */
/* unknown exports provided */
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
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./src/spa/app.vue ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-99ea7cc2","scoped":false,"hasInlineConfig":false}!postcss-loader!../../~/vue-loader/lib/selector?type=styles&index=0!./app.vue */ 12)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vue-loader/lib/selector?type=script&index=0!./app.vue */ 4),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-99ea7cc2"}!../../~/vue-loader/lib/selector?type=template&index=0!./app.vue */ 19),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */
/* unknown exports provided */
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

exports.default = {
    data: function data() {
        return {
            config: {
                cateWidth: 130,
                noteWidth: 180,
                hiddenCate: false
            },
            inited: false
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
    }
};

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/cate.vue ***!
  \*************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cateList = __webpack_require__(/*! ./cate-list.vue */ 27);

var _cateList2 = _interopRequireDefault(_cateList);

var _noteList = __webpack_require__(/*! ./note-list.vue */ 32);

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
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/editor.vue ***!
  \***************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _editor = __webpack_require__(/*! ./editor.js */ 10);

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_editor2.default],
    name: 'editor',
    data: function data() {
        return {
            editor: null,
            msg: '',
            preview: ''
        };
    },

    computed: {
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

/***/ }),
/* 7 */,
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vuex = __webpack_require__(/*! vuex */ 23);

var _vuex2 = _interopRequireDefault(_vuex);

var _store = __webpack_require__(/*! ./spa/store */ 22);

var _store2 = _interopRequireDefault(_store);

var _message = __webpack_require__(/*! ./spa/utils/message.js */ 2);

var _message2 = _interopRequireDefault(_message);

var _index = __webpack_require__(/*! ./spa/components/index.js */ 1);

var _index2 = _interopRequireDefault(_index);

var _app = __webpack_require__(/*! ./spa/app.vue */ 3);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Vue.use(vuex);
Vue.use(_message2.default);

(0, _index2.default)(Vue);

var App = Vue.extend(_app2.default);
window.app = new App({
    store: _store2.default
}).$mount("#root");

/***/ }),
/* 9 */,
/* 10 */
/* unknown exports provided */
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

            this.$db('note_detail.query', { parent_id: this.noteId }, function (data) {
                _this.msg = data.text;
                _this.editor.setValue(data.text);
                _this.editor.refresh();
                _this.initPreview();
            });
        },
        initPreview: function initPreview() {
            this.preview = markdown.parse({ content: this.msg }).html;
        },
        initEditor: function initEditor() {
            var _this2 = this;

            if (this.editor == null) {
                var editor = CodeMirror.fromTextArea(this.$refs['textarea'], {
                    mode: 'gfm',
                    theme: 'base16-light', //this.settings.editor.theme,
                    lineNumbers: true,
                    matchBrackets: true,
                    lineWrapping: true,
                    scrollbarStyle: 'simple',
                    autofocus: true,
                    dragDrop: false,
                    tabSize: 4, //this.settings.editor.tabSize,
                    indentWithTabs: true, //this.settings.editor.indentWithTabs,
                    extraKeys: {
                        Enter: 'newlineAndIndentContinue',
                        Tab: function Tab(cm) {
                            cm.replaceSelection(' '.repeat(cm.getOption('tabSize')));
                            //                            if ( this.settings.indentWithTabs ){
                            //                                cm.replaceSelection('\t');
                            //                            }else{
                            //                            }
                        }
                    }
                });
                editor.on('change', function (e) {
                    _this2.msg = e.getValue().replace(/\\n/gi, '\n');
                    _this2.initPreview();
                    _this2.updateNotes();
                });
                setTimeout(function () {
                    editor.refresh();
                }, 1);
                this.editor = editor;
            }
        },
        updateNotes: function updateNotes() {

            this.$db('note_detail.update', {
                text: this.msg,
                parent_id: this.noteId,
                title: this.title,
                description: this.description
            }, function (data) {
                console.info(data);
            });
        }
    },
    watch: {
        noteId: function noteId() {
            // this.commit('mode', 'preview');
            this.queryNote();
        },
        showEdit: function showEdit(val) {
            var _this3 = this;

            if (val) {
                Vue.nextTick(function () {
                    _this3.editor.focus();
                    _this3.editor.refresh();
                });
            }
        },
        msg: function msg(val) {
            console.info('msg changed to => ' + val);
        }
    }
};

/***/ }),
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-79171d04","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/editor.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-99ea7cc2","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/app.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */,
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-efe0ecb4","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/spa/components/cate.vue ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-efe0ecb4","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate.vue */ 14)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate.vue */ 5),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-efe0ecb4"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate.vue */ 21),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/spa/components/editor.vue ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-79171d04","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./editor.vue */ 11)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./editor.vue */ 6),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-79171d04"}!../../../~/vue-loader/lib/selector?type=template&index=0!./editor.vue */ 18),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 17 */,
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-79171d04"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/editor.vue ***!
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
      value: (_vm.showEdit),
      expression: "showEdit"
    }],
    staticClass: "editor-wrap"
  }, [_c('textarea', {
    ref: "textarea",
    staticClass: "editor-input"
  }, [_vm._v(_vm._s(_vm.msg))])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPreview),
      expression: "showPreview"
    }],
    staticClass: "preview-wrap"
  }, [_c('div', {
    staticClass: "markdown-body",
    domProps: {
      "innerHTML": _vm._s(_vm.preview)
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-99ea7cc2"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/app.vue ***!
  \********************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app"
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
  }, [_c('editor')])]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 20 */,
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-efe0ecb4"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "cate-wrap",
    staticClass: "left-wrap clearfix"
  }, [_c('cate-list'), _vm._v(" "), _c('note-list')])
},staticRenderFns: []}

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./src/spa/store/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(/*! vuex */ 23);

var _vuex2 = _interopRequireDefault(_vuex);

var _config = __webpack_require__(/*! ./modules/config */ 24);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _vuex2.default.Store({
    modules: {
        config: _config2.default
    }
});

exports.default = store;

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** ./~/vuex/dist/vuex.esm.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * vuex v2.3.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};

      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

var Module = function Module(rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors$1);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) {
    return;
  }

  parent.removeChild(key);
};

function update(targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
        return;
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state;if (state === void 0) state = {};
  var plugins = options.plugins;if (plugins === void 0) plugins = [];
  var strict = options.strict;if (strict === void 0) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) {
    return plugin(this$1);
  });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error("[vuex] unknown mutation type: " + type);
    return;
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if (options && options.silent) {
    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error("[vuex] unknown action type: " + type);
    return;
  }
  return entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
};

Store.prototype.subscribe = function subscribe(fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule) {
  if (typeof path === 'string') {
    path = [path];
  }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors);

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () {
      return fn(store);
    };
    Object.defineProperty(store.getters, key, {
      get: function get() {
        return store._vm[key];
      },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function get() {
        return getNestedState(store.state, path);
      }
    }
  });

  return local;
}

function makeLocalGetters(store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) {
      return;
    }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function get() {
        return store.getters[type];
      },
      enumerable: true
    });
  });

  return gettersProxy;
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler(local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error("[vuex] duplicate getter key: " + type);
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState(state, path) {
  return path.length ? path.reduce(function (state, key) {
    return state[key];
  }, state) : state;
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', "Expects string as the type, but found " + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + ".");

  return { type: type, payload: payload, options: options };
}

function install(_Vue) {
  if (Vue) {
    console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return;
      }
      return this.$store.commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }
      if (!(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return;
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return { key: key, val: key };
  }) : Object.keys(map).map(function (key) {
    return { key: key, val: map[key] };
  });
}

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.3.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

exports.Store = Store;
exports.mapState = mapState;
exports.mapMutations = mapMutations;
exports.mapGetters = mapGetters;
exports.mapActions = mapActions;
exports.default = index_esm;

/***/ }),
/* 24 */
/* unknown exports provided */
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
    showPreview: true
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
    }
};
var init = function init() {
    message.send('config', {
        method: 'get',
        arg: {}
    }, function (event, arg) {
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
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/cate-list.vue ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resize = __webpack_require__(/*! ./resize */ 29);

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
        _cateWidth: function _cateWidth() {
            return this.$store.state.config.cateWidth + 'px';
        },
        _inputWidth: function _inputWidth() {
            return this.$store.state.config.cateWidth - 46 + 'px';
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
            var i = 0;
            while (this.model.cates[i].id != this.cateId) {
                i++;
            }
            this.$db('cates.delete', this.cateId, function (_ref) {
                var success = _ref.success;

                if (success) {
                    _this2.query();
                    var id = i == 0 ? 'all' : _this2.model.cates[i - 1].id;
                    _this2.commit('cateId', id);
                }
            });
        },
        modify: function modify() {
            if (this.cateId == 'all') return;
            this.viewModel.edit = true;
            this.viewModel.needSelect = true;
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
        saveModify: function saveModify() {
            var _this4 = this;

            var cate = this.selectedCate;
            cate.title = cate.title.replace(/^\s|\s$/gi, '');;
            return new Promise(function (resolve) {
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
                        _this4.viewModel.edit = false;
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

/***/ }),
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-0d04c915","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/cate-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-0d04c915","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate-list.vue */ 26)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate-list.vue */ 25),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-0d04c915"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate-list.vue */ 28),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-0d04c915"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/cate-list.vue ***!
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
        if (_vm._k($event.keyCode, "enter", 13)) { return; }
        _vm.modify($event)
      }, function($event) {
        if (_vm._k($event.keyCode, "delete", [8, 46])) { return; }
        _vm.deleteCate($event)
      }]
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
      }],
      ref: "cate-edit",
      refInFor: true,
      staticClass: "cate-edit",
      style: ({
        width: _vm._inputWidth
      }),
      domProps: {
        "value": _vm._s(cate.title)
      },
      on: {
        "keyup": [function($event) {
          if (_vm._k($event.keyCode, "enter", 13)) { return; }
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
      class: _vm.cateId == cate.id ? 'active' : '',
      on: {
        "click": function($event) {
          _vm.selectCate(cate)
        }
      }
    }, [_vm._v(_vm._s(cate.title))]), _vm._v(" ")]
  })], true)]), _vm._v(" "), _c('div', {
    staticClass: "cate-add-wrap"
  }, [_c('span', {
    staticClass: "cate-add",
    on: {
      "click": _vm.addCate
    }
  }, [_c('span', {
    staticClass: "iconfont icon-tianjia"
  }), _vm._v("添加类别\n            ")])])])
},staticRenderFns: []}

/***/ }),
/* 29 */
/* unknown exports provided */
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
                        _this.resize.trigger.querySelector('._container').style.overflowY = 'scroll';
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
                    _this.resize.trigger.style.width = Math.min(width, 295) + 'px';

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
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./src/spa/components/note-list.vue ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resize = __webpack_require__(/*! ./resize */ 29);

var _resize2 = _interopRequireDefault(_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_resize2.default],
    data: function data() {
        return {
            viewModel: {},
            model: {
                notes: []
            },
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
                _this.model.notes = data;
            });
        },
        addNote: function addNote() {
            var _this2 = this;

            this.$db('notes.add', { title: '新建文档', cateId: this.cateId }, function (id) {
                _this2.commit('noteId', id);
                _this2.query();
            });
        },
        evalDate: function evalDate() {}
    },
    computed: {
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
        }
    },
    watch: {
        cateId: function cateId(val) {
            this.query();
            console.info('cateId changed to => ' + val);
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

/***/ }),
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-8f45c85c","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/note-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/note-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-8f45c85c","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./note-list.vue */ 31)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./note-list.vue */ 30),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-8f45c85c"}!../../../~/vue-loader/lib/selector?type=template&index=0!./note-list.vue */ 33),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-8f45c85c"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/note-list.vue ***!
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
      paddingLeft: !_vm.hiddenCate ? '0px' : '75px'
    })
  }, [_c('span', {
    staticClass: "iconfont icon-yincangdaohang",
    on: {
      "click": _vm.toggleCate
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-iconfontshanchu6"
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-bianji1",
    on: {
      "click": _vm.addNote
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "note-container _container"
  }, [_c('div', {
    staticClass: "note-root"
  }, _vm._l((_vm.model.notes), function(note) {
    return _c('div', {
      staticClass: "note",
      class: note.id == _vm.noteId ? ' active' : '',
      on: {
        "click": function($event) {
          _vm.changeNoteId(note)
        }
      }
    }, [_c('h5', [_vm._v(_vm._s(note.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm._f("date")(note.last_update_date)) + " " + _vm._s(note.description))])])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 34 */
/* unknown exports provided */
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
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-003a6465","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/app-title.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-003a6465","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./app-title.vue */ 35)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./app-title.vue */ 34),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-003a6465"}!../../../~/vue-loader/lib/selector?type=template&index=0!./app-title.vue */ 37),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-003a6465"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-title",
    class: 'align-' + _vm.align
  }, [_vm._t("default")], true)
},staticRenderFns: []}

/***/ }),
/* 38 */
/* unknown exports provided */
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
/* 39 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./src/spa/components/filter.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _date = __webpack_require__(/*! ./date */ 38);

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

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map