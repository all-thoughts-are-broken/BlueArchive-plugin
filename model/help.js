import base from './base.js'
import config from './Config.js'
import tools from '../tools/index.js'
import path from 'path'
import _ from 'lodash'

export default class Help extends base {
	constructor(e) {
		super(e)
		this.model = 'help'
	}

	async help() {
		let data = {
			helpData: config.getConfig('help', 'menu')
		}
		// 使用了自定义背景图
		if (
			config.getConfig('help', 'set').useCustomBackgroundImage === false
		) {
			let imageList = tools.readDirSync(
				path.join(
					tools.pluginBasePath,
					'resources/customize_image/help_background'
				)
			)
			// 过滤一下那个文件
			imageList = _.remove(imageList, (s) => s.endsWith('.gitignore'))
			let i = tools.random(0, imageList.length - 1)
			logger.info(imageList, imageList.length, i)
			data.bg = imageList[i].replace(/\\/g, '/')
			logger.info(data.bg)
		} else {
			let imageList = tools.readDirSync(
				path.join(
					tools.pluginBasePath,
					'resources/image/help/background'
				)
			)
			let i = tools.random(0, imageList.length - 1)
			logger.info(imageList, imageList.length, i)
			data.bg = imageList[i].replace(/\\/g, '/')
			logger.info(data.bg)
		}
		let img = await this.render('help', data, { scale: 1.2 })
		return await this.e.reply(img)
	}
}
