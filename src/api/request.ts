const axios = window.require('axios')
import { AxiosResponse, AxiosRequestConfig, Canceler } from 'axios'
import Qs from 'qs'

export const UserAgent =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
export const ContentType = 'application/x-www-form-urlencoded'
const http = window.require('axios/lib/adapters/http.js')

export const request = axios.create({
	baseURL: '',
	timeout: 5000,
	withCredentials: true,
	responseType: 'json', //文档设置为document自动转化为DOM、text为文字、blob等
	// xsrf 设置
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN',
	// 最多转发数，用于node.js
	maxRedirects: 5,
	// 最大响应数据大小
	maxContentLength: 2000000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},

	// 查询对象序列化函数
	paramsSerializer: function(params: any) {
		return Qs.stringify(params, { arrayFormat: 'brackets' })
	},

	// 请求后的数据处理
	transformResponse: [
		function(data: AxiosResponse) {
			return data
		}
	],

	// 自定义错误状态码范围
	validateStatus: function(status: number) {
		return status >= 200 && status < 400
	},

	// xhr中用于node.js
	// httpAgent: new http.Agent({ keepAlive: true }),
	// httpsAgent: new https.Agent({ keepAlive: true }),

	adapter: http

	// proxy: {
	// 	host: '127.0.0.1',
	// 	port: 9000
	// }
})

// 请求拦截器
request.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
		addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

// 响应拦截器,响应拦截器中添加响应错误状态码、数据的判断
request.interceptors.response.use(
	(res: AxiosResponse) => {
		removePendingRequest(res.config) // 从pendingRequest对象中移除请求
		console.log('响应信息：\r\n', res)
		return res
	},

	(err: any) => {
		removePendingRequest(err.config || {}) // 从pendingRequest对象中移除请求
		if (axios.isCancel(err)) {
			console.log('已取消的重复请求：' + err.message)
		} else {
			// 添加异常处理
		}
		//根据上面的自定义状态码抛出错误
		return Promise.reject(err)
	}
)

/**
 * @描述 取消重复请求
 * @作者 HY
 * @时间 2021-08-01 18:19
 */
const pendingRequest = new Map()

// 生成取消重复请求Map中的key
function generateReqKey(config: AxiosRequestConfig) {
	const { method, url, params, data } = config
	return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}

// Map中没有就添加进去
function addPendingRequest(config: AxiosRequestConfig) {
	const requestKey = generateReqKey(config)
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken((cancel: Canceler) => {
			if (!pendingRequest.has(requestKey)) {
				pendingRequest.set(requestKey, cancel)
			}
		})
}
// 删除重复请求
function removePendingRequest(config: AxiosRequestConfig) {
	const requestKey = generateReqKey(config)

	if (pendingRequest.has(requestKey)) {
		const cancelToken = pendingRequest.get(requestKey)
		cancelToken(requestKey)
		pendingRequest.delete(requestKey)
	}
}
