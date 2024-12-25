const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { env } = require('process');

const templatePath = path.join(__dirname, './../stubs/template');
const stubORMsPath = path.join(__dirname, './../stubs/elements/ORM');

async function createDirectoryStructure(projectPath, options) {
	const {
		projectName,
		description = null,
		version = "1.0.0",
		docker = null,
		eslint = null,
		uTest = null,
		database = {},
		packageManager = "none"
	} = options;
	try {
		await fs.copy(templatePath, projectPath);
		const packageJsonPath = path.join(projectPath, 'package.json');
		const packageJson = fs.readJsonSync(packageJsonPath);
		const envExampleFilePath = path.join(projectPath, '.env.example');
		const envFilePath = path.join(projectPath, '.env');
		let envFile = await fs.readFile(envExampleFilePath, 'utf8');

		packageJson.name = projectName;
		packageJson.description = null !== description ? description : ""
		packageJson.version = version

		envFile.replace("APP_NAME=BAMIMI", `APP_NAME=${projectName}`)

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

		let userOrmPath;
		if ("none" === database.useDatabase || "NoSQL" === database.useDatabase) {
			let sequelizercFilePath = path.join(projectPath, '.sequelizerc');
			let dataMigrationPath = path.join(projectPath, './src/database/migrations');
			let dataAssociation = path.join(projectPath, './src/app/ORMs/associations');
			let bootstrap = path.join(projectPath, './src/bootstrap/index.js');

			if (fs.existsSync(sequelizercFilePath)) {
				await fs.remove(sequelizercFilePath);
			}

			if (fs.existsSync(dataMigrationPath)) {
				await fs.remove(dataMigrationPath)
			}

			if (fs.existsSync(dataAssociation)) {
				await fs.remove(dataAssociation)
			}

			if (fs.existsSync(bootstrap)) {
				let content = await fs.readFile(bootstrap, 'utf8');
				content = content.replace(`require("../app/ORMs/associations");`, "")

				await fs.writeFile(bootstrap, content);
			}
			delete packageJson.scripts["migration:create"]
			delete packageJson.scripts["migration:up"]
			delete packageJson.scripts["migration:undo"]
			delete packageJson.scripts["migration:undo:all"]
			delete packageJson.scripts["seed:create"]
			delete packageJson.scripts["seed:select"]
			delete packageJson.scripts["seed:all"]
			delete packageJson.scripts["seed:undo"]
			delete packageJson.scripts["seed:undo:all"]

			delete packageJson.dependencies["sequelize"]
			delete packageJson.devDependencies["sequelize-cli"]

			if ("NoSQL" === database.useDatabase && "mongodb" === database.connection) {
				userOrmPath = path.join(stubORMsPath, 'nosql', 'mongodb', 'User.stub')
			}
		} else {
			delete packageJson.dependencies["mongoose"]
			userOrmPath = path.join(stubORMsPath, 'sql', 'User.stub')
		}

		if (userOrmPath && await fs.pathExists(userOrmPath)) {
			const userOrm = await fs.readFile(userOrmPath, 'utf8');
			const targetPath = path.join(projectPath, 'src/app/ORMs/User.js')
			await fs.writeFile(targetPath, userOrm);
		}

		
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		if (database.type) {
			envFile = envFile.replace("DB_TYPE=sql", `DB_TYPE=${database.useDatabase.toLowerCase()}`)
		}
		if (database.connection) {
			envFile = envFile.replace("DB_CONNECTION=postgres", `DB_CONNECTION=${database.connection}`)
		}
		if (database.host) {
			envFile = envFile.replace("DB_HOST=localhost", `DB_HOST=${database.host}`)
		}
		if (database.port) {
			envFile = envFile.replace("DB_PORT=5432", `DB_PORT=${database.port}`)
		}
		if (database.username) {
			envFile = envFile.replace("DB_USERNAME=db_user", `DB_USERNAME=${database.username}`)
		}
		if (database.password) {
			envFile = envFile.replace("DB_PASSWORD=db_password", `DB_PASSWORD=${database.password}`)
		}
		if (database.name) {
			envFile = envFile.replace("DB_DATABASE=db", `DB_DATABASE=${database.name}`)
		}

		await fs.writeFile(envFilePath, envFile)

		console.info(`Project ${projectName} created structure`);

		if ("none" !== packageManager) {
			console.info(`Project ${projectName} install packages`);
			runInstallInCurrentDir(projectPath, packageManager)
		}
	} catch (error) {
		console.error(`Error creating project structure: ${error.message}`);
		throw error;
	}
}

function runInstallInCurrentDir(projectPath, packageManager) {

	let cmd;
	switch (packageManager) {
		case "npm":
			cmd = "npm install";
			break;
		case "yarn":
			cmd = "yarn install";
			break;
		case "pnpm":
			cmd = "pnpm init";
			break;
	}

	const packageJsonPath = path.join(projectPath, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		const installProcess = exec(cmd, { cwd: projectPath });

		installProcess.stdout.on('data', (data) => {
			console.log(data.toString());
		});

		installProcess.stderr.on('data', (data) => {
			console.error(data.toString());
		});

		installProcess.on('close', (code) => {
			if (code === 0) {
				console.log('Project installed package successfully!');
			} else {
				console.error(`Project installed package failed with exit code ${code}`);
			}
		});
	} else {
		console.log('No package.json found in this directory');
	}
}

module.exports = {
	createDirectoryStructure
}