import { NextResponse } from "next/server";

const DEFAULT_MODEL = "hamzab/roberta-fake-news-classification";

type HfClassifierResult = { label: string; score: number };

function normaliseLabel(label: string): "FAKE" | "REAL" {
  const l = label.toUpperCase();
  if (l === "FAKE" || l === "LABEL_0" || l === "FALSE") return "FAKE";
  if (l === "REAL" || l === "LABEL_1" || l === "TRUE") return "REAL";
  return l.includes("FAKE") || l.includes("FALSE") ? "FAKE" : "REAL";
}

export async function POST(request: Request) {
  const token = process.env.HF_API_TOKEN;
  const model = process.env.HF_MODEL || DEFAULT_MODEL;

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Server is missing HF_API_TOKEN." },
      { status: 500 },
    );
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const text = (body.text ?? "").trim();
  if (!text) {
    return NextResponse.json(
      { ok: false, error: "Please paste some text first." },
      { status: 400 },
    );
  }
  if (text.length > 2000) {
    return NextResponse.json(
      { ok: false, error: "Text must be 2000 characters or fewer." },
      { status: 400 },
    );
  }

  const hfRes = await fetch(
    `https://router.huggingface.co/hf-inference/models/${model}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: false } }),
    },
  );

  if (hfRes.status === 503) {
    const data = await hfRes.json().catch(() => ({}));
    const retryAfter = Math.ceil(data?.estimated_time ?? 20);
    return NextResponse.json(
      {
        ok: false,
        warming: true,
        retryAfter,
        error: "The model is spinning up on Hugging Face's free tier.",
      },
      { status: 503 },
    );
  }

  if (!hfRes.ok) {
    const detail = await hfRes.text().catch(() => "");
    return NextResponse.json(
      {
        ok: false,
        error: `Inference failed (${hfRes.status}). ${detail.slice(0, 200)}`,
      },
      { status: 502 },
    );
  }

  const raw = (await hfRes.json()) as HfClassifierResult[] | HfClassifierResult[][];
  const flat: HfClassifierResult[] = Array.isArray(raw[0])
    ? (raw as HfClassifierResult[][])[0]
    : (raw as HfClassifierResult[]);

  if (!flat || flat.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Empty response from inference endpoint." },
      { status: 502 },
    );
  }

  const top = flat.reduce((a, b) => (b.score > a.score ? b : a));
  const label = normaliseLabel(top.label);

  return NextResponse.json({
    ok: true,
    label,
    score: top.score,
    model,
  });
}
