import { checkName, CheckCondition, CheckType } from 'types/common'
import { notification } from 'ant-design-vue'

export function check(name: checkName, conditionArr: Array<CheckCondition>) {
	conditionArr.forEach((i) => {
		const condition = i.condition
		const message = i.message
		const type = i.type

		const flag: CheckType = {
			noCondition: !condition && message !== '' && (name === '' || name === undefined || name === null),
			isRegExp: condition instanceof RegExp && !condition.test(typeof name === 'string' ? name : ''),
			isBoole: name === undefined && typeof condition === 'boolean' && condition
		}

		if (flag[type]) {
			notification['error']({ message })
			throw new Error(message)
		}
	})
}

export function cycleUser(user: object[], fn: Function, ...args: object[]) {
	user.forEach((u) => {
		fn(u, ...args)
	})
}

export function clearAllTime(times: Array<{ pinId: string; skuId: string; taskTiming: NodeJS.Timer }>) {
	times.forEach((i) => {
		clearInterval(i.taskTiming)
	})
}
