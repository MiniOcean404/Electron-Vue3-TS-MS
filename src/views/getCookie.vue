<template>
	<div>
		<div class="QRCode">
			<img :src="QRCodeUrl" alt="登录地址" />
		</div>

		<div>
			<a-button type="primary" @click="getCookie">获取cookie</a-button>
			<p>当前的cookie为：</p>
			<p>{{ cookie }}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const { ipcRenderer, shell, clipboard, net } = window.require('electron')

export default defineComponent({
	name: 'getCookie',
	data() {
		return {
			cookie: '',
			QRCodeUrl: `https://qr.m.jd.com/show?appid=133&size=147&t=${Date.now().toString()}`,
		}
	},
	setup() {},
	created() {},
	methods: {
		getQRImg() {},
		getCookie() {
			this.getQRImg()

			const _this = this
			ipcRenderer.send('get-cookie')
			ipcRenderer.on('cookie', function (event, arg) {
				ipcRenderer.removeAllListeners('cookie')
				arg.forEach((i: any) => {
					if (i.name === 'QRCodeKey') {
						_this.cookie = `QRCodeKey=${i.value};HttpOnly;`
					}
					if (i.name === 'wlfstk_smdl') {
						_this.cookie += `wlfstk_smdl=${i.value}; PATH=/; DOMAIN=.jd.com`
					}
				})
				console.log('cookie', _this.cookie)
			})
		},
	},
})
</script>

<style lang="scss" scoped>
.QRCode {
	display: flex;
	justify-content: center;
}
</style>
