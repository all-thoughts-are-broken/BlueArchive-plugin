import fs from 'fs'
import tools from '../tools/index.js'
import path from 'path'
import axios from 'axios'

export default new (class Strategy {
	constructor() {
		this.strategy_image_path = path.join(
			tools.pluginBasePath,
			'/resources/strategy_image_cache/'
		)
	}
	async sendRequest(key) {
		try {
			const response = await axios.get(
				`https://arona.diyigemt.com/api/v2/image?name=${key}`
			)
			if (response.status === 200) {
				logger.info(JSON.stringify(response.data, null, 2))
				return JSON.stringify(response.data) || response.data
			}
			logger.info(response.status, response.statusText)
			return false
		} catch (error) {
			logger.error(error)
			return false
		}
	}
	async getImage(key) {
		try {
			let res = await this.sendRequest(key)
			if (res) {
				res = JSON.parse(res)
				// 有且仅有一个元素，说明精确匹配到了
				if (res.data.length === 1 && res.data.length !== 0) {
					let imageFullPath = path.join(
						this.strategy_image_path,
						res.data[0].content
					)
					let imageUrl = `https://arona.diyigemt.com/image${res.data[0].content}`
					let imageHash = res.data[0].hash
					// 如果文件存在，那就比对一下hash
					if (fs.existsSync(imageFullPath)) {
						logger.info('图片存在，检查hash')
						// hash一致，无需再次下载，直接返回图片路径
						if (tools.md5(imageFullPath) === imageHash) {
							logger.info('hash一致，返回本地图片')
							return imageFullPath
						} else {
							// hash有变化，下载新的
							logger.info('hash不一致，下载新的')
							let { status } = await tools.downloadFile(
								imageUrl,
								imageFullPath
							)
							// 下载成功
							if (status === 'success') {
								// 返回图片路径
								return imageFullPath
							} else if (status === 'error') {
								// 失败了，返回图片链接
								return imageUrl
							}
						}
					} else {
						// 图片不存在，那就下载
						let { status } = await tools.downloadFile(
							imageUrl,
							imageFullPath
						)
						// 下载成功
						if (status === 'success') {
							// 返回图片路径
							return imageFullPath
						} else if (status === 'error') {
							// 失败了，返回图片链接
							return imageUrl
						}
					}
				} else {
					// 有多个数据，那就返回res.data
					return res.data
				}
			}
		} catch (error) {
			logger.error(error)
			return false
		}
	}
})()
