import { defineComponent, isReactive, reactive, ref, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { check } from 'common/utils'
import { getItemInfo } from 'api/task'
import { getShopPrice, getShopStore } from 'api/shop'
import { CheckContent } from 'types/common'

const formModule = {
	taskType: 'Spike',
	buyDate: '',
	skuId: '',
	address: '',
	buyNumber: 1
}

const option = [
	{
		value: 'Spike',
		label: '预约抢购'
	},
	{
		value: 'Reservation',
		label: '秒杀商品'
	}
]

export default defineComponent({
	name: 'Dialog',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:isShow'],
	setup(props, ctx) {
		const store = useStore()
		let form = reactive(JSON.parse(JSON.stringify(formModule)))
		const typeOption = reactive(option)

		watch(
			() => props.isShow,
			(value, prevCount) => {
				form = reactive(JSON.parse(JSON.stringify(formModule)))
			}
		)

		async function operate(v: string) {
			switch (v) {
				case 'sure':
					check({ name: form.skuId, message: '商品ID不能为空' })
					check({ name: form.buyDate, message: '抢购时间不能为空' })

					// 获取商品信息DOM
					const res = await getItemInfo(form.skuId)
					// todo 地址不对
					const shopStore = await getShopStore('19_1601_36953_62867', form.skuId)
					const shopPrice = await getShopPrice(form.skuId)

					const taskInfo = Object.assign({}, form, res.data, {
						shopStoreState: JSON.parse(shopStore.data)[form.skuId].StockStateName,
						shopPrice: shopPrice.data[0].op
					})
					store.commit('task/SAVE_TASK_INFO', taskInfo)
					break
				case 'cancel':
					break
			}

			ctx.emit('update:isShow', false)
		}

		function beforeClose() {
			ElMessageBox.confirm('确认关闭？').then((_) => {
				ctx.emit('update:isShow', false)
			})
		}

		return {
			operate,
			beforeClose,
			typeOption,
			form
		}
	},
	render(createElement: any) {
		const { operate, beforeClose, form, typeOption, isShow } = this

		const footer = {
			footer: () => (
				<span class="dialog-footer">
					<el-button onClick={operate.bind(this, 'cancel')}>取 消</el-button>
					<el-button type="primary" onClick={operate.bind(this, 'sure')}>
						确 定
					</el-button>
				</span>
			)
		}

		return (
			<div>
				<el-dialog
					v-model={isShow}
					onBeforeClose={beforeClose}
					title="添加任务"
					width="40%"
					center={true}
					v-slots={footer}>
					<el-form ref="form" model={form} label-width="80px">
						<el-form-item label="抢购类型">
							<el-select v-model={form.taskType} placeholder="请选择" style="width: 100%">
								{typeOption.map((item: any) => {
									return <el-option key={item.value} label={item.label} value={item.value} />
								})}
							</el-select>
						</el-form-item>

						<el-form-item label="抢购时间" required={true}>
							<el-date-picker
								v-model={form.buyDate}
								placeholder="选择日期时间"
								type="datetime"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</el-form-item>

						<el-form-item label="商品ID" required={true}>
							<el-input v-model={form.skuId} type="input" />
						</el-form-item>

						<el-form-item label="地址信息" required={true}>
							<el-input v-model={form.address} type="input" />
						</el-form-item>

						<el-form-item label="购买数量">
							<el-input-number v-model={form.buyNumber} max={1000} min={1} label="描述文字" />
						</el-form-item>
					</el-form>
				</el-dialog>
			</div>
		)
	}
})
