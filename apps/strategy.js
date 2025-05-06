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
				},
				{
					reg: '^(/|#)*(ba|BA|Ba|bA)更新所有学生$',
					fnc: 'updateAllStudents'
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

    /**
	 * 更新所有学生攻略图
	 * @param e
	 * @return {Promise<boolean>}
	 */
	async updateAllStudents(e) {
		const studentList = [
			'一花',
			'三森',
			'水三森',
			'亚子',
			'亚津子',
			'伊吕波',
			'伊织',
			'水伊织',
			'优香',
			'体香',
			'佐天泪子',
			'佳代子',
			'春佳代子',
			'切里诺',
			'温泉切里诺',
			'初音未来',
			'千世',
			'水千世',
			'千夏',
			'温泉千夏',
			'千寻',
			'南',
			'吹雪',
			'和纱',
			'和香',
			'温泉和香',
			'咲',
			'水咲',
			'响',
			'应援团响',
			'夏',
			'好美',
			'实梨',
			'宫子',
			'水宫子',
			'小春',
			'水春',
			'小玉',
			'小雪',
			'尼禄',
			'兔女郎尼禄',
			'巴',
			'康娜',
			'御坂美琴',
			'心奈',
			'志美子',
			'忧',
			'水忧',
			'惠',
			'日向',
			'水日向',
			'日和',
			'日奈',
			'水日奈',
			'日富美',
			'水日富美',
			'日鞠',
			'时',
			'时雨',
			'兔女郎时',
			'明日奈',
			'兔女郎明日奈',
			'明里',
			'星野',
			'水星野',
			'晴',
			'晴奈',
			'体晴奈',
			'春晴奈',
			'月咏',
			'未花',
			'朱莉',
			'朱音',
			'兔朱音',
			'果穗',
			'枫',
			'枫香',
			'春枫香',
			'柚子',
			'女仆柚子',
			'柯托莉',
			'应援团柯托莉',
			'桃井',
			'桐乃',
			'桔梗',
			'梅露',
			'梓',
			'水梓',
			'椿',
			'樱子',
			'歌原',
			'应援团歌原',
			'泉',
			'泉奈',
			'水泉奈',
			'泳装泉',
			'淳子',
			'春淳子',
			'渚',
			'满',
			'濑名',
			'爱丽丝',
			'女仆爱丽丝',
			'爱莉',
			'玛丽',
			'玛丽娜',
			'运动服玛丽',
			'玲纱',
			'瑠美',
			'白子',
			'水白子',
			'骑行白子',
			'真白',
			'水真白',
			'真纪',
			'睦月',
			'春月',
			'瞬',
			'幼瞬',
			'红叶',
			'纱织',
			'纱绫',
			'滑鼠',
			'凌音',
			'直升机',
			'绿',
			'紫',
			'美咲',
			'美游',
			'水美游',
			'美祢',
			'艾米',
			'花凛',
			'兔女郎花凛',
			'花子',
			'水花子',
			'花绘',
			'圣诞花绘',
			'芹娜',
			'圣诞芹娜',
			'芹香',
			'春黑',
			'若藻',
			'水若藻',
			'莲华',
			'莲见',
			'运动服莲见',
			'运动妹',
			'菲娜',
			'萌绘',
			'诺亚',
			'遥香',
			'春遥香',
			'野宫',
			'水富婆',
			'铃美',
			'阿露',
			'春鲁',
			'霞',
			'静子',
			'水静子',
			'食蜂操祈',
			'鹤城',
			'泳装鹤城'
		];

		this.reply('开始更新所有学生攻略图，请稍候...');
		const failedStudents = []; // 记录更新失败的学生
	
		for (const student of studentList) {
			try {
				const result = await Strategy.getImage(student);
				
				// 检查返回结果是否为模糊匹配（Fuzzy Search）
				if (result && typeof result === 'object' && result.message === 'Fuzzy Search') {
					console.error(`下载 ${student} 的攻略图失败：未找到精确匹配`);
					failedStudents.push(student);
				} else if (result && (typeof result !== 'object' || result.message === 'OK')) {
					console.log(`已下载 ${student} 的攻略图`);
				} else {
					console.error(`下载 ${student} 的攻略图失败：未知错误`);
					failedStudents.push(student);
				}
			} catch (error) {
				console.error(`下载 ${student} 的攻略图失败: ${error}`);
				failedStudents.push(student);
			}
		}
	
		// 根据是否有失败情况发送不同的回复
		if (failedStudents.length === 0) {
			this.reply('所有学生攻略图更新完成！无失败记录。');
		} else {
			const replyMessage = [
				'所有学生攻略图更新完成！以下角色更新失败：',
				...failedStudents.map(name => `\n- ${name}`),
				`\n共 ${failedStudents.length} 个角色更新失败。`
			];
			this.reply(replyMessage);
		}
	
		return true;
	}
}
