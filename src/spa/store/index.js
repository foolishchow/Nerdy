const {Vuex} = window;
import config from './modules/config'

const store = new Vuex.Store({
    modules: {
        config
    }
})

export default store
