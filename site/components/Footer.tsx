import { gitConfig } from "@/lib/shared";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>NetShift CLI</p>
        <a
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          className="transition-colors hover:text-foreground"
        >
          View source on GitHub
        </a>
      </div>
    </footer>
  );
}
