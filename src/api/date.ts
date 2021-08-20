import { ContentType, request, UserAgent } from 'api/request'

// 查询京东服务器时间
export function getJDServerTime() {
	return request({
		url: `https://api.m.jd.com/client.action`,
		method: 'GET',
		responseType: 'json',
		headers: {
			'User-Agent': UserAgent
		},
		params: {
			functionId: 'queryMaterialProducts',
			client: 'wh5'
		}
	})
}
export function getTaoBaoServerTime() {
	return request({
		url: `http://api.m.taobao.com/rest/api3.do`,
		method: 'GET',
		responseType: 'json',
		headers: {
			'User-Agent': UserAgent
		},
		params: {
			api: 'mtop.common.getTimestamp'
		}
	})
}
