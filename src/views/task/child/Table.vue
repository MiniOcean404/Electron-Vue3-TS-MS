<template>
	<el-table :data="data" style="width: 100%" height="90%" stripe border>
		<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>

		<el-table-column label="SkuId" width="120" prop="shopId" align="center"></el-table-column>

		<el-table-column label="商品图" width="100" align="center">
			<template #default="scope">
				<img class="shop-img" alt="" :src="scope.row.imageSrc" />
			</template>
		</el-table-column>

		<el-table-column label="标题" prop="name" align="center"></el-table-column>

		<el-table-column label="价格" prop="shopPrice" width="100" align="center"></el-table-column>

		<el-table-column label="库存状况" prop="shopStoreState" width="80" align="center"></el-table-column>

		<el-table-column label="时间" prop="buyDate" width="200" align="center"></el-table-column>

		<el-table-column width="120">
			<template #default="scope">
				<el-button type="primary" @click="button('开始抢购', scope)">开始抢购</el-button>
			</template>
		</el-table-column>

		<el-table-column width="100">
			<template #default="scope">
				<el-button type="primary" @click="button('删除', scope)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script lang="ts">
import { defineEmits, defineProps, computed, toRaw, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import taskApi, { getBuyInfo } from 'api/order'
import { addGoodsToCart } from 'api/card'

enum tip {
	Spike = '该商品是预约抢购商品，需要自行加入到购物车，并确保购物车里不含其他可提交商品',
	Reservation = '该商品是秒杀商品，会自动提交订单'
}

const actions = new Map([
	['Spike', 'orderSubmit'],
	['Reservation', 'killOrderSubmit']
])

export default {
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
	setup(props, context) {
		const store = useStore()
		const isHaveContent = computed(() => props.data.length)
		const allUser = computed(() => store.getters['user/userInfo'])

		function button(ButtonType, scope) {
			const index: number = scope.$index
			const { shopId, buyNumber, isTiming, buyDate, taskType } = toRaw(scope.row)

			switch (ButtonType) {
				case '开始抢购':
					if (allUser.value.length <= 0) {
						ElNotification({ type: 'info', title: '成功', message: '还没有添加账号，添加账号后再进行抢购' })
						return
					}

					const user = toRaw(allUser.value)
					user.forEach((u) => {
						if (!isTiming || (isTiming && +Date.now() >= +new Date(buyDate))) {
							createOrder(u, shopId, buyNumber, taskType)
							return
						}
						ElNotification({ type: 'info', title: '成功', message: `账号${u.name}抢购中，还未到抢购时间` })

						// let taskTiming = setInterval(() => {
						// }, 10000)

						// this.times.push({
						//   pinId: u.pinId,
						//   shopId,
						//   // taskTiming
						// })
					})

					ElNotification({ type: 'success', title: '成功', message: tip[taskType] })
					break
				case '删除':
					store.commit('task/REMOVE_SOME_ONE', index)
					ElNotification({ type: 'success', title: '成功', message: '删除成功' })
					break
			}
		}

		return {
			button,
			isHaveContent
		}
	}
}

async function createOrder(u, shopId, buyNumber, taskType) {
	// const buyInfo = await getBuyInfo(u.cookie, shopId, buyNumber)

	addGoodsToCart(u.cookie, shopId, buyNumber).then((res) => {
		console.log(res, '下单接口返回')
	})

	const api: string | undefined = actions.get(taskType)
	let res
	if (api !== undefined) {
		// res = await taskApi[api](u.cookie, shopId, buyNumber, buyInfo)
	}

	if (res && res.success) {
		// this.stopTaskByAccount(u.pinId, shopId)

		ElNotification({
			type: 'success',
			title: '成功',
			message: `恭喜,账号「${u.name}」已抢到,此账号不再参与本轮抢购~`
		})
	} else if (res && res.resultCode === 600158) {
		this.stopTaskBySku(shopId)

		ElNotification({
			type: 'info',
			title: '提示',
			message: `商品库存已空，无法继续抢购,已清除当前任务相关的定时器`
		})
	} else {
		ElNotification({
			type: 'info',
			title: '提示'
			// message: res.message
		})
	}
}
</script>

<style lang="scss" scoped>
.shop-img {
	width: 5em;
	height: 5em;
	border-radius: 50%;
	margin: auto;
}
</style>
