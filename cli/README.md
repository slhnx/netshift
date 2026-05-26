# NetShift CLI 🚀

NetShift is a terminal-first API client and workflow tool designed for developers who love command-line efficiency. With formatted response styling, syntax highlighting, request retries, and comprehensive HTTP customizability, NetShift brings the power of graphical API clients directly to your terminal.

---

## Features

- **HTTP Requests:** Perform `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and other HTTP requests.
- **Request Configuration:**
  - **Headers:** Multiple headers support using the `-H` / `--header` flags (e.g., `-H "Content-Type: application/json"`).
  - **Query Params:** Append parameters cleanly via `-Q` / `--query` (e.g., `-Q "page=2"`).
  - **Payloads:** Send JSON or text request bodies using `-d` / `--data`.
- **Resilience & Reliability:**
  - **Retries:** Configurable automatic retry attempts with `--retry`.
  - **Timeouts:** Define request timeouts in seconds with `--timeout`.
- **Formatted & High-Contrast Visuals:**
  - **Metadata:** Clean output of status codes, elapsed time, and download sizes.
  - **Headers Display:** Print response headers with `--show-headers`.
  - **Syntax Highlighting:** Pretty-prints and colors JSON and HTML response bodies.
  - **Truncation Toggle:** Toggle truncation of large outputs using `--no-truncate`.
- **Output Redirection:** Directly pipe responses to files using `--output <file>`.
- **Diagnostics:** Quick status checks via the `ns ping` command.

---

## Installation

### From npm (Global)

Install the CLI globally on your system:

```bash
npm i netshift -g
```

### From Source (Local Development)

1. Clone the repository and navigate to the `cli` directory:
   ```bash
   cd cli
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run locally:
   - Run in development mode: `npm run dev -- <method> <url>`
   - Run the compiled binary: `node dist/index.js <method> <url>`

---

## Command Reference

### `ns ping`

Checks if NetShift is installed correctly and running.

```bash
$ ns ping
NetShift is alive and ready to serve! 🚀
```

---

### `ns <method> <url> [options]`

Executes an HTTP request with the specified method and target URL.

#### Arguments:

- `<method>`: The HTTP method (e.g., `get`, `post`, `put`, `delete`).
- `<url>`: The endpoint target. Automatic normalization and prefixing (e.g., automatically prepends `http://` or `https://` if omitted) will be applied.

#### Options:

| Flag                       | Description                                                          | Example                               |
| :------------------------- | :------------------------------------------------------------------- | :------------------------------------ |
| `-H, --header <header...>` | Add a custom header in `"Key: Value"` format (can be repeated).      | `-H "Authorization: Bearer my-token"` |
| `-Q, --query <query>`      | Add a query parameter in `"key=value"` format (can be repeated).     | `-Q "search=term"`                    |
| `-d, --data <data>`        | Provide a raw body payload (e.g., a JSON string) for request bodies. | `-d '{"id": 42}'`                     |
| `--show-headers`           | Print response headers.                                              | `--show-headers`                      |
| `--timeout <timeout>`      | Set request timeout in seconds.                                      | `--timeout 5`                         |
| `--retry <retryCount>`     | Set number of retry attempts for failed requests.                    | `--retry 3`                           |
| `--no-truncate`            | Prevent truncation of long responses in the console.                 | `--no-truncate`                       |
| `--output <file>`          | Save response body directly to a specified output file path.         | `--output response.json`              |

---

## Examples

### 1. Basic GET Request

Fetch data and format output with syntax highlighting:

```bash
ns get https://jsonplaceholder.typicode.com/todos/1
```

### 2. POST Request with Headers and JSON Body

Send a POST request with authentication and JSON content:

```bash
ns post https://httpbin.org/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer secret-token" \
  -d '{"name": "NetShift CLI", "status": "active"}'
```

### 3. GET Request with Query Parameters

Append query parameters dynamically:

```bash
ns get https://httpbin.org/get -Q "filter=active" -Q "limit=10"
```

### 4. Downloading a Response to a File

Save response output directly to a file:

```bash
ns get https://jsonplaceholder.typicode.com/posts --output posts.json
```

### 5. Custom Timeout and Retry Configurations

Set a 5-second timeout and attempt a request up to 3 times on failure:

```bash
ns get https://api.slowendpoint.com/data --timeout 5 --retry 3
```

---

## Project Structure & Internal Architecture

If you are developing or extending NetShift CLI, here is the directory layout:

- `src/cli/index.ts` — CLI application entry point utilizing Commander.js.
- `src/cli/commands/request.ts` — Logic defining flags, options, error handling, and output compilation.
- `src/services/` — Core modules for execution logic:
  - `request-service.ts` — Axiomatic requests, retries, and network timing logic.
  - `error-formatter.ts`, `headers-formatter.ts`, `metadata-formatter.ts`, `response-formatter.ts` — Terminal styling services using Chalk and CLI highlighter.
- `src/storage/paths.ts` — Reserved for configuration, history, and workspace files (defaults to `~/.netshift/`).

---

## License

MIT
