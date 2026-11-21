// Grades one lab report with Claude. Runs on the server so no AI credentials reach the browser.
// Each student must be logged in and gets DAILY_GRADE_LIMIT grades a day.
//
// Which AI grades, in order of preference:
//   ANTHROPIC_API_KEY set -> Claude, called directly with that key.
//   GEMINI_API_KEY set    -> Google Gemini (free tier from aistudio.google.com; GEMINI_MODEL picks the model).
//   neither               -> Claude through Vercel AI Gateway, signed with the deployment's OIDC token.
import Anthropic from "@anthropic-ai/sdk";
import { getVercelOidcToken } from "@vercel/oidc";
import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@clerk/backend";
import { SYSTEM_PROMPT, GRADE_SCHEMA, GRADE_SHAPE, userMessage, normalizeResult } from "../lib/grading.js";

const MAX_REPORT_CHARS = 40000;
const MAX_RUBRIC_CHARS = 10000;
const DIRECT = Boolean(process.env.ANTHROPIC_API_KEY);
const GEMINI = !DIRECT && Boolean(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Returns the grade as parsed JSON, or { error, status } for the student.
export async function gradeWithGemini(report, rubric) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\n\n${GRADE_SHAPE}` }] },
      contents: [{ role: "user", parts: [{ text: userMessage(report, rubric) }] }],
      generationConfig: { responseMimeType: "application/json", maxOutputTokens: 16000 }
    })
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("grade: Gemini request failed:", res.status, body?.error?.status, body?.error?.message);
    if (res.status === 429) return { status: 503, error: "The free AI limit is used up for now. Try again in a few minutes, or tomorrow." };
    if (res.status === 400 || res.status === 401 || res.status === 403) return { status: 503, error: "The AI Grader can't sign in to Gemini. Ask the Yonder team to check the Gemini key." };
    if (res.status === 404) return { status: 503, error: "The AI Grader's Gemini model isn't available. Ask the Yonder team to check GEMINI_MODEL." };
    return { status: 502, error: "The AI Grader had a problem. Try again in a moment." };
  }
  const candidate = body.candidates?.[0];
  if (body.promptFeedback?.blockReason || candidate?.finishReason === "SAFETY") {
    return { status: 422, error: "The AI couldn't grade this text. Check that it's your lab report and try again." };
  }
  const text = (candidate?.content?.parts || []).map((p) => p.text || "").join("").trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
  try { return { json: JSON.parse(text) }; } catch { return { status: 502, error: "The grade came back incomplete. Press Grade again." }; }
}
// Claude Haiku 5.5: fast and about 0.2 cents a grade. Override with GRADER_MODEL.
const MODEL = process.env.GRADER_MODEL || (DIRECT ? "claude-haiku-5-5" : "anthropic/claude-haiku-5.5");

async function aiClient() {
  if (DIRECT) return new Anthropic();
  return new Anthropic({ apiKey: process.env.AI_GATEWAY_API_KEY || await getVercelOidcToken(), baseURL: "https://ai-gateway.vercel.sh" });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  if (!process.env.CLERK_SECRET_KEY || !process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(503).json({ error: "The AI Grader isn't set up yet. Ask the Yonder team to finish the setup." });
  }

  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "Log in to grade your report." });

  try {
    await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
  } catch (error) {
    console.warn("grade: Clerk token rejected:", error?.reason || error?.message);
    return res.status(401).json({ error: "Your login expired. Log in again, then grade." });
  }

  // A Supabase client acting as this student (Supabase trusts Clerk's token), so the database rules apply.
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    accessToken: async () => token
  });

  const report = String(req.body?.report || "").trim();
  const rubric = String(req.body?.rubric || "").trim();
  const words = report ? report.split(/\s+/).length : 0;
  if (words < 30) return res.status(400).json({ error: "Paste more of your report so there's enough to grade." });
  if (report.length > MAX_REPORT_CHARS) return res.status(413).json({ error: "This report is too long. Grade one section at a time." });
  if (rubric.length > MAX_RUBRIC_CHARS) return res.status(413).json({ error: "The teacher's rubric is too long. Paste just the grading criteria." });

  const limit = Number(process.env.DAILY_GRADE_LIMIT) || 5;
  const startOfDay = new Date(); startOfDay.setUTCHours(0, 0, 0, 0);
  const { count, error: countError } = await supabase
    .from("grades").select("id", { count: "exact", head: true }).gte("created_at", startOfDay.toISOString());
  if (countError) console.error("grade: daily-limit check failed:", countError.message);
  if (countError) return res.status(500).json({ error: "Couldn't check your daily grades. Try again in a moment." });
  if (count >= limit) return res.status(429).json({ error: `You've used all ${limit} grades for today. Come back tomorrow.`, remaining: 0 });

  let parsed = null;
  if (GEMINI) {
    const out = await gradeWithGemini(report, rubric);
    if (out.error) return res.status(out.status).json({ error: out.error });
    parsed = out.json;
  }

  let response;
  if (!GEMINI) try {
    const anthropic = await aiClient();
    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: "medium", format: { type: "json_schema", schema: GRADE_SCHEMA } },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userMessage(report, rubric) }]
    });
  } catch (error) {
    console.error("grade: AI request failed:", error?.status, error?.message);
    if (error instanceof Anthropic.RateLimitError) return res.status(503).json({ error: "The AI Grader is busy right now. Try again in a minute." });
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) return res.status(503).json({ error: "The AI Grader can't sign in to the AI service. Ask the Yonder team to check it." });
    if (error instanceof Anthropic.APIError && error.status === 402) return res.status(503).json({ error: "The AI Grader is out of credit for now. Ask the Yonder team to top it up." });
    if (error instanceof Anthropic.APIError) return res.status(502).json({ error: "The AI Grader had a problem. Try again in a moment." });
    return res.status(502).json({ error: "Couldn't reach the AI Grader. Try again in a moment." });
  }

  if (!GEMINI) {
    if (response.stop_reason === "refusal") return res.status(422).json({ error: "The AI couldn't grade this text. Check that it's your lab report and try again." });
    const text = response.content.find((block) => block.type === "text")?.text || "";
    try { parsed = JSON.parse(text); } catch { parsed = null; }
  }
  const result = normalizeResult(parsed, rubric ? "custom" : "builtin");
  if (!result) return res.status(502).json({ error: "The grade came back incomplete. Press Grade again." });

  const earned = result.rubric.reduce((n, c) => n + c.earned, 0);
  const possible = result.rubric.reduce((n, c) => n + c.possible, 0) || 1;
  await supabase.from("grades").insert({
    percent: Math.round(earned / possible * 100),
    ib_total: result.ib.reduce((n, c) => n + c.mark, 0),
    words
  });

  return res.status(200).json({ result, remaining: Math.max(0, limit - count - 1) });
}
