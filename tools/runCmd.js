import child_process from 'child_process'

export async function execSync(cmd) {
	return new Promise((resolve, reject) => {
		child_process.exec(cmd, (error, stdout, stderr) => {
			resolve({
				error,
				stdout,
				stderr
			})
		})
	})
}
