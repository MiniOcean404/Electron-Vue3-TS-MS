import { ContentType, request, UserAgent } from 'api/request'

// 获取下单信息
export function getBuyInfo(Cookie: string, shopId: string, buyNumber: number) {
	return request({
		url: `https://marathon.jd.com/seckillnew/orderService/pc/init.action`,
		method: 'GET',
		headers: {
			Cookie,
			'User-Agent': UserAgent
		},
		data: {
			sku: shopId,
			num: buyNumber
		}
	})
}

// 提交订单（当前购物车内所有商品）
async function orderSubmit(Cookie: string) {
	// 请求结算页面
	await request({
		url: `https://trade.jd.com/shopping/order/getOrderInfo.action`,
		method: 'GET',
		headers: {
			Cookie,
			'User-Agent': UserAgent,
			'Content-Type': ContentType
		}
	})

	// 提交订单
	return request({
		url: `https://trade.jd.com/shopping/order/submitOrder.action`,
		method: 'POST',
		data: {
			overseaPurchaseCookies: '',
			vendorRemarks: '[]',
			'submitOrderParam.sopNotPutInvoice': 'false',
			'submitOrderParam.trackID': 'TestTrackId',
			'submitOrderParam.ignorePriceChange': '0',
			'submitOrderParam.btSupport': '0',
			'submitOrderParam.jxj': '1'
		},
		headers: {
			Cookie,
			'User-Agent': UserAgent,
			Referer: 'http://trade.jd.com/shopping/order/getOrderInfo.action'
		}
	})
}

/**
 * 查询某个商品的库存
 */
// async function getItemStock(shopId, buyNumber, buyInfo) {
//   // 请求商品详情页
//   const { cat, venderId } = await getItemInfo(skuId)
//   const area = `${buyInfo['addressList'][0]['provinceId']}_${buyInfo['addressList'][0]['cityId']}_${buyInfo['addressList'][0]['countyId']}_${buyInfo['addressList'][0]['townId']}`
//   return request({
//     uri: 'https://c0.3.cn/stock',
//     qs: {
//       skuId,
//       buyNum,
//       area,
//       ch: 1,
//       callback: `jQuery${getRandomArbitrary(1000000, 9999999)}`,
//       _: +new Date(),
//       extraParam: '{"originid":"1"}',
//       cat,
//       venderId
//     },
//     headers: {
//       'User-Agent': UserAgent,
//       Referer: `https://item.jd.com/${skuId}.html`
//     },
//     resolveWithFullResponse: true
//   }).then((resp) => {
//     const result = handleResponse(resp)
//     if (result && result.stock) {
//       const skuState = result.stock.skuState // 商品是否上架
//       const StockState = result.stock.StockState // 商品库存状态：33 -- 现货  0,34 -- 无货  36 -- 采购中  40 -- 可配货
//       return skuState === 1 && [33, 40].includes(StockState)
//     }
//     return false
//   })
// }

/**
 * TODO: 没有试验成功过，需要修改
 * 提交秒杀订单
 * @param Cookie
 * @param skuId
 * @param num
 * @param buyInfo
 * @returns {Promise<any>}
 */
// function killOrderSubmit(Cookie, skuId, num, buyInfo) {
//   const params = {
//     skuId,
//     num,
//     addressId: buyInfo['addressList'][0]['id'],
//     yuShou: true,
//     isModifyAddress: false,
//     name: buyInfo['addressList'][0]['name'],
//     provinceId: buyInfo['addressList'][0]['provinceId'],
//     cityId: buyInfo['addressList'][0]['cityId'],
//     countyId: buyInfo['addressList'][0]['countyId'],
//     townId: buyInfo['addressList'][0]['townId'],
//     addressDetail: buyInfo['addressList'][0]['addressDetail'],
//     mobile: buyInfo['addressList'][0]['mobile'],
//     mobileKey: buyInfo['addressList'][0]['mobileKey'],
//     email: buyInfo['addressList'][0]['email'],
//     postCode: buyInfo['addressList'][0]['postCode'],
//     invoiceTitle: buyInfo['invoiceInfo']['invoiceTitle'],
//     invoiceCompanyName: '',
//     invoiceContent: buyInfo['invoiceInfo']['invoiceContentType'],
//     invoiceTaxpayerNO: '',
//     invoiceEmail: buyInfo['invoiceInfo']['invoiceEmail'],
//     invoicePhone: buyInfo['invoiceInfo']['invoicePhone'],
//     invoicePhoneKey: buyInfo['invoiceInfo']['invoicePhoneKey'],
//     invoice: true,
//     password: '',
//     codTimeType: 3,
//     paymentType: 4,
//     areaCode: '',
//     overseas: 0,
//     phone: '',
//     eid: '',
//     fp: '',
//     token: buyInfo['token'],
//     pru: ''
//   }
//   return request({
//     method: 'POST',
//     uri: URLS.KILL_ORDER_SUBMIT,
//     form: params,
//     headers: {
//       Cookie,
//       'User-Agent': UserAgent,
//       'Content-Type': ContentType
//     },
//     resolveWithFullResponse: true
//   }).then((resp) => {
//     return handleResponse(resp)
//   })
// }

export default {
	orderSubmit
}
