export const makeRequest = async (
  method: string,
  url: URL,
  headers: Record<string, string>,
  body?: JSON | string | undefined,
) => {
  const start = Date.now();

  const response = await fetch(url, {
    method: method.toUpperCase(),
    headers,
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  const contentType = response.headers.get("Content-Type") || "";

  let data: unknown = responseText;
  let dataType: string = "";

  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(responseText);
      dataType = "json";
    } catch (err) {
      data = responseText;
      dataType = "plain";
    }
  } else if (contentType.includes("text/html")) {
    dataType = "html";
  }

  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  const end = Date.now();

  return {
    data,
    headers: responseHeaders,
    dataType,
    metadata: {
      status: response.status,
      statusText: response.statusText,
      duration: end - start,
      size: Buffer.byteLength(JSON.stringify(data)),
    },
  };
};
