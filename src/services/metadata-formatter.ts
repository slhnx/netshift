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

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return chalk.green;
  if (status >= 300 && status < 400) return chalk.blue;
  if (status >= 400 && status < 500) return chalk.yellow;
  if (status >= 500) return chalk.red;
  
  return chalk.white;
};

export const printMetadata = (metadata: Metadata) => {
  const { status, statusText, duration, size } = metadata;
  const statusColor = getStatusColor(status);

  console.log();

  console.log(chalk.bold("Status:"), statusColor(`${status} ${statusText}`));

  console.log(chalk.bold("Time:"), chalk.blue(`${duration} ms`));
  console.log(chalk.bold("Size:"), chalk.blue(formatBytes(size)));

  console.log(chalk.blue("----------------------------------------"));
};
