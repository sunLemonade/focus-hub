import React, { useState, useRef, useEffect } from 'react';
import { Task, PlannedTask, LogEntry, Language } from '../types';
import { translations } from '../translations';
import { plannedTasksApi, focusLogsApi, tasksApi } from '../lib/api';

interface DashboardProps {
    triggerClassification: () => void;
    language: Language;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    onStartFocus: (task: Task) => void;
    activeTaskId?: string;
    isTimerRunning: boolean;
    onUpdateTaskTitle: (id: string, newTitle: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
    triggerClassification,
    language,
    tasks,
    setTasks,
    onStartFocus,
    activeTaskId,
    isTimerRunning,
    onUpdateTaskTitle
}) => {
    const t = translations[language].dashboard;
    const inputRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    // Local state for dashboard-specific views
    const [planned, setPlanned] = useState<PlannedTask[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const [filter, setFilter] = useState<'All' | 'Work' | 'Personal'>('All');
    const [inputValue, setInputValue] = useState('');
    const [rightTab, setRightTab] = useState<'planned' | 'logs'>('planned');

    // Inline Edit State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    // 加载 planned tasks 和 focus logs
    useEffect(() => {
        const loadData = async () => {
            try {
                const [plannedData, logsData] = await Promise.all([
                    plannedTasksApi.getAll(),
                    focusLogsApi.getAll()
                ]);

                if (plannedData.length > 0) {
                    setPlanned(plannedData);
                } else {
                    // 使用默认示例数据
                    setPlanned([
                        { id: 'p1', time: '09:00', title: t.mockPlanned.p1, duration: '30m', type: 'default' },
                        { id: 'p2', time: '09:30', title: t.mockPlanned.p2, duration: '2h 00m', type: 'focus' },
                        { id: 'p3', time: '11:30', title: t.mockPlanned.p3, duration: '1h', type: 'default' },
                    ]);
                }

                if (logsData.length > 0) {
                    setLogs(logsData);
                } else {
                    // 使用默认示例数据
                    setLogs([
                        { time: '08:45', duration: '+15m', title: t.mockLogs.l1, percentage: 30 },
                        { time: '09:15', duration: '+25m', title: t.mockLogs.l2, percentage: 100 },
                        { time: '09:45', duration: '+25m', title: t.mockLogs.l2, percentage: 100 },
                    ]);
                }
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                // 使用默认数据
                setPlanned([
                    { id: 'p1', time: '09:00', title: t.mockPlanned.p1, duration: '30m', type: 'default' },
                    { id: 'p2', time: '09:30', title: t.mockPlanned.p2, duration: '2h 00m', type: 'focus' },
                    { id: 'p3', time: '11:30', title: t.mockPlanned.p3, duration: '1h', type: 'default' },
                ]);
                setLogs([
                    { time: '08:45', duration: '+15m', title: t.mockLogs.l1, percentage: 30 },
                    { time: '09:15', duration: '+25m', title: t.mockLogs.l2, percentage: 100 },
                    { time: '09:45', duration: '+25m', title: t.mockLogs.l2, percentage: 100 },
                ]);
            }
        };
        loadData();
    }, [t]);

    const handleAddTask = async () => {
        if (!inputValue.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: inputValue,
            completed: false,
            priority: 'Medium',
            category: 'Work',
            checked: false
        };
        setTasks([newTask, ...tasks]);
        setInputValue('');
        // 同步到后端
        await tasksApi.create({
            title: inputValue,
            completed: false,
            priority: 'Medium',
            category: 'Work',
            checked: false
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    // --- Inline Editing Handlers ---
    const startEditing = (task: Task) => {
        setEditingId(task.id);
        setEditValue(task.title);
    };

    useEffect(() => {
        if (editingId && editInputRef.current) {
            editInputRef.current.focus();
            // Optional: Move cursor to end
            const val = editInputRef.current.value;
            editInputRef.current.setSelectionRange(val.length, val.length);
        }
    }, [editingId]);

    const saveEdit = () => {
        if (editingId && editValue.trim()) {
            onUpdateTaskTitle(editingId, editValue);
        }
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    const toggleTask = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        const newChecked = !task.checked;
        const newCompleted = !task.completed;
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, checked: newChecked, completed: newCompleted } : t
        ));
        // 同步到后端
        await tasksApi.update(id, { checked: newChecked, completed: newCompleted });
    };

    const addToPlan = async (task: Task) => {
        const newPlan: PlannedTask = {
            id: `p-${Date.now()}`,
            time: '12:00',
            title: task.title,
            duration: '30m',
            type: 'focus'
        };
        setPlanned([...planned, newPlan]);
        setRightTab('planned');
        // 同步到后端
        await plannedTasksApi.create({
            time: '12:00',
            title: task.title,
            duration: '30m',
            type: 'focus'
        });
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.category === filter;
    });

    const PriorityBadge = ({ priority }: { priority: string }) => {
        let colors = '';
        switch (priority) {
            case 'High': colors = 'bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20'; break;
            case 'Medium': colors = 'bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20'; break;
            case 'Low': colors = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'; break;
        }
        const localizedPriority = language === 'zh' ?
            (priority === 'High' ? '高' : priority === 'Medium' ? '中' : '低') + '优先级' :
            `${priority} Priority`;

        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${colors}`}>
                {localizedPriority}
            </span>
        );
    };

    return (
        <div className="flex h-full gap-6 overflow-hidden">
            <main className="flex-1 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
                {/* Decorative top gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-80"></div>

                <header className="px-10 pt-10 pb-2">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-display font-bold dark:text-white tracking-tight text-slate-900">{t.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{t.subtitle}</p>
                        </div>
                        <div className="flex bg-slate-100 dark:bg-black/20 p-1 rounded-lg">
                            {(['All', 'Work', 'Personal'] as const).map((f) => {
                                const label = f === 'All' ? t.allTasks : f === 'Work' ? t.work : t.personal;
                                const isActive = filter === f;
                                return (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`text-xs font-bold px-4 py-1.5 rounded-md transition-all ${isActive ? 'bg-white dark:bg-surface-darker text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Floating Input Bar */}
                    <div className="relative group z-20 mb-4 transform transition-all duration-300 hover:-translate-y-0.5">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center bg-white dark:bg-surface-darker border border-slate-200 dark:border-white/10 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden">
                            <div className="pl-5 pr-3 text-slate-400">
                                <span className="material-symbols-outlined text-2xl">add_circle</span>
                            </div>
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-transparent border-none text-slate-900 dark:text-white text-base font-medium placeholder-slate-400 focus:ring-0 py-4"
                                placeholder={t.inputPlaceholder}
                                type="text"
                            />
                            <div className="pr-4">
                                <span className="text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">ENTER</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-10 pb-10 no-scrollbar">
                    <div className="flex flex-col gap-3">
                        {filteredTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-4xl opacity-50">task_alt</span>
                                </div>
                                <p className="text-base font-medium">All clear for now.</p>
                                <p className="text-sm opacity-70">Enjoy the silence or add a new mission.</p>
                            </div>
                        ) : filteredTasks.map((task) => {
                            const isActive = task.id === activeTaskId;
                            return (
                                <div
                                    key={task.id}
                                    className={`group relative flex items-center p-4 rounded-xl border transition-all duration-300 ${isActive ? 'bg-primary/[0.03] border-primary/40 shadow-[0_0_15px_rgba(19,200,236,0.1)]' : 'bg-white dark:bg-white/[0.02] border-slate-100 dark:border-white/5 shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5'}`}
                                >
                                    {isActive && <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-l-xl"></div>}

                                    <label className="flex items-center gap-5 cursor-pointer flex-1 min-w-0 select-none z-10">
                                        <div className="relative flex items-center shrink-0 group/check">
                                            <input
                                                type="checkbox"
                                                checked={!!task.checked}
                                                onChange={() => toggleTask(task.id)}
                                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-slate-300 dark:border-slate-600 bg-transparent checked:border-primary checked:bg-primary transition-all duration-300"
                                            />
                                            <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-white opacity-0 peer-checked:opacity-100 font-bold pointer-events-none transition-opacity duration-300 scale-50 peer-checked:scale-100 transform">check</span>
                                            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover/check:opacity-100 scale-150 transition-all duration-300 -z-10"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {editingId === task.id ? (
                                                <input
                                                    ref={editInputRef}
                                                    type="text"
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    onBlur={saveEdit}
                                                    onKeyDown={handleEditKeyDown}
                                                    className="w-full bg-transparent border-b-2 border-primary text-slate-900 dark:text-white text-base font-medium px-0 py-1 focus:outline-none focus:ring-0 placeholder-slate-400"
                                                    placeholder="Task title..."
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 group/title">
                                                    <p className={`text-base font-medium truncate transition-all duration-300 ${task.checked ? 'line-through text-slate-400 decoration-slate-300' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                                        {task.title}
                                                    </p>
                                                    {!task.checked && (
                                                        <button
                                                            onClick={(e) => { e.preventDefault(); startEditing(task); }}
                                                            className="opacity-0 group-hover/title:opacity-100 text-slate-400 hover:text-primary transition-all p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded"
                                                            title="Rename Task (Click to edit)"
                                                        >
                                                            <span className="material-symbols-outlined text-[16px]">edit</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <PriorityBadge priority={task.priority} />
                                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{task.category}</span>
                                            </div>
                                        </div>
                                    </label>

                                    <div className="flex items-center gap-2 pl-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                                        {!task.checked ? (
                                            <>
                                                <button onClick={(e) => { e.preventDefault(); triggerClassification(); }} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all" title="AI Deconstruct">
                                                    <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                                                </button>
                                                <button
                                                    onClick={() => addToPlan(task)}
                                                    className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                                    title="Add to Plan"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                                                </button>
                                                <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
                                                <button
                                                    onClick={() => onStartFocus(task)}
                                                    className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all shadow-sm ${isActive ? 'bg-primary text-white shadow-primary/30 hover:bg-primary/90' : 'bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-primary hover:bg-primary/10'}`}
                                                    title={isActive && isTimerRunning ? "Pause" : "Start Focus"}
                                                >
                                                    <span className="material-symbols-outlined text-[22px] fill-1">
                                                        {isActive && isTimerRunning ? 'pause' : 'play_arrow'}
                                                    </span>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={async () => {
                                                    setTasks(tasks.filter(t => t.id !== task.id));
                                                    await tasksApi.delete(task.id);
                                                }}
                                                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                title="Delete Task"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <aside className="w-[380px] flex-shrink-0 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <button
                        onClick={() => setRightTab('planned')}
                        className={`p-4 relative transition-all ${rightTab === 'planned' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <div className="flex items-center gap-2 justify-center">
                            <span className={`material-symbols-outlined text-sm ${rightTab === 'planned' ? 'text-primary' : ''}`}>calendar_today</span>
                            <h3 className="text-xs font-bold uppercase tracking-wider">{t.planned}</h3>
                        </div>
                        {rightTab === 'planned' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
                    </button>
                    <button
                        onClick={() => setRightTab('logs')}
                        className={`p-4 relative transition-all ${rightTab === 'logs' ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <div className="flex items-center gap-2 justify-center">
                            <span className={`material-symbols-outlined text-sm ${rightTab === 'logs' ? 'text-emerald-400' : ''}`}>history</span>
                            <h3 className="text-xs font-bold uppercase tracking-wider">{t.focusLogs}</h3>
                        </div>
                        {rightTab === 'logs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>}
                    </button>
                </div>

                <div className="flex-1 overflow-hidden relative bg-slate-50/30 dark:bg-transparent">
                    {/* Planned View */}
                    <div className={`absolute inset-0 overflow-y-auto no-scrollbar p-6 space-y-4 transition-opacity duration-300 ${rightTab === 'planned' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.todaysBucket}</span>
                            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1 ml-4"></div>
                        </div>

                        {/* Timeline Connector */}
                        <div className="relative space-y-4">
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-white/5 -z-10"></div>

                            {planned.map((item, idx) => (
                                <div key={item.id} className={`relative pl-8 group cursor-move transition-transform active:scale-98`}>
                                    {/* Timeline Dot */}
                                    <div className={`absolute left-[14px] top-3.5 w-3 h-3 rounded-full border-2 border-white dark:border-surface-dark z-10 ${item.type === 'focus' ? 'bg-primary box-content ring-2 ring-primary/20' : 'bg-slate-300 dark:bg-slate-600'}`}></div>

                                    <div className={`p-4 rounded-xl border shadow-sm transition-all ${item.type === 'focus' ? 'bg-white dark:bg-surface-darker border-primary/30 shadow-primary/5' : 'bg-white dark:bg-surface-darker border-slate-100 dark:border-white/5'}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-[10px] font-bold tracking-wide ${item.type === 'focus' ? 'text-primary' : 'text-slate-400'}`}>{item.time}</span>
                                            <button
                                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all transform scale-75"
                                                onClick={async () => {
                                                    setPlanned(planned.filter(p => p.id !== item.id));
                                                    await plannedTasksApi.delete(item.id);
                                                }}
                                            >
                                                <span className="material-symbols-outlined">close</span>
                                            </button>
                                        </div>
                                        <p className={`text-sm ${item.type === 'focus' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{item.title}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${item.type === 'focus' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>
                                                <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                {item.duration}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-2 border-dashed border-slate-200 dark:border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.02] transition-all cursor-pointer group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                            <span className="text-xs font-bold">{t.dragTask}</span>
                        </div>
                    </div>

                    {/* Logs View */}
                    <div className={`absolute inset-0 overflow-y-auto no-scrollbar p-6 space-y-4 transition-opacity duration-300 ${rightTab === 'logs' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.sessionHistory}</span>
                            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1 ml-4"></div>
                        </div>
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-surface-darker border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all group">
                                <div className="flex flex-col items-center gap-1 min-w-[40px]">
                                    <span className="text-xs font-bold text-slate-500">{log.time}</span>
                                    <div className="h-8 w-0.5 bg-slate-100 dark:bg-white/5 group-last:hidden"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{log.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{log.duration}</span>
                                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${log.percentage}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};