#!/usr/bin/env node
require("@knfs-tech/bamimi-autoload")
const { Command } = require("commander");
const program = new Command();

const jobCommand = require("@iKernel/cronjobs");

program
    .addCommand(jobCommand)

program.parse(process.argv);
