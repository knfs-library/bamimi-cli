const fs = require('fs-extra');
const path = require('path');
const templatePath = path.join(__dirname, './../stubs/template');
const pkj = require("./../../package.json")

async function createDirectoryStructure(projectPath, options) {
	const { projectName, description = null, version = pkj.version, docker = null, eslint = null, uTest = null, database = {} } = options;
	try {
		await fs.copy(templatePath, projectPath);
		const packageJsonPath = path.join(projectPath, 'package.json');
		const packageJson = fs.readJsonSync(packageJsonPath);
		packageJson.name = projectName;
		if (null !== description) packageJson.description = description;
		if (null !== version) packageJson.version = version;

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
			delete packageJson.scripts.lint
			delete packageJson.scripts["lint:fix"]

			delete packageJson.devDependencies["@eslint/js"]
			delete packageJson.devDependencies["eslint"]
			delete packageJson.devDependencies["eslint-plugin-filenames"]
			delete packageJson.devDependencies["eslint-plugin-jest"]
			delete packageJson.devDependencies["eslint-plugin-naming-convention"]
			delete packageJson.devDependencies["@knfs-tech/eslint-plugin"]
		}

		if (!uTest) {
			const testFilePath = path.join(projectPath, 'jest.config.js');
			const testFolderPath = path.join(projectPath, 'tests');
			if (fs.existsSync(testFilePath)) {
				await fs.remove(testFilePath);
				console.log('jest.config.js removed');
			}
			if (fs.existsSync(testFolderPath)) {
				await fs.remove(testFolderPath);
				console.log('tests removed');
			}
			delete packageJson.scripts.test

			delete packageJson.devDependencies["supertest"]
			delete packageJson.devDependencies["jest"]
		}

		switch (database.useDatabase) {
			case "SQL":

				break;
			case 'none':
			case 'NoSql':
				let sequelizercFilePath = path.join(projectPath, '.sequelizerc');
				let dataMigrationPath = path.join(projectPath, './src/database/migrations');
				if (fs.existsSync(sequelizercFilePath)) {
					await fs.remove(sequelizercFilePath);
				}

				if (fs.existsSync(existsSync)) {
					await fs.remove(dataMigrationPath)
				}
				delete packageJson.scripts["migration:create"]
				delete packageJson.scripts["migration:up"]
				delete packageJson.scripts["migration:undo"]
				delete packageJson.scripts["migration:undo:all"]
				delete packageJson.scripts["seed:create"]
				delete packageJson.scripts["seed:select"]
				delete packageJson.scripts["seed:all"]

				delete packageJson.dependencies["sequelize"]
				delete packageJson.devDependencies["sequelize-cli"]
				break;
		}
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		const envExampleFilePath = path.join(projectPath, '.env.example');
		const envFilePath = path.join(projectPath, '.env');
		const envFile = fs.readJsonSync(envFilePath);
		if (database.connection) {
			envFile.replace("DB_CONNECTION=postgres", `DB_CONNECTION=${database.connection}`)
		}
		if (database.host) {
			envFile.replace("DB_HOST=localhost", `DB_HOST=${database.host}`)
		}
		if (database.port) {
			envFile.replace("DB_PORT=5432", `DB_PORT=${database.port}`)
		}
		if (database.username) {
			envFile.replace("DB_USERNAME=db_user", `DB_USERNAME=${database.username}`)
		}
		if (database.password) {
			envFile.replace("DB_PASSWORD=db_password", `DB_PASSWORD=${database.password}`)
		}
		if (database.name) {
			envFile.replace("DB_DATABASE=db", `DB_DATABASE=${database.name}`)
		}
		fs.writeFile(envFilePath, envFile)

		console.log(`Project ${projectName} created successfully`);
	} catch (error) {
		console.error(`Error creating project structure: ${error.message}`);
		throw error;
	}
}

module.exports = {
	createDirectoryStructure
}