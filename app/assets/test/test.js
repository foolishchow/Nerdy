const CodeMirror = require('codemirror/lib/codemirror');
require('codemirror/addon/scroll/simplescrollbars.js');
// import 'codemirror/mode/markdown/markdown'
require('../../../src/components/markdown-mode');
require('../../../src/components/markdown2');
// require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/clike/clike');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/addon/edit/continuelist');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/dialog/dialog.js');
require('codemirror/addon/search/search.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/jump-to-line.js');
require('codemirror/keymap/vim');


/*@import 'codemirror/theme/editor-reset.css';*/


window.CodeMirror = CodeMirror;

module.exports = CodeMirror;
