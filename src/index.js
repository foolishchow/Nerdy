require('./fonts/iconfont.css');
require('github-markdown-css/github-markdown.css');
const store = require('./spa/store');

// const message = require('./spa/utils/message.js') ;
// Vue.use(message);

const clickOutSide = require( './spa/utils/clickoutside');
Vue.directive('click-outside',clickOutSide);


const components = require( './spa/components/index.js');
components(Vue);


const  app = require( './spa/app.vue')
// const App = Vue.extend(app);
window.App = new Vue({
    render(h){
        return h(app);
    },
    data:{},
    store
}).$mount("#root");

