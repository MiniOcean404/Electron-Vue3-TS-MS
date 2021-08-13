// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from '@/store'

declare module '@vue/runtime-core' {
	// 声明自己的 store state
	interface x extends State {}

	// 为 `this.$store` 提供类型声明
	interface ComponentCustomProperties {
		$store: Store<x>
	}
}
