const path = require('path')
const files = require.context('./', false, /\.ts$/)

interface API {
	[key: string]: any
}

const api: API = {}

files.keys().forEach((key) => {
	const name = path.basename(key, '.ts')
	if (name === 'index' || name === 'request') return
	api[name] = files(key).default || files(key)
})

export default api
