// eslint-disable-next-line
'use strict';

const {app} = require('electron'),
    {enhance} = require('electron-nokogiri/lib/utils'),
    path = require('path'),
    userDataPath = app.getPath('userData');;
enhance({
    root: path.resolve(__dirname,'..'),
    'user-path':userDataPath
});

require("@.root.app.utils.date")
require("@.root.app.init")
require("@.root.app.ui.window");
require("@.root.app.ui.menu");