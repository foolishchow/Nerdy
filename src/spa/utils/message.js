const confirm = (obj)=>{
    return ((msg,callback)=>{
        message.send("confirm",{
            type: 'question',
            message : msg
        },function (event,arg) {
            if(callback != undefined) callback(arg);
        });
    }).bind(obj)
};
const alert = (obj)=>{
    return ((msg,callback)=>{
        message.send("alert",{
            type: 'info',
            message : msg
        },function (event,arg) {
            if(callback != undefined) callback(arg);
        });
    }).bind(obj)
};
const db = (obj)=>{
    return ((method,arg,callback)=>{
        message.send("db",{
            method,
            arg
        },function (event,arg) {
            if(callback != undefined) callback(arg);
        });
    }).bind(obj)
};

const config = (obj)=>{
    return ((method,arg,callback)=>{
        message.send('config',{
            method,
            arg
        },function (event,arg) {
            if(callback != undefined) callback(arg);
        });
    }).bind(obj);
}
var install = (Vue)=> {
    if (install.installed) return
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        $confirm: {
            get() {
                return confirm(this);
            }
        },
        $alert:{
            get() {
                return alert(this);
            }
        },
        $db:{
            get(){
                return db(this);
            }
        },
        $config:{
            get(){
                return config(this);
            }
        }
    });
};

let Message = {install};

export default Message;