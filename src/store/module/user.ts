import { State } from '@/store'
import { UserInfo } from 'types/store'
import { notification } from 'ant-design-vue'

export default {
	namespaced: true,
	state: {
		account: []
	},

	getters: {
		userInfo(state: State) {
			return state.account
		}
	},

	mutations: {
		SAVE_OR_UPDATE(state: State, { pinId, name, cookie, isLogin, isPlusMember }: UserInfo) {
			state.account.findIndex((i: any) => {
				if (i.name === name) {
					notification['error']({ message: `账号已经添加，请不要重复添加同一账号` })
				} else {
					state.account.push({
						pinId,
						name,
						cookie,
						isLogin,
						isPlusMember
					})
					notification['success']({ message: '账号已添加' })
				}
			})
		},

		REMOVE_All(state: State) {
			state.account.length = 0
		},

		REMOVE_SOME_ONE(state: State, index: number) {
			state.account.splice(index, 1)
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, userInfo: UserInfo) {
			commit('SAVE_OR_UPDATE', userInfo)
		}
	}
}
