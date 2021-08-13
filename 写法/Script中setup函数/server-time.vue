<template>
	<el-tabs v-model="currentTab" type="card" @tab-click="tabClick">
		<el-tab-pane label="京东" name="jd">{{ JDTime }}</el-tab-pane>
		<el-tab-pane label="淘宝" name="tb">{{ TaoBaoTime }}</el-tab-pane>
	</el-tabs>
</template>

<script lang="ts" setup>
import { getJDServerTime, getTaoBaoServerTime } from '../../src/api/date'
import { ref, onMounted, onBeforeUnmount, toRaw } from 'vue'
import { formatDate } from '../../src/common/date'

const jdTimeResult = ['currentTime2']
const tbTimeResult = ['data', 't']

let JDTime = ref('')
let TaoBaoTime = ref('')
let JDTiming
let TaoBaoTiming
let currentTab = 'jd'

onMounted(() => {
	// JDTiming = computeDate(getJDServerTime, jdTimeResult, JDTime, 15)
})

onBeforeUnmount(() => {
	clearTime(JDTiming)
	clearTime(TaoBaoTiming)
})

function tabClick(tab, event) {
	switch (tab.paneName) {
		case 'jd':
			// JDTiming = computeDate(getJDServerTime, jdTimeResult, JDTime, 1000)
			clearTime(TaoBaoTiming)
			break
		case 'tb':
			// TaoBaoTiming = computeDate(getTaoBaoServerTime, tbTimeResult, TaoBaoTime, 1000)
			clearTime(JDTiming)
			break
	}
}

function computeDate(api: Function, result: Array<string>, ref, timing: number) {
	return setInterval(async () => {
		const res = await api()

		let takeValue = res.data
		for (const v of result.values()) {
			takeValue = takeValue[v]
		}

		const ms = takeValue.slice(takeValue.length - 3)
		let DateObj = new Date(Number(takeValue))
		ref.value = formatDate(DateObj, 'yyyy:MM:dd hh:mm:ss') + ':' + ms
	}, timing)
}

function clearTime(Timing) {
	clearInterval(Timing)
	Timing = null
}
</script>

<style lang="scss" scoped></style>
