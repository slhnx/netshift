import { printError } from "@/services/error-formatter";

export const normalizeUrl = (value: string): URL => {
  try {
    const url = new URL(value);
    if (!url.protocol || !url.hostname) {
      throw new Error("Invalid URL provided.");
    }
    return url;
  } catch (err) {
    throw printError("❌ Invalid URL provided. Please provide a valid URL.");
  }
};
