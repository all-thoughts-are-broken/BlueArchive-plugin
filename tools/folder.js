import fs from 'fs'
import path from 'path'

export function mkdir(dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if (mkdir(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
}

/**
 * 递归读取目录
 * @param {*} dirPath 目录路径
 * @returns {array}
 */
export function readDirSync(dirPath) {
	let arr = []
	let list = fs.readdirSync(dirPath)

	list.forEach((file) => {
		let filePath = path.join(dirPath, file)
		let stat = fs.statSync(filePath)

		if (stat && stat.isDirectory()) {
			arr = arr.concat(readDirSync(filePath))
		} else {
			arr.push(filePath)
		}
	})

	return arr
}
