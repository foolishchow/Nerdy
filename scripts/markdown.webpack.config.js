var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        markdown:'./src/markdown.js',
    },
    watch: false,
    output: {
        path: path.resolve(__dirname, '../app/assets/'),
        publicPath: '../assets/',
        filename: '[name].js',
        pathinfo: true,
        chunkFilename: 'modules/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /node_modules/,
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    fallback: 'vue-style-loader'
                })
            },{
                test: /\.yaml$/,
                exclude: /router\.yaml$/,
                loader: 'json-loader!yaml-loader'
            }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        })
        ,new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            'vue-source': path.resolve(__dirname, ''),
            'erp-utils': path.resolve(__dirname, 'src/utils'),
            'erp-components': path.resolve(__dirname, 'src/components')
        }
    },
    performance: {
        hints: false
    },
    stats: {
        // Nice colored output
        colors: true
    },
    devtool: 'none'
}

