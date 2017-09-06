const { app } = require('electron')
const message = require('electron-nokogiri');
const { dialog } = require('electron');

const alert = (next, data) => {
    let {
        title,
        type, 
        buttons, 
        message, detail } = data;
        buttons= buttons||[{ label: '确定', value: true }];
    let Buttons = buttons.map(item => item.label);
    // if (buttons == undefined) buttons = [{ label: '确定', value: true }];
    // buttons.forEach(item => Buttons.push(item.label));
    dialog.showMessageBox({
        // title :title||"确定",
        type: type || 'info',
        buttons: Buttons,
        defaultId: 0,
        message: message,
        detail: detail
    }, function (aa) {
        next(buttons[aa].value);
    })
}

const comfirm = (next,data)=>{
    let {title,type,
        buttons,
        message,detail
    } = data;
    buttons = buttons || [{label:'取消',value:false},{label:'确定',value:true}];
    let Buttons = buttons.map(item => item.label);;
    dialog.showMessageBox({
        // title :title||"确定",
        type: type||'info',
        buttons :Buttons,
        defaultId:0,
        message : message,
        detail : detail
    }, function(aa){
        next(buttons[aa].value);
    })
}
app.on('ready', () => {
    message.use('system.alert', alert);
    message.use('system.confirm', comfirm);
    // message.use('project:historys:update',updateProjectHistrys);
    // message.use('project:historys:delete',deleteProjectHistrys);
});