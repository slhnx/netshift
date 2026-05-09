"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { gitConfig } from "@/lib/shared";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const currentTheme = resolvedTheme ?? theme;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-foreground">
            <span className="font-mono text-[11px] font-bold text-background">
              N
            </span>
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            NetShift
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {[
            ["Features", "#features"],
            ["Workflow", "#workflow"],
            ["Install", "#install"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            )}
          >
            {currentTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
            aria-label="Source repository"
            className="hidden rounded-full border border-border/80 px-3.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-accent sm:inline-block"
          >
            Source
          </a>

          <a
            href="#install"
            className="ml-2 hidden rounded-md bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90 sm:inline-block"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
