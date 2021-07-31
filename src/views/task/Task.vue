<template>
	<div>
		<Button @clickButton="clickButton"></Button>
		<Table :data="taskInfo"></Table>
		<Dialog v-model:isShow="isShow"></Dialog>
	</div>
</template>

<script lang="ts">
import Button from 'views/task/child/Button.vue'
import Table from 'views/task/child/Table.vue'
import Dialog from 'views/task/child/Dialog.vue'
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'Task',
	components: {
		Button,
		Table,
		Dialog
	},
	setup(props, context) {
		const store = useStore()
		const isShow = ref(false)

		const taskInfo = ref(computed(() => store.getters['task/taskInfo']))

		function clickButton(v: string) {
			switch (v) {
				case '添加任务':
					isShow.value = true
					break
				case '删除所有任务':
					this.$store.commit('task/REMOVE_ALL')
					break
				case '停止所有任务':
					break
			}
		}

		return {
			taskInfo,
			isShow,
			clickButton
		}
	}
})
</script>

<style lang="scss" scoped></style>
