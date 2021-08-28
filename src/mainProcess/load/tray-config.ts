import { Tray, Menu, app } from 'electron'
import path from 'path'
const iconPath = path.join(__dirname, 'build/icons/favicon.ico')

let tray: any
export function createTray(win: any) {
	tray = new Tray(iconPath) //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url

	tray.setToolTip('抢购') //鼠标移到托盘中应用程序的图标上时，显示的文本

	//点击图标的响应事件，这里是切换主窗口的显示和隐藏
	tray.on('click', () => {
		if (win.isVisible()) {
			win.hide()
		} else {
			win.show()
		}
	})

	//右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
	tray.on('right-click', () => {
		const menuConfig = Menu.buildFromTemplate([
			{
				label: '退出',
				click: () => app.quit()
			}
		])
		tray.popUpContextMenu(menuConfig)
	})
}
