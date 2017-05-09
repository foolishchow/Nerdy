import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/addon/scroll/simplescrollbars.js'
// import 'codemirror/mode/markdown/markdown'
import './components/markdown-mode'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/keymap/vim'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
/*@import 'codemirror/theme/editor-reset.css';*/

import "highlight.js/styles/github.css";
import "highlight.js/styles/tomorrow-night-bright.css";

import "github-markdown-css/github-markdown.css";
window.CodeMirror = CodeMirror;

