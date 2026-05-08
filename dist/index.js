#!/usr/bin/env node

// src/cli/index.ts
import { Command } from "commander";
import chalk2 from "chalk";

// src/services/request-service.ts
var makeRequest = async (method, url) => {
  const start = Date.now();
  const response = await fetch(url, { method: method.toUpperCase() });
  const end = Date.now();
  const data = await response.json();
  return {
    data,
    metadata: {
      status: response.status,
      statusText: response.statusText,
      duration: end - start,
      size: Buffer.byteLength(JSON.stringify(data))
    }
  };
};

// src/services/response-formatter.ts
import { highlight } from "cli-highlight";
var printJSON = (data) => {
  const prettyJSON = JSON.stringify(data, null, 2);
  console.log(
    highlight(prettyJSON, {
      language: "json",
      ignoreIllegals: true
    })
  );
};

// src/services/metadata-formatter.ts
import chalk from "chalk";
var formatBytes = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(2)} KB`;
};
var printMetadata = (metadata) => {
  const { status, statusText, duration, size } = metadata;
  const statusColor = status >= 200 && status < 300 ? chalk.green : chalk.red;
  console.log();
  console.log(
    chalk.bold("Status:"),
    statusColor(`${metadata.status} ${metadata.statusText}`)
  );
  console.log(chalk.bold("Time:"), chalk.blue(`${metadata.duration} ms`));
  console.log(chalk.bold("Size:"), chalk.blue(formatBytes(metadata.size)));
  console.log(chalk.blue("----------------------------------------"));
};

// src/cli/commands/request.ts
var setupRequestCommand = (program2) => {
  program2.argument("<method>", "HTTP Method").argument("<url>", "API Endpoint URL").action(async (method, url) => {
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

// src/cli/index.ts
var program = new Command();
program.name("NetShift").description("NetShift - terminal-first API workflow tool").version("0.1.0");
program.command("ping").description("Checks if NetShift is alive \u2705").action(() => {
  console.log(chalk2.green("NetShift is alive and ready to serve! \u{1F680}"));
});
setupRequestCommand(program);
program.parse();
