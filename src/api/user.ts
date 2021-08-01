import { request, UserAgent } from 'api/request'

// 检查用户是否是会员，以及获取其用户名等信息
export function checkUser(Cookie: string) {
	return request({
		url: 'https://order.jd.com/lazy/isPlusMember.action',
		method: 'GET',
		headers: {
			Cookie,
			UserAgent,
			'Content-Type': 'application/json;charset=UTF-8'
		},
		params: {}
	})
}

// 检查是否已经登录
export function check(Cookie: string) {
	return request({
		url:
			'https://qr.m.jd.com/check?callback=jQuery1058594&appid=133&token=AAEAIEAq1EUulFIBBY_4EEicudak1yTRd-sUTDA8T_5y8x-o',
		method: 'GET',
		headers: {
			Referer: 'https://order.jd.com/center/list.action',
			// Referer: 'https://passport.jd.com/new/login.aspx?',
			ReturnUrl:
				'https%3A%2F%2Fwww.jd.com%2F%3Fcu%3Dtrue%26utm_source%3Dsogou-pinzhuan%26utm_medium%3Dcpc%26utm_campaign%3Dt_288551095_sogoupinzhuan%26utm_term%3D72c3e74a359c48598c6fabe6c1169112_0_8ac09db8ee5c42d19c8bd8e15bd92ac5',
			Cookie,
			'User-Agent': UserAgent
		}
	})
}
