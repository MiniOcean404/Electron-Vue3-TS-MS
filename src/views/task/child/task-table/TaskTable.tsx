import { addGoodsToCart } from 'api/card'
import { computed, defineComponent, toRaw } from 'vue'
import { cycleUser } from 'common/utils'
import { UserInfo } from 'types/store'
import { useStore } from 'vuex'
import './index.scss'
import { notification } from 'ant-design-vue'

enum tip {
	Spike = '该商品是预约抢购商品，需要自行加入到购物车，并确保购物车里不含其他可提交商品',
	Reservation = '该商品是秒杀商品，会自动提交订单'
}

const actions = new Map([
	['Spike', 'orderSubmit'],
	['Reservation', 'killOrderSubmit']
])

const columns = [
	{
		title: '商品图', //标题
		dataIndex: 'imageSrc', //要取值的属性名
		slots: { customRender: 'img' } //自定义复杂slot，带scope
	},
	{
		dataIndex: 'name',
		key: 'name',
		slots: { customRender: 'name', title: 'customTitle' }
	},
	{
		title: 'skuId',
		dataIndex: 'skuId',
		key: 'skuId'
	},
	{
		title: '时间',
		dataIndex: 'buyDate',
		key: 'buyDate'
	},
	{
		title: '行为',
		width: 150,
		slots: { customRender: 'action' }
	}
]

export default defineComponent({
	name: 'TaskTable',
	props: {
		data: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			times: []
		}
	},
	setup(props: any, context: any) {
		const store = useStore()
		const allUser = computed(() => store.getters['user/userInfo'])
		const user = toRaw(allUser.value)

		function button(ButtonType: string, scope: any) {
			const index: number = scope.$index
			const { skuId, buyNumber, buyDate, taskType } = toRaw(scope.row)

			// check({
			// 	condition: ButtonType === '开始抢购' && allUser.value.length <= 0,
			// 	message: '还没有添加账号，添加账号后再进行抢购...'
			// })

			switch (ButtonType) {
				case '开始抢购':
					cycleUser(user, startGrab, skuId, buyNumber, taskType, buyDate)

					// ElNotification({ type: 'success', title: '成功', message: tip[taskType] })
					break
				case '删除':
					store.commit('task/REMOVE_SOME_ONE', index)
					notification['success']({ message: `删除成功` })
					break
			}
		}

		function startGrab(u: UserInfo, ...arg: object[]) {
			console.log(arg)
			if (Date.now() >= +new Date()) {
				// createOrder(u, skuId, buyNumber, taskType)
			} else {
				notification['info']({ message: `账号${u.name}抢购中，还未到抢购时间` })
			}

			// let taskTiming = setInterval(() => {
			// }, 10000)

			// this.times.push({
			//   pinId: u.pinId,
			//   skuId,
			//   // taskTiming
			// })
		}

		async function createOrder(u: UserInfo, skuId: string, buyNumber: number, taskType: string) {
			// const buyInfo = await getBuyInfo(u.cookie, skuId, buyNumber)

			addGoodsToCart(u.cookie, skuId, buyNumber).then((res: any) => {
				console.log(res, '下单接口返回')
			})

			const api: string | undefined = actions.get(taskType)
			let res: any
			if (api !== undefined) {
				// res = await taskApi[api](u.cookie, skuId, buyNumber, buyInfo)
			}

			if (res && res.success) {
				// this.stopTaskByAccount(u.pinId, skuId)

				notification['success']({ message: `恭喜,账号「${u.name}」已抢到,此账号不再参与本轮抢购~` })
			} else if (res && res.resultCode === 600158) {
				this.stopTaskBySku(skuId)

				notification['info']({ message: `商品库存已空，无法继续抢购,已清除当前任务相关的定时器` })
			} else {
				notification['info']({ message: `商品库存已空，无法继续抢购,已清除当前任务相关的定时器` })
			}
		}

		return {
			button,
			columns
		}
	},
	render() {
		const { data, button, columns } = this

		const content = {
			name: ({ text }: any) => <a>{text}</a>,
			customTitle: () => <span>标题</span>,
			img: ({ text }: any) => <img class="shop-img" src={text}></img>,
			action: (scope: any) => (
				<div>
					<a onClick={button.bind(this, '开始抢购', scope)}>开始抢购</a>
					<a-divider type="vertical" />
					<a onClick={button.bind(this, '删除', scope)}>删除</a>
				</div>
			)
		}

		return (
			<div>
				<a-table id="ms" columns={columns} data-source={data} rowKey="skuId" v-slots={content} />
			</div>
		)
	}
})
