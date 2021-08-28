const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

// const isNoOnline = process.env.NODE_ENV !== 'online'
const isNoOnline = false

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
			.add('.tsx')
			.add('.vue')
			.add('less')
			.add('sass')

		if (isNoOnline) {
			// 打包忽略引入的文件
			config.set('externals', {
				vue: 'Vue',
				'vue-router': 'VueRouter',
				vuex: 'Vuex',
				axios: 'axios',
				'element-ui': 'ELEMENT',
				'vue-quill-editor': 'VueQuillEditor'
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
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
			cdn: isNoOnline
				? {
						css: [
							'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
							'https://cdn.bootcdn.net/ajax/libs/wangEditor/3.1.1/wangEditor.min.css'
						],
						js: [
							'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
							'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
							'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
							'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
							'https://unpkg.com/element-ui/lib/index.js',
							'https://cdn.bootcdn.net/ajax/libs/wangEditor/3.1.1/wangEditor.min.js'
						]
				  }
				: ''
		}
	},
	// electron vue3.0 构建打包
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				nsis: {
					oneClick: false,
					language: '2052',
					perMachine: true,
					allowToChangeInstallationDirectory: true,
					allowElevation: true,
					installerIcon: './build/icons/favicon.ico',
					uninstallerIcon: './build/icons/favicon.ico',
					installerHeaderIcon: './build/icons/favicon.ico',
					createDesktopShortcut: true,
					createStartMenuShortcut: true,
					shortcutName: '抢购'
					// include: 'build/script/installer.nsh'
				},
				win: {
					target: ['msi', 'nsis'],
					icon: 'build/icons/favicon.ico'
				},
				mac: {
					target: ['dmg', 'zip'],
					category: 'public.app-category.utilities'
				},
				dmg: {
					background: 'build/背景.jpg',
					icon: 'build/icons/icon.icns',
					iconSize: 100,
					artifactName: 'ms.dmg',
					contents: [
						{
							x: 380,
							y: 180,
							type: 'link',
							path: '/Applications'
						},
						{
							x: 130,
							y: 180,
							type: 'file'
						}
					],
					window: {
						width: 540,
						height: 380
					}
				},
				productName: '秒杀'
			}
		}
	}
	// 默认打包方式package.json
	// "build": {
	//   "productName": "抢购",
	//   "appId": "ms",
	//   "copyright": "Copyright © 2021 Alaso",
	//   "directories": {
	//     "buildResources": "build",
	//     "output": "dist/"
	//   },
	//   "files": [  //打包时候包含的包文件
	//     "dist/electron",
	//     "node_modules/",
	//     "package.json"
	//   ],
	//   "win": {
	//     "target": ["msi","nsis"],  //安装包的格式，默认是"nsis" nsis是windows系统安装包的制作程序，它提供了安装、卸载、系统设置等功能 "nsis"打包出来的就是exe文件
	//     "icon": "build/icons/favicon.ico" //安装包的图标
	//   },
	//   "nsis": {
	//     "oneClick": false, //是否一键安装，默认为true
	//     "language": "2052", //安装语言，2052对应中文
	//     "perMachine": true, //为当前系统的所有用户安装该应用程序
	//     "allowToChangeInstallationDirectory": true, //允许用户选择安装目录
	//     "allowElevation": true,
	//     "installerIcon": "./build/icons/favicon.ico",
	//     "uninstallerIcon": "./build/icons/favicon.ico",
	//     "installerHeaderIcon": "./build/icons/favicon.ico",
	//     "createDesktopShortcut": true,
	//     "createStartMenuShortcut": true,
	//     "shortcutName": "抢购",
	//     "include": "build/script/installer.nsh"
	//   },
	//   "mac": {
	//     "target": ["dmg", "zip"], //安装包的格式，默认是"dmg"和"zip"
	//     "category": "public.app-category.utilities" //应用程序安装到哪个分类下，具体有哪些分类可以在苹果官网上找
	//   },
	//   "dmg": {
	//     "background": "build/背景.jpg", //安装窗口背景图
	//     "icon": "build/icons/icon.icns", //安装图标
	//     "iconSize": 100, //图标的尺寸
	//     "artifactName": "ms.dmg",
	//     "contents": [ //安装图标在安装窗口中的坐标信息
	//       {
	//         "x": 380,
	//         "y": 180,
	//         "type": "link",
	//         "path": "/Applications"
	//       },
	//       {
	//         "x": 130,
	//         "y": 180,
	//         "type": "file"
	//       }
	//     ],
	//     "window": {  //安装窗口的大小
	//       "width": 540,
	//       "height": 380
	//     }
	//   }
	// }
}
