const fs = require('fs-extra');
const path = require('path');
const { createDirectoryStructure } = require('../../lib/commands/initProject');

describe('createDirectoryStructure', () => {
	const projectPath = path.join(__dirname, 'test-project');
	const projectName = 'my-project';
	const templatePath = path.join(__dirname, './../../lib/stubs/template');
	const options = { projectName, description: 'Test project', version: '1.0.0' };
	const packageJsonPath = path.join(projectPath, 'package.json');
	const databaseConfig = {
		useDatabase: 'NoSQL',
		connection: 'mongodb',
		host: 'localhost',
		port: 27017,
		username: 'db_user',
		password: 'db_password',
		name: 'my_database'
	};

	beforeAll(async () => {
		if (!await fs.pathExists(templatePath)) {
			throw new Error(`Template path ${templatePath} does not exist`);
		}
	});

	beforeEach(async () => {
		await fs.remove(projectPath);
	});

	afterAll(async () => {
		await fs.remove(projectPath);
	});

	it('should create the project structure and update package.json', async () => {
		await createDirectoryStructure(projectPath, options);

		const exists = await fs.pathExists(projectPath);
		expect(exists).toBe(true);

		const packageJson = await fs.readJson(packageJsonPath);
		expect(packageJson.name).toBe(projectName);
		expect(packageJson.description).toBe(options.description);
		expect(packageJson.version).toBe(options.version);
	});

	it('should work without a description and version', async () => {
		const optionsWithoutDescriptionAndVersion = { projectName };
		await createDirectoryStructure(projectPath, optionsWithoutDescriptionAndVersion);

		const packageJson = await fs.readJson(packageJsonPath);
		expect(packageJson.name).toBe(projectName);
		expect(packageJson.description).toBe("");
		expect(packageJson.version).toBe("1.0.0");
	});

	it('should remove Dockerfile if not selected', async () => {
		const optionsWithoutDocker = { projectName, description: 'Test project', version: '1.0.0', docker: false };
		await createDirectoryStructure(projectPath, optionsWithoutDocker);

		const dockerFilePath = path.join(projectPath, 'Dockerfile');
		const dockerExists = await fs.pathExists(dockerFilePath);
		expect(dockerExists).toBe(false);
	});

	it('should remove ESLint config if not selected', async () => {
		const optionsWithoutEslint = { projectName, description: 'Test project', version: '1.0.0', eslint: false };
		await createDirectoryStructure(projectPath, optionsWithoutEslint);

		const eslintFilePath = path.join(projectPath, '.eslintrc.json');
		const eslintExists = await fs.pathExists(eslintFilePath);
		expect(eslintExists).toBe(false);
	});

	it('should remove test files and scripts if uTest is not selected', async () => {
		const optionsWithoutTest = { projectName, description: 'Test project', version: '1.0.0', uTest: false };
		await createDirectoryStructure(projectPath, optionsWithoutTest);

		const jestConfigPath = path.join(projectPath, 'jest.config.js');
		const testsFolderPath = path.join(projectPath, 'tests');
		const packageJson = await fs.readJson(packageJsonPath);

		const jestConfigExists = await fs.pathExists(jestConfigPath);
		const testsFolderExists = await fs.pathExists(testsFolderPath);

		expect(jestConfigExists).toBe(false);
		expect(testsFolderExists).toBe(false);
		expect(packageJson.scripts.test).toBeUndefined();
		expect(packageJson.devDependencies['jest']).toBeUndefined();
		expect(packageJson.devDependencies['supertest']).toBeUndefined();
	});

	it('should remove database-related files and scripts if NoSQL or none database is selected', async () => {
		const optionsWithDatabaseNoSQL = { projectName, database: { useDatabase: 'NoSQL' } };
		await createDirectoryStructure(projectPath, optionsWithDatabaseNoSQL);

		const sequelizercFilePath = path.join(projectPath, '.sequelizerc');
		const migrationFolderPath = path.join(projectPath, './src/database/migrations');
		const packageJson = await fs.readJson(packageJsonPath);

		const sequelizercExists = await fs.pathExists(sequelizercFilePath);
		const migrationFolderExists = await fs.pathExists(migrationFolderPath);

		expect(sequelizercExists).toBe(false);
		expect(migrationFolderExists).toBe(false);
		expect(packageJson.scripts['migration:create']).toBeUndefined();
		expect(packageJson.dependencies['sequelize']).toBeUndefined();
		expect(packageJson.devDependencies['sequelize-cli']).toBeUndefined();
	});

	it('should modify .env file with the correct database configuration', async () => {
		const optionsWithDatabase = {
			projectName,
			database: databaseConfig
		};
		await createDirectoryStructure(projectPath, optionsWithDatabase);

		const envFilePath = path.join(projectPath, '.env');
		const envFile = await fs.readFile(envFilePath, 'utf8');
		setTimeout(
			() => {
				expect(envFile).toContain(`DB_TYPE=${databaseConfig.useDatabase.toLowerCase()}`);
				expect(envFile).toContain(`DB_CONNECTION=${databaseConfig.connection}`);
				expect(envFile).toContain(`DB_HOST=${databaseConfig.host}`);
				expect(envFile).toContain(`DB_PORT=${databaseConfig.port}`);
				expect(envFile).toContain(`DB_USERNAME=${databaseConfig.username}`);
				expect(envFile).toContain(`DB_PASSWORD=${databaseConfig.password}`);
				expect(envFile).toContain(`DB_DATABASE=${databaseConfig.name}`);
			},
			1000
		)
	});
});
