const path = require('path');
const {
	generateChannel,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('channel:generate <channelName>')
		.description('Generate a new channel')
		.option('-p, --path <path>', 'Path for the channel (if you don\'t want to use the default)')
		.action(async (channelName, cmdObj) => {
			const { path: channelPath } = cmdObj;
			let fileName = `${channelName}.channel.js`;
			const targetPath = channelPath ? path.join(process.cwd(), './src', channelPath, fileName) : path.join(process.cwd(), './src/app/channels', fileName);
			if (await fs.pathExists(targetPath)) {
				console.log('Channel already exists');
				process.exit(1);
			}

			await generateChannel(targetPath, channelName);
		});
}