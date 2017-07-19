var marked = require('marked');
var render = new marked.Renderer();

render.link = function (href, title, text) {
    return `<a href="${href}" title="${title}" target="_about" onclick="href_click(event,this)">${text}</a>`
};

marked.setOptions({
    renderer: render,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang, callback) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

const parse = function (src) {
    return {
        html: marked(src.content)
    }
};
module.exports = parse;
