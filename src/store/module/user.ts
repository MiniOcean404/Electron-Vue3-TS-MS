import { UserInfo, State } from 'types/store/user.d.ts'
import { checkUser } from 'api/user'

export default {
	namespaced: true,
	state: {
		account: {}
	},

	getters: {
		userInfo(state: State) {
			return state.account
		}
	},

	mutations: {
		SAVE_OR_UPDATE(state: State, { pinId, name, cookie, isLogin, isPlusMember }: UserInfo) {
			state.account = {
				pinId,
				name,
				cookie,
				isLogin,
				isPlusMember
			}
		},

		REMOVE(state: State) {
			state.account = {}
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, userInfo: UserInfo) {
			commit('SAVE_OR_UPDATE', userInfo)
		}
	}
}
