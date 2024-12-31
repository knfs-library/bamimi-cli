const path = require('path');

const {
	generateEmail,
} = require('../../lib/handlers/generateElements');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
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
}