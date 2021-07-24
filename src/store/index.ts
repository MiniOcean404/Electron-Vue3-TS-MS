import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './module/index'

import { InjectionKey } from 'vue'
import { State } from 'types/store/user.d.ts'

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore({
	plugins: [createPersistedState()],
	strict: process.env.NODE_ENV !== 'production',
	state: {},
	mutations: {},
	actions: {},
	modules
})
