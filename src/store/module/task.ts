import { Module } from 'vuex'
import { State } from '@/store'
import { TaskInfo } from '@/types/store'

const initTaskInfo = {
	taskInfo: [] as TaskInfo[]
}

// 从值里推断出类型
export type TaskInfoState = typeof initTaskInfo

export default {
	namespaced: true,
	// state: () => ({ taskInfo: [] }),
	state: initTaskInfo,

	getters: {
		taskInfo(state) {
			return state.taskInfo
		}
	},

	mutations: {
		SAVE_TASK_INFO(state, info: TaskInfo) {
			if (typeof info === 'object') {
				state.taskInfo.push(info)
			}
		},

		REMOVE_ALL(state) {
			state.taskInfo.length = 0
		},

		REMOVE_SOME_ONE(state, index: number) {
			state.taskInfo.splice(index, 1)
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, info: TaskInfo) {}
	}
} as Module<TaskInfoState, State>
