import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TaskButton from 'views/task/task-button/TaskButton.tsx'
import TaskTable from 'views/task/task-table/TaskTable.tsx'
import TaskDialog from 'views/task/dialog/Dialog.tsx'

export default defineComponent({
	name: 'Task',
	components: {
		TaskButton,
		TaskTable,
		TaskDialog
	},
	setup(props, ctx) {
		const store = useStore()
		const taskInfo = ref(computed(() => store.getters['task/taskInfo']))
		const isShow = ref<boolean>(false)

		function clickButton(v: string) {
			switch (v) {
				case '添加任务':
					isShow.value = true
					break
				case '删除所有任务':
					store.commit('task/REMOVE_ALL')
					break
				case '停止所有任务':
					break
			}
		}

		return () => (
			<div>
				<task-button onClickButton={clickButton} />
				<task-table data={taskInfo.value} />
				{/*render函数中使用有问题，暂时性解决*/}
				<task-dialog v-model={[isShow.value, 'isShow']} />
			</div>
		)
	}
})
