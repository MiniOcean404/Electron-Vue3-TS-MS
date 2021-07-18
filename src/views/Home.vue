<template>
	<div id="name"></div>
</template>

<script lang="ts">
const { ipcRenderer } = window.require('electron')
const PATH = window.require('path')
// 引入对应的声明类型及对应的函数
import { defineComponent, triggerRef, watchEffect, ref, shallowRef, getCurrentInstance } from 'vue'

export default defineComponent({
	name: 'Home',
	setup(data, content) {
		ipcRenderer.send('test', 2)
	}
})
</script>

<style lang="scss" scoped></style>
