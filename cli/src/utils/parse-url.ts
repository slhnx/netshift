import { printError } from "@/services/error-formatter";

export const parseURL = (input: string) => {
  try {
    return new URL(input);
  } catch (err) {
    printError("❌ Invalid URL provided. Please provide a valid URL.");
  }
};
