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
			contextIsolation: false, //electron12之后要将其设置false才能集成node，否则true加载预加载脚本
			enableRemoteModule: true, //是否开启remote模块
			webSecurity: false // 取消跨域限制
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// 如果处于开发模式，则加载开发服务器的 url
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
