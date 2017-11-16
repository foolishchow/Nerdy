const { app } = require('electron')
const message = require('electron-nokogiri');

const database = require('../database')


const get = (next,data,param)=>{
    let {table,method} = param;
    database[table][method](data).then(function (result) {
        next(result);
    }).catch(function (error) {
        next(error);
    });
}
app.on('ready', () => {
    message.use('db/:table/:method', get);
});