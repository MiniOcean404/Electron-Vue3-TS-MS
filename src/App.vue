<template>
	<div id="content">
		<Menu></Menu>
		<main>
			<el-page-header @back="goBack" content="登录二维码"></el-page-header>
			<router-view class="main" />
		</main>
	</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import Menu from 'components/Menu.vue'

const emit = defineEmits(['goBack'])
const goBack = () => {
	console.log('go back')
}
</script>

<style lang="scss">
body,
html,
#app,
#content {
	width: 100%;
	height: 100%;
}
#content {
	display: flex;
	main {
		width: 100%;
	}
}
</style>
