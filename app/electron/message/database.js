const {listen} = require('./factory');
const database = require('../database/adapter.js')
module.exports = function () {
    listen('db',function (event,argu) {
        let {chanelOnce,arg:{method,arg}} = argu;
        let arr = method.split('.');
        database[arr[0]][arr[1]](arg).then(function (result) {
            event.sender.send(chanelOnce,result);
        }).catch(function (error) {
            event.sender.send(chanelOnce,error);
        });
    });
};
