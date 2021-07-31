// 在Vue原型上添加属性使用时报错的声明
import Vue from 'vue'
import { ElMessage } from 'element-ui/types/message'

declare module 'vue/types/vue' {
	interface Vue {
		$http: any
		$message: ElMessage
	}
}
