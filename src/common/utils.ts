import { ElMessageBox } from 'element-plus'
import { CheckContent } from 'types/common'

export function check({ express, message }: CheckContent): void
export function check({ name, message }: CheckContent): void
export function check({ name, express = false, message }: CheckContent): void {
	if (express) {
		ElMessageBox({ type: 'error', title: '错误', message }).then((r) => {})
	}

	if (!name) {
		ElMessageBox({ type: 'error', title: '错误', message }).then((r) => {})
		throw new Error(message)
	}
}

export function cycleUser(user: object[], fn: Function, ...args: object[]) {
	user.forEach((u) => {
		fn(u, ...args)
	})
}
