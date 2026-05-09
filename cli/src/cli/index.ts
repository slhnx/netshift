#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { setupRequestCommand } from "./commands/request";

const program = new Command();

program
  .name("NetShift")
  .description("NetShift - terminal-first API workflow tool")
  .version("0.1.0");

program
  .command("ping")
  .description("Checks if NetShift is alive ✅")
  .action(() => {
    console.log(chalk.green("NetShift is alive and ready to serve! 🚀"));
  });

setupRequestCommand(program);

program.parse();
