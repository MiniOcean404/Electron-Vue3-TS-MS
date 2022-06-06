import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { createTray } from '@/mainProcess/load/tray-config'
import { createMenu } from '@/mainProcess/quick-operate/menu/menu'
import { isReg, regGlobalShortcut } from '@/mainProcess/quick-operate/shortcut'

export let win: BrowserWindow
export async function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		frame: true, //false无边框
		webPreferences: {
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			// nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
			// contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			nodeIntegration: true, //允许页面集成node模块
			contextIsolation: false, //electron12之后要将其设置false才能集成node，否则true加载预加载脚本
			// enableRemoteModule: true, //是否开启remote模块
			webSecurity: false, // 取消跨域限制
			// preload: path.join(__dirname, '../src/mainProcess/content-bridge.js')
		},
	})

  // 在 14 版本 require('electron').remote 方式被移除
  // https://www.electronjs.org/zh/docs/latest/breaking-changes#removed-remote-module
  require('@electron/remote/main').initialize()
  require("@electron/remote/main").enable(win.webContents)

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// 如果处于开发模式，则加载开发服务器的 url
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		await win.loadURL('app://./index.html')
	}

	regGlobalShortcut(win)
	createTray(win)
	isReg()
	createMenu()
}
