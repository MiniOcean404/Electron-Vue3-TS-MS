export type checkName = undefined | null | string | ''

export interface CheckCondition {
	condition?: boolean | RegExp
	message: string
	type: 'noCondition' | 'isRegExp' | 'isBoole'
}

export interface CheckType {
	noCondition: boolean
	isRegExp: boolean
	isBoole: boolean
}
