import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 解决element-plus默认英文改为中文
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'

import 'normalize.css'
import './assets/css/base.scss'

createApp(App)
	.use(store)
	.use(router)
	.use(ElementPlus, { locale, size: 'small', zIndex: 3000 })
	.mount('#app')
