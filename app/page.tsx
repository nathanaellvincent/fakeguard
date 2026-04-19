import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Classifier } from "./components/classifier";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-10 pb-12 sm:px-6 sm:pt-16">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-soft uppercase">
            NLP · Classification Demo
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Is this story{" "}
            <span className="gradient-text">misleading?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Paste a headline or article. A fine-tuned transformer classifier
            estimates whether the language pattern resembles misleading news.
            It&apos;s pattern recognition — not truth verification.
          </p>
        </div>

        <Classifier />

        <section className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          <InfoCard
            title="Pattern-based"
            body="The model learns stylistic signals — sensational language, emotional framing, loose sourcing — from training data."
          />
          <InfoCard
            title="Not fact-checking"
            body="It cannot verify claims against reality. Always cross-reference against primary sources before sharing."
          />
          <InfoCard
            title="Dissertation-adjacent"
            body="Built as a public companion to a Coventry University final-year dissertation on misleading-news detection."
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/30 p-4 backdrop-blur">
      <p className="font-mono text-[11px] tracking-wider text-accent-soft uppercase">
        {title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
