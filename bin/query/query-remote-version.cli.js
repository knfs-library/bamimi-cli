
module.exports = (runCommand) => {
	const apiGetVersion = 'https://api.github.com/repos/knfs-library/bamimi-cli/releases';
	runCommand
		.command('version:list-remote')
		.description('List remote versions')
		.action(async () => {
			const response = await fetch(apiGetVersion);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			for (const ver of await response.json()) {
				console.info(ver.name)
			}
			
			process.exit(1);
		});
}