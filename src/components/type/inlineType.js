const Type = require('../types');


const REINLINE = {
    HEAD: /^#+$/,
    IMAEG: /\[[^\]]*\] ?(?:\(|\[)/,
    IMAGEALT: /[^\]]*\](\(.*?\)| ?\[.*?\])/,
    URL: /(.*?\))/,
    URLREF: /[^\]]*\]/,
    URLDEFINE: /^([^\]\\]|\\.)*\]:\s*([^\]\\])*(:\/\/)([^\]\\])*\s*[\'|\"]([^\]\\])*[\'|\"]\s*$/
};


module.exports = {
    toSpace(stream, state, ch){
        if (ch === ' ') {
            if (stream.match(/\s+$/, false)) {
                state.trailingSpace++;
            } else if (state.trailingSpace) {
                state.trailingSpaceNewLine = true;
            } else {
                return false;
            }
            return Type(state)
        }
        return false;
    },
    header(stream, state) {
        if (state.header.no && stream.match(REINLINE.HEAD, true)) {
            state.formatting = "header";
            return Type(state);
        }
        return false;
    },
    image: {
        leader (stream, state, ch) {
            if (ch === '!' && stream.match(REINLINE.IMAEG, false)) {
                state.image.leader = true;
                state.image.in = true;
                // if (modeCfg.highlightFormatting) state.formatting = "image";
                return Type(state);
            }
            return false;
        },
        alt(stream, state, ch) {
            if (ch === '[' && state.image.leader && stream.match(REINLINE.IMAGEALT, false)) {
                state.image.leader = false;
                state.image.alt = true;
                // if (modeCfg.highlightFormatting) state.formatting = "image";
                return Type(state);
            }
            return false;
        },
        altEnd(stream, state, ch){
            if (ch === ']' && state.image.alt) {
                // if (modeCfg.highlightFormatting) state.formatting = "image";
                var type = Type(state);
                state.image.alt = false;
                return type;
            }
            return false;
        },
        url(stream, state, ch){
            if (ch === '(' && state.image.in && stream.match(REINLINE.URL, true)) {
                state.image.url = true;
                let type = Type(state);
                state.image.url = false;
                state.image.in = false;
                return type;
            }
            return false
        },
        urlRef(stream, state, ch){
            if (ch === '[' && state.image.in && stream.match(REINLINE.URLREF, true)) {
                state.image.urlRef = true;
                let type = Type(state);
                state.image.urlRef = false;
                state.image.in = false;
                return type;
            }
            return false;
        }

    },
    link: {
        alt(stream, state, ch) {
            if (ch === '[' && stream.match(REINLINE.IMAGEALT, false)) {
                state.link.in = true;
                state.link.alt = true;
                // if (modeCfg.highlightFormatting) state.formatting = "image";
                return Type(state);
            }
            return false;
        },
        altEnd(stream, state, ch){
            if (ch === ']' && state.link.alt) {
                // if (modeCfg.highlightFormatting) state.formatting = "image";
                var type = Type(state);
                state.link.alt = false;
                return type;
            }
            return false;
        },
        url(stream, state, ch){
            if (ch === '(' && state.link.in && stream.match(REINLINE.URL, true)) {
                state.link.url = true;
                let type = Type(state);
                state.link.url = false;
                state.link.in = false;
                return type;
            }
            return false
        },
        urlRef(stream, state, ch){
            if (ch === '[' && state.link.in && stream.match(REINLINE.URLREF, true)) {
                state.link.urlRef = true;
                let type = Type(state);
                state.link.urlRef = false;
                state.link.in = false;
                return type;
            }
            return false;
        }
    },
    urlDefine(stream, state, ch){
        if (ch === '[' && stream.match(REINLINE.URLDEFINE, true)) {
            state.urlDefine = true;
            // if (modeCfg.highlightFormatting) state.formatting = "image";
            let type = Type(state);
            state.urlDefine = false;
            return type;
        }
        return false;
    },
    font: {
        strong(stream, state, ch){
            if (( ch == '*' || ch == '_') && stream.eat(ch)) {
                let type;
                if (!state.font.strong) {
                    state.font.strong = !state.font.strong;
                    type = Type(state)
                } else if (state.font.strong) {
                    type = Type(state)
                    state.font.strong = !state.font.strong;
                }
                return type;
            }
            return false;
        },
        emphasize(stream, state, ch){
            if (( ch == '*' || ch == '_') && !stream.eat(ch)) {
                let type;
                if (!state.font.emphasize) {
                    if(stream.peek() == ' ') return false;
                    state.font.emphasize = !state.font.emphasize;
                    type = Type(state)
                } else if (state.font.emphasize) {
                    type = Type(state)
                    state.font.emphasize = !state.font.emphasize;
                }
                return type;
            }
            return false;
        }
    },
    block(stream, state, ch){
        if(ch=='`'){
            let match = stream.match(/^(`*)/,false);
            let size = match[0].length + 1;
            let reg = new RegExp("`{"+(size-1)+"}"+"(([^\\]\\\\(?!(`))])*)`{"+size+"}");
            if(stream.match(reg,true)){
                state.inlineBlock = true;
                let type = Type(state);
                state.inlineBlock = false;
                return type;
            }
            return false;
        }
        return false;
    }


};
