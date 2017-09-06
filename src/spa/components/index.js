const date = require('./filter')
const editor = require( './editor.vue')
const cates = require( './cate.vue')
const appTitle = require( './app-title.vue')
module.exports = (Vue)=>{
    Vue.component(appTitle.name,appTitle);
    Vue.component(editor.name,editor);
    Vue.component(cates.name,cates);
    date(Vue)
}