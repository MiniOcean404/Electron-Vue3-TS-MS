import { defineComponent, defineEmits } from 'vue'
import './index.scss'
import { ElNotification } from 'element-plus'

export default defineComponent({
	name: 'Login',
	emits: ['AlreadyLogin'], //setup函数必须声明对应的emit
	setup(props, context) {
		const {
			remote: { BrowserWindow }
		} = window.require('electron')

		function loginWindow() {
			const loginWindow = new BrowserWindow({ width: 1000, height: 800 })
			loginWindow.loadURL('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F')
			loginWindow.webContents.on('did-navigate', (event, url) => {
				if (url !== 'https://www.jd.com/') return

				loginWindow.webContents.session.cookies
					.get({ domain: '.jd.com' })
					.then((cookies) => {
						const cookie = cookies.reduce((str, cookie) => {
							const { name, value } = cookie
							str += `${name}=${value};`
							return str
						}, '')

						loginWindow.destroy()
						context.emit('AlreadyLogin', cookie)
						ElNotification({ type: 'success', title: '成功', message: '账号已添加' })
					})
					.catch(() => {
						ElNotification({ type: 'error', title: '失败', message: '获取Cookie超时或者出现其他问题' })
					})
			})
		}

		return {
			loginWindow
		}
	},
	render() {
		const { loginWindow } = this
		return (
			<>
				<el-button class="login-button" type="primary" onClick={loginWindow}>
					登录账号
				</el-button>
			</>
		)
	}
})
