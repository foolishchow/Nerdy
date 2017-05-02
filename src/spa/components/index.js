import date from './filter'
import editor from './editor.vue'
import cates from './cate.vue'
import appTitle from './app-title.vue'
export default (Vue)=>{
    Vue.component(appTitle.name,appTitle);
    Vue.component(editor.name,editor);
    Vue.component(cates.name,cates);
    date(Vue)
}