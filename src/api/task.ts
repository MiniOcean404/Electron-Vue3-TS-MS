import { request, UserAgent, ContentType } from 'api/request'
import { ElMessageBox } from 'element-plus'

// 请求商品ID的HTML详情页
export function getItemInfo(skuId: string) {
	return request({
		url: `https://item.jd.com/${skuId}.html`,
		method: 'GET',
		headers: {
			'User-Agent': UserAgent,
			'Content-Type': 'application/json;charset=UTF-8'
		},
		responseType: 'text', //document直接返回DOM不用DOMParser解析
		// 请求后的数据处理
		transformResponse: [
			function(data: any) {
				let name
				let easyBuyUrl
				let cat
				let venderId
				let imageSrc

				try {
					const parser = new DOMParser()
					const dom = parser.parseFromString(data, 'text/html') // 解析返回的HTML代码
					const pageConfig = dom.querySelectorAll('script')[0].innerText
					const specImg: HTMLElement | null = dom.querySelector('#spec-img')

					name = pageConfig.match(/name: '(.*)'/)?.[1]
					easyBuyUrl = data.match(/easyBuyUrl:"(.*)"/)[1]
					cat = pageConfig.match(/cat: \[(.*)]/)?.[1]
					venderId = pageConfig.match(/venderId:(\d*)/)?.[1]
					if (specImg !== null) {
						imageSrc = specImg.dataset.origin
					}

					return {
						name,
						imageSrc,
						cat,
						venderId, //店铺ID
						easyBuyUrl
					}
				} catch (e) {
					ElMessageBox({ type: 'error', title: '错误', message: `解析商品ID链接的DOM出错了~` }).then((r) => {})
				} finally {
				}
			}
		]
	})
}
