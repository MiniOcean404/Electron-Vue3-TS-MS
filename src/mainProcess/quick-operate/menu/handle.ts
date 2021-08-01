import { session } from 'electron'
import { win } from '../../load/main-config'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export const getCookie = function() {
	session.defaultSession.cookies
		.get({ url: 'http://www.jd.com' })
		.then((cookies) => {
			// BrowerWindow.webContents.send('cookie', cookies)
			console.log(cookies)
		})
		.catch((error) => {
			console.log(error)
		})
}

export function openDevtool() {
	win.webContents.openDevTools()
}

export async function goBack() {
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}
}

export function goLogin() {
	win.loadURL('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F')
}
