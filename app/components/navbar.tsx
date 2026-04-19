import { Shield, ExternalLink } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent-soft">
            <Shield size={16} />
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight text-ink">
            FakeGuard
          </span>
        </div>
        <a
          href="https://vincentnathanael.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-accent-soft"
        >
          Vincent Nathanael
          <ExternalLink size={12} />
        </a>
      </div>
    </header>
  );
}
