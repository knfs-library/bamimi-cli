const path = require('path');

const {
	generateTestConfig
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('testConfig:generate')
		.description('Create test config file')
		.action(async () => {
			const targetPath = path.join(process.cwd(), 'jest.config.js')

			if (await fs.pathExists(targetPath)) {
				console.log('Test config already exists');
				process.exit(1);
			}

			await generateTestConfig();
		});
}