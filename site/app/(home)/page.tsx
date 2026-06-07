"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  FileCode2,
  FolderTree,
  Globe,
  KeyRound,
  Layers,
  PackageCheck,
  Save,
  Sparkles,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { HeroAnimation } from "@/components/HeroAnimation";
import { TerminalWindow, Prompt, c } from "@/components/Terminal";
import { CopyCommand } from "@/components/CopyCommand";
import { gitConfig } from "@/lib/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function TerminalBackground() {
  const logs = [
    "ns get https://api.netshift.dev/v1/users",
    "200 OK · 42ms · size 1.2KB",
    "ns run get-octocat",
    "Authorization: Bearer **********",
    "ns post /v1/auth/login --data '{\"email\":\"dev@netshift.dev\"}'",
    "201 Created · 128ms · JSON",
    "Accept: application/json",
    "User-Agent: netshift-cli/0.1.0",
    "Content-Type: application/json",
    "ns delete /v1/users/42 --auth bearer",
    "204 No Content · 84ms",
    "ns put /v1/profile --data '{\"name\":\"NetShift\"}'",
    "ns get /v1/health",
    "UP · 200 OK · 12ms",
    "Connection: keep-alive",
    "Server: cloudflare",
    "Cache-Control: no-cache",
  ];

  return (
    <div
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none opacity-[0.12] dark:opacity-[0.22]"
    >
      {logs.map((text, idx) => {
        const left = `${(idx * 7) % 85 + 5}%`;
        const top = `${(idx * 13) % 75 + 10}%`;
        const duration = 12 + (idx % 6) * 2;
        const delay = (idx % 5) * 1.5;

        return (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: -150,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left,
              top,
            }}
            className="font-mono text-[12px] whitespace-nowrap text-foreground"
          >
            {text}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Index() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Background Dots and Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-dots opacity-75"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[600px] bg-glow opacity-85"
      />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">

        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>v0.1.0 — now in beta</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 text-[44px] md:text-[68px] font-light tracking-tight leading-[1.05] text-foreground font-display"
          >
            API workflows, <br className="hidden sm:inline" />
            <span className="text-muted-foreground">straight from your terminal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-[15px] md:text-[17px] leading-relaxed text-muted-foreground"
          >
            NetShift is a local-first CLI for rapid API requests and reusable workflows — a minimal, scriptable alternative to verbose <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13.5px] text-foreground">curl</code> commands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[13.5px] text-foreground shadow-sm">
              <span className="text-muted-foreground select-none">$</span>
              <span className="font-medium">npm i -g netshift</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("npm i -g netshift");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="ml-2 flex items-center justify-center rounded-md p-1 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Copy command"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <Link href="/docs">
              <Button variant="outline" className="cursor-pointer font-medium h-9 px-4">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                Documentation
              </Button>
            </Link>
          </motion.div>

          <HeroAnimation />
        </div>
      </section>

      {/* CORE FEATURES (3-COLUMN AESTHETIC GRID) */}
      <Section
        id="features"
        eyebrow="Features"
        title="Everything you need. Nothing you don't."
        description="A focused developer toolkit for managing, executing, and automating APIs without heavy graphic overhead."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: HTTP Requests */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <Zap className="h-4.5 w-4.5 text-sky-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">HTTP Primitives</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                GET, POST, PUT, DELETE with full CLI flag control over custom headers, timeouts, and automated retries.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                <span className={c.cmd}>ns</span> <span className={c.flag}>get</span> <span className={c.str}>https://api.github.com/users/octocat</span>
              </code>
            </div>
          </motion.div>

          {/* Card 2: Readable Responses */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Readable Responses</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Syntax-highlighted output, clear server header summaries, and structured response metadata.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <div className="flex items-center gap-2">
                <span className="rounded border border-border px-1 py-0.2 text-[10px] text-term-green bg-term-green/5">200 OK</span>
                <span className={c.dim}>72ms · 1.2KB · JSON</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Saved Workflows */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <Save className="h-4.5 w-4.5 text-indigo-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Saved Workflows</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Save complex API requests on disk by appending <code className="text-[12.5px] text-foreground font-mono bg-muted px-1 rounded">--save</code> and replay them instantly.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                <span className={c.cmd}>ns</span> <span className={c.cmd}>run</span> <span className={c.str}>get-octocat</span>
              </code>
            </div>
          </motion.div>

          {/* Card 4: Collections & Projects */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <FolderTree className="h-4.5 w-4.5 text-rose-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Collections & Projects</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Organize requests into logical, structured collections. Scale easily from a single request to entire API hubs.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                ./netshift/collections/
              </code>
            </div>
          </motion.div>

          {/* Card 5: Environments & Templates */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <Globe className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Environments & Templates</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Configure dev, staging, or production. Dynamically substitute template variables in headers or URLs.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                Authorization: Bearer <span className={c.key}>{"{{token}}"}</span>
              </code>
            </div>
          </motion.div>

          {/* Card 6: Config as Code */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <FileCode2 className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Config as Code</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                All configs are stored as local JSON files on your machine. Commit them directly to git for team reviews.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                ~/.netshift/requests/<span className={c.key}>get-octocat.json</span>
              </code>
            </div>
          </motion.div>

          {/* Card 7: Auth Helpers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <KeyRound className="h-4.5 w-4.5 text-teal-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Auth Helpers</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Simplified support for Bearer tokens, Basic authorization, and custom credentials directly via flags.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                <span className={c.cmd}>ns</span> <span className={c.flag}>get</span> <span className={c.str}>/profile</span> --auth bearer
              </code>
            </div>
          </motion.div>

          {/* Card 8: Import & Export */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <PackageCheck className="h-4.5 w-4.5 text-fuchsia-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Import & Export</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Easy interoperability. Import your existing Postman collections or export configs with zero hassle.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                <span className={c.cmd}>ns</span> <span className={c.cmd}>import</span> postman.json
              </code>
            </div>
          </motion.div>

          {/* Card 9: Composable & Scriptable */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted">
                  <Layers className="h-4.5 w-4.5 text-orange-400" />
                </div>
                <h3 className="font-display text-[16px] font-light tracking-tight">Composable & Scriptable</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Pipe outputs to JSON parsers like `jq`, chain multi-step actions, and run requests inside CI pipelines.
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 font-mono text-[11.5px] text-foreground">
              <code>
                <span className={c.cmd}>ns run</span> get-users | jq <span className={c.str}>'.[0].id'</span>
              </code>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* DEV EXPERIENCE DEMO */}
      <Section
        eyebrow="Developer Experience"
        title="Designed for terminal productivity."
        description="No heavy GUI wrappers. No unnecessary logins. A local tool that respects your flow and plays nicely with shell scripts."
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            {[
              ["Built for Speed", "Sub-50ms execution overhead. Designed to feel instant."],
              ["Local-first Data", "Your request history and saved templates stay securely on your disk."],
              ["Composable & Scriptable", "Pipe outputs, chain operations, and integrate easily into CI/CD pipelines."],
            ].map(([title, desc], idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 hover:bg-muted/55 transition-colors duration-200"
              >
                <h4 className="font-display text-[15px] font-light text-foreground">{title}</h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-7">
            <TerminalWindow title="api/users — netshift">
              <div className="space-y-1.5">
                <Prompt>
                  <span className={c.cmd}>ns</span>{" "}
                  <span className={c.flag}>get</span>{" "}
                  <span className={c.str}>https://api.netshift.dev/users</span>{" "}
                  <span className={c.flag}>-H</span>{" "}
                  <span className={c.str}>"Authorization: Bearer $TOKEN"</span>
                </Prompt>
                <div className="flex flex-wrap gap-3 pt-1">
                  <span className="rounded border border-border px-1.5 py-0.5 text-term-green bg-term-green/5 font-medium">
                    200 OK
                  </span>
                  <span className={c.dim}>72 ms · GET · production</span>
                </div>
                <pre className="whitespace-pre pt-2 text-zinc-300">
                  {`[
  { `}
                  <span className={c.key}>"id"</span>:{" "}
                  <span className={c.num}>1</span>,{" "}
                  <span className={c.key}>"email"</span>:{" "}
                  <span className={c.str}>"developer@netshift.dev"</span>{" "}
                  {`}
]`}
                </pre>
                <div className="pt-2 text-muted-foreground border-t border-border/20">
                  ─ saved request as <span className={c.ok}>get-users</span> in{" "}
                  <span className={c.key}>~/.netshift/requests/</span>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </Section>

      {/* TIMELINE / WORKFLOW */}
      <Section
        id="workflow"
        eyebrow="Workflow"
        title="From raw request to saved workflow."
        description="A simple three-step progression to manage and automate your local developer requests."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, step: "01", title: "Fire HTTP", desc: "Execute rapid methods, configure custom headers, body data and timeouts." },
            { icon: Save, step: "02", title: "Save Config", desc: "Store the entire request configuration easily using the --save parameter." },
            { icon: ArrowRight, step: "03", title: "Replay & Automate", desc: "Rerun the saved workflow instantly with ns run <name> anywhere in your shell." }
          ].map(({ icon: Icon, step, title, desc }, idx) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm hover:bg-muted/55 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">{step}</span>
              </div>
              <h4 className="mt-4 font-display text-[15.5px] font-light text-foreground">{title}</h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* QUICK INSTALL */}
      <Section
        id="install"
        eyebrow="Installation"
        title="Get started in seconds."
        description="Install the CLI globally and fire your first request in a matter of seconds."
      >
        <div className="mx-auto max-w-xl space-y-3">
          <CopyCommand command="npm install -g netshift" />
          <CopyCommand command="ns get https://jsonplaceholder.typicode.com/todos/1" />
          <CopyCommand command="ns get https://jsonplaceholder.typicode.com/todos/1 --save get-todo" />
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative border-t border-border bg-muted/40">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-light tracking-tight md:text-5xl"
          >
            Upgrade your request workflow.
          </motion.h2>
          <p className="mt-4 text-[15px] text-muted-foreground max-w-md mx-auto leading-relaxed">
            Build clean, declarative API tests and run them directly inside your terminal. Free, local, and version-controlled.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs">
              <Button className="cursor-pointer font-medium h-10 px-5">
                Read the Docs <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="cursor-pointer font-medium h-10 px-5">
                Star on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
