import { request, UserAgent, ContentType } from 'api/request'

// 请求商品ID的HTML详情页
export function getItemInfo(skuId: string) {}

// /**
//  * 全选购物车中的商品
//  * @param Cookie
//  * @returns {Promise<any>}
//  */
// function selectAllCart(Cookie) {
// 	return request({
// 		uri: URLS.SELECT_ALL,
// 		headers: {
// 			Cookie,
// 			'User-Agent': UserAgent
// 		},
// 		resolveWithFullResponse: true
// 	}).then((resp) => {
// 		const result = handleResponse(resp)
// 		if (result && result.sortedWebCartResult) {
// 			return result.sortedWebCartResult.success
// 		}
// 		return false
// 	})
// }
//
// /**
//  * 清空购物车
//  * @param Cookie
//  * @returns {Promise<any>}
//  */
// function clearCart(Cookie) {
// 	return request({
// 		uri: URLS.CLEAR_ALL,
// 		headers: {
// 			Cookie,
// 			'User-Agent': UserAgent
// 		},
// 		resolveWithFullResponse: true
// 	}).then((resp) => {
// 		const result = handleResponse(resp)
// 		if (result && result.sortedWebCartResult) {
// 			return result.sortedWebCartResult.success
// 		}
// 		return false
// 	})
// }
//
// /**
//  * 添加商品到购物车
//  * @param Cookie
//  * @param skuId
//  * @param num
//  * @returns {Promise<any>}
//  */
// async function addGoodsToCart(Cookie, skuId, num) {
// 	return request({
// 		uri: URLS.ADD_ITEM,
// 		qs: {
// 			pid: skuId,
// 			pcount: num,
// 			ptype: 1
// 		},
// 		headers: {
// 			Cookie,
// 			'User-Agent': UserAgent,
// 			'Content-Type': ContentType
// 		},
// 		json: true,
// 		resolveWithFullResponse: true
// 	}).then((resp) => {
// 		const html = handleResponse(resp)
// 		return html.indexOf('成功') > -1
// 	})
// }
