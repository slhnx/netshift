#!/usr/bin/env node

// src/cli/index.ts
import { Command } from "commander";
import chalk from "chalk";
var program = new Command();
program.name("NetShift").description("NetShift - terminal-first API workflow tool").version("0.1.0");
program.command("ping").description("Checks if NetShift is alive \u2705").action(() => {
  console.log(chalk.green("NetShift is alive and ready to serve! \u{1F680}"));
});
program.parse();
