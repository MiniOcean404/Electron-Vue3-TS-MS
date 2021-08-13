import { request } from './request'

// 获取商品库存状态接口
export function getShopStore(area: string, skuIds: string) {
	return request({
		url: 'http://c0.3.cn/stocks',
		method: 'GET',
		responseType: 'html',
		params: {
			type: 'getstocks', //商品库存
			area, //地区编号
			skuIds //商品ID 可以以,分割的字符串
		}
	})
}

// 获取商品价格接口
export function getShopPrice(skuIds: string) {
	return request({
		url: 'http://p.3.cn/prices/mgets',
		method: 'GET',
		responseType: 'json',
		params: {
			pduid: Date.now().toString(), //时间戳
			skuIds //商品ID 可以以,分割的字符串
		}
	})
}
