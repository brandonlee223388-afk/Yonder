# Yonder

A step-by-step guide to writing a science fair lab report, with student accounts, saved progress
and an AI Grader (percent grade plus IB MYP Years 2–3 criteria A–D).

- `public/` – the website (HTML, CSS, JavaScript). No build step.
- `api/config.js` – hands the page its public Supabase settings.
- `api/grade.js` – grades a report with Claude on the server, so the API key stays secret.
- `lib/grading.js` – the grading instructions and the MYP rubric.
- `supabase/schema.sql` – the database tables and their privacy rules.

## Setup

1. **Supabase** – create a project, open **SQL Editor**, paste in `supabase/schema.sql` and run it.
   Under **Authentication → URL Configuration**, set the Site URL to your Vercel address.
2. **Vercel** – import this GitHub repo (framework preset: Other). Under **Settings → Environment
   Variables**, add:

   | Name | Where to find it |
   |---|---|
   | `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
   | `SUPABASE_ANON_KEY` | Supabase → Project Settings → API → the public anon / publishable key |
   | `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys (keep this secret) |
   | `DAILY_GRADE_LIMIT` | Optional. Grades each student gets per day (default 5) |

3. Redeploy. Students sign up on the dashboard and confirm their email.

Feedback from the Contact page lands in the `feedback` table in Supabase (Table Editor).
Never put keys in the code: they only go in Vercel's settings.
