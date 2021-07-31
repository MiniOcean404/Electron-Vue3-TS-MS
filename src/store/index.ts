import { createStore, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { InjectionKey } from 'vue'
import { State } from 'types/store/module.d.ts'
import modules from './module/index'

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
