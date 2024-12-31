const path = require('path');

const {
	generateJob,
} = require('../../lib/handlers/generateElements');
const { confirm } = require('@inquirer/prompts');

const fs = require('fs-extra');
module.exports = (runCommand) => {
	runCommand
		.command('job:generate <jobName>')
		.description('Generate a new job')
		.option('-isc, --isSchedule <isSchedule>', 'Job is schedule (y/n) ')
		.action(async (jobName, cmdObj) => {
			const { isSchedule: isScheduleParam } = cmdObj;
			let fileName = `${jobName}.job.js`;
			const targetPath = path.join(process.cwd(), './src/app/jobs', fileName);

			let isSchedule
			if (isScheduleParam) {
				isSchedule = isScheduleParam === "y" ? true : false
			} else {
				isSchedule = await confirm({
					message: 'Is it a cron job?',
				});
			}

			if (await fs.pathExists(targetPath)) {
				console.log('Job already exists');
				process.exit(1);
			}

			await generateJob(targetPath, jobName, { isSchedule });
		});
}