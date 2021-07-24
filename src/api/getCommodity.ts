import { request } from './request'

// 获取商品库存状态接口
export function getDetail(type: string, area: string, skuIds: string) {
	return request({
		url: 'http://c0.3.cn/stocks',
		method: 'GET',
		params: {
			type,
			area,
			skuIds
		}
	})
}

// 获取商品价格接口
export function getPrice(pduid: string, skuIds: string) {
	return request({
		url: 'http://p.3.cn/prices/mgets',
		method: 'GET',
		params: {
			pduid,
			skuIds
		}
	})
}
