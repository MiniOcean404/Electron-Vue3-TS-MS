import { defineComponent, getCurrentInstance } from 'vue'
import './index.scss'

export default defineComponent({
	name: 'TaskButton',
	inheritAttrs: false, //禁止在第一层div中继承attr ，可以使用v-bind='$attrs在某个节点进行绑定'
	setup(props: any, context: any) {
		// const ComponentInternalInstance = getCurrentInstance() //获取调用该方法的vue实例
		// if (ComponentInternalInstance !== null) {
		// 	ComponentInternalInstance.$store.commit()
		// }
		function stopAllTask() {
			context.emit('clickButton', '停止所有任务')
		}
		return {
			stopAllTask
		}
	},
	render() {
		const { stopAllTask, $emit } = this
		return (
			<div>
				<div class="task-button">
					<a-button class="task-item-button" type="primary" onClick={$emit.bind(this, 'clickButton', '添加任务')}>
						添加任务
					</a-button>
					<a-button class="task-item-button" type="primary" onClick={$emit.bind(this, 'clickButton', '删除所有任务')}>
						删除所有任务
					</a-button>
					<a-button class="task-item-button" type="primary" onClick={stopAllTask}>
						停止所有任务
					</a-button>
				</div>
			</div>
		)
	}
})
