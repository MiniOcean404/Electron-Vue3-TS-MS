const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	devServer: {
		port: 3000,
		open: false,
		https: false,
		host: '0.0.0.0'
		// copy:true
	},
	publicPath: './',
	// 打包是否生成.map文件
	productionSourceMap: false,

	configureWebpack: {
		devtool: 'source-map'
	},

	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('api', resolve('src/api'))
			.set('assets', resolve('src/assets'))
			.set('common', resolve('src/common'))
			.set('views', resolve('src/views'))
			.set('components', resolve('src/components'))
			.set('types', resolve('src/types'))

		config.resolve.extensions
			.add('.js')
			.add('.vue')
			.add('less')
			.add('sass')

		if (process.env.NODE_ENV !== 'online') {
			// 打包忽略引入的文件
			config.set('externals', {
				// vue: 'Vue',
				// 'vue-router': 'VueRouter',
				// vuex: 'Vuex',
				// axios: 'axios',
				// 'element-ui': 'ELEMENT',
				// 'vue-quill-editor': 'VueQuillEditor'
			})
		}
	},

	css: {
		extract: process.env.NODE_ENV === 'production', // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: true, // 开启 CSS source maps?
		requireModuleExtension: true, // 启用 CSS modules for all css / pre-processor files.
		loaderOptions: {
			sass: {
				additionalData: `@import "~assets/css/_var.scss";`
			}
		}
	},

	pages: {
		index: {
			entry: 'src/main.ts',
			template: 'public/index.html',
			filename: 'index.html'
			// chunks: ['chunk-vendors', 'chunk-common', 'index']
			// cdn:
			// 	process.env.NODE_ENV === 'online'
			// 		? ''
			// 		: {
			// 				css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
			// 				js: [
			// 					'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
			// 					'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
			// 					'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
			// 					'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
			// 					'https://unpkg.com/element-ui/lib/index.js'
			// 				]
			// 		  }
		}
	}
}
