<template>
	<el-dialog v-model="isShow" :before-close="beforeClose" title="添加任务" width="40%">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="抢购类型">
				<el-select v-model="form.taskType" placeholder="请选择" style="width: 100%">
					<el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="是否定时">
				<el-switch v-model="form.isTiming" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			</el-form-item>

			<el-form-item v-show="form.isTiming" label="时间" required>
				<el-date-picker
					v-model="form.buyDate"
					placeholder="选择日期时间"
					type="datetime"
					value-format="YYYY-MM-DD HH:mm:ss"
				></el-date-picker>
			</el-form-item>

			<el-form-item label="商品ID" required>
				<el-input v-model="form.shopId" type="input"></el-input>
			</el-form-item>

			<el-form-item label="地址信息" required>
				<el-input v-model="form.address" type="input"></el-input>
			</el-form-item>

			<el-form-item label="购买数量">
				<el-input-number v-model="form.buyNumber" :max="1000" :min="1" label="描述文字"></el-input-number>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="operate('cancel')">取 消</el-button>
				<el-button type="primary" @click="operate('sure')">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts">
import { defineComponent, defineEmits, reactive, ref, toRaw, watch } from 'vue'
import { getItemInfo } from 'api/task'
import { getShopStore, getShopPrice } from 'api/shop.ts'
const fs = window.require('fs')

import { ElMessageBox } from 'element-plus'

const formModule = {
	taskType: 'Spike',
	isTiming: true,
	buyDate: '',
	shopId: '',
	address: '',
	buyNumber: 1
}

export default defineComponent({
	name: 'Dialog',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			form: JSON.parse(JSON.stringify(formModule)),
			typeOption: [
				{
					value: 'Spike',
					label: '预约抢购'
				},
				{
					value: 'Reservation',
					label: '秒杀商品'
				}
			]
		}
	},
	watch: {
		isShow(value, oldValue) {
			this.form = JSON.parse(JSON.stringify(formModule))
		}
	},
	setup(props, context) {
		async function operate(v: string) {
			switch (v) {
				case 'sure':
					check({ name: this.form.shopId, message: '商品ID不能为空' })
					if (this.form.isTiming) {
						check({ name: this.form.buyDate, message: '选择了打开定时，时间不能为空' })
					}

					const res = await getItemInfo(this.form.shopId)

					// todo 地址不对
					const shopStore = await getShopStore('19_1601_36953_62867', this.form.shopId)
					const shopPrice = await getShopPrice(this.form.shopId)

					const taskInfo = Object.assign({}, this.form, res.data, {
						shopStoreState: shopStore.data[this.form.shopId].StockStateName,
						shopPrice: shopPrice.data[0].op
					})
					this.$store.commit('task/SAVE_TASK_INFO', taskInfo)
					break
				case 'cancel':
					break
			}

			context.emit('update:isShow', false)
		}

		function beforeClose() {
			ElMessageBox.confirm('确认关闭？')
				.then((_) => {
					context.emit('update:isShow', false)
				})
				.catch((_) => {})
		}

		return {
			operate,
			beforeClose
		}
	}
})

function check({ name, value = undefined, message }) {
	if (value) {
		if (name !== value) {
			ElMessageBox({ type: 'error', title: '错误', message })
		}
	} else {
		if (name === null || name === undefined || name === '') {
			ElMessageBox({ type: 'error', title: '错误', message })
			throw new Error(message)
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog {
	user-select: none;
}
</style>
