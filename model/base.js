import puppeteer from '../lib/puppeteer/render.js'

/**
 * @param e
 */
export default class base {
	constructor(e = {}) {
		this.e = e
		this.userId = e?.user_id
		this.model = 'base'
		this._path = process.cwd().replace(/\\/g, '/')
	}

	get prefix() {
		return `Yz:BlueArchive-plugin:${this.model}:`
	}

	/**
	 * 截图默认数据
	 * @param saveId html保存id
	 * @param tplFile 模板html路径
	 * @param pluResPath 插件资源路径
	 */
	get screenData() {
		return {
			saveId: this.userId,
			tplFile: `./plugins/BlueArchive-plugin/resources/html/${this.model}/${this.model}.html`,
			/** 绝对路径 */
			pluResPath: `${this._path}/plugins/BlueArchive-plugin/resources/`
		}
	}

	async render(name, data, cfg) {
		return await puppeteer.render(`${this.model}`, data, cfg)
	}
}
