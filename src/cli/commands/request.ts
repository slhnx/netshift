import { Command } from "commander";
import { makeRequest } from "@/services/request-service";
import { printJSON } from "@/services/response-formatter";
import { printMetadata } from "@/services/metadata-formatter";
import { printHeaders } from "@/services/headers-formatter";
import { parseURL } from "@/utils/parse-url";
import { printError } from "@/services/error-formatter";
import { normalizeUrl } from "@/utils/normalize-url";

export const setupRequestCommand = (program: Command) => {
  program
    .argument("<method>", "HTTP Method")
    .argument("<url>", "API Endpoint URL")
    .option("--show-headers", "Display response headers")
    .action(async (method, url, options) => {
      try {
        const normalizedUrl = normalizeUrl(url.trim());

        if (!parseURL(normalizedUrl)) {
          printError("❌ Invalid URL provided. Please provide a valid URL.");
          return;
        }

        const response = await makeRequest(method, normalizedUrl);

        printMetadata(response.metadata);

        if (options.showHeaders) {
          printHeaders(response.headers);
        }

        printJSON(response.data);
      } catch (error) {
        if (error instanceof Error) {
          printError(error.message);
        }
      }
    });
};
