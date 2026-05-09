export const makeRequest = async (method: string, url: URL) => {
  const start = Date.now();

  const response = await fetch(url, { method: method.toUpperCase() });

  const responseText = await response.text();
  const contentType = response.headers.get("Content-Type") || "";

  let data: unknown = responseText;
  let dataType: string = '';

  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(responseText);
      dataType = 'json';
    } catch (err) {
      data = responseText;
      dataType = 'plain';
    }
  } else if (contentType.includes('text/html')) {
    dataType = 'html';
  }

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const end = Date.now();

  return {
    data,
    headers,
    dataType,
    metadata: {
      status: response.status,
      statusText: response.statusText,
      duration: end - start,
      size: Buffer.byteLength(JSON.stringify(data)),
    },
  };
};
