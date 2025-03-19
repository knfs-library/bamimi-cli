const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const moduleAlias = require('module-alias');
const fg = require('fast-glob');
const obfuscator = require('javascript-obfuscator');
const esbuild = require('esbuild');
const babel = require('@babel/core');

async function build() {
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

	const projectPath = process.cwd();
	const srcDir = path.join(projectPath, 'src');
	const distDir = path.join(projectPath, 'dist');
	const configPath = path.join(projectPath, 'bamimi.build.js');
	const config = require(configPath); 

	await fs.remove(distDir);
	await fs.mkdirp(distDir);

	console.log('🚀 Copying non-JS files...');
	await fs.copy(srcDir, distDir, { filter: (src) => !src.endsWith('.js') });

	console.log('⚡ Transpiling JS files with Babel...');
	await transpileWithBabel(srcDir, distDir, config.babelOptions);

	console.log('🎯 Minifying JavaScript files with Esbuild...');
	const files = await fg(`${distDir}/**/*.js`);

	await Promise.all(
		files.map((file) =>
			esbuild.build({
				entryPoints: [file],
				outfile: file,
				...config.buildOptions,
				allowOverwrite: true,
			})
		)
	);

	console.log('🔐 Obfuscating JavaScript files...');
	await Promise.all(
		files.map(async (file) => {
			const code = await fs.readFile(file, 'utf8');
			const obfuscatedCode = obfuscator.obfuscate(code, config.obfuscationOptions || {
				compact: true,
				controlFlowFlattening: false,
				deadCodeInjection: false,
				stringArrayEncoding: ['base64'],
				stringArrayThreshold: 0.1,
			}).getObfuscatedCode();
			await fs.writeFile(file, obfuscatedCode);
		})
	);

	console.log('✅ Project is built successfully!');
}

async function transpileWithBabel(srcDir, distDir, babelOptions) {
	const files = await fg(`${srcDir}/**/*.js`);

	await Promise.all(
		files.map(async (file) => {
			const code = await fs.readFile(file, 'utf8');
			const result = babel.transformSync(code, {
				...babelOptions, // Use dynamic babel options here
				filename: file,
			});
			const outputPath = path.join(distDir, path.relative(srcDir, file));
			await fs.outputFile(outputPath, result.code);
		})
	);
}

function runCommand(command, args) {
	return new Promise((resolve, reject) => {
		const proc = spawn(command, args, { stdio: 'inherit', shell: true });
		proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${command} failed`))));
	});
}

module.exports = { build };
