<template>
	<div id="content">
		<Menu></Menu>
		<router-view class="main" />
	</div>
</template>

<script lang="ts">
import Menu from '@/components/menu.vue'

export default {
	name: 'Vue',
	components: {
		Menu
	},
	data() {
		return {}
	}
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
	.main {
		width: 100%;
	}
}
</style>
