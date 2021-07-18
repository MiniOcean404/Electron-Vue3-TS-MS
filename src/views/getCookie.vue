<template>
	<div>
		<div class="QRCode">
			<img :src="QRCodeUrl" alt="登录地址" />
		</div>

		<div>
			<el-button type="primary" @click="getCookie">获取cookie</el-button>
			<p>当前的cookie为：</p>
			<p>{{ cookie }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const { ipcRenderer, shell, clipboard } = window.require('electron')
import { getQRCode, checkScan } from '@/api/login.ts'

export default defineComponent({
	name: 'getCookie',
	data() {
		return {
			cookie: '',
			QRCodeUrl: 'https://qr.m.jd.com/show?appid=133&size=147'
		}
	},
	setup() {},
	created() {
		this.getCookie()
		this.getQRImg()
	},
	methods: {
		async getQRImg() {
			setInterval(async () => {
				// await checkScan(this.cookie)
			}, 2000)
		},
		getCookie() {
			const _this = this
			ipcRenderer.send('get-cookie')
			ipcRenderer.on('cookie', function(event, arg) {
				ipcRenderer.removeAllListeners('cookie')
				arg.forEach((i: any) => {
					if (i.name === 'QRCodeKey') {
						_this.cookie = i.value
					}
				})
			})
		}
	}
})
</script>

<style lang="scss" scoped>
.QRCode {
	display: flex;
	justify-content: center;
}
</style>
