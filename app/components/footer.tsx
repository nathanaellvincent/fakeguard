export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 text-center text-xs text-ink-dim sm:px-6">
        <p>
          Built by{" "}
          <a
            href="https://vincentnathanael.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-soft hover:underline"
          >
            Vincent Nathanael
          </a>{" "}
          — companion demo to a CS dissertation on misleading-news detection.
        </p>
        <p className="font-mono text-[10px] text-ink-dim">
          Classifications are pattern-based, not fact-checked. Do not rely on
          this tool for consequential decisions.
        </p>
      </div>
    </footer>
  );
}
