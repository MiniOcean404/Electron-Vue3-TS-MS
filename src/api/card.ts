import { request, UserAgent, ContentType } from 'api/request'

// 添加商品到购物车
export function addGoodsToCart(Cookie: string, shopId, buyNumber) {
	return request({
		url: `https://cart.jd.com/gate.action`,
		method: 'GET',
		headers: {
			Cookie,
			Host: 'cart.jd.com'
		},
		responseType: 'document',
		params: {
			pid: shopId,
			pcount: buyNumber,
			ptype: 1
		}
	})
}

// 全选购物车
export function selectAllCart(Cookie: string) {
	return request({
		url: `https://cart.jd.com/selectAllItem.action`,
		method: 'GET',
		responseType: 'json',
		headers: {
			Cookie,
			'User-Agent': UserAgent
		}
	})
}

// 删除选中的商品，配合全选购物车进行使用
export function clearCart(Cookie: string) {
	return request({
		url: `https://cart.jd.com/batchRemoveSkusFromCart.action`,
		method: 'GET',
		responseType: 'json',
		headers: {
			Cookie,
			'User-Agent': UserAgent
		}
	})
}
