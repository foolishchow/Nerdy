const RE = {
    HEAD: /^(#+)/, //: /^(#+)(?: |$)/
    TEXT: /[^#!\[\]*_\\<>`"'(~]+/
};

const Type = require('./types.js');
const inlineType = require('./type/inlineType');
const lineType = require('./type/lineType')

module.exports = class format {

    constructor (cmCfg, modeCfg) {
        this.cmConfig = cmCfg;
        this.modeConfig = modeCfg;
    }

    htmlBlock (stream, state) {
        var style = htmlMode.token(stream, state.htmlState);
        if (!htmlModeMissing) {
            var inner = CodeMirror.innerMode(htmlMode, state.htmlState)
            if ((inner.mode.name == "xml" && inner.state.tagStart === null &&
                (!inner.state.context && inner.state.tokenize.isInText)) ||
                (state.md_inside && stream.current().indexOf(">") > -1)) {
                state.f = inlineNormal;
                state.block = blockNormal;
                state.htmlState = null;
            }
        }
        return style;
    }

    blankLine (state) {
        // Reset linkTitle state
        state.linkTitle = false;
        // Reset EM state
        state.em = false;
        // Reset STRONG state
        state.strong = false;
        // Reset strikethrough state
        state.strikethrough = false;
        // Reset state.quote
        state.quote = 0;
        // Reset state.indentedCode
        state.indentedCode = false;
        if (state.format == this.htmlBlock) {
            state.format = this.formatInline;
            state.block = this.format;
        }
        // Reset state.trailingSpace
        state.trailingSpace = 0;
        state.trailingSpaceNewLine = false;
        // Mark this line as blank
        state.prevLine = state.thisLine
        state.thisLine = null
        return null;
    }

    formatText (stream, state) {
        // console.info(stream.match(RE.TEXT, false));
        if (stream.match(RE.TEXT, true)) {
            return Type(state);
        }
        return undefined;
    }

    format (stream, state) {
        if (stream.eatSpace()) {
            return null;
        }
        console.info(`
stream   => ===>${stream.string}<===
sol      => ${stream.sol()}
eatSpace => ${stream.eat(/\s/)}
peek     => ===>${stream.peek()}<===
macth    =>`);
        console.info(stream);
        if (!state.block) {
            let block = lineType.block(stream, state);
            if (block != false) return block;
        }
        if (state.block) {
            let blockEnd = lineType.blockEnd(stream, state);
            if (blockEnd != false) return blockEnd;
        }

        let list = lineType.list(stream, state);
        if (list !== false) return list;

        let quote = lineType.quote(stream,state);
        if (quote !== false) return quote;
        //header
        let header = lineType.header(stream, state);
        if (header !== false) return header;

        let line = lineType.line(stream, state);
        if (line != false) {
            stream.skipToEnd();
            return line;
        }

        // stream.skipToEnd();
        state.format = state.formatInline;
        return "";
    }

    formatInline (stream, state) {

        let modeCfg = this.modeConfig;

        var style = state.formatText(stream, state);
        if (typeof style !== 'undefined') {
            return style;
        }

        // Get sol() value now, before character is consumed
        var ch = stream.next();

        if( state.block ) {
            return Type(state);
        }

        let header = inlineType.header(stream, state);
        if (header !== false) return header;

        let imageLeader = inlineType.image.leader(stream, state, ch);
        if (imageLeader != false) return imageLeader;
        let imageAlt = inlineType.image.alt(stream, state, ch);
        if (imageAlt != false) return imageAlt;
        let imageAltEnd = inlineType.image.altEnd(stream, state, ch);
        if (imageAltEnd != false) return imageAltEnd;
        let imageUrl = inlineType.image.url(stream, state, ch);
        if (imageUrl != false) return imageUrl;
        let imageUrlRef = inlineType.image.urlRef(stream, state, ch);
        if (imageUrlRef != false) return imageUrlRef;


        let linkAlt = inlineType.link.alt(stream, state, ch);
        if (linkAlt != false) return linkAlt;
        let linkAltEnd = inlineType.link.altEnd(stream, state, ch);
        if (linkAltEnd != false) return linkAltEnd;
        let linkUrl = inlineType.link.url(stream, state, ch);
        if (linkUrl != false) return linkUrl;
        let linkUrlRef = inlineType.link.urlRef(stream, state, ch);
        if (linkUrlRef != false) return linkUrlRef;

        let UrlDefine = inlineType.urlDefine(stream, state, ch);
        if (UrlDefine != false) return UrlDefine;


        let fontStrong = inlineType.font.strong(stream, state, ch);
        if (fontStrong != false) return fontStrong;

        let fontEmphasize = inlineType.font.emphasize(stream, state, ch);
        if (fontEmphasize != false) return fontEmphasize;


        let code = inlineType.block(stream, state,ch);
        if(code) return code;
        return Type(state);
    }
}
