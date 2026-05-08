import chalk from "chalk";

type Metadata = {
  status: number;
  statusText: string;
  duration: number;
  size: number;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
};

export const printMetadata = (metadata: Metadata) => {
  const { status, statusText, duration, size } = metadata;

  const statusColor = status >= 200 && status < 300 ? chalk.green : chalk.red;
  console.log();

  console.log(chalk.bold("Status:"), statusColor(`${status} ${statusText}`));

  console.log(chalk.bold("Time:"), chalk.blue(`${duration} ms`));
  console.log(chalk.bold("Size:"), chalk.blue(formatBytes(size)));

  console.log(chalk.blue("----------------------------------------"));
};
