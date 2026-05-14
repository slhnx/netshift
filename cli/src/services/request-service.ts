export const makeRequest = async (
  method: string,
  url: URL,
  headers: Record<string, string>,
  body?: JSON | string | undefined,
  timeoutMs?: number,
) => {
  const controller = new AbortController();
  const timeoutId =
    timeoutMs && timeoutMs > 0
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

  try {
    const start = Date.now();
    const requestBody =
      body === undefined
        ? undefined
        : typeof body === "string"
          ? body
          : JSON.stringify(body);

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers,
      body: requestBody,
      signal: controller.signal,
    });

    const responseText = await response.text();
    const contentType = response.headers.get("Content-Type") || "";

    let data: unknown = responseText;
    let dataType = "";

    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(responseText);
        dataType = "json";
      } catch {
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
        size: Buffer.byteLength(responseText),
      },
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs} ms`);
    }
    throw err;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};
