"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";
import { clsx } from "clsx";

type Verdict = "FAKE" | "REAL";

type ClassifyResponse =
  | { ok: true; label: Verdict; score: number; model: string }
  | { ok: false; error: string; warming?: boolean; retryAfter?: number };

const EXAMPLES = [
  "NASA confirms Earth will experience 15 days of complete darkness in November due to a rare planetary alignment.",
  "The European Central Bank raised its main interest rate by 25 basis points, citing persistent inflation in the services sector.",
  "Scientists discover drinking coffee mixed with lemon juice cures cancer within three days, according to a viral Facebook post.",
];

export function Classifier() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data: ClassifyResponse = await res.json();
      setResult(data);
    } catch {
      setResult({ ok: false, error: "Network error — please try again." });
    } finally {
      setLoading(false);
    }
  }

  const charCount = text.length;
  const canSubmit = text.trim().length > 0 && !loading;

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={onSubmit} className="glass rounded-2xl p-5 sm:p-6">
        <label
          htmlFor="news-input"
          className="font-mono text-xs tracking-wider text-accent-soft uppercase"
        >
          Paste a headline or article
        </label>
        <textarea
          id="news-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Scientists say drinking coffee cures all known diseases, study claims…"
          rows={6}
          maxLength={2000}
          className="mt-3 w-full resize-none rounded-xl border border-border bg-bg-soft/60 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-dim focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-ink-dim">
            {charCount} / 2000
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className={clsx(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all",
              canSubmit
                ? "bg-accent text-white hover:bg-accent-glow"
                : "cursor-not-allowed bg-surface text-ink-dim",
            )}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Analysing
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Classify
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="font-mono text-[10px] tracking-wider text-ink-dim uppercase">
            Try:
          </span>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setText(ex)}
              className="rounded-md border border-border bg-bg-soft/40 px-2 py-0.5 text-left font-mono text-[11px] text-ink-muted transition-colors hover:border-accent/40 hover:text-accent-soft"
            >
              Example {i + 1}
            </button>
          ))}
        </div>
      </form>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

function ResultPanel({ result }: { result: ClassifyResponse }) {
  if (!result.ok) {
    return (
      <div className="fade-up mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
        <p className="font-mono text-xs tracking-wider text-amber-300 uppercase">
          {result.warming ? "Model warming up" : "Error"}
        </p>
        <p className="mt-1 text-sm text-ink-muted">{result.error}</p>
        {result.warming && result.retryAfter && (
          <p className="mt-2 text-xs text-ink-dim">
            Try again in ~{result.retryAfter}s — the model is loading on Hugging
            Face&apos;s free tier.
          </p>
        )}
      </div>
    );
  }

  const { label, score } = result;
  const isFake = label === "FAKE";
  const confidencePct = Math.round(score * 100);

  return (
    <div className="fade-up mt-5 rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              isFake
                ? "bg-danger/15 text-[color:var(--color-danger)]"
                : "bg-safe/15 text-[color:var(--color-safe)]",
            )}
          >
            {isFake ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-wider text-ink-dim uppercase">
              Verdict
            </p>
            <p
              className={clsx(
                "text-xl font-semibold",
                isFake
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-safe)]",
              )}
            >
              Likely {isFake ? "misleading" : "reliable"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] tracking-wider text-ink-dim uppercase">
            Confidence
          </p>
          <p className="text-xl font-semibold text-ink">{confidencePct}%</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-soft/60">
        <div
          className={clsx(
            "bar-fill h-full rounded-full",
            isFake ? "bg-[color:var(--color-danger)]" : "bg-[color:var(--color-safe)]",
          )}
          style={{ width: `${confidencePct}%` }}
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-dim">
        This is pattern-based classification, not truth verification. The model
        looks at linguistic style — it cannot fact-check claims. Always
        cross-reference against primary sources.
      </p>
      <p className="mt-2 font-mono text-[10px] text-ink-dim">
        Model:{" "}
        <a
          href={`https://huggingface.co/${result.model}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-soft hover:underline"
        >
          {result.model}
        </a>
      </p>
    </div>
  );
}
