export type ViewState = 'dashboard' | 'analytics' | 'settings';
export type Language = 'en' | 'zh';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'High' | 'Medium' | 'Low';
    category: 'Work' | 'Personal';
    checked?: boolean;
}

export interface PlannedTask {
    id: string;
    time: string;
    title: string;
    duration: string;
    type: 'default' | 'focus';
}

export interface LogEntry {
    time: string;
    duration: string;
    title: string;
    percentage: number;
}
