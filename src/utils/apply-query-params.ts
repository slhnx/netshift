export const applyQueryParams = (url: URL, queryParams: string[]): URL => {
  if (!queryParams || !queryParams.length) {
    return url;
  }

  for (const param of queryParams) {
    const index = param.indexOf("=");

    if (index === -1) {
      throw new Error(`Invalid query parameter: ${param}`);
    }

    const key = param.substring(0, index).trim();
    const value = param.substring(index + 1).trim();

    if (!key) {
      throw new Error(`Invalid query parameter: ${param}`);
    }

    url.searchParams.append(key, value);
  }

  return url;
};
