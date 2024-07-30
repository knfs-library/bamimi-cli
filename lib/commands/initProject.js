const fs = require('fs-extra');
const path = require('path');
const templatePath = path.join(__dirname, './../stubs/template');
const pkj = require("./../../package.json")

async function createDirectoryStructure(projectPath, options) {
	const { projectName, description = null, version = pkj.version } = options;
	try {
		await fs.copy(templatePath, projectPath);
		const packageJsonPath = path.join(projectPath, 'package.json');
		const packageJson = fs.readJsonSync(packageJsonPath);
		packageJson.name = projectName;
		if (null !== description) packageJson.description = description; 
		if (null !== version) packageJson.version = version;
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		console.log(`Project ${projectName} created successfully`);
	} catch (error) {
		console.error(`Error creating project structure: ${error.message}`);
		throw error;
	}
}

module.exports = {
	createDirectoryStructure
}