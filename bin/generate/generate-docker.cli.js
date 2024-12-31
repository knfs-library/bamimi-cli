const path = require('path');

const {
	generateDocker
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('docker:generate')
		.description('Create docker file docker file')
		.action(async () => {
			const targetPath = path.join(process.cwd(), 'Dockerfile')

			if (await fs.pathExists(targetPath)) {
				console.log('Docker already exists');
				process.exit(1);
			}

			await generateDocker();
		});
}