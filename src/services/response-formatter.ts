import { highlight } from "cli-highlight";

export const printJSON = (data: unknown) => {
  const prettyJSON = JSON.stringify(data, null, 2);
  console.log(
    highlight(prettyJSON, {
      language: "json",
      ignoreIllegals: true,
    }),
  );
};
