const path = require('path');

const {
	generateRequest,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('request:generate <requestName>')
		.description('Generate a new request')
		.option('-p, --path <path>', 'Path for the request (if you don\'t want to use the default)')
		.action(async (requestName, cmdObj) => {
			const { path: requestPath } = cmdObj;
			let fileName = `${requestName}.req.js`;

			const targetPath = requestPath ? path.join(process.cwd(), './src', requestPath, fileName) : path.join(process.cwd(), './src/app/http/requests', fileName);
			if (await fs.pathExists(targetPath)) {
				console.log('Request already exists');
				process.exit(1);
			}

			await generateRequest(targetPath, requestName);
		});
}