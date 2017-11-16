const {Vuex} = window;
const config = require( './modules/config')

const store = new Vuex.Store({
    modules: {
        config
    }
})
module.exports = store;
// module.exports = store
