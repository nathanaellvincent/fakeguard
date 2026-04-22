import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Classifier } from "./components/classifier";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-12 pb-12 sm:px-6 sm:pt-20">
        <div className="mb-12 text-center">
          {/* Editorial kicker — masthead-style */}
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
            Vol. 01 · NLP Classifier
          </p>
          <div className="mx-auto mt-3 h-px w-14 bg-accent/40" />

          {/* Display headline in editorial serif. "misleading?" is the pull-focus
             word, so it gets italic + gradient treatment. */}
          <h1
            className="mt-5 text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Is this story{" "}
            <em className="editorial-gradient not-italic sm:italic">
              misleading?
            </em>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Paste a headline or article. A fine-tuned transformer classifier
            estimates whether the language pattern resembles misleading news.
            It&apos;s pattern recognition — not truth verification.
          </p>
        </div>

        <Classifier />

        <section className="mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
          <InfoCard
            kicker="I"
            title="Pattern-based"
            body="The model learns stylistic signals — sensational language, emotional framing, loose sourcing — from training data."
          />
          <InfoCard
            kicker="II"
            title="Not fact-checking"
            body="It cannot verify claims against reality. Always cross-reference against primary sources before sharing."
          />
          <InfoCard
            kicker="III"
            title="Dissertation-adjacent"
            body="Built as a public companion to a Coventry University final-year dissertation on misleading-news detection."
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-surface/40 p-5 backdrop-blur">
      <div className="flex items-baseline gap-2.5">
        <span
          className="text-2xl leading-none text-accent"
          style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic" }}
        >
          {kicker}.
        </span>
        <p className="font-mono text-[11px] tracking-wider text-ink-muted uppercase">
          {title}
        </p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">{body}</p>
    </article>
  );
}
