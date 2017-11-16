const electron = require('electron');
// const {download} = require('electron-dl');
// const isDev = require('electron-is-dev');
const EventEmmiter = require('events');
let status = {
    focus_on_editor : false
}
global.globalEmmiter = new EventEmmiter();
globalEmmiter.on('focusEditor',val=>status.focus_on_editor=val);
globalEmmiter.on('context-menu',({e,props})=>{
    let win = electron.remote.getCurrentWindow()
    let webcontents = win.webContents || win.getWebContents();
    let {
        canCopy,
        canCut,
        canDelete,
        canPaste,
        canRedo,
        canSelectAll,
        canUndo,
    } = props.editFlags;
    let onEditor = status.focus_on_editor;
    // console.info(`[${+new Date}]focus_on_editor => ${status.focus_on_editor}`)

    let menuTpl = [{
        type: 'separator'
    }, {
        id: 'cut',
        label: '剪切',
        // Needed because of macOS limitation:
        // https://github.com/electron/electron/issues/5860
        role: canCut ? 'cut' : '',
        accelerator:'CommandOrControl+X',
        enabled: canCut,
        // visible: props.isEditable
    }, {
        id: 'copy',
        label: '复制',
        role: canCopy ? 'copy' : '',
        accelerator:'CommandOrControl+C',
        enabled: canCopy,
        // visible: props.isEditable || hasText
    }, {
        id: 'paste',
        label: '粘贴',
        accelerator:'CommandOrControl+V',
        role: canPaste ? 'paste' : '',
        enabled: canPaste,
    }, {
        type: 'separator'
    }];
    if(onEditor){
        menuTpl.unshift({
            id: 'changeAllSelected',
            label: '更改所有匹配项',
            accelerator:'CommandOrControl+F1',
            enabled: canCopy,
            click(){
                if (globalEmmiter.editor) globalEmmiter.editor.getAction('editor.action.selectHighlights')._run()
            }
        });
        
        menuTpl.push({
            id: 'transformToMarkdown',
            label: '转化为MARKDOWN',
            // accelerator:'CommandOrControl+T',
            click(){
                if (globalEmmiter.editor) globalEmmiter.editor.getAction('editor.action.transformToMarkdown')._run()
            }
        });
        menuTpl.push({
            type: 'separator'
        })
        menuTpl.push({
            id: 'showCommandLine',
            accelerator:'F1',
            label: '命令面板...',
            click(){
                if (globalEmmiter.editor) globalEmmiter.editor.getAction('editor.action.quickCommand')._run()
            }
        });
    }
    let menu = electron.remote.Menu.buildFromTemplate(menuTpl);
    menu.popup(win);
})


let win = electron.remote.getCurrentWindow()
let webcontents = win.webContents || win.getWebContents();
webcontents.on('context-menu', (e, props) => {
    setImmediate(()=>{
        globalEmmiter.emit('context-menu',{e,props})
    })
});