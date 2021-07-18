<template>
	<div>
		<el-page-header @back="goBack" content="登录二维码"></el-page-header>
		<GetCookie></GetCookie>
	</div>
</template>

<script lang="ts">
// 引入对应的声明类型及对应的函数
import { defineComponent } from 'vue'
import GetCookie from '@/views/getCookie.vue'

export default defineComponent({
	name: 'Home',
	components: {
		GetCookie
	},
	data() {
		return {}
	},
	setup(data, content) {
		const goBack = () => {
			console.log('go back')
		}

		return {
			goBack
		}
	}
})
</script>

<style lang="scss" scoped></style>
