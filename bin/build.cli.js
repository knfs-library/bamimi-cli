const {
	build
} = require('../lib/handlers/runTime');
module.exports = (runCommand) => {
	runCommand
		.command('build')
		.description('Build project')
		.action(async () => {
			await build()
		});
}