import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { InjectionKey } from 'vue'
import modules from './module/index'

export interface State {
	account: object[]
	shopInfo: object[]
	taskInfo: object[]
	timer: object[]
}

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

// 定义自己的 `useStore` 组合式函数
export function useStore() {
	return baseUseStore(key)
}
