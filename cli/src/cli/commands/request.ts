import { printError } from "@/services/error-formatter";
import { printHeaders } from "@/services/headers-formatter";
import { printMetadata } from "@/services/metadata-formatter";
import { makeRequest } from "@/services/request-service";
import { printResponse } from "@/services/response-formatter";
import { formatResponseForOutput } from "@/services/response-output";
import { applyQueryParams } from "@/utils/apply-query-params";
import { normalizeUrl } from "@/utils/normalize-url";
import { parseBody } from "@/utils/parse-body";
import { parseHeader } from "@/utils/parse-header";
import { validateHttpMethod } from "@/utils/validate-http-method";
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import path from "path";
import { writeFile } from "node:fs/promises";

export const setupRequestCommand = (program: Command) => {
  program
    .argument("<method>", "HTTP Method")
    .argument("<url>", "API Endpoint URL")
    .option(
      "-H, --header <header...>",
      'Custom header in "Key: Value" format',
      (values, previous: string[] = []) => {
        previous.push(values);
        return previous;
      },
      [],
    )
    .option(
      "-Q, --query <query>",
      'Query parameter in "key=value" format',
      (value, previous: string[] = []) => {
        previous.push(value);
        return previous;
      },
      [],
    )
    .option("-d, --data <data>", "Request body data (for POST, PUT, PATCH)")
    .option("--show-headers", "Display response headers")
    .option("--timeout <timeout>", "Request timeout in milliseconds")
    .option(
      "--retry <retryCount>",
      "Number of retry attempts for failed requests",
    )
    .option("--no-truncate", "Do not truncate long responses in the output")
    .option(
      "--output <file>",
      "Save response to a file instead of printing to console",
    )
    .action(async (method, url, options) => {
      const spinner = ora().start();
      const normalizedMethod = validateHttpMethod(method);
      const retryCount = options.retry ? Number(options.retry) : 1;

      if (!Number.isInteger(retryCount) || retryCount < 0) {
        printError("Retry count must be a non-negative integer");
        return;
      }

      const timeoutMs = options.timeout
        ? Number(options.timeout) * 1000
        : undefined;

      try {
        const normalizedURLWithParams = applyQueryParams(
          normalizeUrl(url.trim()),
          options.query,
        );
        const body = parseBody(options.data);
        const headers = parseHeader(options.header, body);

        spinner.text = chalk.green(
          `Making ${method.toUpperCase()} request to: ${normalizedURLWithParams.href}`,
        );

        if (
          timeoutMs !== undefined &&
          (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
        ) {
          printError("Timeout must be a positive number");
          return;
        }

        const response = await makeRequest(
          normalizedMethod,
          normalizedURLWithParams,
          headers,
          body,
          timeoutMs,
          retryCount,
        );

        spinner.succeed("Request completed successfully");

        if (response) {
          printMetadata(response.metadata);

          if (options.showHeaders) {
            printHeaders(response.headers);
          }

          await printResponse(response.data, response.dataType, {
            truncate: options.truncate,
          });
        }

        if (options.output) {
          const outputText = await formatResponseForOutput(
            response?.data,
            response?.dataType as any,
          );

          const outputPath = path.resolve(options.output);
          await writeFile(outputPath, outputText, "utf8");
        }
      } catch (error) {
        spinner.fail("❌ Request failed");
        if (error instanceof Error) {
          printError(error.message);
        }
      }
    });
};
