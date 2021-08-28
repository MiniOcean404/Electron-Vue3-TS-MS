import { defineComponent, defineEmits, defineProps, computed, reactive, render } from 'vue'
import { useStore } from 'vuex'
import { notification } from 'ant-design-vue'
import './index.scss'

const columns = [
	{
		dataIndex: 'name',
		key: 'name',
		slots: { customRender: 'name', title: 'customTitle' }
	},
	{
		title: '是否登录',
		dataIndex: 'isLogin',
		key: 'isLogin'
	},
	{
		title: '是否会员',
		dataIndex: 'isPlusMember',
		key: 'isPlusMember'
	},
	{
		title: '行为',
		key: 'action',
		slots: { customRender: 'action' }
	}
]

export default defineComponent({
	name: 'Table',
	emit: ['deleteAccount'],
	props: {
		tableData: {
			type: Array,
			default: []
		}
	},
	setup(props, context) {
		const store = useStore()
		const isHaveContent = computed(() => props.tableData.length)

		function deleteAccount(scope: any) {
			const index = scope.index
			const row = scope.record
			store.commit('user/REMOVE_SOME_ONE', index)
			notification['success']({ message: '删除成功' })
		}

		return {
			deleteAccount,
			columns
		}
	},
	render() {
		const { tableData, deleteAccount, data, columns } = this

		const content = {
			name: ({ text }: any) => <a>{text}</a>,
			customTitle: () => <span>姓名</span>,
			action: (scope: any) => (
				<a-button class="login-button" type="primary" onClick={deleteAccount.bind(this, scope)}>
					删除
				</a-button>
			)
		}

		return (
			<div>
				<a-table columns={columns} data-source={tableData} rowKey="pinId" v-slots={content} />
			</div>
		)
	}
})
