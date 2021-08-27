import { State } from '@/store'
import { UserInfo } from 'types/store'

export default {
	namespaced: true,
	state: () => ({ timer: [] }),

	getters: {
		times(state: State) {
			return state.timer
		}
	},

	mutations: {
		SAVE_Time(state: State, time: object) {
			state.timer.push(time)
		},

		REMOVE_ALL(state: State) {
			state.timer.length = 0
		}
	},

	actions: {
		saveTime({ commit }: { commit: Function }, time: object) {
			commit('SAVE_Time', time)
		}
	}
}
