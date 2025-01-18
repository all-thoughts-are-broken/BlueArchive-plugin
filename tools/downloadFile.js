import axios from 'axios'
import fs from 'fs'

/**
 * 文件下载函数
 * @param url url
 * @param savePath 保存路径
 * @return {Promise<object>}
 */
export async function downloadFile(url, savePath) {
	try {
		logger.info(`[BlueArchive-plugin] 开始下载：${url}`)
		const response = await axios({
			method: 'GET',
			url: url,
			responseType: 'stream'
		})

		if (response.status === 200) {
			const contentType = response.headers['content-type']
			logger.info(`[BlueArchive-plugin] content-type：${contentType}`)

			return new Promise((resolve, reject) => {
				const writeStream = fs.createWriteStream(savePath)
				response.data.pipe(writeStream)

				writeStream.on('finish', () => {
					logger.info(
						`[BlueArchive-plugin] 下载成功：已经保存到${savePath}`
					)
					resolve({ status: 'success', filePath: savePath })
				})

				writeStream.on('error', (error) => {
					logger.error(`[BlueArchive-plugin] 写入文件失败：${error}`)
					reject({ status: 'error', filePath: null })
				})
			})
		} else {
			logger.info(
				`[BlueArchive-plugin] 下载失败：状态码${response.status}`
			)
			return { status: 'error', filePath: null }
		}
	} catch (error) {
		logger.error(
			`[BlueArchive-plugin] 发生错误：\n${error.message || error}`
		)
		return { status: 'error', filePath: null }
	}
}
