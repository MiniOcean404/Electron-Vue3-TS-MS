<template>
	<component :is="Login" @AlreadyLogin="alreadyLogin"></component>
	<Table :data="allUser"></Table>
</template>

<script setup lang="ts">
// 引入对应的声明类型及对应的函数
import Login from 'views/home/child/Login.vue'
import Table from 'views/home/child/Table.vue'
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex' // setup专用
import { checkUser } from 'api/user'

const store = useStore()

// const tableData: Ref<object[]> = ref([])
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
		store.dispatch('user/saveAccount', info)
	})
}
</script>

<style lang="scss" scoped></style>
