import { request } from './request'

export function getQRCode() {
	return request({
		url: '',
		method: 'GET',
		params: {
			appid: '133',
			size: 147
		},
		headers: {},
		responseType: 'blob'
	})
}

export function checkScan(token: string) {
	return request({
		url: 'https://qr.m.jd.com/check',
		method: 'GET',
		params: {
			appid: '133',
			_: Date.now().toString(),
			token
		},
		headers: {
			Host: 'qr.m.jd.com',
			Referer: 'https://order.jd.com/center/list.action',
			Cookie:
				'QRCodeKey=AAEAILN9uxDIBx5bK6UrmrnCKso0jcupIx2j03lvvlgF4ws9; HttpOnly;wlfstk_smdl=sqwlqhk3tweiw8tjjxpsqv244ug47gdz; PATH=/; DOMAIN=.jd.com',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/531.36',
			Accept:
				'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
			Connection: 'keep-alive'
		},
		responseType: 'blob'
	})
}
