import { Shield, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent">
            <Shield size={15} strokeWidth={2.2} />
          </div>
          <span
            className="text-[22px] leading-none tracking-tight text-ink"
            style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic" }}
          >
            FakeGuard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://vincentnathanael.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-accent-soft"
          >
            Vincent Nathanael
            <ExternalLink size={11} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
