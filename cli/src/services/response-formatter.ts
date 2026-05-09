import { highlight } from "cli-highlight";
import prettier from "prettier";

export const printJSON = (data: unknown) => {
  const prettyJSON = JSON.stringify(data, null, 2);
  console.log(
    highlight(prettyJSON, {
      language: "json",
      ignoreIllegals: true,
    }),
  );
};

export const printResponse = async (data: unknown, dataType: string) => {
  if (dataType === "json") {
    printJSON(data);
    return;
  }

  if (dataType === "html") {
    console.log('this is html boyd')
    const prettyHTML = await prettier.format(String(data), { parser: "html" });

    console.log(
      highlight(prettyHTML, {
        language: "html",
        ignoreIllegals: true,
      }),
    );
  }
};
