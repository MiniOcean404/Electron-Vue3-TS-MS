import { ipcMain, session } from 'electron'

ipcMain.on('get-cookie', async (event, args) => {
	// const cookies = await session.defaultSession.cookies.get({ url: 'http://www.jd.com' })
	const cookies = await session.defaultSession.cookies.get({})
	return event.sender.send('cookie', cookies)
})
