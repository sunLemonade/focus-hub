import React, { useState, useEffect } from 'react';
import { ViewState, Language, Task } from '../types';
import { translations } from '../translations';

interface SidebarProps {
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
    language: Language;
    activeTask: Task | null;
    focusDuration: number;
    isTimerRunning: boolean;
    setIsTimerRunning: (isRunning: boolean) => void;
    onStopFocus: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    currentView, 
    onChangeView, 
    language, 
    activeTask, 
    focusDuration,
    isTimerRunning,
    setIsTimerRunning,
    onStopFocus
}) => {
    const t = translations[language].sidebar;
    
    // Timer State
    const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');
    const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
    const [stopwatchTime, setStopwatchTime] = useState(0);
    
    // Sync time when settings change
    useEffect(() => {
        if (!isTimerRunning && mode === 'timer') {
            setTimeLeft(focusDuration * 60);
        }
    }, [focusDuration, isTimerRunning, mode]);

    // Reset timer when active task changes and auto-switch to timer mode
    useEffect(() => {
        if (activeTask) {
            setMode('timer'); // Auto switch to timer
            setTimeLeft(focusDuration * 60);
        }
    }, [activeTask, focusDuration]);

    useEffect(() => {
        let interval: any;
        if (isTimerRunning) {
            interval = setInterval(() => {
                if (mode === 'timer') {
                    if (timeLeft > 0) {
                        setTimeLeft((prev) => prev - 1);
                    } else {
                        setIsTimerRunning(false);
                        // Optional: Play sound here
                    }
                } else {
                    setStopwatchTime((prev) => prev + 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timeLeft, mode, setIsTimerRunning]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleReset = () => {
        setIsTimerRunning(false);
        if (mode === 'timer') {
            setTimeLeft(focusDuration * 60);
        } else {
            setStopwatchTime(0);
        }
    };

    const handleStop = () => {
        onStopFocus(); // Call parent to reset active task
        handleReset(); // Reset local timer state
    };

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    // Calculate progress for the ring
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const fullTimeSeconds = focusDuration * 60;
    
    let offset = 0;
    if (mode === 'timer') {
        offset = circumference - (timeLeft / fullTimeSeconds) * circumference;
    } else {
        const mod60 = stopwatchTime % 60;
        offset = circumference - (mod60 / 60) * circumference;
    }

    return (
        <aside className="w-[340px] flex-shrink-0 flex flex-col gap-6 bg-white dark:bg-surface-dark rounded-xl p-8 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none h-full transition-all duration-300 relative overflow-hidden">
             {/* Subtle background decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex items-center gap-4 mb-2 relative z-10">
                <div 
                    className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 ring-2 ring-primary/20 shrink-0 shadow-md" 
                    style={{ backgroundImage: 'url("https://picsum.photos/200/200")' }}
                ></div>
                <div className="flex flex-col min-w-0">
                    <h1 className="text-lg font-bold leading-tight dark:text-white truncate tracking-tight">
                        {activeTask ? activeTask.title : t.title}
                    </h1>
                    <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${activeTask && isTimerRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                        <p className={`text-xs font-medium truncate ${activeTask ? 'text-primary' : 'text-slate-500 dark:text-[#92c0c9]'}`}>
                            {activeTask ? (isTimerRunning ? 'Focusing now' : 'Paused') : t.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex flex-col gap-1.5 relative z-10">
                <button 
                    onClick={() => onChangeView('dashboard')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-200 ${currentView === 'dashboard' ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary font-semibold shadow-sm border border-primary/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-[22px]">dashboard</span>
                    <span className="text-sm">{t.dashboard}</span>
                </button>
                <button 
                    onClick={() => onChangeView('analytics')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-200 ${currentView === 'analytics' ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary font-semibold shadow-sm border border-primary/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-[22px]">bar_chart</span>
                    <span className="text-sm">{t.analytics}</span>
                </button>
                <button 
                    onClick={() => onChangeView('settings')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-200 ${currentView === 'settings' ? 'bg-gradient-to-r from-primary/10 to-transparent text-primary font-semibold shadow-sm border border-primary/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-[22px]">settings</span>
                    <span className="text-sm">{t.settings}</span>
                </button>
            </nav>

            <div className="flex-1"></div>

            <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 relative z-10 backdrop-blur-sm">
                <div className="w-full mb-8">
                    <div className="flex p-1 bg-white dark:bg-surface-darker rounded-lg relative shadow-sm border border-slate-100 dark:border-white/5">
                         {/* Sliding background */}
                         <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-100 dark:bg-white/10 rounded shadow-sm transition-all duration-300 ease-out ${mode === 'timer' ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
                        
                        <button 
                            onClick={() => { setMode('timer'); setIsTimerRunning(false); }}
                            className={`flex-1 py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider rounded relative z-10 transition-colors ${mode === 'timer' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            {t.timer}
                        </button>
                        <button 
                            onClick={() => { setMode('stopwatch'); setIsTimerRunning(false); }}
                            className={`flex-1 py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider rounded relative z-10 transition-colors ${mode === 'stopwatch' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            {t.stopwatch}
                        </button>
                    </div>
                </div>

                <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                    {/* Outer glow */}
                    <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-1000 ${isTimerRunning ? 'bg-primary/20 opacity-100' : 'bg-transparent opacity-0'}`}></div>
                    
                    <svg className="w-full h-full -rotate-90 transform relative z-10" viewBox="0 0 100 100">
                        {/* Track */}
                        <circle className="text-slate-200 dark:text-white/5" cx="50" cy="50" fill="none" r={radius} stroke="currentColor" strokeWidth="4"></circle>
                        {/* Progress */}
                        <circle 
                            className={`transition-all duration-1000 ease-linear text-primary ${isTimerRunning ? 'drop-shadow-[0_0_8px_rgba(19,200,236,0.6)]' : ''}`}
                            cx="50" 
                            cy="50" 
                            fill="none" 
                            r={radius}
                            stroke="currentColor" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={offset} 
                            strokeLinecap="round" 
                            strokeWidth="4"
                        ></circle>
                    </svg>
                    <div className="absolute flex flex-col items-center z-20">
                        <span className="text-5xl font-display font-bold tracking-tighter dark:text-white drop-shadow-sm">
                            {mode === 'timer' ? formatTime(timeLeft) : formatTime(stopwatchTime)}
                        </span>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-[0.2em]">{t.focus}</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button 
                        onClick={handleReset}
                        className="p-3 rounded-full hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all shadow-none hover:shadow-md"
                        title="Reset"
                    >
                        <span className="material-symbols-outlined text-[24px]">replay</span>
                    </button>
                    <button 
                        onClick={toggleTimer}
                        className={`h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-[#0ea5e9] text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 ${isTimerRunning ? 'ring-4 ring-primary/20' : ''}`}
                    >
                        <span className="material-symbols-outlined text-[32px] fill-1 ml-0.5">{isTimerRunning ? 'pause' : 'play_arrow'}</span>
                    </button>
                    <button 
                        onClick={handleStop}
                        className="p-3 rounded-full hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-all shadow-none hover:shadow-md group"
                        title="Stop Session"
                    >
                        <span className="material-symbols-outlined text-[24px] group-hover:fill-1">stop</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};