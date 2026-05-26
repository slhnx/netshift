# NetShift 🚀

NetShift is a terminal-first API workflow tool and client designed for developers who value command-line speed and efficiency. NetShift allows you to perform customizable HTTP requests directly from your terminal, styling responses, and composing API configurations with version-controlled YAML files.

This repository is organized as a monorepo containing both the CLI tool and the Next.js landing/documentation website.

---

## Repository Structure

```text
├── cli/                 # Core NetShift CLI package (TypeScript, Commander.js)
└── site/                # Next.js landing page & Fumadocs documentation site
```

---

## 📦 NetShift CLI (`/cli`)

The core command-line client that fires requests, handles timeouts, applies retries, and displays beautiful syntax-highlighted responses (JSON/HTML) and metadata.

### Quick Global Install

```bash
npm i netshift -g
```

### CLI Dev Setup

1. Navigate to the CLI directory:
   ```bash
   cd cli
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development build:
   ```bash
   npm run dev -- get https://api.github.com
   ```
4. Build the production bundle:
   ```bash
   npm run build
   ```

_For more details on CLI options and flags, read the [CLI README](./cli/README.md)._

---

## 🌐 Documentation Website & Landing Page (`/site`)

The product website featuring the interactive landing page, setup guides, and comprehensive API documentation. Built with Next.js, Tailwind CSS, and Fumadocs.

### Website Dev Setup

1. Navigate to the site directory:
   ```bash
   cd site
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js dev server:
   ```bash
   npm run dev
   ```
4. Build the production site locally:
   ```bash
   npm run build
   ```

---

## 🛠️ Main Tech Stack

- **CLI:** Node.js, TypeScript, Commander.js, Axios, Chalk, tsup, cli-highlight, cli-table3.
- **Website:** Next.js (App Router), React, Fumadocs UI, Tailwind CSS, Motion.

---

## License

MIT
