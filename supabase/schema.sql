-- ============================================
-- Focus Hub Database Schema
-- ============================================

-- tasks 表：核心任务管理
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  completed boolean default false,
  priority text check (priority in ('High', 'Medium', 'Low')) default 'Medium',
  category text check (category in ('Work', 'Personal')) default 'Work',
  checked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- planned_tasks 表：日程计划
create table if not exists planned_tasks (
  id uuid default gen_random_uuid() primary key,
  time text not null,
  title text not null,
  duration text not null,
  type text check (type in ('default', 'focus')) default 'default',
  created_at timestamptz default now()
);

-- focus_logs 表：专注记录
create table if not exists focus_logs (
  id uuid default gen_random_uuid() primary key,
  time text not null,
  duration text not null,
  title text not null,
  percentage integer default 0,
  created_at timestamptz default now()
);

-- user_settings 表：用户设置
create table if not exists user_settings (
  id uuid default gen_random_uuid() primary key,
  language text default 'en',
  focus_duration integer default 25,
  short_break integer default 5,
  long_break integer default 15,
  long_break_interval integer default 4,
  auto_start_breaks boolean default true,
  auto_start_pomos boolean default false,
  timer_sound text default 'Simple Bell',
  elastic_streak boolean default true,
  language_tone text default 'Encouraging (Default)',
  updated_at timestamptz default now()
);

-- 索引优化
create index if not exists idx_tasks_created_at on tasks(created_at desc);
create index if not exists idx_planned_tasks_time on planned_tasks(time);
create index if not exists idx_focus_logs_created_at on focus_logs(created_at desc);
