#!/usr/bin/env node
require("module-alias/register")
const { Command } = require("commander");
const program = new Command();

const jobCommand = require("@iKernel/job");

program
    .addCommand(jobCommand)

program.parse(process.argv);
