import { State } from '@/store'
import { Timer } from 'types/store'
import { Module } from 'vuex'

const initTimer = {
	timer: [] as Timer[]
}

export type TimerState = typeof initTimer

export default {
	namespaced: true,
	state: () => ({ timer: [] }),

	getters: {
		times(state) {
			return state.timer
		}
	},

	mutations: {
		SAVE_Time(state, time: Timer) {
			state.timer.push(time)
		},

		REMOVE_ALL(state) {
			state.timer.length = 0
		}
	},

	actions: {
		saveTime({ commit }: { commit: Function }, time: Timer) {
			commit('SAVE_Time', time)
		}
	}
} as Module<TimerState, State>
