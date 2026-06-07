import { printMetadata } from "@/services/metadata-formatter";
import { makeRequest } from "@/services/request-service";
import { requestStorageService } from "@/services/request-storage-service";
import { printResponse } from "@/services/response-formatter";
import { Command } from "commander";
import ora from "ora";

export const setupRunCommand = (program: Command) => {
  program
    .command('run')
    .argument('<requestName>', 'Name of the request to run')
    .action(async (requestName) => {
      const spinner = ora().start();

      try {
        const savedRequest = requestStorageService.get(requestName);

        spinner.text = `Running request ${requestName} (${savedRequest.method} ${savedRequest.url})`;

        const response = await makeRequest(
          savedRequest.method,
          new URL(savedRequest.url),
          savedRequest.headers as Record<string, string>,
          savedRequest.body as string,
          savedRequest.timeoutMs,
          savedRequest.retryCount
        );

        spinner.succeed(
          "Request completed successfully"
        );

        if (response) {
          printMetadata(response.metadata);

          await printResponse(response.data, response.dataType, { truncate: true })
        }
      } catch (err) {
        spinner.fail(
          "Request failed"
        );

        if (err instanceof Error) {
          console.error(
            err.message
          );
        }
      }


    });
}