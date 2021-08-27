import { defineComponent, ref, computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import Login from 'views/home/login/Login.tsx'
import Table from 'views/home/user-table/Table.tsx'
import { checkUser } from 'api/user'
import { cycleUser } from 'common/utils'
import { notification } from 'ant-design-vue'

export default defineComponent({
	name: 'Home',
	setup(props, context) {
		const store = useStore()
		const allUser = computed(() => store.getters['user/userInfo'])
		;(function checkAllUser() {
			if (allUser.value.length >= 0) {
				cycleUser(allUser.value, checkCookieValid)
			}
		})()

		function checkCookieValid(u: { name: string; cookie: string }) {
			checkUser(u.cookie).then((res: any) => {
				if (res.data !== 'false') {
					notification['error']({ message: `用户${u.name}的cookie已经失效，请重新登录` })
				}
			})
		}

		const Cookie = ref('')
		function alreadyLogin(cookie: string) {
			Cookie.value = cookie
			const pinId = cookie.match(/pinId=(.*?);/)?.[1]
			const nameEncode = cookie.match(/unick=(.*?);/)?.[1]
			let name: string
			if (nameEncode !== undefined) {
				name = window.decodeURIComponent(nameEncode)
			}

			checkUser(cookie).then((res: any) => {
				const info = {
					pinId,
					cookie,
					name,
					isLogin: '是',
					isPlusMember: res.data === true ? '是' : '否'
				}

				store.dispatch('user/saveAccount', info).then((r) => null)
			})
		}

		return {
			Cookie,
			alreadyLogin,
			allUser
		}
	},
	render() {
		const { alreadyLogin, allUser } = this
		return (
			<div>
				<Login onAlreadyLogin={alreadyLogin} />
				<Table tableData={allUser} />
			</div>
		)
	}
})
