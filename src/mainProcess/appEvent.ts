import { app, BrowserWindow } from 'electron'
const isDevelopment = process.env.NODE_ENV !== 'production'
import { createWindow } from '../background'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

/**
 * @描述 当 Electron 完成初始化并准备好创建浏览器窗口时，将调用此方法。某些 API 只能在此事件发生后才能使用
 * @作者 HY
 * @时间 2021-07-18 13:47
 */
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS3_DEVTOOLS)
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString())
		}
	}
	createWindow()
})

/**
 * @描述 窗口关闭时候window平台，mac平台不同的处理
 * @作者 HY
 * @时间 2021-07-18 13:46
 */
// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// * 在开发模式下根据父进程的请求干净地退出
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', data => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
