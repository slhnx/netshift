import { truncate } from "@/utils/truncate";
import { highlight } from "cli-highlight";
import prettier from "prettier";

type PrettyResponseOptions = {
  truncate: boolean;
};

const MAX_OUTPUT_LENGTH = 8000;

export const printJSON = (data: unknown, options: PrettyResponseOptions) => {
  const prettyJSON = JSON.stringify(data, null, 2);
  const { text, isTruncated } = options.truncate
    ? truncate(prettyJSON, MAX_OUTPUT_LENGTH)
    : { text: prettyJSON, isTruncated: false };

  console.log(
    highlight(text, {
      language: "json",
      ignoreIllegals: true,
    }),
  );

  if (isTruncated) {
    console.warn(
      `\n\n...[Truncated] Output truncated to ${MAX_OUTPUT_LENGTH} characters. Use --no-truncate to see the full response.`,
    );
  }
};

export const printHTML = async (
  data: unknown,
  options: PrettyResponseOptions,
) => {
  const prettyHTML = await prettier.format(String(data), { parser: "html" });
  const { text, isTruncated } = options.truncate
    ? truncate(prettyHTML, MAX_OUTPUT_LENGTH)
    : { text: prettyHTML, isTruncated: false };

  console.log(
    highlight(text, {
      language: "html",
      ignoreIllegals: true,
    }),
  );

  if (isTruncated) {
    console.warn(
      `\n\n...[Truncated] Output truncated to ${MAX_OUTPUT_LENGTH} characters. Use --no-truncate to see the full response.`,
    );
  }
};

export const printResponse = async (data: unknown, dataType: string, options: PrettyResponseOptions) => {
  switch (dataType) {
    case "json":
      printJSON(data, options);
      return;
    case "html":
      await printHTML(data, options);
      return;
    default:
      console.log(String(data));
      return;
  }
};
