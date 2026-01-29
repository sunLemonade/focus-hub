import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface ModalProps {
    onClose: () => void;
    language: Language;
}

interface BrainDumpProps extends ModalProps {
    onAddTask: (title: string) => void;
}

export const BrainDumpModal: React.FC<BrainDumpProps> = ({ onClose, language, onAddTask }) => {
    const t = translations[language].modals.brainDump;
    const [notes, setNotes] = useState<string[]>(t.notes);
    const [input, setInput] = useState('');

    const addNote = () => {
        if (!input.trim()) return;
        setNotes([input, ...notes]);
        setInput('');
    };

    const removeNote = (idx: number) => {
        const newNotes = [...notes];
        newNotes.splice(idx, 1);
        setNotes(newNotes);
    };

    const handleConvertToTask = (note: string, idx: number) => {
        onAddTask(note);
        removeNote(idx);
    };

    const processAll = () => {
        notes.forEach(note => onAddTask(note));
        setNotes([]);
        setTimeout(onClose, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-8 pointer-events-none">
            <div className="fixed inset-0 bg-background-dark/60 backdrop-blur-md transition-opacity pointer-events-auto" onClick={onClose}></div>
            <div className="pointer-events-auto relative w-[420px] bg-surface-darker/95 border border-primary/30 shadow-[0_0_50px_rgba(19,200,236,0.15)] rounded-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-300 max-h-[80vh]">
                <div className="p-6 bg-gradient-to-b from-primary/10 to-transparent border-b border-white/5 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors rounded-full p-1 hover:bg-white/5">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(19,200,236,0.3)] ring-1 ring-primary/40">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                {t.title}
                                <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/20">{t.active}</span>
                            </h3>
                            <p className="text-xs text-[#92c0c9] leading-relaxed pr-6">{t.subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {notes.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm italic">All caught up!</div>
                    ) : notes.map((note, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all group hover:bg-white/[0.05]">
                            <p className="text-sm text-slate-200 mb-3 leading-relaxed">"{note}"</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleConvertToTask(note, i)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors border border-primary/20 hover:shadow-[0_0_10px_rgba(19,200,236,0.1)]"
                                >
                                    <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                                    {t.convertToTask}
                                </button>
                                <button 
                                    onClick={() => removeNote(i)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium transition-colors border border-white/5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">note</span>
                                    {t.keepAsNote}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="relative group">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addNote()}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all group-hover:bg-white/[0.08]" 
                            placeholder={t.placeholder} 
                            type="text"
                        />
                        <button 
                            onClick={addNote}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">arrow_upward</span>
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-3 px-1">
                        <span className="text-[10px] text-slate-500">{notes.length} {t.waiting}</span>
                        <button onClick={processAll} className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">{t.processAll}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ElasticModeModal: React.FC<ModalProps> = ({ onClose, language }) => {
    const t = translations[language].modals.elastic;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0f1214]/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-[440px] bg-surface-dark border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.15)] overflow-hidden ring-1 ring-white/5 animate-in fade-in zoom-in duration-300">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"></div>
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
                <div className="p-7 relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                        <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-purple-400">
                            <span className="material-symbols-outlined text-[28px] fill-1">electric_bolt</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{t.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                </span>
                                <p className="text-xs text-purple-300 font-medium uppercase tracking-wider">{t.reason}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-300 text-[15px] leading-relaxed mb-8 border-l-2 border-purple-500/30 pl-3">
                        {t.description}
                    </p>
                    <div className="bg-[#151515] rounded-xl p-5 border border-white/5 mb-8 relative group shadow-inner">
                        <div className="flex justify-between items-end mb-3 text-xs">
                            <span className="text-slate-400 font-medium">{t.streakGoal}</span>
                            <span className="text-purple-300 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{t.targetAdjusted}</span>
                        </div>
                        <div className="h-6 bg-slate-800/50 rounded-lg w-full relative overflow-hidden flex items-center">
                            <div className="absolute right-0 top-0 bottom-0 w-[30%] hatch-pattern border-l border-slate-700/50 opacity-50" title="Original Target Zone"></div>
                            <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-purple-900 to-purple-600 rounded-l-lg shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/30"></div>
                            </div>
                            <div className="absolute left-[70%] top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white] z-20"></div>
                        </div>
                        <div className="relative h-5 mt-2 w-full text-[10px] font-medium">
                            <div className="absolute left-[60%] -translate-x-1/2 text-purple-400 flex flex-col items-center">
                                <span className="material-symbols-outlined text-[12px] mb-0.5">arrow_drop_up</span>
                                <span className="-mt-1">{t.you}</span>
                            </div>
                            <div className="absolute left-[70%] -translate-x-1/2 text-white flex flex-col items-center z-10">
                                <span className="material-symbols-outlined text-[12px] mb-0.5 text-white">flag</span>
                                <span className="-mt-1 text-purple-200">{t.newGoal}</span>
                            </div>
                            <span className="absolute right-2 text-slate-600 top-1">{t.original}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="px-4 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                            {t.maybeLater}
                        </button>
                        <button onClick={onClose} className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5 transition-all text-sm font-bold flex items-center justify-center gap-2 group">
                            <span>{t.accept}</span>
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ClassificationModal: React.FC<ModalProps> = ({ onClose, language }) => {
    const t = translations[language].modals.classification;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-darker/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-[480px] bg-surface-dark dark:bg-[#1C1C1C] rounded-2xl shadow-2xl border border-white/10 overflow-hidden scale-100 transform transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
                <div className="relative p-8 flex flex-col items-center text-center">
                    <div className="mb-6 p-4 rounded-full bg-surface-darker ring-1 ring-white/10 shadow-lg relative group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-4xl text-primary relative z-10 animate-pulse">auto_fix_high</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                    <div className="my-6 p-6 rounded-xl bg-surface-darker/60 border border-white/5 w-full">
                        <p className="text-lg text-slate-300 font-light leading-relaxed">
                            {t.descriptionPrefix} <br/>
                            <span className="font-bold text-xl text-primary drop-shadow-[0_0_8px_rgba(19,200,236,0.3)]">"{t.personal}"</span>
                            <span className="text-slate-500 text-sm mx-1">{t.descriptionMiddle}</span>
                            <span className="font-bold text-xl text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">"{t.ideas}"</span>.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <button onClick={onClose} className="h-16 flex items-center justify-center gap-2 rounded-xl border-2 border-slate-700/50 hover:border-slate-600 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">edit</span>
                            <span className="font-semibold">{t.changeCategory}</span>
                        </button>
                        <button onClick={onClose} className="h-16 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:to-blue-500 text-white shadow-[0_4px_20px_rgba(19,200,236,0.25)] hover:shadow-[0_4px_25px_rgba(19,200,236,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                            <span className="material-symbols-outlined text-xl fill-1">check_circle</span>
                            <span className="font-bold text-lg tracking-wide">{t.confirm}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};