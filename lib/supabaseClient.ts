import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 创建 Supabase 客户端（带有容错处理）
let supabase: SupabaseClient | null = null;

try {
    if (supabaseUrl && supabaseAnonKey &&
        supabaseUrl !== 'YOUR_SUPABASE_URL' &&
        supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
        console.log('✅ Supabase client initialized');
    } else {
        console.warn('⚠️ Supabase not configured. Running in offline mode.');
    }
} catch (error) {
    console.error('❌ Failed to initialize Supabase:', error);
}

export { supabase };
