import chalk from "chalk";

export const printHeaders = (headers: Record<string, string>) => {
  console.log(chalk.blue("Response Headers:"));
  console.log();
  Object.entries(headers).forEach(([key, value]) => {
    console.log(`${chalk.yellow(key)} : ${chalk.white(value)}`);
  })

  console.log();
}