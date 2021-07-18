import { Menu } from 'electron'
import { goLogin, goBack, getCookie, openDevtool } from './handle'

const template = [
	{
		label: '页面',
		submenu: [
			{
				label: '打开京东登录页面',
				click: goLogin
			},
			{
				label: '回到主页面',
				click: goBack
			}
		]
	},
	{
		label: '开发者',
		submenu: [
			{
				label: '获取cookie',
				click: getCookie
			},
			{
				label: '开发者工具',
				click: openDevtool
			}
		]
	}
]

export function createMenu() {
	Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
