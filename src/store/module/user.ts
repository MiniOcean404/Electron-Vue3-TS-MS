import { UserInfo, State } from 'types/store/module.d.ts'

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
			state.account.push({
				pinId,
				name,
				cookie,
				isLogin,
				isPlusMember
			})
		},

		REMOVE_All(state: State) {
			state.account.length = 0
		},
		REMOVE_SOME_ONE(state: State, index) {
			state.account.splice(index, 1)
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, userInfo: UserInfo) {
			commit('SAVE_OR_UPDATE', userInfo)
		}
	}
}
