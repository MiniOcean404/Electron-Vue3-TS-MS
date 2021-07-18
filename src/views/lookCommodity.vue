<template>
	<el-form ref="form" :model="form" :inline="true" label-width="80px">
		<el-form-item label="商品id">
			<el-input v-model="form.id"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
import { defineComponent } from 'vue'
import { getDetail, getPrice } from '@/api/getCommodity.ts'

export default defineComponent({
	name: 'lookCommodity',
	data() {
		return {
			form: {
				id: ''
			}
		}
	},
	setup(data, content) {
		getDetail('getstocks', '19_1601_36953_62867', '100009820314,100004485766').then(res => {
			console.log(res.data, '库存')
		})
		getPrice(Date.now().toString(), '100009820314,100004485766').then(res => {
			console.log(res.data, '价格')
		})
		return {}
	}
})
</script>

<style scoped></style>
