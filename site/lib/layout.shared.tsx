import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Link from "next/link";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-foreground">
            <span className="font-mono text-[14px] font-bold text-background">
              N
            </span>
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {appName}
          </span>
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
