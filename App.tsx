import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { BrainDumpModal, ElasticModeModal, ClassificationModal } from './components/Modals';
import { ViewState, Language, Task } from './types';
import { tasksApi, settingsApi } from './lib/api';

function App() {
    const [currentView, setCurrentView] = useState<ViewState>('dashboard');
    const [language, setLanguage] = useState<Language>('en');
    const [showBrainDump, setShowBrainDump] = useState(false);
    const [showElasticMode, setShowElasticMode] = useState(false);
    const [showClassification, setShowClassification] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // --- Global Data State ---
    const [tasks, setTasks] = useState<Task[]>([]);

    // Timer Settings
    const [focusDuration, setFocusDuration] = useState(25);

    // Active Focus Context
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // --- Load Data on Mount ---
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // 加载任务
                const loadedTasks = await tasksApi.getAll();
                if (loadedTasks.length > 0) {
                    setTasks(loadedTasks);
                } else {
                    // 如果没有数据，使用默认示例数据
                    const defaultTasks: Task[] = [
                        { id: '1', title: "Finalize Q3 Design System", completed: false, priority: 'High', category: 'Work' },
                        { id: '2', title: "Reply to Sarah's email", completed: false, priority: 'Medium', category: 'Work' },
                        { id: '3', title: "Walk the dog", completed: false, priority: 'Low', category: 'Personal' },
                    ];
                    setTasks(defaultTasks);
                }

                // 加载设置
                const settings = await settingsApi.get();
                if (settings) {
                    setLanguage(settings.language as Language);
                    setFocusDuration(settings.focus_duration);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // --- Persist Settings Changes ---
    const handleLanguageChange = useCallback(async (lang: Language) => {
        setLanguage(lang);
        await settingsApi.upsert({ language: lang });
    }, []);

    const handleFocusDurationChange = useCallback(async (duration: number) => {
        setFocusDuration(duration);
        await settingsApi.upsert({ focus_duration: duration });
    }, []);

    // --- Actions ---
    const handleAddTask = async (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            priority: 'Medium',
            category: 'Work',
            checked: false
        };
        setTasks(prev => [newTask, ...prev]);
        // 同步到后端
        await tasksApi.create({
            title,
            completed: false,
            priority: 'Medium',
            category: 'Work',
            checked: false
        });
    };

    const handleUpdateTaskTitle = async (id: string, newTitle: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t));
        await tasksApi.update(id, { title: newTitle });
    };

    const handleStartFocus = (task: Task) => {
        // If clicking the same active task, toggle the timer
        if (activeTask?.id === task.id) {
            setIsTimerRunning(!isTimerRunning);
        } else {
            // New task: Switch context and auto-start
            setActiveTask(task);
            setIsTimerRunning(true);
        }
    };

    const handleStopFocus = () => {
        setIsTimerRunning(false);
        setActiveTask(null);
    };

    // Demonstration triggers
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowElasticMode(true);
        }, 30000); // Delayed trigger
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden flex relative">
            {/* Brain Dump FAB */}
            <button
                onClick={() => setShowBrainDump(true)}
                className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg flex items-center justify-center animate-pulse-glow hover:scale-105 transition-transform group"
                title={language === 'en' ? "Brain Dump" : "灵感收集"}
            >
                <span className="material-symbols-outlined text-3xl">lightbulb</span>
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-surface-dark dark:border-background-dark"></span>
            </button>

            {/* Main Layout */}
            <div className="flex h-full w-full max-w-[1600px] mx-auto p-4 gap-4">
                <Sidebar
                    currentView={currentView}
                    onChangeView={setCurrentView}
                    language={language}
                    activeTask={activeTask}
                    focusDuration={focusDuration}
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                    onStopFocus={handleStopFocus}
                />

                {currentView === 'dashboard' && (
                    <Dashboard
                        triggerClassification={() => setShowClassification(true)}
                        language={language}
                        tasks={tasks}
                        setTasks={setTasks}
                        onStartFocus={handleStartFocus}
                        activeTaskId={activeTask?.id}
                        isTimerRunning={isTimerRunning}
                        onUpdateTaskTitle={handleUpdateTaskTitle}
                    />
                )}

                {currentView === 'analytics' && <Analytics language={language} />}

                {currentView === 'settings' && (
                    <Settings
                        language={language}
                        setLanguage={handleLanguageChange}
                        focusDuration={focusDuration}
                        setFocusDuration={handleFocusDurationChange}
                    />
                )}
            </div>

            {/* Modals / Overlays */}
            {showBrainDump && (
                <BrainDumpModal
                    onClose={() => setShowBrainDump(false)}
                    language={language}
                    onAddTask={handleAddTask}
                />
            )}
            {showElasticMode && <ElasticModeModal onClose={() => setShowElasticMode(false)} language={language} />}
            {showClassification && <ClassificationModal onClose={() => setShowClassification(false)} language={language} />}
        </div>
    );
}

export default App;