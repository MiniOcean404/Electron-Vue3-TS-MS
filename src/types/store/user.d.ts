export interface UserInfo {
	name: string | undefined
	pinId: string | undefined
	cookie: string
	isLogin: string
	isPlusMember: string
}

interface Account {
	[key: string]: unknown
}

export interface State {
	account: Account
}
