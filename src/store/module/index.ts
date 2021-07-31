const path = require('path')

const files = require.context('./', false, /\.ts$/)

interface module {
	[key: string]: any
}

const modules: module = {}

files.keys().forEach((key) => {
	const name = path.basename(key, '.ts')
	if (name === 'index') return
	modules[name] = files(key).default || files(key)
})

export default modules
