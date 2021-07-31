export function formatDate(date, format) {
	let RegAndValue: object
	if (date instanceof Date) {
		RegAndValue = {
			'y+': date.getFullYear(),
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
	} else {
		RegAndValue = {
			'h+': date / 3600,
			'm+': (date % 3600) / 60,
			's+': date % 60
		}
	}

	for (const [key, value] of Object.entries(RegAndValue)) {
		const reg = new RegExp(`(${key})`, 'gms')

		if (reg.test(format)) {
			const str = date instanceof Date ? value.toString() : Math.round(value).toString()
			const match = RegExp.$1
			const replace = replaceV(RegExp.$1.length, str)

			format = format.replace(match, replace)
		}
	}

	// 在不足两位的前面加0
	function replaceV(currentLength, str) {
		if (str.length === 4) {
			const start = 4 - RegExp.$1.length
			return str.substr(start)
		} else if (str.length >= 0 && str.length <= 4) {
			return ('00' + str).substr(str.length)
		}
	}

	return format
}
