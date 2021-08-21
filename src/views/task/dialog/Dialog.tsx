import { check } from 'common/utils'
import { defineComponent, reactive, toRaw, watch } from 'vue'
import { getItemInfo } from 'api/task'
import { useStore } from 'vuex'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm
const typeOption = reactive([
	{
		value: 'Spike',
		label: '预约抢购'
	},
	{
		value: 'Reservation',
		label: '秒杀商品'
	}
])

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
		watch(
			() => props.isShow,
			(value, prevCount) => {
				resetFields()
			}
		)

		let form = reactive({
			taskType: 'Spike',
			buyDate: '',
			skuId: '',
			address: '',
			buyNumber: 1
		})
		const rulesRef = reactive({})
		const { resetFields } = useForm(form, rulesRef)

		async function operate(v: string) {
			const rawForm = toRaw(form)
			switch (v) {
				case 'sure':
					check(rawForm.skuId, [
						{
							type: 'noCondition',
							message: '商品ID不能为空'
						}
					])
					check(rawForm.buyDate, [
						{
							type: 'noCondition',
							message: '抢购时间不能为空'
						}
					])

					// 获取商品信息DOM
					const res = await getItemInfo(rawForm.skuId)
					const taskInfo = Object.assign({}, rawForm, res.data)
					store.commit('task/SAVE_TASK_INFO', taskInfo)
					break
				case 'cancel':
					break
			}

			ctx.emit('update:isShow', false)
		}

		return {
			operate,
			form,
			typeOption
		}
	},
	render(createElement: any) {
		const { operate, form, typeOption, isShow } = this

		return (
			<div>
				<a-modal
					v-model={[isShow, 'visible']}
					title="添加任务"
					width="40%"
					closable={false}
					onOk={operate.bind(this, 'sure')}
					onCancel={operate.bind(this, 'cancel')}>
					<a-form
						ref="formRef"
						model={form}
						labelAlign="right"
						labelCol={{ span: 4, offset: 0 }}
						// rules={rules}
					>
						<a-form-item label="抢购类型" name="name">
							<a-select ref="select" v-model={[form.taskType, 'value']} style="width: 120px">
								{typeOption.map((item: any) => {
									return <a-select-option value={item.value}>{item.label}</a-select-option>
								})}
							</a-select>
						</a-form-item>

						<a-form-item label="抢购时间">
							<a-date-picker
								v-model={[form.buyDate, 'value']}
								showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
								valueFormat="YYYY-MM-DD HH:mm:ss"
							/>
						</a-form-item>

						<a-form-item label="商品ID">
							<a-input v-model={[form.skuId, 'value']} />
						</a-form-item>

						<a-form-item label="地址信息">
							<a-input v-model={[form.address, 'value']} />
						</a-form-item>

						<a-form-item label="购买数量">
							<a-input-number id="inputNumber" v-model={[form.buyNumber, 'value']} min={1} max={10} />
						</a-form-item>
					</a-form>
				</a-modal>
			</div>
		)
	}
})
