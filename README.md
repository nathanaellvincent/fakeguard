# FakeGuard

A live web demo that classifies news text as **likely misleading** or **likely reliable** using a fine-tuned transformer model. Paste a headline or a short article, submit, and see the model's verdict with a confidence score.

**Live:** [fakeguard.vercel.app](https://fakeguard.vercel.app) *(deploy pending)*

## What this is (and what it isn't)

FakeGuard is a **pattern-based classifier** — it learned stylistic signals from labeled examples of real and fake news. That means:

- It looks at *how something is written*, not at *whether it's true*.
- It cannot fact-check against the real world.
- It can be fooled by well-written misinformation or tripped up by unusually-written real news.

Treat it as a stylistic flag, not as a truth oracle.

## Stack

- **Frontend:** Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS 4
- **UI:** Inline SVG icons (lucide-react), custom dark-navy design system
- **Inference:** Hugging Face Serverless Inference API
- **Model:** [`hamzab/roberta-fake-news-classification`](https://huggingface.co/hamzab/roberta-fake-news-classification) — RoBERTa fine-tuned for fake news detection
- **Deployment:** Vercel

## How it works

1. User pastes text into the client-side textarea.
2. Next.js route handler `/api/classify` receives the POST, attaches the HF bearer token, and forwards the request to Hugging Face's Inference API.
3. The model returns label probabilities; the server picks the top label, normalises it to `FAKE` / `REAL`, and returns `{ label, score, model }` to the client.
4. Client renders a verdict card with a confidence bar.

The API token never reaches the browser — the route handler is the only thing that touches Hugging Face.

## Running locally

```bash
npm install
cp .env.example .env.local
# Add your Hugging Face token to .env.local (free tier works fine)
npm run dev
```

Get a token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) — a read-only token is enough.

### Environment variables

| Variable       | Purpose                                    | Required |
|----------------|--------------------------------------------|----------|
| `HF_API_TOKEN` | Hugging Face Inference API bearer token    | Yes      |
| `HF_MODEL`     | Override the default classifier model      | No       |

## Context

Built as a public companion to a Coventry University final-year dissertation on misleading-news detection. The dissertation's own code remains private during academic moderation; FakeGuard is a standalone public build that demonstrates the same problem space with a different (public) model.

## Author

**Vincent Nathanael** — BSc Computer Science with Artificial Intelligence, Coventry University. Portfolio: [vincentnathanael.vercel.app](https://vincentnathanael.vercel.app)
