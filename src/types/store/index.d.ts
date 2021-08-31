export interface UserInfo {
	name: string | undefined
	pinId: string | undefined
	cookie: string
	isLogin: string
	isPlusMember: string
}

interface AccountState {
	account: Array<UserInfo>
}

export interface TaskInfo {
	buyDate: string
	buyNumber: number
	cat: string
	easyBuyUrl: string
	imageSrc: string
	name: string
	skuId: string
	taskType: string
	timing: number
	venderId: string
}

export interface Timer {
	buyDate: string
	buyNumber: number
	cat: string
	easyBuyUrl: string
	imageSrc: string
	name: string
	skuId: string
	taskType: string
	timing: number
	venderId: string
}
