import { gitConfig } from "@/lib/shared";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/10">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <pre className="font-mono text-[9px] sm:text-[11px] leading-none text-muted-foreground select-none overflow-x-auto overflow-y-hidden">
{`███╗   ██╗███████╗████████╗███████╗██╗  ██╗██╗███████╗████████╗
████╗  ██║██╔════╝╚══██╔══╝██╔════╝██║  ██║██║██╔════╝╚══██╔══╝
██╔██╗ ██║█████╗     ██║   ███████╗███████║██║█████╗     ██║
██║╚██╗██║██╔══╝     ██║   ╚════██║██╔══██║██║██╔══╝     ██║
██║ ╚████║███████╗   ██║   ███████║██║  ██║██║██║        ██║
╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝`}
          </pre>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NetShift CLI. All rights reserved.
          </p>
        </div>
        <div>
          <a
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            className="text-sm transition-colors hover:text-foreground text-muted-foreground"
          >
            View source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
