var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

const parse = function (src){
    return {
        html: marked(src.content)
    }
};
export default parse;
