import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export async function request(config: object | AxiosRequestConfig) {
	// 导出封装的方法
	// 创建axios对象并进行配置
	const api: AxiosInstance = axios.create({
		baseURL: '',
		timeout: 5000,
		withCredentials: true
	})
	// 请求拦截器
	api.interceptors.request.use(config => {
		return config
	})
	// 响应拦截器
	api.interceptors.response.use(res => {
		return res
	})

	const res = await api(config)

	if (res.status === 200) {
	} else {
	}

	return res
}
