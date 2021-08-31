import { Module } from 'vuex'
import { State } from '@/store'
import { UserInfo, AccountState } from 'types/store'
import { notification } from 'ant-design-vue'

export default {
	namespaced: true,

	state: {
		account: []
	},

	getters: {
		userInfo(state) {
			return state.account
		}
	},

	mutations: {
		SAVE_OR_UPDATE(state, userInfo: UserInfo) {
			const index = state.account.findIndex((i: any) => {
				if (i.name === userInfo.name) {
					notification['error']({ message: `账号已经添加，请不要重复添加同一账号` })
				}
			})

			if (index === -1) {
				state.account.push(userInfo)
				notification['success']({ message: '账号已添加' })
			}
		},

		REMOVE_All(state) {
			state.account.length = 0
		},

		REMOVE_SOME_ONE(state, index: number) {
			state.account.splice(index, 1)
		}
	},

	actions: {
		saveAccount({ commit }: { commit: Function }, userInfo: UserInfo) {
			commit('SAVE_OR_UPDATE', userInfo)
		}
	}
} as Module<AccountState, State>
