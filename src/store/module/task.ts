import { UserInfo, State } from 'types/store/module.d.ts'

export default {
	namespaced: true,
	state: {
		taskInfo: []
	},

	getters: {
		taskInfo(state: State) {
			return state.taskInfo
		}
	},

	mutations: {
		SAVE_TASK_INFO(state: State, info: object) {
			if (typeof info === 'object') {
				state.taskInfo.push(info)
			}
		},

		REMOVE_ALL(state: State) {
			state.taskInfo.length = 0
		},
		REMOVE_SOME_ONE(state: State, index) {
			state.taskInfo.splice(index, 1)
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, userInfo: UserInfo) {}
	}
}
