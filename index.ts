export type RequestResult =
  | {
      data: unknown;
      headers: Record<string, string>;
      dataType: "json";
      metadata: {
        status: number;
        statusText: string;
        duration: number;
        size: number;
      };
    }
  | {
      data: string;
      headers: Record<string, string>;
      dataType: "html" | "plain";
      metadata: {
        status: number;
        statusText: string;
        duration: number;
        size: number;
      };
    };

export const makeRequest = async (
  method: string,
  url: URL,
  headers: Record<string, string>,
  body?: unknown,
  timeoutMs?: number
): Promise<RequestResult> => {
  const start = Date.now();
  const controller = new AbortController();

  const timeoutId =
    timeoutMs && timeoutMs > 0
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

  try {
    const requestOptions: RequestInit = {
      method: method.toUpperCase(),
      headers,
      signal: controller.signal,
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);

      if (!requestOptions.headers || !("Content-Type" in requestOptions.headers)) {
        requestOptions.headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }
    }

    const response = await fetch(url, requestOptions);
    const responseText = await response.text();
    const contentType = response.headers.get("content-type") || "";

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const end = Date.now();

    const metadata = {
      status: response.status,
      statusText: response.statusText,
      duration: end - start,
      size: Buffer.byteLength(responseText, "utf8"),
    };

    if (contentType.includes("application/json")) {
      try {
        return {
          data: JSON.parse(responseText),
          headers: responseHeaders,
          dataType: "json",
          metadata,
        };
      } catch {
        return {
          data: responseText,
          headers: responseHeaders,
          dataType: "plain",
          metadata,
        };
      }
    }

    if (contentType.includes("text/html")) {
      return {
        data: responseText,
        headers: responseHeaders,
        dataType: "html",
        metadata,
      };
    }

    return {
      data: responseText,
      headers: responseHeaders,
      dataType: "plain",
      metadata,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Request timed out after ${timeoutMs}ms`
      );
    }

    throw error;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};