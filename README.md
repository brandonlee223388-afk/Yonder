# Yonder

A step-by-step guide to writing a science fair lab report, with student accounts (Clerk), saved progress
and an AI Grader (percent grade plus IB MYP Years 2–3 criteria A–D).

- `public/` – the website (HTML, CSS, JavaScript). No build step.
- `api/config.js` – hands the page its public Clerk and Supabase settings.
- `api/grade.js` – grades a report with Claude (through Vercel AI Gateway) on the server.
- `lib/grading.js` – the grading instructions and the MYP rubric.
- `supabase/schema.sql` – the database tables and their privacy rules.

## Setup

1. **Clerk** (logins) – in your Clerk app, turn on the sign-in methods you want (email, Google, …).
   Open **dashboard.clerk.com/setup/supabase** and turn on the Supabase connection, then copy the
   Clerk domain it shows.
2. **Supabase** (database) – create a project. Under **Authentication → Third-party auth**, add
   **Clerk** and paste that domain. Then open **SQL Editor**, paste in `supabase/schema.sql` and run it.
3. **Vercel** (hosting) – import this GitHub repo (framework preset: Other). Under
   **Settings → Environment Variables**, add:

   | Name | Where to find it |
   |---|---|
   | `CLERK_PUBLISHABLE_KEY` | Clerk → Configure → API keys → Publishable key (`pk_…`) |
   | `CLERK_SECRET_KEY` | Clerk → Configure → API keys → Secret key (`sk_…`, keep this secret) |
   | `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
   | `SUPABASE_ANON_KEY` | Supabase → Project Settings → API → the public anon / publishable key |
   | `ANTHROPIC_API_KEY` | Optional. Only if you'd rather pay Anthropic directly (console.anthropic.com → API Keys) |
   | `GRADER_MODEL` | Optional. Defaults to Claude Haiku 5.5 |
   | `GEMINI_API_KEY` | Free option: aistudio.google.com → Get API key (keep this secret). When set, grading uses Gemini |
   | `GEMINI_MODEL` | Optional. Defaults to `gemini-2.5-flash` |
   | `DAILY_GRADE_LIMIT` | Optional. Grades each student gets per day (default 5) |

4. The AI Grader runs through **Vercel AI Gateway** with no key to set up: Vercel signs the
   requests itself and uses the team's AI Gateway credits (see the **AI Gateway** tab in Vercel).
   Each grade costs about 0.2¢ on Claude Haiku 5.5.
5. Redeploy. When you move Clerk to production, add your Vercel address as the app's domain in Clerk.

Feedback from the Contact page lands in the `feedback` table in Supabase (Table Editor).
Never put keys in the code: they only go in Vercel's settings.
