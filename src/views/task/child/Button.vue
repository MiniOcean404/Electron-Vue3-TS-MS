<template>
	<div class="task-button">
		<el-button type="primary" @click="$emit('clickButton', '添加任务')">添加任务</el-button>
		<el-button type="primary" @click="$emit('clickButton', '删除所有任务')">删除所有任务</el-button>
		<el-button type="primary" @click="stopAllTask">停止所有任务</el-button>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Button',
	inheritAttrs: false, //禁止在第一层div中继承attr ，可以使用v-bind='$attrs在某个节点进行绑定'
	setup(props: any, context: any) {
		function stopAllTask() {
			context.emit('clickButton', '停止所有任务')
		}
		return {
			stopAllTask
		}
	}
}
</script>

<style lang="scss" scoped>
.task-button {
	margin: 10px 0 20px 20px;
}
</style>
