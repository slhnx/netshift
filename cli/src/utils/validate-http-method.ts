const VALID_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;

export type HttpMethod = (typeof VALID_HTTP_METHODS)[number];

export const validateHttpMethod = (method: string): HttpMethod => {
  const normalizedMethod = method.trim().toUpperCase();

  if (!VALID_HTTP_METHODS.includes(normalizedMethod as HttpMethod)) {
    throw new Error(
      `Invalid HTTP method: "${method}". Valid methods are: ${VALID_HTTP_METHODS.join(", ")}.`,
    );
  }

  return normalizedMethod as HttpMethod;
};
