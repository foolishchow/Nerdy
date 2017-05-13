const Type = require('../types');


const RE = {
    HEAD: /^(#+)/, //: /^(#+)(?: |$)/
    TEXT: /^[^#!\[\]*_\\<>` "'(~]+/
};

module.exports = {
    /*
    *  header
    *  ## a => h1 h2
    * */
    header: (stream, state)=> {
        let match  = stream.match(RE.HEAD);
        if ( match && match[1].length <= 6) {
            state.header.no = match[1].length;
            state.format = state.formatInline;
            return Type(state);
        } else {
            return false;
        }
    },
    /*
    *  line hr
    *  ***
    *  ---
    *  - - -
    * */
    line(stream, state){
        let equal = stream.string == '***';
        if (stream.sol() && stream.match(/(\*\s*){3,}/, true) && stream.eol()) {
            state.line = true;
            let type = Type(state);
            state.line = false;
            return type;
        }
        if (stream.sol() && stream.match(/(\-\s*){3,}/, true) && stream.eol()) {
            state.line = true;
            let type = Type(state);
            state.line = false;
            return type;
        }
        return false;
    },
    /*
    * block
    * ```shell
    * */
    block(stream, state){
        let match;
        if((match = stream.match(/^(\s*```)(([^\]\\]|\\.)*)(\s*)$/,true)) && match && stream.eol() ){
            state.block = true;
            state.blocktype = match[2];
            return Type(state)
        }
        return false;
    },
    /*
    * block end
    * ```
    * */
    blockEnd(stream, state){
        let match ;
        match = stream.match(/(\s*)```(\s*)/,true);
        if(stream.eol()){
            let type = Type(state);
            state.block = false;
            state.blocktype = '';
            return type;
        }
        return false;
    },
    list(stream, state){
        let match = stream.match(/^(\-|\*|(\d\.))\s/,true);
        if(match){
            state.list = true;
            stream.backUp(1);
            let type = Type(state);
            // state.list = false;
            return type;
        }
        return false;
    },
    quote(stream, state){
        
        let match = stream.match(/^>\s/,true);
        if(match ){
            state.quote = true;
            stream.backUp(1);
            let type = Type(state);
            return type;
        }
        return false;
    }
};
