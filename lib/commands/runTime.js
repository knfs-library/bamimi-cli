const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function build() {
	const cmd = `npx ncp ./src ./dist && npx babel src --out-dir dist --extensions .js`;
	const projectPath = path.join(process.cwd());
	
	const packageJsonPath = path.join(projectPath, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		const buildProcess = exec(cmd, { cwd: projectPath });

		buildProcess.stdout.on('data', (data) => {
				console.log(data.toString());
			});
	
		buildProcess.stderr.on('data', (data) => {
				console.error(data.toString());
			});
	
		buildProcess.on('close', (code) => {
				if (code === 0) {
					console.log('Project is built  successfully!');
				} else {
					console.error(`Project is built failed with exit code ${code}`);
				}
			});
	} else {
		console.log('No package.json found in this directory');
	}
}

module.exports = {
	build
}