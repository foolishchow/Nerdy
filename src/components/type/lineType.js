const Type = require('../types');


const RE = {
    HEAD: /^(#+)/, //: /^(#+)(?: |$)/
    TEXT: /^[^#!\[\]*_\\<>` "'(~]+/
};

module.exports = {
    header:(stream,state)=>{
        if ((match = stream.match(RE.HEAD)) && match[1].length <= 6) {
            state.header.no = match[1].length;
            state.format = state.formatInline;
            return Type(state);
        }else{
            return false;
        }
    },
    line(stream, state){
        let equal = stream.string == '***';
        if(equal){
            console.info(stream)
        }
        if (stream.sol()  && stream.match(/(\*\s*){3,}/, true) && stream.eol() ) {
            if(equal){console.info(`is line`);}
            state.line = true;
            let type = Type(state);
            state.line = false;
            return type;
        }
        if( stream.sol()  && stream.match(/(\-\s*){3,}/, true) && stream.eol() ){
            state.line = true;
            let type = Type(state);
            state.line = false;
            return type;
        }
        return false;
    },
};
