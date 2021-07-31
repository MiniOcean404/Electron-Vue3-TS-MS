<template>
	<el-menu default-active="1" class="side" router @open="handleOpen" @close="handleClose">
		<el-menu-item index="/">
			<i class="el-icon-menu"></i>
			<span slot="title">登录</span>
		</el-menu-item>

		<el-menu-item index="/task">
			<i class="el-icon-menu"></i>
			<span slot="title">秒杀</span>
		</el-menu-item>

		<el-menu-item index="/jdTime">
			<i class="el-icon-menu"></i>
			<span slot="title">服务器时间</span>
		</el-menu-item>
	</el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const isCollapse = ref(true)
		const handleOpen = (key: string, keyPath: string) => {
			console.log(key, keyPath)
		}
		const handleClose = (key: string, keyPath: string) => {
			console.log(key, keyPath)
		}
		return {
			isCollapse,
			handleOpen,
			handleClose
		}
	}
})
</script>

<style lang="scss" scoped>
.side {
	min-width: 200px;
	height: 100%;
}
</style>
