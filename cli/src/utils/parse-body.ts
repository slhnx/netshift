import chalk from "chalk";

const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
};

export const parseBody = (
  data: string | undefined,
): JSON | string | undefined => {
  if (!data) return undefined;

  try {
    if (isJSON(data)) {
      return JSON.parse(data);
    }

    return data;
  } catch (err) {
    console.error(
      chalk.red(
        "Failed to parse request body! Please ensure it's valid JSON or a string.",
      ),
    );
    return undefined;
  }
};
