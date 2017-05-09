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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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
                // this.resize.trigger.querySelector('._container').style.overflowY = 'hidden';

                var handleMouseUp = function handleMouseUp(event) {
                    if (_this.resize.in) {
                        var width = _this.resize.trigger.style.width;
                        document.body.style.cursor = '';
                        // this.resize.trigger.querySelector('._container').style.overflowY = 'scroll';
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
/* 2 */
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

var _filter = __webpack_require__(/*! ./filter */ 16);

var _filter2 = _interopRequireDefault(_filter);

var _editor = __webpack_require__(/*! ./editor.vue */ 27);

var _editor2 = _interopRequireDefault(_editor);

var _cate = __webpack_require__(/*! ./cate.vue */ 26);

var _cate2 = _interopRequireDefault(_cate);

var _appTitle = __webpack_require__(/*! ./app-title.vue */ 24);

var _appTitle2 = _interopRequireDefault(_appTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Vue) {
    Vue.component(_appTitle2.default.name, _appTitle2.default);
    Vue.component(_editor2.default.name, _editor2.default);
    Vue.component(_cate2.default.name, _cate2.default);
    (0, _filter2.default)(Vue);
};

/***/ }),
/* 3 */
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

var _config = __webpack_require__(/*! ./modules/config */ 17);

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
/* 4 */
/* unknown exports provided */
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
/* 5 */
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
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./src/spa/app.vue ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-d0a37fa4","scoped":false,"hasInlineConfig":false}!postcss-loader!../../~/vue-loader/lib/selector?type=styles&index=0!./app.vue */ 23)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vue-loader/lib/selector?type=script&index=0!./app.vue */ 7),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-d0a37fa4"}!../../~/vue-loader/lib/selector?type=template&index=0!./app.vue */ 34),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
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
    }
};

/***/ }),
/* 8 */
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
/* 9 */
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

var _resize = __webpack_require__(/*! ./resize */ 1);

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

/***/ }),
/* 10 */
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

var _cateList = __webpack_require__(/*! ./cate-list.vue */ 25);

var _cateList2 = _interopRequireDefault(_cateList);

var _noteList = __webpack_require__(/*! ./note-list.vue */ 28);

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
/* 11 */
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

var _editor = __webpack_require__(/*! ./editor.js */ 15);

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
/* 12 */
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

var _resize = __webpack_require__(/*! ./resize */ 1);

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
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _store = __webpack_require__(/*! ./spa/store */ 3);

var _store2 = _interopRequireDefault(_store);

var _message = __webpack_require__(/*! ./spa/utils/message.js */ 5);

var _message2 = _interopRequireDefault(_message);

var _clickoutside = __webpack_require__(/*! ./spa/utils/clickoutside */ 4);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _index = __webpack_require__(/*! ./spa/components/index.js */ 2);

var _index2 = _interopRequireDefault(_index);

var _app = __webpack_require__(/*! ./spa/app.vue */ 6);

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
/* 14 */
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
/* 15 */
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

            if (this.noteId != null) {
                this.$db('note_detail.query', { parent_id: this.noteId }, function (data) {
                    _this.msg = data.text;
                    _this.editor.setValue(data.text);
                    _this.editor.refresh();
                    _this.initPreview();
                });
            } else {}
        },
        initPreview: function initPreview() {
            this.preview = markdown.parse({ content: this.msg }).html;
        },
        initEditor: function initEditor() {
            var _this2 = this;

            if (this.editor == null) {
                var editor = CodeMirror.fromTextArea(this.$refs['textarea'], {
                    mode: 'markdown',
                    theme: 'base16-light', //this.settings.editor.theme,
                    lineNumbers: true,
                    matchBrackets: true,
                    lineWrapping: false,
                    scrollbarStyle: 'native',
                    showCursorWhenSelecting: true,
                    autofocus: true,
                    dragDrop: false,
                    tabSize: 4, //this.settings.editor.tabSize,
                    indentWithTabs: true, //this.settings.editor.indentWithTabs,
                    extraKeys: {
                        Enter: 'newlineAndIndentContinue',
                        Tab: function Tab(cm) {
                            console.info(cm);
                            var sections = cm.getSelection();
                            if (/\n/.test(sections)) {
                                var lineNumber = cm.getCursor();
                                console.info(lineNumber);
                                var lines = sections.split(/\n/).length; //,'\n'+' '.repeat(cm.getOption('tabSize')));
                                console.info(cm.setLine);

                                for (var i = 0; i < lines.length; i++) {}
                                // cm.replaceSelection(lines);
                            } else {
                                cm.replaceSelection(' '.repeat(cm.getOption('tabSize')));
                            }
                        },

                        'Shift-Tab': function ShiftTab(cm) {
                            var sections = cm.getSelection();
                            if (/\n/.test(sections)) {} else {
                                var lineNumber = cm.getCursor();
                                // console.info(lineNumber)
                                var line = cm.getLine(lineNumber.line);
                                var tabsize = cm.getOption('tabSize');
                                var regexp = new RegExp('^s{' + tabsize);
                                if (regexp.text(line)) {} else {}
                                // cm.replaceSelection(' '.repeat(cm.getOption('tabSize')))
                            }
                            console.info(cm.getSelection());
                        }
                        // 'Alt-F': 'findPersistent'
                    }
                });
                editor.on('change', function (e) {
                    var value = e.getValue();
                    if (value != _this2.msg) {
                        _this2.msg = value;
                        _this2.initPreview();
                        _this2.updateNotes();
                    }
                });
                setTimeout(function () {
                    editor.refresh();
                }, 1);
                this.editor = editor;
            }
        },
        updateNotes: function updateNotes() {
            var _this3 = this;

            this.$db('note_detail.update', {
                text: this.msg,
                parent_id: this.noteId,
                title: this.title,
                description: this.description
            }, function (data) {
                _this3.commit('refreshFlag', new Date().getTime());
            });
        }
    },
    watch: {
        noteId: function noteId() {
            // this.commit('mode', 'preview');
            this.queryNote();
        },
        showEdit: function showEdit(val) {
            var _this4 = this;

            if (val) {
                Vue.nextTick(function () {
                    _this4.editor.focus();
                    _this4.editor.refresh();
                });
            }
        },
        msg: function msg(val) {
            // console.info(`msg changed to => ${val}`)
        }
    }
};

/***/ }),
/* 16 */
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

var _date = __webpack_require__(/*! ./date */ 14);

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
/* 17 */
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
    showPreview: true,
    noteList: [],
    refreshFlag: new Date().getTime(),
    dragged: null,
    dragEnter: null
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
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-2e3aa5ba","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/note-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-30bff5b6","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-34567553","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/editor.vue ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-3d8a5a66","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate-list.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-4896a9b5","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader!./~/vue-loader/lib/style-compiler?{"id":"data-v-d0a37fa4","scoped":false,"hasInlineConfig":false}!./~/postcss-loader!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/spa/app.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/app-title.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-30bff5b6","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./app-title.vue */ 19)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./app-title.vue */ 8),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-30bff5b6"}!../../../~/vue-loader/lib/selector?type=template&index=0!./app-title.vue */ 30),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./src/spa/components/cate-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-3d8a5a66","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate-list.vue */ 21)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate-list.vue */ 9),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-3d8a5a66"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate-list.vue */ 32),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./src/spa/components/cate.vue ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-4896a9b5","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./cate.vue */ 22)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./cate.vue */ 10),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-4896a9b5"}!../../../~/vue-loader/lib/selector?type=template&index=0!./cate.vue */ 33),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./src/spa/components/editor.vue ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-34567553","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./editor.vue */ 20)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./editor.vue */ 11),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-34567553"}!../../../~/vue-loader/lib/selector?type=template&index=0!./editor.vue */ 31),
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
/*!******************************************!*\
  !*** ./src/spa/components/note-list.vue ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-2e3aa5ba","scoped":false,"hasInlineConfig":false}!postcss-loader!../../../~/vue-loader/lib/selector?type=styles&index=0!./note-list.vue */ 18)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 0)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./note-list.vue */ 12),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-2e3aa5ba"}!../../../~/vue-loader/lib/selector?type=template&index=0!./note-list.vue */ 29),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 29 */
/* unknown exports provided */
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
      paddingLeft: !_vm.hiddenCate ? '0px' : '75px'
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
        if (_vm._k($event.keyCode, "delete", [8, 46])) { return; }
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
  }))])])
},staticRenderFns: []}

/***/ }),
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-30bff5b6"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/app-title.vue ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-title",
    class: 'align-' + _vm.align
  }, [_vm._t("default")], true)
},staticRenderFns: []}

/***/ }),
/* 31 */
/* unknown exports provided */
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
  }, [_c('textarea', {
    ref: "textarea",
    staticClass: "editor-input"
  }, [_vm._v(_vm._s(_vm.msg))])]), _vm._v(" "), _c('div', {
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
  })])])
},staticRenderFns: []}

/***/ }),
/* 32 */
/* unknown exports provided */
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
        if (_vm._k($event.keyCode, "enter", 13)) { return; }
        _vm.modify($event)
      }, function($event) {
        if (_vm._k($event.keyCode, "delete", [8, 46])) { return; }
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
      class: [{
        'active': _vm.cateId == cate.id
      }, {
        'dragenter': _vm.dragEnter == cate.id
      }],
      on: {
        "click": function($event) {
          _vm.selectCate(cate)
        },
        "dragstart": function($event) {
          _vm.dragstart($event, cate)
        },
        "dragover": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.dragover($event, cate)
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
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-4896a9b5"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/components/cate.vue ***!
  \********************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "cate-wrap",
    staticClass: "left-wrap clearfix"
  }, [_c('cate-list'), _vm._v(" "), _c('note-list')])
},staticRenderFns: []}

/***/ }),
/* 34 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-d0a37fa4"}!./~/vue-loader/lib/selector.js?type=template&index=0!./src/spa/app.vue ***!
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
  }, [_c('editor')])]) : _vm._e(), _vm._v(" "), _c('div', {
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