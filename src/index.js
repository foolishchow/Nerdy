import vuex from 'vuex'
// Vue.use(vuex);
import store from './spa/store'
import message from './spa/utils/message.js';
Vue.use(message);
import components from './spa/components/index.js';
components(Vue);
import  app from './spa/app.vue'
const App = Vue.extend(app);
window.app = new App({
    store
}).$mount("#root");

