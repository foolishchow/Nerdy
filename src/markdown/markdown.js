/* eslint-disable camelcase, max-params */
const MarkdownIt = require('markdown-it')
const taskList = require('markdown-it-task-lists')
const hljs = require('highlight.js')
let requiredCss = false;
// import frontMatter from 'markdown-it-front-matter'
// import katex from './vendor/markdown-it-katex'

const langs = [
    'cpp',
    'coffeescript',
    'css',
    'dockerfile',
    'elixir',
    'elm',
    'erlang',
    'go',
    'haskell',
    'ini',
    'javascript',
    'less',
    'lua',
    'makefile',
    'livescript',
    'markdown',
    'matlab',
    'nginx',
    'ocaml',
    'perl',
    'php',
    'python',
    'ruby',
    'scala',
    'rust',
    'scss',
    'sql',
    'stylus',
    'swift',
    'typescript',
    'xml',
    'yaml'
];

langs.forEach(lang => {
    hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`))
});

const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight(str, lang) {
        if(!requiredCss){
            require('../../node_modules/highlight.js/styles/default.css')
            require('../../node_modules/highlight.js/styles/tomorrow-night.css')
            requiredCss = true;
        }
        // try{
        //     return hljs.highlight(lang,str).value;
        // }catch(e){
            return hljs.highlightAuto(str).value;
        // }
        
    }
})

md.use(taskList)
// md.use(katex)
// md.use(frontMatter, fm => console.log(fm))

// add target _blank
const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
};
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
    }

    return defaultRender(tokens, idx, options, env, self)
};
module.exports = md
