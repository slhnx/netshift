import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  snippet?: ReactNode;
};

export function FeatureCard({
  index,
  icon: Icon,
  title,
  description,
  snippet,
}: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          0{index + 1}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[18px] font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {description}
      </p>

      {snippet ? (
        <div
          className={cn(
            "mt-4 overflow-hidden rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-[12px]",
          )}
        >
          {snippet}
        </div>
      ) : null}
    </article>
  );
}
