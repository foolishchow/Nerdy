const {app, Menu} = require('electron')

const template = [
    {
        label: '修改',
        submenu: [
            {role: 'undo',label:'撤销'},
            {role: 'redo',label:'恢复'},
            {type: 'separator'},
            {role: 'cut',label:'剪切'},
            {role: 'copy',label:'复制'},
            {role: 'paste',label:'粘贴'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete',label:'删除'},
            {role: 'selectall',label:'全选'}
        ]
    },
    {
        label: '视图',
        submenu: [
            {role: 'reload',label:'重新加载'},
            {role: 'forcereload',label:'刷新缓存'},
            {role: 'toggledevtools',label:'开发工具'},
            {type: 'separator'},
            {role: 'resetzoom',label:'原始窗口'},
            {role: 'zoomin',label:'缩小窗口'},
            {role: 'zoomout',label:'放大窗口'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        label:'窗口',
        submenu: [
            {role: 'minimize',label:'最小化'},
            {role: 'close',label:'关闭'}
        ]
    },
    {
        role: 'help',
        label:'帮助',
        submenu: [
            {
                label: '更多',
                click () { require('electron').shell.openExternal('https://github.com/foolishchow/Nerdy/') }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about',label:'关于'},
            {type: 'separator'},
            {
                role: 'services',
                label:'服务',
                submenu: []
            },
            {type: 'separator'},
            {role: 'hide',label:'隐藏'},
            {role: 'hideothers',label:'隐藏其他'},
            {role: 'unhide',label:'显示全部'},
            {type: 'separator'},
            {role: 'quit',label:'退出'}
        ]
    })
    // Window menu.
    template[3].submenu = [
        {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: '缩放',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: '展示全部',
            role: 'front'
        }
    ]
}

module.exports =  Menu.buildFromTemplate(template);
