const config = require('./electron/config');
config.init();
const {register} = require('./electron/message/index');
register();

const {app} = require('electron')
const {createWindow,showWindow}  = require('./electron/window');
// app.commandLine.appendArgument('--enable-touch-events');
// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', function(){
    createWindow();
});

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // 在这文件，你可以续写应用剩下主进程代码。
    // 也可以拆分成几个文件，然后用 require 导入。
    showWindow();
});

// console.info()
// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
//
// require('./main/db/adapter')


// const {ipcMain} = require('electron')
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg)  // prints "ping"
//     setTimeout(()=>{
//         event.returnValue = 'pong'
//     },3000)
//     // event.sender.send('asynchronous-reply', 'pong')
// });

// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg)  // prints "ping"
//     setTimeout(()=>{
//         event.returnValue = 'pong'
//     },3000)
// });