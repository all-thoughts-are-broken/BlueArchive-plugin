import fs from 'fs'
import puppeteer from '../../../../lib/puppeteer/puppeteer.js'
import config from '../../model/Config.js'
import tools from '../../tools/index.js'
const _path = process.cwd()

export default new (class {
	/**
	 * 渲染HTML
	 * @param app
	 * @param {object} params 参数
	 * @param {object} cfg
	 */
	async render(app, params, cfg = {}) {
		tools.mkdir(`temp/html/BlueArchive-plugin/${app}`)
		let resPath = `${tools.pluginBasePath}/resources/`
		// let resPath = `../../../../../plugins/BlueArchive-plugin/resources/`;
		let data = {
			...params,
			_plugin: 'BlueArchive-plugin',
			saveId: params.saveId || params.save_id || app,
			tplFile: `./plugins/BlueArchive-plugin/resources/html/${app}/${app}.html`,
			pluResPath: resPath,
			pageGotoParams: {
				waitUntil: 'networkidle0'
			},
			sys: {
				scale: this.#scale(cfg.scale || 1)
			},
			copyright: tools.getCopyright(),
			quality: 100
		}
		if (process.argv.includes('web-debug')) {
			// debug下保存当前页面的渲染数据，方便模板编写与调试
			// 由于只用于调试，开发者只关注自己当时开发的文件即可，暂不考虑app及plugin的命名冲突
			let saveDir = _path + '/data/ViewData/BlueArchive-plugin'
			if (!fs.existsSync(saveDir)) {
				fs.mkdirSync(saveDir)
			}
			let file = saveDir + app + '.json'
			data._app = app
			fs.writeFileSync(file, JSON.stringify(data))
		}
		return await puppeteer.screenshot(`BlueArchive-plugin/${app}`, data)
	}

	#scale(pct = 1) {
		let scale = config.getConfig('whole', 'set').renderScale
		scale = Math.min(2, Math.max(0.5, scale / 100))
		pct = pct * scale
		return `style='transform:scale(${pct})'`
	}
})()
