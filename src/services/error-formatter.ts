import chalk from "chalk";

export const printError = (message: string) => {
  console.log();

  console.log(chalk.red.bold("Error:"));

  console.log(chalk.red(message));

  console.log();
};
