const axios = window.require('axios')
import { AxiosResponse, AxiosRequestConfig } from 'axios'

export const UserAgent =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'

export const request = axios.create({
	baseURL: '',
	timeout: 5000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})

// 请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
	return config
})

// 响应拦截器,响应拦截器中添加响应错误状态码、数据的判断
request.interceptors.response.use(
	(res: AxiosResponse) => {
		if (typeof res.status && res.status >= 200 && res.status < 400) {
			return res
		} else {
			console.log(res, '状态码不在200-400内')
		}
	},
	(err: any) => {
		console.log(err, '请求出错')
	}
)
