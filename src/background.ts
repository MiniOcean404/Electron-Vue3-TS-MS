'use strict'

import { app, protocol, BrowserWindow, session } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import './mainProcess/appEvent'
import './mainProcess/ipMainEvent'
import { regGlobalShortcut, isReg } from './mainProcess/shortcut'
import { createMenu } from './mainProcess/menu/menu'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

export let win: BrowserWindow
export async function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
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

	regGlobalShortcut(win)
	isReg()
	createMenu()
}
