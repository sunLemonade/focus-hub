-- ============================================
-- Fix RLS: Disable RLS for Public Access
-- 警告：这将允许任何拥有 Anon Key 的人读写数据
-- 仅适用于开发阶段或单用户应用
-- ============================================

-- 1. 临时禁用 RLS 以允许直接访问
alter table tasks disable row level security;
alter table planned_tasks disable row level security;
alter table focus_logs disable row level security;
alter table user_settings disable row level security;

-- 或者，如果必须开启 RLS，可以使用以下策略（取消注释使用）:

/*
alter table tasks enable row level security;
create policy "Allow all access" on tasks for all using (true) with check (true);

alter table planned_tasks enable row level security;
create policy "Allow all access" on planned_tasks for all using (true) with check (true);

alter table focus_logs enable row level security;
create policy "Allow all access" on focus_logs for all using (true) with check (true);

alter table user_settings enable row level security;
create policy "Allow all access" on user_settings for all using (true) with check (true);
*/
