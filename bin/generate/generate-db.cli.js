const path = require('path');

const {
	generateSQLConfig,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('sql:generate')
		.description('Create sql db config file')
		.action(async () => {
			const targetPath = path.join(process.cwd(), '.sequelizerc')

			if (await fs.pathExists(targetPath)) {
				console.log('Sql db config already exists');
				process.exit(1);
			}

			await generateSQLConfig();
		});
}