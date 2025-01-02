"use strict";
const fs = require('fs-extra');
const path = require('path');
const elementPath = path.join(__dirname, './../stubs/elements');
const { exec } = require('child_process');

const moduleAlias = require('module-alias');

/**
 * Generates a controller file.
 * @param {string} targetPath - The path where the controller file will be created.
 * @param {string} name - The name of the controller.
 * @param {Array<string>} funcList - List of functions to include in the controller.
 * @param {string} type - The type of controller ('api' or 'web').
 * @returns {Promise<void>}
 */
async function generateController(targetPath, name, funcList, type) {
	try {
		let content;
		const stubPath = path.join(elementPath, 'controller.stub');
		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.log('No template found, using default content.');
			content = `
"use strict";

module.exports = {
    index: async function (req, res, next) {
		try {
        	await res.send("Hello World");
			next();
		} catch (error) {
            next(error)
        }
    }
};`;
		}
		let controllerCode = content;
		if (funcList && funcList.length > 0) {
			let functionCodes = ''
			for (const func of funcList) {
				functionCodes += `
    ${func}: async function (req, res, next) {
		try {
        	// ${func} implementation
        	await res.send("Hello World");
			next();
		} catch (error) {
            next(error)
        }
    },\n`;
			}
			controllerCode = controllerCode.replace('// more', functionCodes);
		} else {
			controllerCode = controllerCode.replace('// more', '');
		}

		switch (type) {
			case 'api':
				controllerCode = controllerCode.replace(/res\.send\("Hello World"\);/g, "res.status(200).sendMessage({msg: 'ok'});");
				break;
			case 'web':
			default:
				break;
		}

		await fs.writeFile(targetPath, controllerCode);
		console.log(`Controller ${name} created successfully at ${targetPath}`);
	} catch (error) {
		console.error(`Error generating controller: ${error.message}`);
		throw error;
	}
}

/**
 * Generates a middleware file.
 * @param {string} targetPath - The path where the middleware file will be created.
 * @param {string} name - The name of the middleware.
 * @param {string} [type='Middleware'] - The type of the middleware.
 * @returns {Promise<void>}
 */
async function generateMiddleware(targetPath, name, type = 'Middleware') {
	try {
		let content;
		const stubPath = path.join(elementPath, 'middleware.stub');

		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.log('No template found, using default content.');
			content = `
"use strict";

module.exports = async (req, res, next) => {

};`;
		}

		content = content.replace('// more', `// ${name} implementation`);
		await fs.writeFile(targetPath, content);
		console.log(`${type} ${name} created successfully at ${targetPath}`);
	} catch (error) {
		console.error(`Error generating ${type}: ${error.message}`);
		throw error;
	}
}

/**
 * Generates a request file.
 * @param {string} targetPath - The path where the request file will be created.
 * @param {string} name - The name of the request.
 * @returns {Promise<void>}
 */
async function generateRequest(targetPath, name) {
	try {
		let content;
		const stubPath = path.join(elementPath, 'request.stub');

		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.log('No template found, using default content.');
			content = `
"use strict";
const { body } = require("express-validator");

module.exports = [

]`;
		}

		content = content.replace('// more', `// ${name} implementation`);
		await fs.writeFile(targetPath, content);
		console.log(`Request ${name} created successfully at ${targetPath}`);
	} catch (error) {
		console.error(`Error generating request: ${error.message}`);
		throw error;
	}
}

/**
 * Generates an email file.
 * @param {string} targetPath - The path where the email file will be created.
 * @param {string} name - The name of the email.
 * @param {Object} options - Options for generating the email.
 * @param {Object} options.templateEmail - Template email details.
 * @param {string} options.templateEmail.path - The path to the template email.
 * @param {string} options.templateEmail.name - The name of the template email.
 * @param {Object} options.job - Job details.
 * @param {string} options.job.path - The path to the job file.
 * @param {string} options.job.name - The name of the job.
 * @returns {Promise<void>}
 */
async function generateEmail(targetPath, name, { templateEmail, job }) {
	try {
		let content;
		const stubPath = path.join(elementPath, 'emails/email.stub');

		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.error('No template found');
		}
		let moreReplace = 'sendMail({to: data.email,subject: "Welcome to Bamimi land", // more});'
		let more = 'text: text'
		if (templateEmail && templateEmail.path && templateEmail.name) {
			more = 'html: html'
			const templatePath = path.join(elementPath, 'emails/template.stub');
			let contentTemplate = await fs.readFile(templatePath, 'utf8');

			content = content.replace('// render', `const { renderTemplate } = require("../../utils/mail");`);
			content = content.replace('// content', `const html = renderTemplate("${templateEmail.name}.ejs");`);

			moreReplace = moreReplace.replace('// more', more);

			await fs.writeFile(templateEmail.path, contentTemplate);
			console.log(`Email template ${templateEmail.name} created successfully at ${templateEmail.path}`);
		}

		if (job && job.path && job.name) {
			await generateJob(job.path, job.name, {
				importModule: `const { sendMail } = require("../../utils/mail");`,
				handle: `await sendMail(job.data);`
			})
			content = content.replace('// more', `QueueManager.singleton().getQueue("${job.name}").add("${job.name}", {to: data.email, subject: "Welcome to Bamimi land", ${more}});`);
			content = content.replace('// queue\n', `const { QueueManager } = require("@knfs-tech/bamimi-schedule")`);
		}

		content = content.replace('// render\n', ``);
		content = content.replace('// content', `const text = 'Hello word!';`);
		moreReplace = moreReplace.replace('// more', more);
		content = content.replace('// more', moreReplace);
		content = content.replace('// queue\n', ``);
		content = content.replace('// queueContent\n', ``);

		await fs.writeFile(targetPath, content);
		console.log(`Email ${name} created successfully at ${targetPath}`);
	} catch (error) {
		console.error(`Error generating email: ${error.message}`);
		throw error;
	}
}

/**
 * Generates a job file.
 * @param {string} targetPath - The path where the job file will be created.
 * @param {string} name - The name of the job.
 * @param {Object} options - Options for generating the job.
 * @param {string} options.importModule - The module to import.
 * @param {string} options.handle - The handle function.
 * @param {boolean} options.isSchedule - create schedule
 * @returns {Promise<void>}
 */
async function generateJob(targetPath, name, options = { importModule, handle, isSchedule: false }) {
	try {
		moduleAlias.addAliases({
			'@iApp': path.resolve(process.cwd(), 'src/app'),
			'@iKernel': path.resolve(process.cwd(), 'src/kernel'),
			'@iConfigs': path.resolve(process.cwd(), 'src/configs'),
			'@iLibs': path.resolve(process.cwd(), 'src/libs'),
			'@iNotifications': path.resolve(process.cwd(), 'src/notifications'),
			'@iRoutes': path.resolve(process.cwd(), 'src/routes'),
			'@iModules': path.resolve(process.cwd(), 'src/modules'),
			'@iUtils': path.resolve(process.cwd(), 'src/utils'),
			'@iInterfaces': path.resolve(process.cwd(), 'src/interfaces'),
		});

		let content;
		const stubPath = !options.isSchedule ? path.join(elementPath, 'job.stub') : path.join(elementPath, 'scheduler.stub');

		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.error('No template found.');
		}

		content = content.replace('// import\n', options.importModule ?? '');
		content = content.replace('// handle\n', options.handle ?? '');
		content = content.replace('// jobName', name);
		content = content.replace('// queueName', name);

		await fs.writeFile(targetPath, content);
		console.log(`Job ${name} created successfully at ${name}`);
	} catch (error) {
		console.error(`Error generating job: ${error.message}`);
		throw error;
	}
}

/**
 * Generates Interface
 * @param {string} targetPath - The path where the job file will be created.
 * @param {string} name - The name of the job.
 * @returns {Promise<void>}
 */
async function generateInterface(targetPath, name) {
	try {
		let content;
		const stubPath = path.join(elementPath, 'interfaces/api.stub');

		if (await fs.pathExists(stubPath)) {
			content = await fs.readFile(stubPath, 'utf8');
		} else {
			console.error('No template found.');
		}

		await fs.writeFile(targetPath, content);
		console.log(`Interface ${name} created successfully at ${name}`);
	} catch (error) {
		console.error(`Error generating interface: ${error.message}`);
		throw error;
	}
}
/**
 * Generates Docker
 * @returns {Promise<void>}
 */
async function generateDocker() {
	try {
		const templatePath = path.join(__dirname, './../stubs/template');
		const dockerFilePath = path.join(templatePath, 'Dockerfile')

		fs.copy(dockerFilePath, path.join(process.cwd(), 'Dockerfile'))

	} catch (error) {
		console.error(error)
	}
}

/**
 * Generates Test config
 * @returns {Promise<void>}
 */
async function generateTestConfig() {
	try {
		const projectPath = path.join(process.cwd());
		
		const templatePath = path.join(__dirname, './../stubs/template');
		const testConfigPath = path.join(templatePath, 'jest.config.js')

		fs.copy(testConfigPath, path.join(process.cwd(), 'jest.config.js'))

		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = require(packageJsonPath);
		
		packageJson.scripts["test"] = "jest --runInBand --force-exit --detectOpenHandles"
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		const pm = await __checkPackageLock();

		const cmd = `${pm[0]} ${pm[1]} ${pm[2]} supertest jest`;

		const buildProcess = exec(cmd, { cwd: projectPath });
		
		buildProcess.stdout.on('data', (data) => {
				console.log(data.toString());
			});
	
		buildProcess.stderr.on('data', (data) => {
				console.error(data.toString());
			});
	
		buildProcess.on('close', (code) => {
			if (code === 0) {
				console.log('Install package for test  successfully!');
			} else {
				console.error(`Install package for test failed with exit code ${code}`);
			}
		});

	} catch (error) {
		console.error(error)
	}
}

/**
 * Generates Eslint config
 * @returns {Promise<void>}
 */
async function generateEslint() {
	try {
		const projectPath = path.join(process.cwd());

		const templatePath = path.join(__dirname, './../stubs/template');
		const lintConfig = path.join(templatePath, 'eslint.config.js')

		fs.copy(lintConfig, path.join(process.cwd(), 'eslint.config.js'))

		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = require(packageJsonPath);
		packageJson.scripts["lint"] = "npx eslint ."
		packageJson.scripts["lint:fix"] = "npx eslint . --fix"

		const pm = await __checkPackageLock();

		const cmd = `${pm[0]} ${pm[1]} ${pm[2]} @eslint/js eslint eslint-plugin-filenames eslint-plugin-jest eslint-plugin-naming-convention @knfs-tech/eslint-plugin`;

		const buildProcess = exec(cmd, { cwd: projectPath });

		buildProcess.stdout.on('data', (data) => {
			console.log(data.toString());
		});

		buildProcess.stderr.on('data', (data) => {
			console.error(data.toString());
		});

		buildProcess.on('close', (code) => {
			if (code === 0) {
				console.log('Install package for lint  successfully!');
			} else {
				console.error(`Install package for lint failed with exit code ${code}`);
			}
		});

		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
	} catch (error) {
		console.error(error)
	}
}

/**
 * Generates SQL Config config
 * @returns {Promise<void>}
 */
async function generateSQLConfig() {
	try {
		const projectPath = path.join(process.cwd());

		const templatePath = path.join(__dirname, './../stubs/template');
		const sequelizeConfig = path.join(templatePath, '.sequelizerc')
		const migrationFolder = path.join(templatePath, './src/database/migrations')
		const dataAssociationFolder = path.join(templatePath, './src/app/ORMs/associations');
		const userOrmPath = path.join(elementPath, './ORM/sql/User.stub');

		fs.copy(sequelizeConfig, path.join(process.cwd(), '.sequelizerc'))
		fs.copy(migrationFolder, path.join(process.cwd(), './src/database/migrations'))
		fs.copy(dataAssociationFolder, path.join(process.cwd(), './src/app/ORMs/associations'))

		const userOrm = await fs.readFile(userOrmPath, 'utf8');
		const targetPath = path.join(process.cwd(), 'src/app/ORMs/User.js')
		await fs.writeFile(targetPath, userOrm);
		
		const packageJsonPath = path.join(process.cwd(), 'package.json');
		const packageJson = require(packageJsonPath);
		
		packageJson.scripts["migration:create"] = "npx sequelize-cli migration:generate";
		packageJson.scripts["migration:up"] = "npx sequelize-cli db:migrate";
		packageJson.scripts["migration:undo"] = "npx sequelize-cli db:migrate:undo";
		packageJson.scripts["migration:undo:all"] = "npx sequelize-cli db:migrate:undo:all";
		packageJson.scripts["seed:create"] = "npx sequelize-cli seed:generate";
		packageJson.scripts["seed:select"] = "npx sequelize-cli db:seed --seed";
		packageJson.scripts["seed:all"] = "npx sequelize-cli db:seed:all";
		packageJson.scripts["seed:undo"] = "npx sequelize-cli db:seed:undo";
		packageJson.scripts["seed:undo:all"] = "npx sequelize-cli db:seed:undo:all";
		
		fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

		const pm = await __checkPackageLock();

		const cmd = `${pm[0]} ${pm[1]} sequelize && ${pm[0]} ${pm[1]} ${pm[2]} sequelize-cli`;

		const buildProcess = exec(cmd, { cwd: projectPath });

		buildProcess.stdout.on('data', (data) => {
			console.log(data.toString());
		});

		buildProcess.stderr.on('data', (data) => {
			console.error(data.toString());
		});

		buildProcess.on('close', (code) => {
			if (code === 0) {
				console.log('Install package for sql  successfully!');
			} else {
				console.error(`Install package for sql failed with exit code ${code}`);
			}
		});

	} catch (error) {
		console.error(error)
	}
}

async function __checkPackageLock() {
	const npm = path.join(process.cwd(), "package-lock.json")
	const yarn = path.join(process.cwd(), "yarn.lock")
	const pnpm = path.join(process.cwd(), "pnpm-lock.yaml")

	if (fs.existsSync(npm)) {
		return [
			"npm",
			"install",
			"--save-dev"
		]
	}
	if (fs.existsSync(yarn)) {
		return [
			"yarn",
			"add",
			"--dev"
		]
	}
	if (fs.existsSync(pnpm)) {
		return [
			"pnpm",
			"add",
			"--dev"
		]
	}

	return [
		"npm",
		"install",
		"--save-dev"
	]
}

module.exports = {
	generateController,
	generateMiddleware,
	generateRequest,
	generateEmail,
	generateJob,
	generateInterface,
	generateDocker,
	generateTestConfig,
	generateEslint,
	generateSQLConfig
};
