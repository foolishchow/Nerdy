const {listen,send} = require('./factory');
const alert = require('./alert');
const confirm = require('./confirm');
const db = require('./database');
const config = require('./config.js')
module.exports = {
    listen,
    send,
    register(){
        alert();
        confirm();
        db();
        config();
    }
}