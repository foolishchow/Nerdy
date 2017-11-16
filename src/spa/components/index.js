const date = require('./filter')
const editor = require('./editor.vue')
const cates = require('./cate.vue')
const appTitle = require('./app-title.vue')
const resizePanel = require('./resize-panel.vue')
const cateList = require('./cate-list.vue')
const noteList = require('./note-list.vue')

module.exports = (Vue) => {
    Vue.component(appTitle.name, appTitle);
    Vue.component(editor.name, editor);
    Vue.component(cates.name, cates);
    Vue.component(resizePanel.name, resizePanel);
    Vue.component(cateList.name, cateList);
    Vue.component(noteList.name, noteList);
    date(Vue)
}
