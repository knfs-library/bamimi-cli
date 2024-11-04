const fs = require('fs-extra');
const path = require('path');
const templatePath = path.join(__dirname, './../stubs/template');
const pkj = require("./../../package.json")

async function createDirectoryStructure(projectPath, options) {
	const { projectName, description = null, version = pkj.version, docker = null, eslint = null, entrypoint = null } = options;
	try {
		await fs.copy(templatePath, projectPath);
		const packageJsonPath = path.join(projectPath, 'package.json');
		const packageJson = fs.readJsonSync(packageJsonPath);
		packageJson.name = projectName;
		if (null !== description) packageJson.description = description; 
		if (null !== version) packageJson.version = version;
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		if (!docker) {
			const dockerFilePath = path.join(projectPath, 'Dockerfile');
			if (fs.existsSync(dockerFilePath)) {
				await fs.remove(dockerFilePath);
				console.log('Dockerfile removed');
			}
		}

		if (!eslint) {
			const eslintFilePath = path.join(projectPath, 'eslint.config.js');
			if (fs.existsSync(eslintFilePath)) {
				await fs.remove(eslintFilePath);
				console.log('eslint.config.js removed');
			}
		}

		if (!entrypoint) {
			const entrypointFilePath = path.join(projectPath, 'entrypoint.sh');
			if (fs.existsSync(entrypointFilePath)) {
				await fs.remove(entrypointFilePath);
				console.log('entrypoint.sh removed');
			}
		}

		console.log(`Project ${projectName} created successfully`);
	} catch (error) {
		console.error(`Error creating project structure: ${error.message}`);
		throw error;
	}
}

module.exports = {
	createDirectoryStructure
}