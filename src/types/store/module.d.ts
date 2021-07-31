export interface UserInfo {
	name: string | undefined
	pinId: string | undefined
	cookie: string
	isLogin: string
	isPlusMember: string
}

export interface State {
	account: object[]
	shopInfo: object[]
	taskInfo: object[]
}
