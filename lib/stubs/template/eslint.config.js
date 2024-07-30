// eslint.config.js
/** @type {import('eslint').FlatConfig} */
const pluginFilenames = require("eslint-plugin-filenames");
const knfsPlugin = require("@knfs-tech/eslint-plugin/cjs");

module.exports = [
	{
		languageOptions: {
			globals: {
				node: true,
				jest: true,
			},
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		plugins: {
			"filenames": pluginFilenames,
			jest: require('eslint-plugin-jest'),
			"knfsPlugin": knfsPlugin
		},
		ignores: [
			"src/database/migrations/*",
			"src/database/seeders/*"
		],
		rules: {
			indent: ["error", 4],
			eqeqeq: "off",
			curly: "error",
			quotes: ["error", "double"],
			"max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
			"linebreak-style": ["error", "unix"],
			"no-empty": "error",
			"no-cond-assign": ["error", "always"],
			"no-inline-comments": "warn",
			"no-multi-spaces": ["error"],
			camelcase: [
				'error',
				{
					properties: 'always',
					ignoreDestructuring: true,
					ignoreImports: true,
					ignore: ["^\\$_"]
				}
			],
			"no-unused-vars": ["error", { "argsIgnorePattern": "^\\$_" }]
		},
		files: ["src/**/*.js"],
	}, {
		rules: {
			"knfsPlugin/no-arrow-functions": "error"
		},
		files: ["src/app/http/controllers/**/*.js", "src/app/services/**/*.js"],

	}
];
