import { downloadFile } from './downloadFile.js'
import {
	getBotType,
	getBotVision,
	getPluginVersion,
	getCopyright,
	botBasePath,
	pluginBasePath
} from './getPluginInfo.js'
import { mkdir, readDirSync } from './folder.js'
import { md5 } from './md5.js'
import { execSync } from './runCmd.js'
import { getRemoteUrl } from './getRemoteUrl.js'
import { random } from "./random.js";

export default {
	downloadFile,
	getBotType,
	getBotVision,
	getPluginVersion,
	getCopyright,
	botBasePath,
	pluginBasePath,
	mkdir,
	readDirSync,
	md5,
	execSync,
	getRemoteUrl,
	random
}
