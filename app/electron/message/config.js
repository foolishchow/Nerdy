const {listen} = require('./factory');
const Config = require('electron-config');
const config = new Config('baseinfo');
module.exports = function () {
    listen('config',function (event,argu) {
        let {chanelOnce,arg:{method,arg}} = argu;
        switch (method){
            case 'update':
                config.set('config',arg);
                event.sender.send(chanelOnce,'ok');
                break;
            case 'get':
                let _config = config.get('config');
                _config.os = process.platform === 'darwin' ? 'mac' : 'win';
                event.sender.send(chanelOnce,_config);
                break;
        }
    });
};
