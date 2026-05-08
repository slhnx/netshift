import { Command } from "commander";
import { makeRequest } from "@/services/request-service";
import { printJSON } from "@/services/response-formatter";
import { printMetadata } from "@/services/metadata-formatter";

export const setupRequestCommand = (program: Command) => {
  program
    .argument("<method>", "HTTP Method")
    .argument("<url>", "API Endpoint URL")
    .action(async (method, url) => {
      try {
        const response = await makeRequest(method, url);
        printMetadata(response.metadata);
        printJSON(response.data);
      } catch (error) {
        console.error("Request failed");

        console.error(error);
      }
    });
};
