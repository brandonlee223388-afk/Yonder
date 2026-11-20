// Grades one lab report with Claude. Runs on the server so no AI credentials reach the browser.
// Each student must be logged in and gets DAILY_GRADE_LIMIT grades a day.
//
// By default it goes through Vercel AI Gateway, which signs requests with the deployment's own
// OIDC token: no API key to manage, billed to the Vercel team's AI Gateway credits. If
// ANTHROPIC_API_KEY is set, it calls Anthropic directly with that key instead.
import Anthropic from "@anthropic-ai/sdk";
import { getVercelOidcToken } from "@vercel/oidc";
import { createClient } from "@supabase/supabase-js";
import { verifyToken } from "@clerk/backend";
import { SYSTEM_PROMPT, GRADE_SCHEMA, userMessage, normalizeResult } from "../lib/grading.js";

const MAX_REPORT_CHARS = 40000;
const MAX_RUBRIC_CHARS = 10000;
const DIRECT = Boolean(process.env.ANTHROPIC_API_KEY);
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
  } catch {
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
  if (countError) return res.status(500).json({ error: "Couldn't check your daily grades. Try again in a moment." });
  if (count >= limit) return res.status(429).json({ error: `You've used all ${limit} grades for today. Come back tomorrow.`, remaining: 0 });

  let response;
  try {
    const anthropic = await aiClient();
    response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: "medium", format: { type: "json_schema", schema: GRADE_SCHEMA } },
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userMessage(report, rubric) }]
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return res.status(503).json({ error: "The AI Grader is busy right now. Try again in a minute." });
    if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) return res.status(503).json({ error: "The AI Grader can't sign in to the AI service. Ask the Yonder team to check it." });
    if (error instanceof Anthropic.APIError && error.status === 402) return res.status(503).json({ error: "The AI Grader is out of credit for now. Ask the Yonder team to top it up." });
    if (error instanceof Anthropic.APIError) return res.status(502).json({ error: "The AI Grader had a problem. Try again in a moment." });
    return res.status(502).json({ error: "Couldn't reach the AI Grader. Try again in a moment." });
  }

  if (response.stop_reason === "refusal") return res.status(422).json({ error: "The AI couldn't grade this text. Check that it's your lab report and try again." });
  const text = response.content.find((block) => block.type === "text")?.text || "";
  let result = null;
  try { result = normalizeResult(JSON.parse(text), rubric ? "custom" : "builtin"); } catch { result = null; }
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
