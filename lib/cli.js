#!/usr/bin/env node
const { Command } = require('commander');
const path = require('path');
const { createDirectoryStructure } = require('./commands/initProject');
const {
	generateController,
	generateMiddleware,
	generateRequest,
	generateEmail,
	generateJob
} = require('./commands/generateElements');
const fs = require('fs-extra');
const { prompt } = require('@inquirer/prompts');
const program = new Command();

program
	.version('1.0.0')
	.description('Bamimi Cli');

/**
 * Init project
 */
program
	.command('create <projectName>')
	.description('Create a new project')
	.option('-d, --description <description>', 'Project description')
	.option('-v, --version <version>', 'Project version')
	.action(async (projectName, cmdObj) => {
		const { description, version } = cmdObj;

		const { docker, eslint } = await prompt([
			{
				type: 'confirm',
				name: 'docker',
				message: 'Would you like to include a Dockerfile?',
				default: false,
			},
			{
				type: 'confirm',
				name: 'eslint',
				message: 'Would you like to include ESLint configuration?',
				default: false,
			},
		]);

		const projectPath = path.join(process.cwd(), projectName);
		
		if (fs.existsSync(projectPath)) {
			console.log('Project already exists');
			process.exit(1);
		}

		await createDirectoryStructure(projectPath, { projectName, description, version, docker, eslint });
	});

/**
 * Generate element
 */

// CONTROLLER
program
	.command('controller:generate <controllerName>')
	.description('Generate a new controller')
	.option('-p, --path <path>', 'Path for the controller (if you don\'t want to use the default)')
	.option('-f, --func <functions...>', 'List of functions to create (comma-separated)')
	.option('-t, --type <type>', 'api of web')
	.action(async (controllerName, cmdObj) => {
		const { path: controllerPath, func, type } = cmdObj;
		let fileName = `${controllerName}.controller.js`;
		if (type) {
			fileName = path.join(type, fileName)
		}
		const targetPath = controllerPath ? path.join(process.cwd(), controllerPath, fileName) : path.join(process.cwd(), './src/app/http/controllers', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Controller already exists');
			process.exit(1);
		}

		await generateController(targetPath, controllerName, func, type);
	});

// MIDDLEWARE
program
	.command('middleware:generate <middlewareName>')
	.description('Generate a new middleware')
	.option('-p, --path <path>', 'Path for the middleware (if you don\'t want to use the default)')
	.action(async (middlewareName, cmdObj) => {
		const { path: middlewarePath } = cmdObj;
		let fileName = `${middlewareName}.mid.js`;
		
		const targetPath = middlewarePath ? path.join(process.cwd(), middlewarePath, fileName) : path.join(process.cwd(), './src/app/http/middleware', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Middleware already exists');
			process.exit(1);
		}

		await generateMiddleware(targetPath, middlewareName);
	});

// RESPONSE
program
	.command('response:generate <responseName>')
	.description('Generate a new response')
	.option('-p, --path <path>', 'Path for the response (if you don\'t want to use the default)')
	.action(async (responseName, cmdObj) => {
		const { path: responsePath } = cmdObj;
		let fileName = `${responseName}.res.js`;

		const targetPath = responsePath ? path.join(process.cwd(), responsePath, fileName) : path.join(process.cwd(), './src/app/http/responses', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Response already exists');
			process.exit(1);
		}

		await generateMiddleware(targetPath, responseName, 'Response');
	});

// REQUEST
program
	.command('request:generate <requestName>')
	.description('Generate a new request')
	.option('-p, --path <path>', 'Path for the request (if you don\'t want to use the default)')
	.action(async (requestName, cmdObj) => {
		const { path: requestPath } = cmdObj;
		let fileName = `${requestName}.req.js`;

		const targetPath = requestPath ? path.join(process.cwd(), requestPath, fileName) : path.join(process.cwd(), './src/app/http/requests', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Request already exists');
			process.exit(1);
		}

		await generateRequest(targetPath, requestName);
	});

// EMAIL
program
	.command('email:generate <emailName>')
	.description('Generate a new email')
	.option('-tn, --templateName <templateName>', 'Template name if you want to use email with html')
	.option('-job, --jobName <jobName>', 'Job name if you want to use email with queue job ')
	.action(async (emailName, cmdObj) => {
		const { templateName: templateName, jobName: jobName } = cmdObj;
		let fileName = `${emailName}.email.js`;
		let options = {
			templateEmail: false,
			job: false
		}
		const targetPath = path.join(process.cwd(), './src/app/emails', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Email already exists');
			process.exit(1);
		}

		if (templateName) {
			options.templateEmail = {
				name: templateName,
				path: path.join(process.cwd(), './src/notifications/emails', `${templateName}.ejs`)
			}
			if (await fs.pathExists(options.templateEmail.path)) {
				console.log('Email template already exists');
				process.exit(1);
			}
		}

		if (jobName) {
			options.job = {
				name: jobName,
				path: path.join(process.cwd(), './src/app/jobs', `${jobName}.job.js`)
			}

			if (await fs.pathExists(options.job.path)) {
				console.log('Job template already exists');
				process.exit(1);
			}
		}

		await generateEmail(targetPath, emailName, options);
	});

// JOb
program
	.command('job:generate <jobName>')
	.description('Generate a new job')
	.action(async (jobName) => {
		let fileName = `${jobName}.job.js`;
		const targetPath = path.join(process.cwd(), './src/app/jobs', fileName);
		if (await fs.pathExists(targetPath)) {
			console.log('Job already exists');
			process.exit(1);
		}


		await generateJob(targetPath, jobName, {});
	});
	
program.parse(process.argv);