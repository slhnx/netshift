"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type CopyCommandProps = {
  command: string;
};

export function CopyCommand({ command }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 font-mono text-[13px]">
      <span className="overflow-x-auto whitespace-nowrap text-foreground">
        {command}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        )}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
