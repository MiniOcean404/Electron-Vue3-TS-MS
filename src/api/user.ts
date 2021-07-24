import { request, UserAgent } from 'api/request'

export function checkUser(Cookie: string) {
	return request({
		url: 'https://order.jd.com/lazy/isPlusMember.action',
		methods: 'GET',
		headers: {
			Cookie,
			UserAgent,
			'Content-Type': 'application/json;charset=UTF-8'
		},
		params: {
			Cookie
		}
	})
}
