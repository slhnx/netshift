import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("border-t border-border/60", className)}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          {eyebrow ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
