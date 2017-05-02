const {ipcMain} = require('electron')

const listen = function (channel,callback) {
    ipcMain.on(channel, (event, arg) => {
        callback(event,arg);
    });
};
const send = function (channel,arg,callback) {
    let chanelOnce = channel+Math.floor(Math.random() * Math.random() * Math.random() * Math.random()*10000)
    ipcMain.send(channel,{
        chanelOnce,arg
    });
    ipcMain.once(chanelOnce,(event, arg)=>{callback(event, arg)});
};

module.exports = {
    listen,
    send
};