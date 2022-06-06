import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { formatDate } from 'common/date'

//! vue 中 jsx 语法问题，导致不能点击
export default defineComponent({
	name: 'server-time',
	setup(props, context) {
		const jdTimeResult = ['currentTime2']
		const tbTimeResult = ['data', 't']

		let JDTime = ref('')
		let TaoBaoTime = ref('')
		let JDTiming: NodeJS.Timeout
		let TaoBaoTiming: NodeJS.Timeout
		let currentTab = ref('jd')
		const activeKey = ref('1')

		onMounted(() => {
			// JDTiming = computeDate(getJDServerTime, jdTimeResult, JDTime, 15)
		})

		onBeforeUnmount(() => {
			clearTime(JDTiming)
			clearTime(TaoBaoTiming)
		})

		function tabClick(tab: any, event: any) {
			switch (tab) {
				case 'jd':
					// currentTab.value = 'jd'
					// JDTiming = computeDate(getJDServerTime, jdTimeResult, JDTime, 1000)
					clearTime(TaoBaoTiming)
					break
				case 'tb':
					// currentTab.value = 'tb'
					// TaoBaoTiming = computeDate(getTaoBaoServerTime, tbTimeResult, TaoBaoTime, 1000)
					clearTime(JDTiming)
					break
			}
		}

		function computeDate(api: Function, result: Array<string>, ref: { value: string }, timing: number) {
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

		function clearTime(Timing: NodeJS.Timeout | null) {
			if (Timing) {
				clearInterval(Timing)
			} else {
				Timing = null
			}
		}

		return {
			TaoBaoTime,
			JDTime,
			tabClick,
			currentTab,
			activeKey,
		}
	},
	render() {
		const { JDTime, TaoBaoTime, tabClick, currentTab, activeKey } = this
		return (
			<>
				<a-tabs type="card" v-model:activeKey={currentTab} onTabClick={tabClick}>
					<a-tab-pane key="jd" tab="京东">
						{{ JDTime }}
					</a-tab-pane>
					<a-tab-pane key="tb" tab="淘宝">
						{{ TaoBaoTime }}
					</a-tab-pane>
				</a-tabs>
			</>
		)
	},
})
