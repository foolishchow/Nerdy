const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const {session} = require('electron');
const winlist = [];

class WinManager {
    constructor(){
        this.wins = [];
    }
    push(win){
       this.wins.push(win);
    }
    clearDead(){
        let i = 0;
        this.wins.forEach(w=>{
            try{
                let n = w.id;
            }catch (e){
                this.wins.splice(i,1);
            }
            i++;
        });
    }
    show(){
        if ( this.wins.length == 0 ){
            new MainWindow();
        }
    }
}
const winManager = new WinManager();

class appWindow extends BrowserWindow{

    constructor(config,url){
        config.webPreferences = {
            preload: require.resolve('@root/views/preload.js')
        }
        super(config);
        this.load(url);
        this.events();
    }

    load(procotol){
        // 加载应用的 index.html。
        this.loadURL(url.format({
            pathname: procotol,
            protocol: 'file:',
            slashes: true
        }));
    }

    events(){
        winManager.push(this);
        this.once('ready-to-show', () => {
            this.show()
        });

        // 当 window 被关闭，这个事件会被触发。
        this.on('closed', () => {
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 与此同时，你应该删除相应的元素。
            winManager.clearDead()
        });
    }

}

class MainWindow extends appWindow{
    static get config(){
        return {
            width: 900,
            height: 600,
            titleBarStyle: 'hidden-inset',
            show: false,
            // resizable: false,
            backgroundColor: '#fff'
        }
    }
    static get url(){
        return require.resolve('@root/views/index.html');
    }
    constructor(){
        super(MainWindow.config,MainWindow.url);
    }
}

module.exports = {
    MainWindow,
    showLast(){
        winManager.show();
    }
};

