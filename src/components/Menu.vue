<template>
	<a-menu style="width: 256px" mode="vertical" @click="handleClick">
		<a-menu-item key="home">登录</a-menu-item>
		<a-menu-item key="task">秒杀</a-menu-item>
		<a-menu-item key="jdTime">服务器时间</a-menu-item>

		<!--		<a-sub-menu key="home" title="登录">-->
		<!--			<a-menu-item key="3">儿子</a-menu-item>-->

		<!--			<a-sub-menu key="sub1-2" title="子菜单">-->
		<!--				<a-menu-item key="5">孙子菜单选项</a-menu-item>-->
		<!--			</a-sub-menu>-->
		<!--		</a-sub-menu>-->
	</a-menu>
</template>

<script lang="ts" setup>
import { reactive, toRefs, VNodeChild } from 'vue'
import { useRouter } from 'vue-router'
import { MenuInfo } from 'types/common/menu'

const router = useRouter()

const handleClick = (e: MenuInfo) => {
	router.push({ name: e.key })
}
</script>

<style lang="scss" scoped>
.side {
	min-width: 200px;
	height: 100%;
}
</style>
