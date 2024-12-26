"use strict";
const fs = require('fs-extra');
const path = require('path');
const elementPath = path.join(__dirname, './../stubs/elements');

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
        	return await res.send("Hello World");
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
        	return await res.send("Hello World");
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

module.exports = {
	generateController,
	generateMiddleware,
	generateRequest,
	generateEmail,
	generateJob
};
