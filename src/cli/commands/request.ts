import { Command } from "commander";
import { makeRequest } from "@/services/request-service";
import { printJSON, printResponse } from "@/services/response-formatter";
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
        console.log(
          `Making ${method.toUpperCase()} request to: ${normalizedUrl.href}`,
        );
        const response = await makeRequest(method, normalizedUrl);

        printMetadata(response.metadata);

        if (options.showHeaders) {
          printHeaders(response.headers);
        }

        await printResponse(response.data, response.dataType);
      } catch (error) {
        if (error instanceof Error) {
          printError(error.message);
        }
      }
    });
};
