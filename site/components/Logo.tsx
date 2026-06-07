import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5 text-foreground", className)}
    >
      {/* Chevron: > */}
      <path d="M5 5l7 7-7 7" />
      {/* Underscore cursor: _ */}
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
