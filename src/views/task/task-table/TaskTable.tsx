import { addGoodsToCart } from 'api/card'
import { computed, defineComponent, reactive, toRaw } from 'vue'
import { check, clearAllTime, cycleUser } from 'common/utils'
import { UserInfo } from 'types/store'
import { useStore } from 'vuex'
import './index.scss'
import { notification } from 'ant-design-vue'
import moment from 'moment'
import { columns, actions } from './table-config'

enum tip {
	Spike = '该商品是预约抢购商品，需要自行加入到购物车，并确保购物车里不含其他可提交商品',
	Reservation = '该商品是秒杀商品，会自动提交订单'
}

export default defineComponent({
	name: 'TaskTable',
	props: {
		data: {
			type: Array,
			default: []
		}
	},
	setup(props: any, context: any) {
		const store = useStore()
		const allUser = computed(() => store.getters['user/userInfo'])
		const times = computed(() => store.getters['timer/times'])
		const user = toRaw(allUser.value)
		// const times = reactive<Array<object>>([])

		function button(ButtonType: string, scope: any) {
			check(undefined, [
				{
					type: 'isBoole',
					condition: ButtonType === '开始抢购' && allUser.value.length <= 0,
					message: '还没有添加账号，添加账号后再进行抢购...'
				}
			])

			const index: number = scope.index
			const { skuId, buyNumber, buyDate, taskType, timing } = toRaw(scope.record)

			switch (ButtonType) {
				case '开始抢购':
					cycleUser(user, startGrab, skuId, buyNumber, taskType, buyDate, timing)
					break
				case '删除':
					store.commit('task/REMOVE_SOME_ONE', index)
					notification['success']({ message: `删除成功` })
					break
			}
		}

		async function startGrab(u: UserInfo, ...arg: [string, number, string, string, number]) {
			const isAdd = times.value?.findIndex((i: any) => {
				return i.pinId === u.pinId
			})

			const [skuId, buyNumber, taskType, buyDate, timing] = arg

			if (!moment(Date.now()).isBefore(buyDate)) {
				// * 超过购买时间
				await createOrder(u, skuId, buyNumber, taskType)
			} else if (times.value?.length > 0 && isAdd > -1) {
				// * 已经添加了定时器
				notification['info']({ message: `账号${u.name}的任务进行中，还未到抢购时间` })
			} else if (moment(Date.now()).isBefore(buyDate) && isAdd === -1) {
				// * 购买时间还没到
				let taskTiming = setInterval(async () => {
					await createOrder(u, skuId, buyNumber, taskType)
				}, timing)

				await store.dispatch('timer/saveTime', {
					pinId: u.pinId,
					skuId,
					taskTiming
				})
			}
		}

		async function createOrder(u: UserInfo, skuId: string, buyNumber: number, taskType: string) {
			await addGoodsToCart(u.cookie, skuId, buyNumber)
			const api: Function | undefined = actions.get(taskType)
			let res: any
			if (api !== undefined) {
				res = await api(u.cookie)
			}

			if (res && res.success) {
				notification['success']({ message: `恭喜,账号「${u.name}」已抢到,此账号不再参与本轮抢购~` })
			} else if (res && res.resultCode === 600158) {
				clearAllTime(times.value)
				store.commit('timer/REMOVE_ALL')
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
			img: ({ text }: any) => <img class="shop-img" src={text} alt="" />,
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
