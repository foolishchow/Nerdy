const markdown = require('./markdown/markdown.js') 
const parse = require( './markdown/parse.js');
const sanitize = require( './markdown/sanitize.js');


module.exports = {
    markdown,
    parse,
    sanitize
}

window.markdown = {
    markdown,
    parse,
    sanitize
};