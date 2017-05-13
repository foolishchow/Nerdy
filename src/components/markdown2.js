const CodeMirror = require("codemirror/lib/codemirror");
const format = require('./format')



const linkInline = function (stream, state) {
    var ch = stream.next();

    if (ch === ">") {
        state.f = state.inline = inlineNormal;
        if (modeCfg.highlightFormatting) state.formatting = "link";
        var type = Type(state);
        if (type) {
            type += " ";
        } else {
            type = "";
        }
        return type + tokenTypes.linkInline;
    }

    stream.match(/^[^>]+/, true);

    return tokenTypes.linkInline;
}
const linkHref = function (stream, state) {
    // Check if space, and return NULL if so (to avoid marking the space)
    if (stream.eatSpace()) {
        return null;
    }
    var ch = stream.next();
    if (ch === '(' || ch === '[') {
        state.f = state.inline = getLinkHrefInside(ch === "(" ? ")" : "]", 0);
        if (modeCfg.highlightFormatting) state.formatting = "link-string";
        state.linkHref = true;
        if (state.image) state.imageLink = true;
        return Type(state);
    }
    return 'error';
}



class mode extends format {
    constructor (cmCfg, modeCfg) {
        super(cmCfg, modeCfg)
    }

    token (stream, state) {
        state.formatting = false;
//        console.info(`
//stream  => ${stream.string}
//thisline => ${state.thisLine == null ? '' : state.thisLine.string}
//
//        `);
        if (stream != state.thisLine) {

            let needAnBlankLine = state.header.no || state.hr;

            state.header = {no: 0, hr: null};

            state.trailingSpace = 0;
            state.trailingSpaceNewLine = false;
            if (stream.match(/^\s*$/, true) || needAnBlankLine) {
                this.blankLine(state);
                if (!needAnBlankLine) return null
                state.prevLine = null
            }


            state.prevLine = state.thisLine;
            state.thisLine = stream;

            state.format = state.formatGhost;
        }
        return state.format(stream, state);
    }

    startState () {
        return {
            format: (stream, state)=> {
                return this.format(stream, state)
            },
            formatGhost: (stream, state)=> {
                return this.format(stream, state)
            },
            formatInline: (stream, state)=> {
                return this.formatInline(stream, state)
            },
            formatText: (stream, state)=> {
                return this.formatText(stream, state)
            },
            formatting: true,
            header: {
                no: 0,
                hr: false
            },
            image:{
                leader:false,
                in:false,
                alt:false,
                url:false,
                urlRef:false
            },
            link:{
                in:false,
                alt:false,
                url:false,
                urlRef:false
            },
            font:{
                strong:false,
                emphasize:false
            },
            block:false,
            prevLine: null,
            thisLine: null,
            trailingSpace:0,
            trailingSpaceNewLine:false
        }
    }

    copyState (s) {
        return {
            format: s.format,
            formatGhost:s.formatGhost,
            formatInline: s.formatInline,
            formatText: s.formatText,
            formatting: s.formatting,
            header: s.header,
            image:s.image,
            link:s.link,
            block:s.block,
            prevLine: s.prevLine,
            thisLine: s.thisLine,
            trailingSpace:s.trailingSpace,
            trailingSpaceNewLine:s.trailingSpaceNewLine,
            font:s.font
        }
    }

}

CodeMirror.defineMode("markdown3", function (cmCfg, modeCfg) {
    return new mode(cmCfg, modeCfg)
});

CodeMirror.defineMIME("text/x-markdown", "markdown3");
