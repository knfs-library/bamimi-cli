const path = require('path');

const {
	generateMiddleware,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('middleware:generate <middlewareName>')
		.description('Generate a new middleware')
		.option('-p, --path <path>', 'Path for the middleware (if you don\'t want to use the default)')
		.action(async (middlewareName, cmdObj) => {
			const { path: middlewarePath } = cmdObj;
			let fileName = `${middlewareName}.mid.js`;

			const targetPath = middlewarePath ? path.join(process.cwd(), './src', middlewarePath, fileName) : path.join(process.cwd(), './src/app/http/middleware', fileName);
			if (await fs.pathExists(targetPath)) {
				console.log('Middleware already exists');
				process.exit(1);
			}

			await generateMiddleware(targetPath, middlewareName);
		});
}