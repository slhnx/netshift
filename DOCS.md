# NetShift Documentation

NetShift is a terminal-first API workflow tool. The current codebase exposes a small CLI for checking availability and making HTTP requests, with formatted output for metadata, headers, JSON, and HTML responses.

## Installation and Run

The package defines the `ns` binary entry point in `package.json`.

Build the CLI:

```bash
npm run build
```

Run it in development:

```bash
npm run dev
```

Run the built binary:

```bash
ns <command>
```

## Features

### 1. Ping command

The `ping` command checks whether the CLI is available and working.

Usage:

```bash
ns ping
```

Example output:

```bash
NetShift is alive and ready to serve! 🚀
```

### 2. HTTP request command

The request command sends an HTTP request to a URL using the HTTP method you provide.

It supports:

- Any method accepted by the current request flow, such as `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.
- Automatic URL validation and normalization before the request is sent.
- Custom request headers through repeated `-H` or `--header` values.
- Optional response header printing with `--show-headers`.
- Response metadata output, including status, status text, duration, and size.
- Pretty-printed JSON and HTML response bodies.

Usage:

```bash
ns <method> <url> [options]
```

Examples:

```bash
ns get https://jsonplaceholder.typicode.com/todos/1
```

```bash
ns post https://httpbin.org/post -H "Content-Type: application/json" -H "Authorization: Bearer token"
```

```bash
ns get https://httpbin.org/headers --show-headers
```

Behavior:

- The URL is trimmed and validated before the request starts.
- The CLI prints a line like `Making GET request to: https://example.com/` before sending the request.
- The response metadata is printed after the request completes.
- JSON responses are pretty-printed and syntax-highlighted.
- HTML responses are formatted with Prettier and syntax-highlighted.

### 3. Response metadata display

Every request prints request metadata to the terminal.

Displayed values:

- Status code and status text
- Total request duration in milliseconds
- Response size in bytes or kilobytes

Example:

```bash
Status: 200 OK
Time: 143 ms
Size: 1.42 KB
----------------------------------------
```

### 4. Response header display

When `--show-headers` is enabled, the CLI prints all response headers after the metadata block.

Usage:

```bash
ns get https://httpbin.org/get --show-headers
```

Example output:

```bash
Response Headers:

content-type : application/json
date : Fri, 09 May 2026 12:00:00 GMT
```

### 5. Custom header parsing

The request command accepts one or more custom headers in `Key: Value` form.

Usage:

```bash
ns get https://api.example.com/items -H "Accept: application/json" -H "X-Request-Source: netshift"
```

Rules:

- Each header must contain a colon.
- The key and value are trimmed.
- Invalid header strings raise an error.

Example of an invalid header:

```bash
ns get https://api.example.com/items -H "Accept application/json"
```

### 6. Error formatting

Errors are rendered with a dedicated formatter so failures are easy to spot in terminal output.

Example:

```bash
Error:
Invalid URL provided. Please provide a valid URL.
```

### 7. Internal request model and storage layout

The repository also defines internal data structures and storage locations for future or extended workflow features.

Defined request model fields include:

- `name`
- `method`
- `url`
- `headers`
- `body`
- `auth`
- `variables`

Defined local storage paths include:

- `~/.netshift/config.json`
- `~/.netshift/history.json`
- `~/.netshift/projects`
- `~/.netshift/collections`
- `~/.netshift/envs`

These paths are present in the codebase, but the current CLI does not yet expose commands that use them directly.

## Implementation Notes

Current request output is assembled from these pieces:

- `makeRequest()` sends the request and captures metadata.
- `printMetadata()` renders status, time, and size.
- `printHeaders()` renders response headers when requested.
- `printResponse()` formats JSON or HTML response bodies.
- `normalizeUrl()` and `parseHeader()` validate user input.

## Current Command Summary

```bash
ns ping
ns <method> <url> [-H "Key: Value"] [--show-headers]
```

Examples:

```bash
ns ping
ns get https://jsonplaceholder.typicode.com/posts/1
ns post https://httpbin.org/post -H "Content-Type: application/json"
ns get https://httpbin.org/headers --show-headers
```