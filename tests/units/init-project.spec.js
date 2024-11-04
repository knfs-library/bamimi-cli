const fs = require('fs-extra');
const path = require('path');
const { createDirectoryStructure } = require('../../lib/commands/initProject');

describe('createDirectoryStructure', () => {
	const projectPath = path.join(__dirname, 'test-project');
	const projectName = 'my-project';
	const templatePath = path.join(__dirname, './../../lib/stubs/template');
	const options = { projectName, description: 'Test project', version: '1.0.0' };
	const packageJsonPath = path.join(projectPath, 'package.json');

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
});
