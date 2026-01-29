import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, PieChart, Pie, Label } from 'recharts';
import { Language } from '../types';
import { translations } from '../translations';

interface AnalyticsProps {
    language: Language;
}

export const Analytics: React.FC<AnalyticsProps> = ({ language }) => {
    const t = translations[language].analytics;
    const [range, setRange] = useState<'last7' | 'week'>('week');

    const dataWeek = [
        { name: language === 'zh' ? '周一' : 'Mon', hours: 3.25 },
        { name: language === 'zh' ? '周二' : 'Tue', hours: 5.33 },
        { name: language === 'zh' ? '周三' : 'Wed', hours: 2.75 },
        { name: language === 'zh' ? '周四' : 'Thu', hours: 6.16 },
        { name: language === 'zh' ? '周五' : 'Fri', hours: 4.5 },
        { name: language === 'zh' ? '周六' : 'Sat', hours: 1.25 },
        { name: language === 'zh' ? '周日' : 'Sun', hours: 0.75 },
    ];

    const dataLast7 = [
        { name: '1', hours: 2.0 },
        { name: '2', hours: 4.5 },
        { name: '3', hours: 3.0 },
        { name: '4', hours: 5.5 },
        { name: '5', hours: 6.0 },
        { name: '6', hours: 1.5 },
        { name: '7', hours: 3.5 },
    ];
    
    const displayData = range === 'week' ? dataWeek : dataLast7;

    // Breakdown pie chart data
    const pieData = [
        { name: 'Work', value: 28, fill: '#13c8ec' },
        { name: 'Personal', value: 12, fill: '#334155' }, // dark slate color
    ];

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden h-full">
            <header className="px-8 pt-8 pb-4">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white tracking-tight">{t.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setRange('last7')}
                            className={`text-xs font-medium px-4 py-2 rounded-lg transition-all border ${range === 'last7' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-white/10'}`}
                        >
                            {t.last7Days}
                        </button>
                        <button 
                            onClick={() => setRange('week')}
                             className={`text-xs font-medium px-4 py-2 rounded-lg transition-all border ${range === 'week' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-white/10'}`}
                        >
                            {t.thisWeek}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full pb-8">
                    {/* Focus Score */}
                    <div className="col-span-1 p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-primary/20 transition-colors h-[280px]">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.focusScore}</h3>
                        </div>
                        <div className="mt-auto relative z-10">
                            <span className="text-6xl font-bold text-slate-800 dark:text-white tracking-tighter">87<span className="text-3xl text-slate-400">%</span></span>
                            <div className="flex items-center gap-2 mt-2 text-emerald-500 w-fit">
                                <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                                <span className="font-bold text-sm">+12% {t.vsLastWeek}</span>
                            </div>
                            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-primary/50 pl-3">
                                {t.crushingIt}
                            </p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 dark:opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-[120px]">bolt</span>
                        </div>
                    </div>

                    {/* Weekly Focus Time */}
                    <div className="col-span-1 lg:col-span-2 p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 flex flex-col group hover:border-primary/20 transition-colors h-[280px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">date_range</span>
                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.weeklyFocusTime}</h3>
                            </div>
                            <span className="text-2xl font-bold dark:text-white">{range === 'week' ? 24 : 31}<span className="text-sm text-slate-400 font-normal ml-1">hrs</span></span>
                        </div>
                        <div className="flex-1 w-full h-full min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={displayData} barSize={36}>
                                    <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                                        {displayData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="#13c8ec" className="opacity-30 hover:opacity-100 transition-opacity duration-300" />
                                        ))}
                                    </Bar>
                                </BarChart>
                             </ResponsiveContainer>
                             <div className="flex justify-between px-2 pt-2">
                                {displayData.map((d, i) => <span key={i} className="text-xs font-medium text-slate-400">{d.name}</span>)}
                             </div>
                        </div>
                    </div>

                    {/* Status Log */}
                    <div className="col-span-1 p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 flex flex-col group hover:border-primary/20 transition-colors h-[280px]">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">tune</span>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.statusLog}</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-5">
                            <div className="relative pl-4 border-l border-amber-500/50">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-surface-dark border-2 border-amber-500"></div>
                                <span className="text-[10px] text-slate-400 font-mono mb-1 block">11:45 AM</span>
                                <p className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-snug">{t.contextSwitching}</p>
                                <div className="mt-2 inline-flex items-center gap-2 px-2 py-1.5 rounded bg-white/5 border border-white/10 w-full">
                                    <span className="material-symbols-outlined text-[14px] text-primary">arrow_downward</span>
                                    <span className="text-[10px] font-medium text-primary">{t.targetLowered}</span>
                                </div>
                            </div>
                            <div className="relative pl-4 border-l border-slate-200 dark:border-white/10">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-surface-dark border-2 border-slate-600"></div>
                                <span className="text-[10px] text-slate-500 font-mono mb-1 block">09:30 AM</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{t.deepWorkStreak}</p>
                            </div>
                        </div>
                    </div>

                    {/* Productivity Heatmap */}
                    <div className="col-span-1 lg:col-span-3 p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 flex flex-col group hover:border-primary/20 transition-colors h-[280px]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.productivityHeatmap}</h3>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-200 dark:bg-white/5"></div><span className="text-slate-500">{t.rest}</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary/40"></div><span className="text-slate-500">{t.flow}</span></div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"></div><span className="text-slate-500">{t.deepWork}</span></div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="grid grid-cols-12 gap-2 h-16 w-full">
                                {[
                                    {val: 0, label: '6am'}, {val: 0}, {val: 20, label: '8am'}, {val: 40}, 
                                    {val: 100, label: '10am'}, {val: 80}, {val: 20, label: '12pm'}, {val: 30},
                                    {val: 50, label: '2pm'}, {val: 70}, {val: 40, label: '4pm'}, {val: 0}
                                ].map((h, i) => (
                                    <div key={i} className="flex flex-col gap-2 h-full">
                                        <div className={`flex-1 rounded-md ${h.val === 0 ? 'bg-slate-200 dark:bg-white/5' : `bg-primary/${Math.max(20, h.val)} ${h.val > 60 ? 'shadow-sm shadow-primary/20' : ''}`}`} style={{ opacity: h.val === 0 ? 1 : h.val/100 + 0.2 }}></div>
                                        {h.label && <span className="text-[10px] text-center text-slate-500">{h.label}</span>}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-center text-slate-400">{t.peakWindow}</p>
                        </div>
                    </div>

                    {/* Breakdown Pie Chart */}
                    <div className="col-span-1 p-6 rounded-2xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 flex flex-col items-center group hover:border-primary/20 transition-colors h-[280px]">
                        <div className="w-full flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.breakdown}</h3>
                            <button className="text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-lg">more_horiz</span>
                            </button>
                        </div>
                        <div className="relative w-full h-[140px] flex items-center justify-center mt-2">
                           <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={50}
                                        outerRadius={65}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                        <Label 
                                            value="70%" 
                                            position="center" 
                                            className="text-3xl font-bold dark:fill-white fill-slate-800"
                                            style={{ fontSize: '24px', fontWeight: 'bold' }} 
                                        />
                                    </Pie>
                                </PieChart>
                           </ResponsiveContainer>
                           <div className="absolute top-[55%] left-0 right-0 text-center pointer-events-none">
                                <span className="text-[9px] uppercase text-slate-400 tracking-widest block">Work</span>
                           </div>
                        </div>
                        <div className="w-full mt-auto space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,200,236,0.5)]"></div>
                                    <span className="text-slate-600 dark:text-slate-300">{t.workTasks}</span>
                                </div>
                                <span className="font-bold dark:text-white">28</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20"></div>
                                    <span className="text-slate-600 dark:text-slate-300">Personal</span>
                                </div>
                                <span className="font-bold dark:text-white">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
