import Help from '../model/help.js'

export class BaHelp extends plugin {
	constructor(e) {
		super({
			name: 'BA插件帮助',
			dsc: 'BA插件帮助',
			event: 'message',
			priority: 500,
			rule: [
				{
					reg: '^(/|#)*(ba|BA|Ba|bA)(插件)?(命令|帮助|功能|指令)$',
					fnc: 'help'
				}
			]
		})
		this._help = new Help(e)
	}

	async help() {
		return await this._help.help()
	}
}
