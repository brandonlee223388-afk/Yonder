-- Yonder database. Run once in the Supabase SQL editor (or with the Supabase connector).
-- Row-level security makes every table private to the student who owns the row.

-- Each student's checkpoints, checklist ticks and last-visited part.
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  done       text[]      not null default '{}',
  checklist  int[]       not null default '{}',
  last_step  int         not null default 1,
  last_part  int         not null default 1,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
create policy "Students read their own progress"   on public.progress for select using ((select auth.uid()) = user_id);
create policy "Students create their own progress" on public.progress for insert with check ((select auth.uid()) = user_id);
create policy "Students update their own progress" on public.progress for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Messages from the Contact page. Students can send but not read them; the team reads them in the Supabase dashboard.
create table if not exists public.feedback (
  id         bigint generated always as identity primary key,
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  topic      text        not null check (topic in ('Question', 'Something''s wrong', 'Idea')),
  message    text        not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
create policy "Students send feedback" on public.feedback for insert with check ((select auth.uid()) = user_id);

-- One row per AI grade, used for the daily limit. Students can't delete rows, so they can't reset it.
create table if not exists public.grades (
  id         bigint generated always as identity primary key,
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  percent    int,
  ib_total   int,
  words      int,
  created_at timestamptz not null default now()
);
alter table public.grades enable row level security;
create policy "Students read their own grades"   on public.grades for select using ((select auth.uid()) = user_id);
create policy "Students record their own grades" on public.grades for insert with check ((select auth.uid()) = user_id);
create index if not exists grades_user_day on public.grades (user_id, created_at);
