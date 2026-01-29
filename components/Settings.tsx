import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface SettingsProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    focusDuration: number;
    setFocusDuration: (duration: number) => void;
}

export const Settings: React.FC<SettingsProps> = ({ language, setLanguage, focusDuration, setFocusDuration }) => {
    const t = translations[language].settings;
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden h-full">
            <header className="px-8 pt-8 pb-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold dark:text-white tracking-tight">{t.title}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.subtitle}</p>
                    </div>
                </div>
                <div className="flex gap-4 border-b border-slate-200 dark:border-white/5 pb-1">
                    {t.tabs.map((tab, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setActiveTab(idx)}
                            className={`text-sm font-medium px-1 py-3 transition-colors border-b-2 ${activeTab === idx ? 'text-primary border-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>
            <div className="flex-1 overflow-y-auto px-8 pb-8 no-scrollbar">
                <div className="flex flex-col gap-8 max-w-2xl">
                    
                    {activeTab === 0 && (
                        <div className="flex flex-col gap-4 animate-fade-in">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t.generalCognitive}</h3>
                            
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.interfaceLanguage}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.selectLanguage}</span>
                                </div>
                                <select 
                                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[140px]"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as Language)}
                                >
                                    <option value="en">English</option>
                                    <option value="zh">中文 (Chinese)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.elasticStreak}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.forgiveDays}</span>
                                </div>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="elastic-streak" id="elastic-streak" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-300 left-0 checked:left-5 checked:bg-white checked:border-primary"/>
                                    <label htmlFor="elastic-streak" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300 peer-checked:bg-primary"></label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.languageTone}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.adjustTone}</span>
                                </div>
                                <select className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[140px]">
                                    <option>Encouraging (Default)</option>
                                    <option>Direct & Concise</option>
                                    <option>Gamified</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div className="flex flex-col gap-4 animate-fade-in">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t.timerConfig}</h3>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.autoStartBreaks}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.autoStartBreaksDesc}</span>
                                </div>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle-breaks" id="toggle-breaks" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-300 left-0 checked:left-5 checked:bg-white checked:border-primary"/>
                                    <label htmlFor="toggle-breaks" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300 peer-checked:bg-primary"></label>
                                </div>
                            </div>
                             <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.autoStartPomos}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.autoStartPomosDesc}</span>
                                </div>
                                 <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle-pomos" id="toggle-pomos" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all duration-300 left-0 checked:left-5 checked:bg-white checked:border-primary"/>
                                    <label htmlFor="toggle-pomos" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300 peer-checked:bg-primary"></label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.timerSound}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.timerSoundDesc}</span>
                                </div>
                                 <select className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 min-w-[140px]">
                                    <option>Simple Bell</option>
                                    <option>Digital Alarm</option>
                                    <option>Soft Chime</option>
                                    <option>None</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.longBreakInterval}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{t.longBreakIntervalDesc}</span>
                                </div>
                                <div className="flex items-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-1">
                                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                                    <span className="px-3 text-sm font-medium dark:text-white">4</span>
                                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500"><span className="material-symbols-outlined text-[18px]">add</span></button>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 dark:bg-white/5 my-2"></div>
                        
                            <div className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t.customLengths}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                     <div className="flex flex-col gap-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.focusDuration}</label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                value={focusDuration}
                                                onChange={(e) => setFocusDuration(Number(e.target.value))}
                                                className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 pr-8" 
                                            />
                                            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">min</span>
                                        </div>
                                     </div>
                                     <div className="flex flex-col gap-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.shortBreak}</label>
                                        <div className="relative">
                                            <input type="number" defaultValue="5" className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 pr-8" />
                                            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">min</span>
                                        </div>
                                     </div>
                                     <div className="flex flex-col gap-2">
                                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{t.longBreak}</label>
                                        <div className="relative">
                                            <input type="number" defaultValue="15" className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 pr-8" />
                                            <span className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">min</span>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab > 1 && (
                         <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">construction</span>
                            <p className="text-slate-500">Settings for this section are coming soon!</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};