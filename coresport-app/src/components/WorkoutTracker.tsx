'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    CheckCircle2, Circle, ChevronLeft, Flame,
    Clock, Plus, Minus, Save, Loader2, Trophy, X,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface ExerciseInput {
    name: string;
    targetSets: number;
    targetReps: string;
    completedSets: number;
    reps: number;
    weightKg: number | null;
    completed: boolean;
}

interface WorkoutTrackerProps {
    workoutTitle: string;
    exercises: { name: string; sets: string; reps: string; tip: string }[];
    onClose: () => void;
}

export function WorkoutTracker({ workoutTitle, exercises, onClose }: WorkoutTrackerProps) {
    const router = useRouter();
    const startTime = useRef(Date.now());
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [notes, setNotes] = useState('');
    const [elapsed, setElapsed] = useState(0);
    const [rows, setRows] = useState<ExerciseInput[]>(
        exercises.map(ex => ({
            name: ex.name,
            targetSets: parseInt(ex.sets) || 3,
            targetReps: ex.reps,
            completedSets: 0,
            reps: parseInt(ex.reps) || 10,
            weightKg: null,
            completed: false,
        }))
    );

    // Kronometre
    useEffect(() => {
        const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000);
        return () => clearInterval(t);
    }, []);

    const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const toggle = (i: number) => {
        setRows(r => r.map((row, idx) =>
            idx === i ? { ...row, completed: !row.completed, completedSets: !row.completed ? row.targetSets : 0 } : row
        ));
    };

    const updateField = <K extends keyof ExerciseInput>(i: number, key: K, val: ExerciseInput[K]) => {
        setRows(r => r.map((row, idx) => idx === i ? { ...row, [key]: val } : row));
    };

    const completedCount = rows.filter(r => r.completed).length;
    const progress = Math.round((completedCount / rows.length) * 100);

    const handleSave = async () => {
        setSaving(true);
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
            const durationMinutes = Math.ceil(elapsed / 60);
            const totalSets = rows.reduce((s, r) => s + (r.completed ? r.completedSets : 0), 0);
            const totalReps = rows.reduce((s, r) => s + (r.completed ? r.reps * r.completedSets : 0), 0);
            const totalWeightKg = rows.reduce((s, r) =>
                s + (r.completed && r.weightKg ? r.weightKg * r.reps * r.completedSets : 0), 0);

            const body = {
                userId,
                workoutTitle,
                durationMinutes,
                totalSets,
                totalReps,
                totalWeightKg: totalWeightKg > 0 ? Math.round(totalWeightKg) : null,
                exercises: rows.map(r => ({
                    name: r.name,
                    sets: r.completedSets,
                    reps: r.reps,
                    weightKg: r.weightKg,
                    completed: r.completed,
                })),
                notes: notes || undefined,
            };

            await fetch(`${API_URL}/workout-log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(body),
            });
            setSaved(true);
            setTimeout(() => onClose(), 2000);
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    if (saved) return (
        <div className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center mb-6 animate-bounce">
                <Trophy className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Tebrikler! 🎉</h2>
            <p className="text-gray-400 text-center">Antrenman kaydedildi. Harika iş çıkardın!</p>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/8 bg-[#0d0d0d]">
                <button onClick={onClose} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Aktif Antrenman</p>
                    <h2 className="text-base font-black text-white leading-tight">{workoutTitle}</h2>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 rounded-xl px-3 py-2">
                    <Clock size={14} className="text-amber-400" />
                    <span className="font-black text-amber-400 text-sm tabular-nums">{fmt(elapsed)}</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="flex-shrink-0 px-5 py-3 bg-[#141414] border-b border-white/5">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-gray-500">{completedCount}/{rows.length} egzersiz</span>
                    <span className="text-amber-400">{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Egzersiz listesi */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl border p-4 transition-all duration-300 ${row.completed
                                ? 'border-emerald-500/30 bg-emerald-500/5'
                                : 'border-white/8 bg-white/3'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <button onClick={() => toggle(i)} className="flex-shrink-0">
                                {row.completed
                                    ? <CheckCircle2 size={24} className="text-emerald-400" />
                                    : <Circle size={24} className="text-gray-600 hover:text-gray-400 transition-colors" />
                                }
                            </button>
                            <div className="flex-1 min-w-0">
                                <p className={`font-bold text-sm ${row.completed ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>
                                    {row.name}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">Hedef: {row.targetSets} set × {row.targetReps}</p>
                            </div>
                        </div>

                        {/* Set / Tekrar / Ağırlık inputları */}
                        <div className="grid grid-cols-3 gap-2">
                            {/* Set */}
                            <div className="bg-black/30 rounded-xl p-2.5 text-center border border-white/5">
                                <p className="text-[10px] text-gray-600 font-bold uppercase mb-1.5">Set</p>
                                <div className="flex items-center justify-center gap-2">
                                    <button onClick={() => updateField(i, 'completedSets', Math.max(0, row.completedSets - 1))}
                                        className="w-6 h-6 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                                        <Minus size={10} />
                                    </button>
                                    <span className="text-white font-black text-lg w-6 text-center">{row.completedSets}</span>
                                    <button onClick={() => updateField(i, 'completedSets', row.completedSets + 1)}
                                        className="w-6 h-6 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                                        <Plus size={10} />
                                    </button>
                                </div>
                            </div>

                            {/* Tekrar */}
                            <div className="bg-black/30 rounded-xl p-2.5 text-center border border-white/5">
                                <p className="text-[10px] text-gray-600 font-bold uppercase mb-1.5">Tekrar</p>
                                <div className="flex items-center justify-center gap-2">
                                    <button onClick={() => updateField(i, 'reps', Math.max(0, row.reps - 1))}
                                        className="w-6 h-6 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                                        <Minus size={10} />
                                    </button>
                                    <span className="text-white font-black text-lg w-6 text-center">{row.reps}</span>
                                    <button onClick={() => updateField(i, 'reps', row.reps + 1)}
                                        className="w-6 h-6 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                                        <Plus size={10} />
                                    </button>
                                </div>
                            </div>

                            {/* Ağırlık */}
                            <div className="bg-black/30 rounded-xl p-2.5 text-center border border-white/5">
                                <p className="text-[10px] text-gray-600 font-bold uppercase mb-1.5">Kg</p>
                                <input
                                    type="number"
                                    placeholder="—"
                                    value={row.weightKg ?? ''}
                                    onChange={e => updateField(i, 'weightKg', e.target.value ? parseFloat(e.target.value) : null)}
                                    className="w-full text-center bg-transparent text-white font-black text-lg focus:outline-none placeholder-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Not alanı */}
                <div className="border border-white/8 rounded-2xl p-4 bg-white/3">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Antrenman Notu</p>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Bugünkü antrenmanı nasıl geçti..."
                        className="w-full bg-transparent text-white text-sm resize-none focus:outline-none placeholder-gray-700 min-h-[60px]"
                    />
                </div>

                <div className="h-4" /> {/* Bottom padding */}
            </div>

            {/* Kaydet butonu */}
            <div className="flex-shrink-0 px-5 pb-8 pt-3 border-t border-white/8 bg-[#0d0d0d]">
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Flame size={16} className="text-orange-500" />
                        <span className="font-bold">~{Math.round(elapsed / 60 * 7)} kcal</span>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving || completedCount === 0}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-base transition-all ${completedCount > 0 && !saving
                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:brightness-110 active:scale-95'
                                : 'bg-white/5 text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        {saving ? <Loader2 size={20} className="animate-spin" /> : <><Save size={18} /> Antrenmanı Kaydet</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
