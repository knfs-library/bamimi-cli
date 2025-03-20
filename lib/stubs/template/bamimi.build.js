/**
 * Configuration for build, obfuscation, and Babel options.
 * @module buildConfig
 */

module.exports = {
	/**
	 * Options for Esbuild.
	 * @see https://esbuild.github.io/api/#build-api
	 * @type {Object}
	 * @property {boolean} minify - Minify JavaScript (reduce size).
	 * @property {boolean} bundle - Whether to bundle files (create a single output file).
	 * @property {string} platform - Specifies the target platform (e.g., 'node' for Node.js environment).
	 */
	buildOptions: {
		minify: true, // Minify JavaScript (reduce file size)
		bundle: false, // Do not bundle files into a single output
		platform: 'node', // Configures for Node.js environment. See: https://esbuild.github.io/api/#platform
	},

	/**
	 * Options for Obfuscation with javascript-obfuscator.
	 * @see https://github.com/javascript-obfuscator/javascript-obfuscator
	 * @type {Object}
	 * @property {boolean} compact - Minify the source code.
	 * @property {boolean} controlFlowFlattening - Flatten control flow to make the code harder to understand.
	 * @property {boolean} deadCodeInjection - Inject dead code (unused code).
	 * @property {Array<string>} stringArrayEncoding - Encode strings to a different format (e.g., 'base64').
	 * @property {number} stringArrayThreshold - Percentage of strings to be obfuscated.
	 */
	obfuscationOptions: {
		compact: true, // Minify the source code
		controlFlowFlattening: false, // Do not flatten control flow
		deadCodeInjection: false, // Do not inject dead code
		stringArrayEncoding: ['base64'], // Encode strings in base64
		stringArrayThreshold: 0.2, // Threshold percentage of strings to obfuscate
	},

	/**
	 * Babel options for transpiling JavaScript.
	 * @see https://babeljs.io/docs/en/options
	 * @type {Object}
	 * @property {Array<string>} presets - List of presets for transpiling JavaScript.
	 * @property {Array<Array<string|Object>>} plugins - List of plugins to extend Babel functionality.
	 * @property {boolean} comments - Whether to preserve comments in the transpiled code.
	 */
	babelOptions: {
		presets: [
			"@babel/preset-env" // Preset to transpile modern JavaScript to compatible code. See: https://babeljs.io/docs/en/babel-preset-env
		],
		plugins: [
			[
				"module-resolver", // Plugin to resolve module paths. See: https://github.com/tleunen/babel-plugin-module-resolver
				{
					root: [
						"./src"
					],
					alias: {
						"@iApp": "./src/app",
						"@iKernel": "./src/kernel",
						"@iConfigs": "./src/configs",
						"@iLibs": "./src/libs",
						"@iNotifications": "./src/notifications",
						"@iRoutes": "./src/routes",
						"@iModules": "./src/modules",
						"@iUtils": "./src/utils",
						"@iInterfaces": "./src/interfaces"
					}
				}
			]
		],
		comments: false, // Disable keeping comments in the transpiled code. See: https://babeljs.io/docs/en/babel-plugin-transform-remove-comments
	}
};
