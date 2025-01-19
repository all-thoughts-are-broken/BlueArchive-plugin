import plugin from '../../../lib/plugins/plugin.js'
import Strategy from '../model/Strategy.js'
import _ from 'lodash'

export class BaStrategy extends plugin {
	constructor() {
		super({
			name: 'BA攻略',
			dsc: 'BA攻略',
			event: 'message',
			priority: 500,
			rule: [
				{
					reg: '^(/|#)*(ba|BA|Ba|bA)攻略(.*)$',
					fnc: 'strategy'
				}
			]
		})
	}

	/**
	 * 匹配是学生攻略还是关卡攻略
	 * 从而交给对应的函数去处理
	 * @param e
	 * @return {Promise<boolean>}
	 */
	async strategy(e) {
		let key = e.msg.replace(/#|\/|ba|BA|Ba|bA|攻略/g, '').trim()
		if (key.includes('-')) {
			// 说明是关卡攻略
			key = key.replace(/h/g, 'H')
			if (key.includes('H')) {
				key = `H${key.replace(/H/g, '')}`
			}
			return await this.chapter_map(key)
		} else {
			// 那就是学生攻略
			return await this.student_rank(key)
		}
	}

	/**
	 * 学生攻略
	 * @param {string} key 学生名
	 * @return {Promise<boolean>}
	 */
	async student_rank(key) {
		// 先粗略应付一下
		let data = await Strategy.getImage(key)
		if (data && typeof data !== 'object') {
			this.reply(segment.image(data))
			return true
		} else if (typeof data === 'object') {
			let reply = [`没有找到${key}，是否再找：`]
			data.forEach((item) => {
				reply.push(`\n${item.name}`)
			})
			this.reply(reply)
			return true
		}
	}

	/**
	 * 关卡攻略
	 * @param {string} key 关卡名
	 * @return {Promise<boolean>}
	 */
	async chapter_map(key) {
		let data = await Strategy.getImage(key)
		if (data && typeof data !== 'object') {
			this.reply(segment.image(data))
			return true
		} else if (typeof data === 'object') {
			let reply = [`没有找到${key}，是否再找：`]
			data.forEach((item) => {
				reply.push(`\n${item.name}`)
			})
			this.reply(reply)
			return true
		}
	}
}
