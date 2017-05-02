const Config = require('electron-config');
const config = new Config('baseinfo');
const {app} =  require('electron');
const userDataPath = app.getPath('userData');
const path = require('path');
const fs = require('fs')

console.info(userDataPath);
module.exports  = {
    init(){
        var database = path.resolve(userDataPath,'database.sqlite3');
        if( !fs.existsSync(database )){
            fs.writeFileSync(database,'')
        }
    }
}