const path = require('path');

const {
	generateInterface,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('itf:generate <interfaceName>')
		.description('Generate a new api interface')
		.option('-p, --path <path>', 'Path for the response (if you don\'t want to use the default)')
		.action(async (interfaceName, cmdObj) => {
			const { path: itfPath } = cmdObj;
			let fileName = `${interfaceName}.js`;
		
			const targetPath = itfPath ? path.join(process.cwd(), './src', itfPath, fileName) : path.join(process.cwd(), './src/interfaces/apis', fileName);

			if (await fs.pathExists(targetPath)) {
				console.log('Interface already exists');
				process.exit(1);
			}

			await generateInterface(targetPath, interfaceName);
		});
}