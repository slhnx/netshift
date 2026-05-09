import { printError } from "@/services/error-formatter";
import { printHeaders } from "@/services/headers-formatter";
import { printMetadata } from "@/services/metadata-formatter";
import { makeRequest } from "@/services/request-service";
import { printResponse } from "@/services/response-formatter";
import { normalizeUrl } from "@/utils/normalize-url";
import { parseHeader } from "@/utils/parse-header";
import { Command } from "commander";

export const setupRequestCommand = (program: Command) => {
  program
    .argument("<method>", "HTTP Method")
    .argument("<url>", "API Endpoint URL")
    .option(
      "-H, --header <header...>",
      'Custom header in "Key: Value" format',
    )
    .option("--show-headers", "Display response headers")
    .action(async (method, url, options) => {
      try {
        const normalizedUrl = normalizeUrl(url.trim());
        const headers = parseHeader(options.header);

        console.log(
          `Making ${method.toUpperCase()} request to: ${normalizedUrl.href}`,
        );

        const response = await makeRequest(method, normalizedUrl, headers);

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
