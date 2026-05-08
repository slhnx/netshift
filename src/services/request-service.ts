export const makeRequest = async (method: string, url: string) => {
  const start = Date.now();

  const response = await fetch(url, { method: method.toUpperCase() });

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const end = Date.now();

  const data = await response.json();

  return {
    data, 
    headers,
    metadata: {
      status: response.status,
      statusText: response.statusText,
      duration: end - start,
      size: Buffer.byteLength(JSON.stringify(data)),
    }
  };
}