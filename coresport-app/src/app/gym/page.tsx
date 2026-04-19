'use client';

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, LogOut, User as UserIcon, Loader2,
    Flame, Timer, TrendingUp, Play,
    Youtube, ChevronDown, Target, Trophy, Zap, Shield, Dumbbell
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { GYM_PROGRAMS } from '@/data/gym-programs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface User {
    id: string; name: string; weight: number; height: number;
    sportBranch: string; level: string; position: string; age: number;
}
interface Exercise { name: string; sets: string; reps: string; rest: string; tip: string; }
interface WorkoutDay { day: string; title: string; exercises: Exercise[]; }

/* ─── Level renkleri ─── */
const levelMod: Record<string, { label: string; color: string; bg: string }> = {
    'Başlangıç': { label: '🌱 Başlangıç', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
    'Orta':      { label: '⚡️ Orta',       color: 'text-violet-400',  bg: 'bg-violet-500/15'  },
    'İleri':     { label: '🔥 İleri',      color: 'text-red-400',     bg: 'bg-red-500/15'     },
};

const intensityByLevel: Record<string, { sets: string; intensityLabel: string }> = {
    'Başlangıç': { sets: '3', intensityLabel: 'Düşük-Orta'  },
    'Orta':      { sets: '4', intensityLabel: 'Orta-Yüksek' },
    'İleri':     { sets: '5', intensityLabel: 'Maksimum'    },
};

const dayEmoji: Record<string, string> = {
    PZT: '💪', ÇAR: '🏋️', CUM: '🦵', SAL: '🔥', PER: '⚡️', CMT: '🎯', PAZ: '💤'
};

/* ─── Hedef normalleştirme ─── */
function normalizeGoal(pos: string): string {
    const map: Record<string, string> = {
        'Hypertrophy': 'Hypertrophy', 'Kas Geliştirme': 'Hypertrophy',
        'Strength': 'Strength', 'Güç': 'Strength',
        'FatLoss': 'FatLoss', 'Fat Loss': 'FatLoss', 'Yağ Yakımı': 'FatLoss',
    };
    return map[pos] || 'Hypertrophy';
}

/* ─── Her hedef için tasarım token'ları ─── */
const goalTheme: Record<string, {
    from: string; to: string; border: string; glow: string;
    label: string; icon: string;
}> = {
    Hypertrophy: {
        from: '#8b5cf6', to: '#7c3aed',
        border: 'rgba(139,92,246,0.4)', glow: 'rgba(139,92,246,0.12)',
        label: 'Kas Geliştirme', icon: '💪',
    },
    Strength: {
        from: '#ef4444', to: '#b91c1c',
        border: 'rgba(239,68,68,0.4)', glow: 'rgba(239,68,68,0.10)',
        label: 'Güç & Kuvvet', icon: '🏋️',
    },
    FatLoss: {
        from: '#f97316', to: '#d97706',
        border: 'rgba(249,115,22,0.4)', glow: 'rgba(249,115,22,0.10)',
        label: 'Yağ Yakımı', icon: '🔥',
    },
};

export default function GymPage() {
    const router = useRouter();
    const [user, setUser]               = useState<User | null>(null);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    const [activeWorkout, setActiveWorkout] = useState<{ title: string; exercises: Exercise[] } | null>(null);
    const [mounted, setMounted]         = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token  = localStorage.getItem('accessToken') || localStorage.getItem('token');
        if (!userId || !token) { router.push('/login'); return; }
        fetch(`${API_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok ? r.json() : Promise.reject('Auth hatası'))
            .then(setUser)
            .catch(() => setError('Kullanıcı bilgileri alınamadı.'))
            .finally(() => setLoading(false));
    }, [router]);

    useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t); }, []);

    /* ─── Loading ─── */
    if (loading) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>
                    <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
                <p className="text-xs text-gray-600 font-black tracking-widest uppercase">Yükleniyor</p>
            </div>
        </div>
    );

    /* ─── Error ─── */
    if (error) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
            <div className="text-center">
                <p className="text-5xl mb-4">⚠️</p>
                <p className="text-gray-300 font-bold">{error}</p>
                <button onClick={() => router.push('/dashboard')}
                    className="mt-6 px-6 py-3 font-black rounded-2xl text-white"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                    Dashboard&apos;a Dön
                </button>
            </div>
        </div>
    );

    /* ─── Veri bağlama ─── */
    const level        = (user?.level || 'Başlangıç') as 'Başlangıç' | 'Orta' | 'İleri';
    const goalKey      = normalizeGoal(user?.position || 'Hypertrophy');
    const goalData     = GYM_PROGRAMS[goalKey] || GYM_PROGRAMS['Hypertrophy'];
    const levelProgram = goalData.programs[level] || goalData.programs['Başlangıç'];
    const weeklyPlan   = levelProgram.weeklyPlan;
    const lvlMod       = levelMod[level]  || levelMod['Başlangıç'];
    const intensity    = intensityByLevel[level] || intensityByLevel['Başlangıç'];
    const theme        = goalTheme[goalKey] || goalTheme['Hypertrophy'];

    const youtubeLinks = [
        { label: 'Teknik',    query: `${theme.label} gym workout technique form`, emoji: '🏋️' },
        { label: 'Program',   query: `${theme.label} workout program split`,      emoji: '📋' },
        { label: 'Motivasyon', query: `gym motivation ${theme.label} training`,   emoji: '🔥' },
        { label: 'Beslenme',  query: `${theme.label} diet nutrition plan`,        emoji: '🥗' },
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-gray-100 pb-28 overflow-x-hidden">

            {/* ── NAVBAR ──────────────────────────────────────────────── */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-black tracking-widest text-white text-sm hidden sm:block">
                            CORE<span style={{ color: theme.from }}>GYM</span>
                        </span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${lvlMod.bg} ${lvlMod.color} hidden sm:flex`}>
                            {lvlMod.label}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black hidden sm:flex"
                            style={{ background: theme.glow, color: theme.from, border: `1px solid ${theme.border}` }}>
                            {theme.icon} {theme.label}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
                                <UserIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-bold text-white capitalize hidden sm:block">{user?.name}</span>
                        </div>
                        <button
                            onClick={() => { localStorage.clear(); router.push('/login'); }}
                            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ────────────────────────────────────────────────── */}
            <header className="relative pt-20 pb-0 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0" style={{ background: '#080808' }} />

                    {/* Hero fotoğraf */}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: 'url(/gym-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center 35%' }}
                    />
                    {/* Koyu örtü */}
                    <div className="absolute inset-0 bg-[#080808]/72" />

                    {/* Renk glow */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[150px]"
                        style={{ background: `radial-gradient(ellipse, ${theme.glow} 0%, transparent 70%)`, opacity: mounted ? 0.7 : 0.2, transition: 'opacity 1s ease' }} />

                    {/* Dekoratif ikonlar */}
                    <div className="absolute top-28 right-6 text-[100px] opacity-[0.025] select-none">🏋️</div>
                    <div className="absolute bottom-10 left-6 text-[70px] opacity-[0.02] select-none rotate-[-12deg]">💪</div>

                    {/* Alt fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-16">
                    {/* Rozetler */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${lvlMod.bg} ${lvlMod.color} border-current/20`}>
                            {lvlMod.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
                            style={{ background: theme.glow, color: theme.from, border: `1px solid ${theme.border}` }}>
                            {theme.icon} {theme.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border border-white/10 bg-white/5 text-gray-400">
                            🏋️ Fitness &amp; Gym
                        </span>
                    </div>

                    {/* Ana başlık */}
                    <div className="mb-6">
                        <h1 className="text-[clamp(3rem,12vw,7rem)] font-black leading-[0.9] tracking-tighter">
                            <span className="text-white">FITNESS</span><br />
                            <span className="text-transparent bg-clip-text"
                                style={{ backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
                                &amp; GYM
                            </span>
                        </h1>
                    </div>

                    {/* Tagline */}
                    <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
                        {levelProgram.tagline}
                    </p>

                    {/* İstatistikler */}
                    <div className="flex flex-wrap gap-6 text-sm mb-10">
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{ background: theme.glow }}>
                                <Timer className="w-4 h-4" style={{ color: theme.from }} />
                            </div>
                            <span className="font-bold">{weeklyPlan.length} Antrenman / Hafta</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center">
                                <Flame className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="font-bold">{intensity.intensityLabel} Yoğunluk</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-8 rounded-xl bg-sky-500/15 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-sky-400" />
                            </div>
                            <span className="font-bold">{intensity.sets} Set / Egzersiz</span>
                        </div>
                    </div>

                    {/* Anahtar özellik kartları */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {goalData.keyAttributes.map((attr, i) => (
                            <div key={i}
                                className="group relative rounded-2xl bg-white/[0.03] border border-white/8 p-4 hover:border-white/15 hover:bg-white/[0.05] transition-all overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-70 transition-opacity rounded-t-2xl"
                                    style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }} />
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1.5">{attr.label}</p>
                                <p className="text-sm text-white font-bold">{attr.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── Hedef Seçim Göstergesi ─────────────────────────────── */}
            <section className="max-w-4xl mx-auto px-4 mb-8">
                <p className="text-[11px] text-gray-700 font-black uppercase tracking-widest mb-3">Tüm Hedefler</p>
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(GYM_PROGRAMS).map(([key, val]) => {
                        const t = goalTheme[key] || goalTheme['Hypertrophy'];
                        const isActive = key === goalKey;
                        return (
                            <div key={key}
                                className="relative group rounded-2xl border p-4 transition-all cursor-default overflow-hidden"
                                style={{
                                    background: isActive ? `linear-gradient(135deg, ${t.glow}, transparent)` : 'rgba(255,255,255,0.02)',
                                    borderColor: isActive ? t.border : 'rgba(255,255,255,0.06)',
                                }}>
                                {isActive && (
                                    <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl"
                                        style={{ background: `linear-gradient(90deg, ${t.from}, ${t.to})` }} />
                                )}
                                <p className="text-2xl mb-1">{val.emoji}</p>
                                <p className="text-xs font-black"
                                    style={{ color: isActive ? t.from : '#4b5563' }}>{t.label}</p>
                                <p className="text-[10px] text-gray-700 mt-0.5 leading-tight">
                                    {val.keyAttributes[0].value}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <p className="text-[11px] text-gray-700 mt-3 text-center">
                    Hedefini değiştirmek için Dashboard → Profil → Pozisyon alanını güncelle
                </p>
            </section>

            {/* ── YouTube Rehber ─────────────────────────────────────── */}
            <section className="max-w-4xl mx-auto px-4 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <Youtube className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Video Rehberi</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {youtubeLinks.map((item, i) => (
                        <a key={i}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.query)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 hover:border-red-500/30 rounded-2xl transition-all">
                            <span className="text-base flex-shrink-0">{item.emoji}</span>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors truncate">{item.label}</p>
                                <p className="text-[10px] text-gray-600">YouTube →</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ── HAFTALIK PROGRAM ────────────────────────────────────── */}
            <main className="max-w-4xl mx-auto px-4 space-y-3">

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: theme.glow }}>
                            <Dumbbell className="w-4 h-4" style={{ color: theme.from }} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white">Haftalık Program</h2>
                            <p className="text-xs text-gray-600">{theme.label} · {lvlMod.label}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-black ${lvlMod.bg} ${lvlMod.color}`}>
                        {weeklyPlan.length} gün
                    </span>
                </div>

                {weeklyPlan.map((workout: WorkoutDay, idx: number) => {
                    const isOpen = expandedDay === idx;
                    const emoji  = dayEmoji[workout.day] || '🏋️';

                    return (
                        <div key={idx}
                            className="group rounded-3xl border overflow-hidden transition-all duration-300"
                            style={{
                                borderColor: isOpen ? theme.border : 'rgba(255,255,255,0.06)',
                                background: isOpen
                                    ? `linear-gradient(135deg, ${theme.glow} 0%, rgba(255,255,255,0.01) 100%)`
                                    : 'rgba(255,255,255,0.015)',
                            }}>
                            {/* Kart başlığı */}
                            <button
                                onClick={() => setExpandedDay(isOpen ? null : idx)}
                                className="w-full p-5 flex items-center gap-4 text-left"
                            >
                                {/* Gün rozeti */}
                                <div className="flex-shrink-0 relative w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300"
                                    style={{
                                        background: isOpen ? `linear-gradient(135deg, ${theme.glow}, rgba(0,0,0,0.2))` : 'rgba(255,255,255,0.05)',
                                        borderColor: isOpen ? theme.border : 'rgba(255,255,255,0.08)',
                                        boxShadow: isOpen ? `0 0 20px ${theme.glow}` : 'none',
                                    }}>
                                    <span className="text-xl">{emoji}</span>
                                    <span className="text-[8px] font-black tracking-widest mt-0.5 text-gray-500">{workout.day}</span>
                                </div>

                                {/* Başlık & özet */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-base sm:text-lg leading-tight transition-colors"
                                        style={{ color: isOpen ? theme.from : 'white' }}>
                                        {workout.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-600 font-medium">{workout.exercises.length} egzersiz</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                                        <span className="text-xs text-gray-600 font-medium">{intensity.sets} set</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                                        <span className={`text-xs font-bold ${lvlMod.color}`}>{intensity.intensityLabel}</span>
                                    </div>
                                </div>

                                {/* Açma oku */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: isOpen ? theme.glow : 'rgba(255,255,255,0.05)',
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}>
                                    <ChevronDown className="w-4 h-4"
                                        style={{ color: isOpen ? theme.from : '#6b7280' }} />
                                </div>
                            </button>

                            {/* Egzersiz listesi */}
                            {isOpen && (
                                <div className="px-5 pb-5 space-y-2 border-t border-white/5 pt-4">
                                    {workout.exercises.map((ex: Exercise, ei: number) => (
                                        <div key={ei}
                                            className="group/ex relative flex items-start gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 hover:bg-black/30 transition-all">
                                            {/* Numara */}
                                            <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border"
                                                style={{ background: theme.glow, borderColor: theme.border }}>
                                                <span className="text-xs font-black" style={{ color: theme.from }}>{ei + 1}</span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <p className="font-bold text-white text-sm">{ex.name}</p>
                                                    <div className="flex gap-1.5 flex-shrink-0">
                                                        <span className="px-2 py-0.5 rounded-lg text-[11px] font-black"
                                                            style={{ background: theme.glow, color: theme.from }}>
                                                            {ex.sets}×{ex.reps}
                                                        </span>
                                                        {ex.rest !== '—' && (
                                                            <span className="px-2 py-0.5 rounded-lg bg-white/5 text-gray-500 text-[11px] font-bold">
                                                                {ex.rest}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">💡 {ex.tip}</p>
                                                <a
                                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' gym exercise technique form')}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-red-500/60 hover:text-red-400 transition-colors">
                                                    <span className="w-3 h-3 bg-red-500/20 rounded-sm flex items-center justify-center text-[8px]">▶</span>
                                                    Teknik videoyu izle
                                                </a>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Antrenmana Başla */}
                                    <div className="pt-2">
                                        <button
                                            onClick={() => setActiveWorkout({ title: workout.title, exercises: workout.exercises })}
                                            className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-sm text-white transition-all active:scale-95"
                                            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}>
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            <div className="w-7 h-7 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                                                <Play size={14} fill="white" />
                                            </div>
                                            <span>Antrenmana Başla</span>
                                            <div className="flex gap-1 ml-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* ── Bilgi Kartları ── */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ background: theme.glow }}>
                            <Target className="w-5 h-5" style={{ color: theme.from }} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">Profil Güncellemesi</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Hedefini (Hypertrophy / Strength / Fat Loss) veya seviyeni değiştirmek için Dashboard → Profil sekmesini kullan.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl border border-amber-500/10 bg-amber-500/[0.03] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">🏆 Progresif Yükleme</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Her antrenman haftasında en az 2,5 kg veya 1 extra tekrar eklemeyi hedefle. Plateau&apos;ya girmemek için düzenli kayıt tut.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl border border-sky-500/10 bg-sky-500/[0.03] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-sky-500/15 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">⚡️ Süper Kompansasyon</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Kas büyümesi salondan değil, dinlenmeden gelir. Uyku kalitesini ve uyku süresini (7-9 saat) önceliklendir.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 mb-8 p-5 rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.03]">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">🛡️ Sakatlık Önleme</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Her seans öncesi 5-10 dk aktif ısınma (foam roll + dinamik germe) yap. Ağır kaldırışlarda (squat, deadlift, bench) kesinlikle spotter veya kemer kullan. Ağrı ile antrenmana devam etme.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── WorkoutTracker Overlay ───────────────────────────── */}
            {activeWorkout && (
                <WorkoutTracker
                    workoutTitle={activeWorkout.title}
                    exercises={activeWorkout.exercises}
                    onClose={() => setActiveWorkout(null)}
                />
            )}
        </div>
    );
}