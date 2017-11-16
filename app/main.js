// eslint-disable-next-line
'use strict';
process.on('uncaughtException', function (e) { 
    console.info(`\x1B[31mError accured in main process\x1B[0m`)
    console.info(e.stack);
})
const {app} = require('electron'),
    {enhance} = require('electron-nokogiri/lib/utils'),
    path = require('path'),
    userDataPath = app.getPath('userData');;
enhance({
    root: path.resolve(__dirname,'..'),
    'user-path':userDataPath
});

require("@.root.app.utils.date")
require("@.root.app.init");
require("@.root.app.ui.window");
require("@.root.app.ui.menu");