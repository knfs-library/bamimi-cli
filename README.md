
<p align="center">
  <br>
	<a href="https://github.com/knfs-library/bamimi-cli/actions" alt="github">
	<img src="https://github.com/knfs-library/bamimi-cli/actions/workflows/test.yml/badge.svg" alt="Github Actions" />
	</a>
</p>

<h1> <span style="color:#013C4D;">About</span> <span style="color:#2B7F84;">Bamimi CLI</span></h1>

Bamimi CLI is a command-line tool designed to streamline the creation of common elements for your Node.js projects, including controllers, middleware, responses, requests, emails, and jobs. This tool supports rapid development and automates the creation of essential files for your project.

## Install

Install this CLI tool globally using npm:

```bash
npm install -g @knfs-tech/bamimi-cli
```

Or with yarn:

```bash
yarn global add @knfs-tech/bamimi-cli
```

## Usage

You can use this CLI tool with the following commands:

### Create Project

```bash
bamimi-cli app:generate <projectName> [options]
```

- `projectName`: The name of the project you want to create.
- `-d, --description <description>`: The description of the project.
- `-v, --version <version>`: The version of the project.
- `-dk, --docker <docker>`: Use Docker (y/n).
- `-esl, --eslint <eslint>`: Use Eslint (y/n).
- `-t, --test <test>`: Use Test (y/n).
- `-dbt, --databaseType <databaseType`: Database type(SQL, NoSQL, none).
- `-dbc, --databaseConnection <databaseConnection>`: 'Database connection (postgres, mysql, mariadb, sqlite, mssql, snowflake, oracle, mongodb).
- `-dbh, --databaseHost <databaseHost>`: Database host.
- `-dbp, --databasePort <databasePort>`: Database port.
- `-dbn, --databaseName <databaseName>`: 'Database name.
- `-dbu, --databaseUser <databaseUser>`: Database username.
- `-dbps, --databasePassword <databasePassword>`: Database password.
- `-pkm, --packageManager <packageManager>`: Package manager (npm, yarn, pnpm, none).

### Generate Controller

```bash
bamimi-cli controller:generate <controllerName> [options]
```

- `controllerName`: The name of the controller you want to create.
- `-p, --path <path>`: Path for the controller (if you don’t want to use the default path).
- `-f, --func <functions...>`: List of functions to create (comma-separated).
- `-t, --type <type>`: Type of controller (api or web).
****
### Generate Middleware

```bash
bamimi-cli middleware:generate <middlewareName> [options]
```

- `middlewareName`: The name of the middleware you want to create.
- `-p, --path <path>`: Path for the middleware (if you don’t want to use the default path).

### Generate Response

```bash
bamimi-cli response:generate <responseName> [options]
```

- `responseName`: The name of the response you want to create.
- `-p, --path <path>`: Path for the response (if you don’t want to use the default path).

### Generate Request

```bash
bamimi-cli request:generate <requestName> [options]
```

- `requestName`: The name of the request you want to create.
- `-p, --path <path>`: Path for the request (if you don’t want to use the default path).

### Generate Email

```bash
bamimi-cli email:generate <emailName> [options]
```

- `emailName`: The name of the email you want to create.
- `-tn, --templateName <templateName>`: Template name if you want to use email with HTML.
- `-job, --jobName <jobName>`: Job name if you want to use email with a queue job.

### Generate Job

```bash
bamimi-cli job:generate <jobName> [options]
```

- `jobName`: The name of the job you want to create.
- `-isc, --isSchedule <isSchedule>`: Job is schedule (y/n).
  
### Generate Interface

```bash
bamimi-cli itf:generate <interfaceName>
```
- `interfaceName`: The name of the interface you want to create.
  
### Generate Docker

```bash
bamimi-cli docker:generate
```
### Generate Eslint

```bash
bamimi-cli lint:generate
```

### Generate TestConfig

```bash
bamimi-cli testConfig:generate
```

### Generate SQL config, structure, install dependency

```bash
bamimi-cli sql:generate
```

### Get version

```bash
bamimi-cli version:list-remote
```

### Build Project

```bash
bamimi-cli build 
```
  
## License

Bamimi CLI is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author
* [Kent Phung](https://github.com/khapu2906)

## Owner
* [KNFs JSC](https://github.com/knfs-jsc)
