const {app,BrowserWindow} = require('electron');
const manager = require('./window')
const path = require('path');

app.on('ready', function(){
    BrowserWindow.addDevToolsExtension(path.resolve(__dirname,'../../plugins/vue'));
    new manager.MainWindow();
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
    manager.showLast();
});