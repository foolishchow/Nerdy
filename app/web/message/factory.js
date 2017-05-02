const {ipcRenderer} = require('electron')

const listen = function (channel,callback) {
    ipcRenderer.on('chanel', (event, arg) => {
        callback(event,arg);
    });
};
const send = function (channel,arg,callback) {
    let chanelOnce = channel + Math.floor(Math.random() * Math.random() * Math.random() * Math.random()*10000)
    ipcRenderer.send(channel,{
        chanelOnce,arg
    });
    ipcRenderer.once(chanelOnce,(event, arg)=>callback(event, arg));
}
module.exports = {
    listen,
    send
};
