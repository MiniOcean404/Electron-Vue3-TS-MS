import { defineComponent, defineEmits } from 'vue'
import './index.scss'
import { notification } from 'ant-design-vue'
const loginUrl = 'https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F'

export default defineComponent({
	name: 'Login',
	emits: ['AlreadyLogin'], //setup函数必须声明对应的emit
	setup(props, context) {
		const {
			remote: { BrowserWindow }
		} = window.require('electron')

		function loginWindow() {
			const loginWindow = new BrowserWindow({ width: 1000, height: 800 })
			loginWindow.loadURL(loginUrl)
			loginWindow.webContents.on('did-navigate', (event: any, url: string) => {
				if (url !== 'https://www.jd.com/') return

				loginWindow.webContents.session.cookies
					.get({ domain: '.jd.com' })
					.then((cookies: object[]) => {
						const cookie = cookies.reduce((str: string, cookie: any) => {
							// console.log('%c[打印] :', 'color: #bf2c9f; background: pink; font-size: 13px;', )

							const { name, value } = cookie
							str += `${name}=${value};`
							return str
						}, '')

						loginWindow.destroy()
						context.emit('AlreadyLogin', cookie)
					})
					.catch(() => {
						notification['error']({ message: '获取Cookie超时或者出现其他问题' })
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
			<div>
				<a-button class="login-button" type="primary" onClick={loginWindow}>
					登录账号{' '}
				</a-button>
			</div>
		)
	}
})
