import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
	plugins: [createPersistedState()],
	state: {},
	mutations: {},
	actions: {},
	modules: {}
})
