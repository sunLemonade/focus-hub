import { supabase } from './supabaseClient';
import { Task, PlannedTask, LogEntry } from '../types';

// ============================================
// 用户设置类型
// ============================================
export interface UserSettings {
    id?: string;
    language: 'en' | 'zh';
    focus_duration: number;
    short_break: number;
    long_break: number;
    long_break_interval: number;
    auto_start_breaks: boolean;
    auto_start_pomos: boolean;
    timer_sound: string;
    elastic_streak: boolean;
    language_tone: string;
}

// 检查 Supabase 是否可用
const isSupabaseAvailable = () => supabase !== null;

// ============================================
// Tasks API
// ============================================
export const tasksApi = {
    async getAll(): Promise<Task[]> {
        if (!isSupabaseAvailable()) {
            console.log('📴 Supabase offline - returning empty tasks');
            return [];
        }
        try {
            const { data, error } = await supabase!
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching tasks:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('Tasks API error:', e);
            return [];
        }
    },

    async create(task: Omit<Task, 'id'>): Promise<Task | null> {
        if (!isSupabaseAvailable()) {
            console.log('📴 Supabase offline - task not saved');
            return null;
        }
        try {
            const { data, error } = await supabase!
                .from('tasks')
                .insert([task])
                .select()
                .single();

            if (error) {
                console.error('Error creating task:', error);
                return null;
            }
            return data;
        } catch (e) {
            console.error('Tasks API error:', e);
            return null;
        }
    },

    async update(id: string, updates: Partial<Task>): Promise<Task | null> {
        if (!isSupabaseAvailable()) {
            console.log('📴 Supabase offline - task not updated');
            return null;
        }
        try {
            const { data, error } = await supabase!
                .from('tasks')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating task:', error);
                return null;
            }
            return data;
        } catch (e) {
            console.error('Tasks API error:', e);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!isSupabaseAvailable()) {
            console.log('📴 Supabase offline - task not deleted from server');
            return true; // Return true to allow local deletion
        }
        try {
            const { error } = await supabase!
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting task:', error);
                return false;
            }
            return true;
        } catch (e) {
            console.error('Tasks API error:', e);
            return false;
        }
    }
};

// ============================================
// Planned Tasks API
// ============================================
export const plannedTasksApi = {
    async getAll(): Promise<PlannedTask[]> {
        if (!isSupabaseAvailable()) return [];
        try {
            const { data, error } = await supabase!
                .from('planned_tasks')
                .select('*')
                .order('time', { ascending: true });

            if (error) {
                console.error('Error fetching planned tasks:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('PlannedTasks API error:', e);
            return [];
        }
    },

    async create(task: Omit<PlannedTask, 'id'>): Promise<PlannedTask | null> {
        if (!isSupabaseAvailable()) return null;
        try {
            const { data, error } = await supabase!
                .from('planned_tasks')
                .insert([task])
                .select()
                .single();

            if (error) {
                console.error('Error creating planned task:', error);
                return null;
            }
            return data;
        } catch (e) {
            console.error('PlannedTasks API error:', e);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        if (!isSupabaseAvailable()) return true;
        try {
            const { error } = await supabase!
                .from('planned_tasks')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting planned task:', error);
                return false;
            }
            return true;
        } catch (e) {
            console.error('PlannedTasks API error:', e);
            return false;
        }
    }
};

// ============================================
// Focus Logs API
// ============================================
export const focusLogsApi = {
    async getAll(): Promise<LogEntry[]> {
        if (!isSupabaseAvailable()) return [];
        try {
            const { data, error } = await supabase!
                .from('focus_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error('Error fetching focus logs:', error);
                return [];
            }
            return data || [];
        } catch (e) {
            console.error('FocusLogs API error:', e);
            return [];
        }
    },

    async create(log: Omit<LogEntry, 'id'>): Promise<LogEntry | null> {
        if (!isSupabaseAvailable()) return null;
        try {
            const { data, error } = await supabase!
                .from('focus_logs')
                .insert([log])
                .select()
                .single();

            if (error) {
                console.error('Error creating focus log:', error);
                return null;
            }
            return data;
        } catch (e) {
            console.error('FocusLogs API error:', e);
            return null;
        }
    }
};

// ============================================
// User Settings API
// ============================================
export const settingsApi = {
    async get(): Promise<UserSettings | null> {
        if (!isSupabaseAvailable()) return null;
        try {
            const { data, error } = await supabase!
                .from('user_settings')
                .select('*')
                .limit(1)
                .single();

            if (error) {
                // 如果没有设置记录，返回默认值
                if (error.code === 'PGRST116') {
                    return null;
                }
                console.error('Error fetching settings:', error);
                return null;
            }
            return data;
        } catch (e) {
            console.error('Settings API error:', e);
            return null;
        }
    },

    async upsert(settings: Partial<UserSettings>): Promise<UserSettings | null> {
        if (!isSupabaseAvailable()) return null;
        try {
            // 首先尝试获取现有设置
            const existing = await this.get();

            if (existing) {
                // 更新现有记录
                const { data, error } = await supabase!
                    .from('user_settings')
                    .update({ ...settings, updated_at: new Date().toISOString() })
                    .eq('id', existing.id)
                    .select()
                    .single();

                if (error) {
                    console.error('Error updating settings:', error);
                    return null;
                }
                return data;
            } else {
                // 创建新记录
                const { data, error } = await supabase!
                    .from('user_settings')
                    .insert([settings])
                    .select()
                    .single();

                if (error) {
                    console.error('Error creating settings:', error);
                    return null;
                }
                return data;
            }
        } catch (e) {
            console.error('Settings API error:', e);
            return null;
        }
    }
};
