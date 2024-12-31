const path = require('path');

const {
	createDirectoryStructure,
} = require('../../lib/handlers/initProject');


const fs = require('fs-extra');
const { select, input, confirm, password } = require('@inquirer/prompts');

module.exports = (runCommand) => {
	runCommand
		.command('app:generate <projectName>')
		.description('Create a new project')
		.option('-d, --description <description>', 'Project descrnpiption')
		.option('-v, --version <version>', 'Project version')
		.option('-dk, --docker <docker>', 'Use Docker (y/n)')
		.option('-esl, --eslint <eslint>', 'Use Eslint (y/n)')
		.option('-t, --test <test>', 'Use Test (y/n)')
		.option('-dbt, --databaseType <databaseType>', 'Database type(SQL, NoSQL, none')
		.option('-dbc, --databaseConnection <databaseConnection>', 'Database connection (postgres, mysql, mariadb, sqlite, mssql, snowflake, oracle, mongodb)')
		.option('-dbh, --databaseHost <databaseHost>', 'Database host')
		.option('-dbp, --databasePort <databasePort>', 'Database port')
		.option('-dbn, --databaseName <databaseName>', 'Database name')
		.option('-dbu, --databaseUser <databaseUser>', 'Database username')
		.option('-dbps, --databasePassword <databasePassword>', 'Database password')
		.option('-pkm, --packageManager <packageManager>', 'Package manager (npm, yarn, pnpm, none)')
		.action(async (projectName, cmdObj) => {
			try {
				const {
					description,
					version,
					docker: dockerParam,
					eslint: eslintParam,
					test,
					databaseType: databaseTypeParam,
					databaseConnection,
					databaseHost,
					databasePort,
					databaseName,
					databaseUser,
					databasePassword,
					packageManager: packageManagerParam
				} = cmdObj;

				let docker
				if (dockerParam) {
					docker = dockerParam === "y" ? true : false
				} else {
					docker = await confirm({
						message: 'Would you like to include a Dockerfile?',
					});
				}
				let eslint
				if (eslintParam) {
					eslint = eslintParam === "y" ? true : false
				} else {
					eslint = await confirm({
						message: 'Would you like to include ESLint configuration?',
					});
				}

				let uTest
				if (test) {
					uTest = test === "y" ? true : false
				} else {
					uTest = await confirm({
						message: 'Would you like to include Test configuration?',
					});
				}

				let databaseType = databaseTypeParam && ['SQL', 'NoSQL', 'none'].includes(databaseTypeParam) ? databaseTypeParam : await select({
					message: 'Which type of database would you like to use?',
					choices: ['SQL', 'NoSQL', 'none'],
				});

				let database = {
					useDatabase: databaseType
				}
				switch (databaseType) {
					case "SQL":
						const listConnectSQL = ['postgres', 'mysql', 'mariadb', 'sqlite', 'mssql', 'snowflake', 'oracle', 'none']
						database.connection = databaseConnection && listConnectSQL.includes(databaseConnection) ? databaseConnection : await select({
							message: 'Which connection of database would you like to use?',
							choices: listConnectSQL,
						})

						if ("none" === database.connection) {
							break;
						}

						database.host = databaseHost ? databaseHost : await input({ message: "Database host: " })
						database.port = databasePort ? databasePort : await input({ message: "Database port: " })
						database.name = databaseName ? databaseName : await input({ message: "Database: " })
						database.username = databaseUser ? databaseUser : await input({ message: "Database username: " })
						database.password = databasePassword ? databasePassword : await password({ message: "Database password: " })

						break;
					case 'NoSQL':
						const listConnectNoSQL = ['mongodb', 'none']
						database.connection = databaseConnection && listConnectNoSQL.includes(databaseConnection) ? databaseConnection : await select({
							message: 'Which connection of database would you like to use?',
							choices: ['mongodb', 'none'],
						})

						if ("none" === database.connection) {
							break;
						}

						database.host = databaseHost ? databaseHost : await input({ message: "Database host: " })
						database.port = databasePort ? databasePort : await input({ message: "Database port: " })
						database.name = databaseName ? databaseName : await input({ message: "Database: " })
						database.username = databaseUser ? databaseUser : await input({ message: "Database username: " })
						database.password = databasePassword ? databasePassword : await password({ message: "Database password: " })

						break;
					case 'none':
						break;
				}

				const listPackageManager = ['yarn', 'npm', 'pnpm', 'none']
				let packageManager = packageManagerParam && listPackageManager.includes(packageManagerParam) ? packageManagerParam : await select({
					message: 'Which type of package manager would you like to use?',
					choices: ['yarn', 'npm', 'pnpm', 'none'],
				});


				const projectPath = path.join(process.cwd(), projectName);

				if (fs.existsSync(projectPath)) {
					console.log('Project already exists');
					process.exit(1);
				}

				await createDirectoryStructure(projectPath, {
					projectName,
					description,
					version,
					docker,
					eslint,
					uTest,
					database,
					packageManager
				});
			} catch (error) {
				console.error(error)
			}
		});
}
