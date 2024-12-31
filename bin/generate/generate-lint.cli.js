const path = require('path');

const {
	generateEslint
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('lint:generate')
		.description('Create lint config')
		.action(async () => {
			const targetPath = path.join(process.cwd(), 'eslint.config.js')

			if (await fs.pathExists(targetPath)) {
				console.log('Eslint already exists');
				process.exit(1);
			}

			await generateEslint();
		});
}