const {listen} = require('./factory');
const {dialog} = require('electron');
module.exports = function () {
    listen('alert',function (event,arg) {
        let {title,type,buttons,message,detail} = arg.arg;
        let Buttons = [];
        if(buttons == undefined) buttons = [{label:'确定',value:true}];
        buttons.forEach(item => Buttons.push(item.label));
        dialog.showMessageBox({
            // title :title||"确定",
            type: type||'info',
            buttons :Buttons,
            defaultId:0,
            message : message,
            detail : detail
        }, function(aa){
            event.sender.send(arg.chanelOnce,buttons[aa].value);
        })
    });
};
