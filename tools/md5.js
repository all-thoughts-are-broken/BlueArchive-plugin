import crypto from 'crypto'
import fs from 'fs'

/**
 * 计算文件md5
 * @param {Buffer|string} data 文件路径或者Buffer
 * @return {string} 计算结果
 */
export function md5(data) {
	if (Buffer.isBuffer(data)) {
		return crypto.createHash('md5').update(data).digest('hex')
	} else if (typeof data === 'string') {
		return crypto
			.createHash('md5')
			.update(fs.readFileSync(data))
			.digest('hex')
	}
}
