import { ContentType, request, UserAgent } from 'api/request'

// 查询京东服务器时间
export function getJDServerTime() {
	return request({
		url: `https://api.m.jd.com/client.action`,
		methods: 'GET',
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
		methods: 'GET',
		responseType: 'json',
		headers: {
			'User-Agent': UserAgent
		},
		params: {
			api: 'mtop.common.getTimestamp'
		}
	})
}

// export default {
//   CHECK_ACCOUNT: 'https://order.jd.com/lazy/isPlusMember.action',
//   GET_BUY_INFO: 'https://marathon.jd.com/seckillnew/orderService/pc/init.action',
//   KILL_ORDER_SUBMIT: 'https://marathon.jd.com/seckillnew/orderService/pc/submitOrder.action',
//   SELECT_ALL: 'https://cart.jd.com/selectAllItem.action',
//   CLEAR_ALL: 'https://cart.jd.com/batchRemoveSkusFromCart.action',
//   ADD_ITEM: 'https://cart.jd.com/gate.action',
//   GET_ORDER: 'https://trade.jd.com/shopping/order/getOrderInfo.action',
//   SUBMIT_ORDER: 'https://trade.jd.com/shopping/order/submitOrder.action',
//   GET_ITEM_STOCK: 'https://c0.3.cn/stock',
// }
