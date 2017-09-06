const { app, protocol } = require('electron'),
    compiler = require('vue-template-compiler'),
    stripBom = require('strip-bom'),
    path = require('path'),
    fs = require('fs'),
    mimetype = require('mimetype'),
    postcss = require('postcss'),
    salad = require('postcss-salad')({
        features: {
            "bem": {
                // "shortcuts": {
                //      "component": "b",
                //      "modifier": "m",
                //      "descendent": "e"
                // },
                // "separators": {
                //     "descendent": "__",
                //     "modifier": "--"
                // }
            }
        }
    });



class BufferHandler {
    constructor() { }
    handler(request, callback) {
        const url = request.url.substr(8);
        if (url.endsWith('vue-style-loader'))
            return BufferHandler.saladHandler(url, callback);
        let file = path.resolve(`${__dirname}/../../../${url}`);
        callback({ mimeType: mimetype.lookup(url), data: fs.readFileSync(file), charset: 'utf-8' })
    }
    static saladHandler(url, callback) {
        url = url.replace('?type=vue-style-loader', '');
        let file = path.resolve(`${__dirname}/../../../${url}`);
        BufferHandler.postcssProcess(file).then((result) => {
            callback({ mimeType: 'text/css', data: result, charset: 'utf-8' })
        });
    }

    static getVueStyleContent(css) {
        let vueComponent = compiler.parseComponent(stripBom(css.toString())),
            styles = vueComponent.styles;
        css = '';
        styles.forEach(s => {
            css += ('\n' + s.content);
        })
        return css;
    }
    static postcssProcess(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, css) => {
                if (err) resolve(new Buffer(`/* ${err.stack} */`));
                if (/\.vue/.test(file)) css = BufferHandler.getVueStyleContent(css);
                postcss([salad])
                    .process(css, { from: file })
                    .then(result => {
                        resolve(new Buffer(result.css))
                    })
                    .catch(err => {
                        resolve(new Buffer(`/* ${err.stack} */`))
                    });
            });
        })
    };
}
protocol.registerStandardSchemes(['nerdy']);
app.on('ready', () => {
    protocol.registerBufferProtocol('nerdy', new BufferHandler().handler, (error) => {
        if (error) console.error('Failed to register protocol')
    })
});