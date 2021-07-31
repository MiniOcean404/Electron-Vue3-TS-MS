const axios = window.require('axios')
import { AxiosResponse, AxiosRequestConfig, CancelToken } from 'axios'
import http from 'http'
import https from 'https'
import qs from 'qs'

export const UserAgent =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
export const ContentType = 'application/x-www-form-urlencoded'

const config: AxiosRequestConfig = {
	baseURL: '',
	timeout: 5000,
	withCredentials: true,
	// responseType: 'json',
	// xsrf 设置
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN',
	// 最多转发数，用于node.js
	maxRedirects: 5,
	// 最大响应数据大小
	maxContentLength: 2000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},

	// 查询对象序列化函数
	paramsSerializer: function(params: any) {
		return qs.stringify(params, { arrayFormat: 'brackets' })
	},

	// 请求后的数据处理
	transformResponse: [
		function(data: AxiosResponse) {
			return data
		}
	],

	// 自定义错误状态码范围
	validateStatus: function(status: number) {
		return status >= 200 && status < 300
	},

	// 用于node.js
	httpAgent: new http.Agent({ keepAlive: true }),
	httpsAgent: new https.Agent({ keepAlive: true })
}

// 取消重复请求
let pending: Array<{
	url: string
	cancel: Function
}> = []

const cancelToken = axios.CancelToken
const removePending = (config: AxiosRequestConfig) => {
	for (let p in pending) {
		let item: any = p
		let list: any = pending[p]
		// 当前请求在数组中存在时执行函数体
		if (list.url === config.url + '&request_type=' + config.method) {
			// 执行取消操作
			list.cancel()
			// 从数组中移除记录
			pending.splice(item, 1)
		}
	}
}

export const request = axios.create(config)

// 请求拦截器
request.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		removePending(config)
		config.cancelToken = new cancelToken((c: any) => {
			pending.push({ url: config.url + '&request_type=' + config.method, cancel: c })
		})
		return config
	},
	(error: any) => {
		return Promise.reject(error)
	}
)

// 响应拦截器,响应拦截器中添加响应错误状态码、数据的判断
request.interceptors.response.use(
	(res: AxiosResponse) => {
		removePending(res.config)
		return res
	},
	(err: any) => {
		//根据上面的自定义状态码抛出错误
		console.log(err, '状态码不在200-300之间')
	}
)
