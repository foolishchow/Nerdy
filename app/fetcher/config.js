const { app } = require('electron')
const message = require('electron-nokogiri');
const Config = require('electron-config');
const config = new Config('baseinfo');

const update = (next, data) => {
//    let {method,arg = data;
   config.set('config',data);
   next('ok');
}
const get = (next)=>{
    let _config = config.get('config') || {};
    _config.os = process.platform === 'darwin' ? 'mac' : 'win';
    next(_config);
}
app.on('ready', () => {
    message.use('config.update', update);
    message.use('config.get', get);
});