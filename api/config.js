// Public settings the page needs at startup. The Supabase anon key and Clerk publishable key are
// safe to share with browsers; the database's row-level security rules decide what each student can do.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY || "",
    dailyLimit: Number(process.env.DAILY_GRADE_LIMIT) || 5
  });
}
