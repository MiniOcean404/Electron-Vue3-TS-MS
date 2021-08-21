import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { formatDate } from 'common/date'

export default defineComponent({
	name: 'server-time',
	setup(props, context) {
		const jdTimeResult = ['currentTime2']
		const tbTimeResult = ['data', 't']

		let JDTime = ref('')
		let TaoBaoTime = ref('')
		let JDTiming: NodeJS.Timeout
		let TaoBaoTiming: NodeJS.Timeout
		let currentTab = 'jd'

		onMounted(() => {
			// JDTiming = computeDate(getJDServerTime, jdTimeResult, JDTime, 15)
		})

		onBeforeUnmount(() => {
			clearTime(JDTiming)
			clearTime(TaoBaoTiming)
		})

		function tabClick(tab: any, event: any) {
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
			currentTab
		}
	},
	render() {
		const { JDTime, TaoBaoTime, tabClick, currentTab } = this

		return (
			<div>
				<a-tabs type="card" v-model={[currentTab, 'activeKey']} onTabClick={tabClick}>
					<a-tab-pane key="jd" tab="京东">
						{{ JDTime }}
					</a-tab-pane>
					<a-tab-pane key="tb" tab="淘宝">
						{{ TaoBaoTime }}
					</a-tab-pane>
				</a-tabs>
			</div>
		)
	}
})
