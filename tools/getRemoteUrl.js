import _ from 'lodash'
import { execSync } from './runCmd.js'

/**
 * 获得仓库链接（手动下zip解压的话会返回null）
 * @return {Promise<string|null>}
 */
export async function getRemoteUrl() {
	try {
		let { stdout, stderr } = await execSync('git remote -v')
		if (stderr) {
			logger.error(stderr)
			return null
		}
		let lines = stdout.split('\n')
		lines = _.compact(lines)
		lines = _.map(lines, (line) => {
			return line.replace('\t', ' ')
		})
		let remoteUrl = null
		for (const line of lines) {
			const match = line.match(/^origin\s+(.*?)\s+(\(fetch\)|\(push\))$/)
			if (match) {
				remoteUrl = match[1]
				break
			}
		}
		if (remoteUrl) {
			if (remoteUrl.includes('BlueArchive-plugin.git')) {
				return remoteUrl
			}
			return null
		}
		return null
	} catch (err) {
		logger.error(err)
		return null
	}
}
