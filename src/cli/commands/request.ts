import { Command } from "commander";
import { makeRequest } from "@/services/request-service";
import { printJSON } from "@/services/response-formatter";
import { printMetadata } from "@/services/metadata-formatter";
import { printHeaders } from "@/services/headers-formatter";

export const setupRequestCommand = (program: Command) => {
  program
    .argument("<method>", "HTTP Method")
    .argument("<url>", "API Endpoint URL")
    .option("--show-headers", "Display response headers")
    .action(async (method, url, options) => {
      try {
        const response = await makeRequest(method, url);

        printMetadata(response.metadata);

        if (options.showHeaders) {
          printHeaders(response.headers);
        }

        printJSON(response.data);
      } catch (error) {
        console.error("Request failed");

        console.error(error);
      }
    });
};
