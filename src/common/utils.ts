import { CheckContent } from 'types/common'
import { notification } from 'ant-design-vue'

export function check({ express, message }: CheckContent): void
export function check({ name, message }: CheckContent): void
export function check({ name, express = false, message }: CheckContent): void {
	if (express) {
		notification['error']({ message })
	}

	if (!name) {
		notification['error']({ message })
		throw new Error(message)
	}
}

export function cycleUser(user: object[], fn: Function, ...args: object[]) {
	user.forEach((u) => {
		fn(u, ...args)
	})
}
