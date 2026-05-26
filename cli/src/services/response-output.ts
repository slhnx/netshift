import prettier from "prettier";

type ResponseType = "json" | "html" | "plain";

export const formatResponseForOutput = async (
  data: unknown,
  type: ResponseType,
): Promise<string> => {
  if (type === "json") {
    return JSON.stringify(data, null, 2);
  } else if (type == "html") {
    return await prettier.format(String(data), { parser: "html" });
  }

  return String(data);
};
