import markdown from './markdown/markdown.js'
import parse from './markdown/parse.js';
import sanitize from './markdown/sanitize.js';

export default {
    markdown,
    parse,
    sanitize
}

window.markdown = {
    markdown,
    parse,
    sanitize
};