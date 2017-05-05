const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win;
let createWindow = () => {

    // BrowserWindow.addDevToolsExtension(`/Users/zhoupeng/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.2_0`);
    // 创建浏览器窗口。
    win = new BrowserWindow({ width: 900, height: 600,titleBarStyle:'hidden-inset',show:false })

    // 加载应用的 index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // win.loadURL('http://localhost:3000/')

    // 打开开发者工具。
    // win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
    win.once('ready-to-show', () => {
        win.show()
    })
}

let showWindow = ()=>{
    if ( win == null ){
        createWindow();
    }
}
module.exports = {
    createWindow,
    showWindow
}

