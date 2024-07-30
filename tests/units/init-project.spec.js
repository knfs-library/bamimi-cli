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
		// Ensure the templatePath exists for testing
		if (!await fs.pathExists(templatePath)) {
			throw new Error(`Template path ${templatePath} does not exist`);
		}
	});

	beforeEach(async () => {
		// Clean up any previous test runs
		await fs.remove(projectPath);
	});

	afterAll(async () => {
		// Clean up after all tests
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

	it('should handle errors and throw an exception', async () => {
		// Simulate an error by passing an invalid template path
		const invalidTemplatePath = path.join(__dirname, 'invalid-template');
		const createDirectoryStructureWithInvalidPath = async () => {
			const originalTemplatePath = templatePath;
			templatePath = invalidTemplatePath;
			await createDirectoryStructure(projectPath, options);
			templatePath = originalTemplatePath;
		};

		await expect(createDirectoryStructureWithInvalidPath).rejects.toThrow();
	});
});
