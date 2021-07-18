'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			// nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
			// contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			nodeIntegration: true, //允许页面集成node模块
			contextIsolation: false, //electron12之后要将其设置false才能集成node
			webSecurity: false // 取消跨域限制
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}
}
ipcMain.on('test', (event, args) => {})

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
