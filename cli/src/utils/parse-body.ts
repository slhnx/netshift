import chalk from "chalk";

export const parseBody = (data: string | undefined): JSON | undefined => {
  if (!data) return undefined;

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(chalk.red("Failed to parse request body as JSON. Please ensure it's valid JSON."));
    return undefined;
  }
}