import { BrowserWindow, app, globalShortcut, session } from 'electron'

export function regGlobalShortcut(win: BrowserWindow) {
	globalShortcut.register('ctrl+e', async () => {
		await win.loadURL('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F')
	})

	globalShortcut.register('ctrl+shift+i', () => {
		win.webContents.openDevTools()
	})
}

export function isReg() {
	// 检测是否注册成功
	const isDevTool = globalShortcut.isRegistered('ctrl+e') ? 'success' : 'fail'
}
