import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { InjectionKey } from 'vue'
import modules from './module/index'
import { TaskInfoState } from './module/task'
import { TimerState } from './module/timer'
import { AccountState } from 'types/store'

export type State = {
	account?: AccountState
	taskInfo?: TaskInfoState
	timer?: TimerState
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()
// 定义自己的 `useStore` 组合式函数
export function useStore() {
	return baseUseStore(key)
}

export default createStore({
	plugins: [createPersistedState()],
	strict: process.env.NODE_ENV !== 'production',
	state: {},
	mutations: {},
	actions: {},
	modules
})
