import { ContentType, request, UserAgent } from 'api/request'

// 接口信息
// $("#submit_loading").remove();
// if(result.purchaseSkuInfoListVO.length == 1 && result.purchaseSkuInfoListVO[0].errorCod == "-6001"){
//   showPurchaseList(result.purchaseSkuInfoListVO,'以下商品为限购商品，今日已抢完，请改日再来 ','今日已抢完，请改日再来');
// }else if(result.purchaseSkuInfoListVO.length == 1 && result.purchaseSkuInfoListVO[0].errorCod == "-9004"){
//   showPurchaseList(result.purchaseSkuInfoListVO,'抱歉，以下商品仅限PLUS会员购买，请开通会员后再来购买','仅限PLUS用户购买');
// }else{
//   showPurchaseList(result.purchaseSkuInfoListVO,'抱歉，以下商品为限购商品，请返回购物车修改 ');
// }
// 提交订单（当前购物车内所有商品）
async function orderSubmit(Cookie: string) {
	// 去结算
	await request({
		url: `http://trade.jd.com/shopping/order/getOrderInfo.action`,
		method: 'GET',
		headers: {
			Cookie,
			'User-Agent': UserAgent
		},
		data: {
			rid: new Date().getTime()
		}
	})

	// 提交订单
	return request({
		url: `https://trade.jd.com/shopping/order/submitOrder.action`,
		method: 'POST',
		headers: {
			Cookie,
			origin: 'https://trade.jd.com',
			Referer: 'http://trade.jd.com/shopping/order/getOrderInfo.action',
			'User-Agent': UserAgent
		},
		data: {
			overseaPurchaseCookies: '',
			vendorRemarks: '[]',
			'submitOrderParam.sopNotPutInvoice': 'false',
			'submitOrderParam.presaleStockSign': '1',
			'submitOrderParam.trackID': 'TestTrackId',
			'submitOrderParam.ignorePriceChange': '0',
			'submitOrderParam.btSupport': '0',
			'submitOrderParam.jxj': '1',
			'submitOrderParam.eid':
				'LGURNHJJCK4ES7AUX34BAGXRC2YF2UHUV7CYSTUY5WWVLAYPZMOVMUUUBJGCWJELKAHXYN7XE6FW3OL2PIA2NIIUGA',
			'submitOrderParam.fp': 'a1012a53fdd69024b90ee7a46bf7967d'
		}
	})
}

export default {
	orderSubmit
}
