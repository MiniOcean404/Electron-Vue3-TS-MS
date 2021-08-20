
import { defineComponent, ref, computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import Login from 'views/home/child/login/Login.tsx'
import Table from 'views/home/child/user-table/Table.tsx'
import { checkUser } from 'api/user'

export default defineComponent({
	name: 'Home',
	setup(props, context) {
		// const tableData: Ref<object[]> = ref([])
		const store = useStore()
		const Cookie = ref('')
		const allUser = computed(() => store.getters['user/userInfo'])

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

				store.dispatch('user/saveAccount', info).then((r) => console.log(r))
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
				<Login onAlreadyLogin={alreadyLogin}> </Login>
				<Table tableData={allUser}> </Table>
			</div>
		)
	}
})
