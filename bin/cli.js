#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();


const generateClis = require("./generate")
const queryClis = require("./query")

const buildCli = require("./build.cli")

const pkv = require("../package.json")
program
	.version(pkv.version)
	.description('Bamimi Cli')

generateClis(program)
buildCli(program)
queryClis(program)


program.parse(process.argv);