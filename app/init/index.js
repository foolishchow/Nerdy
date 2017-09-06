// const Config = require('electron-config');
// const config = new Config('baseinfo');
const {app} =  require('electron');
// const path = require('path');
const fs = require('fs')

let database = require.resolve('@user-path/database.sqlite3');
    //path.resolve(userDataPath,'database.sqlite3');
if( !fs.existsSync(database )){
    fs.writeFileSync(database,'')
}

require('@.root.app.fetcher')