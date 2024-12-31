const path = require('path');
const {
	generateController,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('controller:generate <controllerName>')
		.description('Generate a new controller')
		.option('-p, --path <path>', 'Path for the controller (if you don\'t want to use the default)')
		.option('-f, --func <functions...>', 'List of functions to create (comma-separated)')
		.option('-t, --type <type>', 'api of web')
		.action(async (controllerName, cmdObj) => {
			const { path: controllerPath, func, type } = cmdObj;
			let fileName = `${controllerName}.controller.js`;
			if (type) {
				fileName = path.join(type, fileName)
			}
			const targetPath = controllerPath ? path.join(process.cwd(), './src', controllerPath, fileName) : path.join(process.cwd(), './src/app/http/controllers', fileName);
			if (await fs.pathExists(targetPath)) {
				console.log('Controller already exists');
				process.exit(1);
			}

			await generateController(targetPath, controllerName, func, type);
		});
}