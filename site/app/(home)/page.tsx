"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  FileCode2,
  FolderTree,
  Globe,
  KeyRound,
  Layers,
  PackageCheck,
  Save,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { HeroTerminal } from "@/components/HeroTerminal";
import { FeatureCard } from "@/components/FeatureCard";
import { TerminalWindow, Prompt, c } from "@/components/Terminal";
import { CopyCommand } from "@/components/CopyCommand";
import { gitConfig } from "@/lib/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-150 bg-dots"
      />

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-20 md:pt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" />
              v0.1.0 — now in beta
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-5 text-[44px] font-semibold leading-[1.05] tracking-tight md:text-6xl"
            >
              API workflows,
              <br />
              <span className="text-primary/80">
                straight from your terminal.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base"
            >
              NetShift is a terminal-first CLI for API requests and reusable
              workflows — a cleaner alternative to repetitive{" "}
              <code className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[13px] text-foreground">
                curl
              </code>{" "}
              commands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <Button>
                Install with npm
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Link href="/docs">
                <Button variant="outline">
                  <BookOpen className="h-3.5 w-3.5" />
                  Documentation
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11.5px] text-muted-foreground"
            >
              <span>MIT licensed</span>
              <span className="opacity-40">·</span>
              <span>Local-first</span>
              <span className="opacity-40">·</span>
              <span>Config-as-code</span>
              <span className="opacity-40">·</span>
              <span>Single binary</span>
            </motion.div>
          </div>
          <div className="lg:col-span-6">
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <Section
        id="features"
        eyebrow="Features"
        title="Everything you need. Nothing you don't."
        description="A focused toolkit for the way developers work with APIs — from the terminal, with config in git."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            index={0}
            icon={Zap}
            title="Fast HTTP requests"
            description="GET, POST, PUT, PATCH, DELETE with headers, retries, and timeouts — from a single command."
            snippet={
              <code>
                <span className={c.cmd}>shift</span>{" "}
                <span className={c.flag}>POST</span>{" "}
                <span className={c.str}>/api/login</span>{" "}
                <span className={c.flag}>--retry</span>{" "}
                <span className={c.num}>3</span>
              </code>
            }
          />
          <FeatureCard
            index={1}
            icon={Sparkles}
            title="Readable responses"
            description="Syntax-highlighted JSON, clear error output, and rich response metadata."
            snippet={
              <div className="flex items-center gap-2">
                <span className="rounded border border-border px-1.5 text-term-green">
                  200
                </span>
                <span className={c.dim}>118ms · 2.4KB · json</span>
              </div>
            }
          />
          <FeatureCard
            index={2}
            icon={Save}
            title="Saved requests"
            description="Persist any request as a reusable workflow. Run it again by name — no copy-paste."
            snippet={
              <code>
                <span className={c.cmd}>shift run</span>{" "}
                <span className={c.str}>get-users</span>
              </code>
            }
          />
          <FeatureCard
            index={3}
            icon={FolderTree}
            title="Collections & projects"
            description="Organize APIs into clean collections. Scale from one endpoint to a full service map."
          />
          <FeatureCard
            index={4}
            icon={Globe}
            title="Environment variables"
            description="Switch between dev, staging, and prod. Use template variables anywhere."
            snippet={
              <code>
                <span className={c.flag}>Authorization:</span> Bearer{" "}
                <span className={c.key}>{"{{token}}"}</span>
              </code>
            }
          />
          <FeatureCard
            index={5}
            icon={FileCode2}
            title="Config-as-code"
            description="YAML configs that live in your repo. Diff, review, and ship through git."
          />
          <FeatureCard
            index={6}
            icon={KeyRound}
            title="Auth helpers"
            description="First-class support for Bearer, Basic, and custom auth flows."
          />
          <FeatureCard
            index={7}
            icon={PackageCheck}
            title="Import & export"
            description="Bring requests from Postman or share a NetShift project with your team."
          />
          <FeatureCard
            index={8}
            icon={Layers}
            title="Composable & scriptable"
            description="Pipe outputs, chain commands, integrate into CI. Plays nicely with your shell."
          />
        </div>
      </Section>

      {/* DEV EXPERIENCE */}
      <Section
        eyebrow="Developer experience"
        title="Designed for the terminal."
        description="No bloated GUI. No login walls. A local-first tool that respects your workflow."
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {[
              ["No bloated GUI", "Pure CLI. No Electron. No 400MB install."],
              [
                "Local-first",
                "Your requests live in your repo, not a vendor's cloud.",
              ],
              [
                "Built for speed",
                "Sub-100ms cold start. Designed to feel instant.",
              ],
              [
                "Version-control friendly",
                "Plain YAML. Reviewable diffs. No binary blobs.",
              ],
            ].map(([title, body]) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="rounded-md border border-border bg-card p-5"
              >
                <h4 className="font-display text-[14.5px] font-semibold">
                  {title}
                </h4>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
          <TerminalWindow title="api/users.yml — netshift">
            <div className="space-y-1.5">
              <Prompt>
                <span className={c.cmd}>shift</span>{" "}
                <span className={c.flag}>GET</span>{" "}
                <span className={c.str}>/users</span>{" "}
                <span className={c.flag}>-H</span>{" "}
                <span className={c.str}>"Authorization: Bearer $TOKEN"</span>
              </Prompt>
              <div className="flex flex-wrap gap-3 pt-1">
                <span className="rounded border border-border px-1.5 py-0.5 text-term-green">
                  200 OK
                </span>
                <span className={c.dim}>87 ms · GET · prod</span>
              </div>
              <pre className="whitespace-pre pt-2">
                {`[
  { `}
                <span className={c.key}>"id"</span>:{" "}
                <span className={c.num}>1</span>,{" "}
                <span className={c.key}>"email"</span>:{" "}
                <span className={c.str}>"ada@netshift.dev"</span>{" "}
                {`},
  { `}
                <span className={c.key}>"id"</span>:{" "}
                <span className={c.num}>2</span>,{" "}
                <span className={c.key}>"email"</span>:{" "}
                <span className={c.str}>"linus@netshift.dev"</span>{" "}
                {`}
]`}
              </pre>
              <div className="pt-2 text-muted-foreground">
                ─ saved as <span className={c.ok}>get-users</span> in{" "}
                <span className={c.key}>./netshift.yml</span>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </Section>

      {/* WORKFLOW */}
      <Section
        id="workflow"
        eyebrow="Workflow"
        title="From request to reusable workflow."
        description="Five primitives. Compose APIs the way you compose code."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { icon: Zap, label: "Request", desc: "Fire HTTP" },
            { icon: Save, label: "Save", desc: "Name it" },
            { icon: FolderTree, label: "Collection", desc: "Group it" },
            { icon: Globe, label: "Environment", desc: "Scope it" },
            { icon: Workflow, label: "Run", desc: "Replay" },
          ].map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-md border border-border bg-card p-5"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-3 font-display text-[14.5px] font-semibold">
                {label}
              </div>
              <div className="mt-1 font-mono text-[11.5px] text-muted-foreground">
                {desc}
              </div>
              <div className="mt-3 font-mono text-[11px] text-muted-foreground">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* INSTALL */}
      <Section
        id="install"
        eyebrow="Install"
        title="Up and running in 10 seconds."
        description="One install. One init. Ready to ship requests."
      >
        <div className="mx-auto max-w-2xl space-y-2.5">
          <CopyCommand command="npm install -g netshift" />
          <CopyCommand command="shift init" />
          <CopyCommand command="shift GET https://api.example.com/health" />
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            Stop fighting curl.
          </motion.h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Build cleaner API workflows with a terminal experience designed for
            developers.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#install"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-[13.5px] font-medium text-background hover:opacity-90"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-[13.5px] font-medium text-foreground hover:bg-accent"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
