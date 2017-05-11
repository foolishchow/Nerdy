const tokenTypes = {
    header: "header",
    code: "comment",
    quote: "quote",
    list1: "variable-2",
    list2: "variable-3",
    list3: "keyword",
    hr: "hr",
    line:"hr",
    image: "image",
    imageAlt: "image-alt-text",
    imageLeader: "image-marker",
    imageUrl: "image-url",
    imageUrlRef:'image-url-ref',
    formatting: "formatting",


    link:'link',
    linkAlt:'link-alt',
    linkUrl:'link-url',
    linkUrlRef:'link-ref',

    urlDefine:'url-define',

    linkInline: "link",
    linkEmail: "link",
    linkText: "link",
    linkHref: "string",
    emphasize: "emphasize",
    strong: "strong",
    strikethrough: "strikethrough"
};


module.exports = (state)=> {
    var styles = [];

    if(state.formatting){
        styles.push(tokenTypes.linkHref);
    }

    if (state.header.no) {
        styles.push(tokenTypes.header, tokenTypes.header + "-" + state.header.no);
    }

    if (state.image.in) {
        styles.push(tokenTypes.image);
        //image
        if (state.image.leader)
            styles.push(tokenTypes.imageLeader);
        if (state.image.alt)
            styles.push(tokenTypes.imageAlt);
        if (state.image.url)
            styles.push(tokenTypes.imageUrl);
        if(state.image.urlRef)
            styles.push(tokenTypes.imageUrlRef);
    }

    if(state.link.in){
        styles.push(tokenTypes.link);
        if (state.link.alt)
            styles.push(tokenTypes.linkAlt);
        if (state.link.url)
            styles.push(tokenTypes.linkUrl);
        if(state.link.urlRef)
            styles.push(tokenTypes.linkUrlRef);
    }


    if(state.urlDefine) styles.push(tokenTypes.urlDefine)

    if(state.line) styles.push(tokenTypes.line)
    if(state.font.emphasize) styles.push(tokenTypes.emphasize);
    if(state.font.strong) styles.push(tokenTypes.strong);

    return styles.length ? styles.join(' ') : null;


    if (state.formatting) {
        styles.push(tokenTypes.formatting);

        if (typeof state.formatting === "string") state.formatting = [state.formatting];

        for (var i = 0; i < state.formatting.length; i++) {
            styles.push(tokenTypes.formatting + "-" + state.formatting[i]);

            if (state.formatting[i] === "header") {
                styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.header.no);
            }

            // Add `formatting-quote` and `formatting-quote-#` for blockquotes
            // Add `error` instead if the maximum blockquote nesting depth is passed
            if (state.formatting[i] === "quote") {
                if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
                    styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.quote);
                } else {
                    styles.push("error");
                }
            }
        }
    }

    if (state.taskOpen) {
        styles.push("meta");
        return styles.length ? styles.join(' ') : null;
    }
    if (state.taskClosed) {
        styles.push("property");
        return styles.length ? styles.join(' ') : null;
    }

    if (state.linkHref) {
        styles.push(tokenTypes.linkHref, "url");
    } else { // Only apply inline styles to non-url text
        if (state.strong) {
            styles.push(tokenTypes.strong);
        }
        if (state.em) {
            styles.push(tokenTypes.em);
        }
        if (state.strikethrough) {
            styles.push(tokenTypes.strikethrough);
        }
        if (state.linkText) {
            styles.push(tokenTypes.linkText);
        }
        if (state.code) {
            styles.push(tokenTypes.code);
        }
        if (state.image) {
            styles.push(tokenTypes.image);
        }
        if (state.imageAltText) {
            styles.push(tokenTypes.imageAltText, "link");
        }
        if (state.imageMarker) {
            styles.push(tokenTypes.imageMarker);
        }
    }
    if (state.imageLink) {
        styles.push(tokenTypes.imageLink);
    }
    if (state.header.no) {
        styles.push(tokenTypes.header, tokenTypes.header + "-" + state.header.no);
    }

    if (state.quote) {
        styles.push(tokenTypes.quote);

        // Add `quote-#` where the maximum for `#` is modeCfg.maxBlockquoteDepth
        if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
            styles.push(tokenTypes.quote + "-" + state.quote);
        } else {
            styles.push(tokenTypes.quote + "-" + modeCfg.maxBlockquoteDepth);
        }
    }

    // if (state.list !== false) {
    //     var listMod = (state.listStack.length - 1) % 3;
    //     if (!listMod) {
    //         styles.push(tokenTypes.list1);
    //     } else if (listMod === 1) {
    //         styles.push(tokenTypes.list2);
    //     } else {
    //         styles.push(tokenTypes.list3);
    //     }
    // }

    if (state.trailingSpaceNewLine) {
        styles.push("trailing-space-new-line");
    } else if (state.trailingSpace) {
        styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" : "b"));
    }
    // console.info(`types => ${styles.length ? styles.join(' ') : null}`);
    return styles.length ? styles.join(' ') : null;
}

