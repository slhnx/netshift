import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const c = {
  cmd: "text-cyan-300",
  flag: "text-amber-300",
  str: "text-emerald-300",
  num: "text-violet-300",
  dim: "text-muted-foreground",
  key: "text-sky-300",
  ok: "text-term-green",
};

type TerminalWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function TerminalWindow({
  title,
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-zinc-950/95 shadow-2xl shadow-black/20",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        {title ? (
          <span className="ml-3 font-mono text-[11px] text-zinc-300">
            {title}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed text-zinc-100">
        {children}
      </div>
    </div>
  );
}

type PromptProps = {
  children: ReactNode;
  className?: string;
};

export function Prompt({ children, className }: PromptProps) {
  return (
    <pre className={cn("whitespace-pre-wrap break-words", className)}>
      {children}
    </pre>
  );
}
