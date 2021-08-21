import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 通用css
import 'normalize.css'
import './assets/css/base.scss'

createApp(App)
	.use(store)
	.use(router)
	.use(Antd)
	.mount('#app')
