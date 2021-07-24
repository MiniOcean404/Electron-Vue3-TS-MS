<template>
	<el-table :data='tableData' style='width: 100%'>
		<el-table-column prop='name' label='用户名'></el-table-column>
		<el-table-column prop='isLogin' label='是否登录'></el-table-column>
		<el-table-column prop='isPlusMember' label='是否会员'></el-table-column>
		<el-table-column>
			<el-button type='primary' @click='deleteAccount'>删除</el-button>
		</el-table-column>
	</el-table>
</template>

<script setup lang='ts'>
import { defineEmits, defineProps, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

const store = useStore()
const isHaveContent = computed(() => tableData.length)
const emit =
	defineEmits<{
		(e: 'deleteAccount'): void
	}>()

interface Props {
	tableData?: Array
}

const props = withDefaults(defineProps<Props>(), {
	tableData: []
})

function deleteAccount() {
	store.commit('user/REMOVE')
	emit('deleteHandle')
	;(ElNotification as any).success({ title: '成功', message: '删除成功' })
}
</script>

<style lang='scss' scoped></style>
