import markdown from './spa/utils/markdown.js'
import parse from './spa/utils/parse.js';
import sanitize from './spa/utils/sanitize.js';

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