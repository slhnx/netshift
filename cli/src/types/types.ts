export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestDefinition {
  name: string;
  method: HttpMethod;
  url: string;
  timeoutMs: number | undefined;
  retryCount: number;
  headers?: Record<string, string>;
  body?: unknown;
  auth?: {
    type: "bearer" | "basic";
    token?: string;
    username?: string;
    password?: string;
  };
  variables?: Record<string, string>;
}

export interface SavedRequest extends RequestDefinition {
  id: string;
  createdAt: string;
}
