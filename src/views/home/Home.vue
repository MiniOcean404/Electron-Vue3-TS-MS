<template>
	<Login @AlreadyLogin='alreadyLogin'></Login>
	<Table @deleteHandle='deleteHandle' :data='tableData'></Table>
</template>

<script>
// 引入对应的声明类型及对应的函数
import { defineComponent, reactive } from 'vue'
import Login from 'views/home/child/Login.vue'
import Table from 'views/home/child/Table.vue'
import { checkUser } from 'api/user'


export default defineComponent({
	name: 'Home',
	components: {
		Login,
		Table
	},
	created() {
		this.getInfo()
	},
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		getInfo() {
			checkUser(value).then((res) => {
				const info = this.$store.getters['user/userInfo']
				if (info.name) {
					this.tableData = reactive([info])
				}
			}).catch(e => {
				console.log(e)
				this.$store.commit('user/REMOVE')
			})
		},

		alreadyLogin(cookie) {
			const pinId = cookie.match(/pinId=(.*?);/)[1]
			const nameEncode = cookie.match(/unick=(.*?);/)[1]
			let name
			if (nameEncode !== undefined) {
				name = window.decodeURIComponent(nameEncode)
			}

			checkUser(cookie).then((res) => {
				const info = {
					pinId,
					cookie,
					name,
					isLogin: '是',
					isPlusMember: res.data === true ? '是' : '否'
				}
				this.tableData = reactive([info])
				this.$store.dispatch('user/saveAccount', info)
			})
		},

		deleteHandle() {
			this.tableData = reactive([])
		}
	}
})
</script>

<style lang='scss' scoped></style>
