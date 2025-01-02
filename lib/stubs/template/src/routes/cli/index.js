#!/usr/bin/env node
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('module-alias/register');
}

const { Command } = require("commander");
const program = new Command();

const jobCommand = require("@iKernel/cronjobs");

program
    .addCommand(jobCommand)

program.parse(process.argv);
