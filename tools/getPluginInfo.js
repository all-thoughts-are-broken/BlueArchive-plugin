import fs from 'fs'
import path from 'path'

export const botBasePath = process.cwd().replace(/\\/g, '/')
export const pluginBasePath = path.join(
	botBasePath,
	'/plugins/BlueArchive-plugin/'
).replace(/\\/g, '/')

export function getPluginVersion() {
	const pkg = JSON.parse(
		fs.readFileSync(path.join(pluginBasePath, 'package.json'), 'utf8')
	)
	return pkg.version
}

export function getBotVision() {
	const pkg = JSON.parse(
		fs.readFileSync(path.join(botBasePath, 'package.json'), 'utf8')
	)
	return pkg.version || '1.0.0'
}

export function getBotType() {
	const pkg = JSON.parse(
		fs.readFileSync(path.join(botBasePath, 'package.json'), 'utf8')
	)
	if (pkg.name === 'trss-yunzai') {
		return 'TRSS-Yunzai'
	} else if (pkg.name === 'miao-yunzai') {
		return 'Miao-Yunzai'
	}
	return 'Yunzai-Bot'
}

export function getCopyright() {
	return `<span class="version">Created By ${getBotType()} <span class="V">${getBotVision()}</span> & BlueArchive-plugin <span class="V">${getPluginVersion()}</span></span>`
}
