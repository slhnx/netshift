export const parseHeader = (values: string[] | undefined): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (!values) return headers;

  for (const value of values) {
    const index = value.indexOf(":");

    if (index == -1) throw new Error(`Invalid header: ${value}`);

    const key = value.substring(0, index).trim();
    const val = value.substring(index + 1).trim();

    if (!key || !val) throw new Error(`Invalid header: ${value}`);
    
    headers[key] = val;
  }

  return headers;
}