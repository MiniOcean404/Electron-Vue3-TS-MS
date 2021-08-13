<template>
	<el-table :data="tableData" style="width: 100%" height="90%" border>
		<el-table-column prop="name" label="用户名" align="center"></el-table-column>
		<el-table-column prop="isLogin" label="是否登录" align="center"></el-table-column>
		<el-table-column prop="isPlusMember" label="是否会员" align="center"></el-table-column>
		<el-table-column width="100">
			<template #default="scope">
				<el-button type="primary" @click="deleteAccount(scope)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

const store = useStore()
const isHaveContent = computed(() => tableData.length)
const emit = defineEmits<{
	(e: 'deleteAccount'): void
}>()

interface Props {
	tableData?: Array<object | undefined | null>
}

const props = withDefaults(defineProps<Props>(), {
	tableData: []
})

function deleteAccount(scope) {
	const index = scope.$index
	const row = scope.row

	store.commit('user/REMOVE_SOME_ONE', index)
	ElNotification({ type: 'success', title: '成功', message: '删除成功' })
}
</script>
