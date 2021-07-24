import { request } from './request'

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
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
		}
	})
}
