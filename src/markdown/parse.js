const md = require('./markdown') ;
const fm = require('front-matter') 
const sanitize = require('./sanitize') ;
const parse = tab => {
    const render = tab => md.render(tab.content)
    //     .replace(/src="([^"]+)"/g, (m, p1) => {
    //     if (p1[0] === '.') {
    //         p1 = path.join(path.dirname(tab.filePath), p1)
    //         return `src="${p1}"`
    //     }
    //     return m
    // });

    const data = fm(tab.content)
    return {
        attrs: data.attributes,
        html: sanitize(render({content: data.body}))
    }
};

module.exports = parse;