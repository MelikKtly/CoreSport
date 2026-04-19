'use client';

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, LogOut, User as UserIcon, Loader2,
    Flame, Timer, TrendingUp, Play,
    Youtube, ChevronDown, Target, Trophy, Zap, Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { BB_PROGRAMS } from '@/data/basketball-programs';

const API_URL = 'http://127.0.0.1:3001';

interface User {
    id: string; name: string; weight: number; height: number;
    sportBranch: string; level: string; position: string; age: number;
}
interface Exercise { name: string; sets: string; reps: string; rest: string; tip: string; }
interface WorkoutDay { day: string; title: string; exercises: Exercise[]; }

/* ─── Level renkleri ─── */
const levelMod: Record<string, { label: string; color: string; bg: string; accent: string }> = {
    'Başlangıç': { label: '🌱 Başlangıç', color: 'text-emerald-400', bg: 'bg-emerald-500/15', accent: '#10b981' },
    'Orta':      { label: '⚡️ Orta',       color: 'text-orange-400',  bg: 'bg-orange-500/15',  accent: '#f97316' },
    'İleri':     { label: '🔥 İleri',      color: 'text-red-400',     bg: 'bg-red-500/15',     accent: '#ef4444' },
};

const intensityByLevel: Record<string, { sets: string; intensityLabel: string; repNote: string }> = {
    'Başlangıç': { sets: '3', intensityLabel: 'Düşük-Orta',  repNote: 'Teknik öncelikli, %60-70 yoğunluk' },
    'Orta':      { sets: '4', intensityLabel: 'Orta-Yüksek', repNote: 'Performans odaklı, %75-82 yoğunluk' },
    'İleri':     { sets: '5', intensityLabel: 'Maksimum',    repNote: 'Elit yük, %85-95 yoğunluk' },
};

const dayEmoji: Record<string, string> = {
    PZT: '💪', ÇAR: '🏀', CUM: '🔥', SAL: '⚡️', PER: '🎯', CMT: '🏆', PAZ: '💤'
};

/* ─── Pozisyon normalleştirme ─── */
function normalizePosition(pos: string): string {
    const map: Record<string, string> = {
        'PG': 'PG', 'Point Guard': 'PG',
        'SG': 'SG', 'Shooting Guard': 'SG',
        'SF': 'SF', 'Small Forward': 'SF',
        'PF': 'PF', 'Power Forward': 'PF',
        'C':  'C',  'Center': 'C',
    };
    return map[pos] || 'PG';
}

const positionLabels: Record<string, string> = {
    PG: 'Point Guard',
    SG: 'Shooting Guard',
    SF: 'Small Forward',
    PF: 'Power Forward',
    C:  'Center',
};

/* ─── Pozisyon renkleri (sabit, gradient-safe) ─── */
const positionGradients: Record<string, { from: string; to: string; border: string; glow: string }> = {
    PG: { from: '#f97316', to: '#dc2626', border: 'rgba(249,115,22,0.4)', glow: 'rgba(249,115,22,0.15)' },
    SG: { from: '#ef4444', to: '#be123c', border: 'rgba(239,68,68,0.4)',  glow: 'rgba(239,68,68,0.15)'  },
    SF: { from: '#10b981', to: '#0d9488', border: 'rgba(16,185,129,0.4)', glow: 'rgba(16,185,129,0.15)' },
    PF: { from: '#f59e0b', to: '#b45309', border: 'rgba(245,158,11,0.4)', glow: 'rgba(245,158,11,0.15)' },
    C:  { from: '#8b5cf6', to: '#4f46e5', border: 'rgba(139,92,246,0.4)', glow: 'rgba(139,92,246,0.15)' },
};

export default function BasketballPage() {
    const router = useRouter();
    const [user, setUser]               = useState<User | null>(null);
    const [loading, setLoading]         = useState(true);
    const [error, setError]             = useState('');
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    const [activeWorkout, setActiveWorkout] = useState<{ title: string; exercises: Exercise[] } | null>(null);
    const [courtFlash, setCourtFlash]   = useState(false);

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

    /* court flash efekti */
    useEffect(() => {
        const t = setTimeout(() => setCourtFlash(true), 300);
        return () => clearTimeout(t);
    }, []);

    /* ─── Loading ─── */
    if (loading) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', boxShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
                    <span className="text-2xl">🏀</span>
                </div>
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#f97316' }} />
                <p className="text-xs text-gray-600 font-bold tracking-widest uppercase">Yükleniyor</p>
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
                    className="mt-6 px-6 py-3 font-black rounded-2xl text-black"
                    style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)' }}>
                    Dashboard&apos;a Dön
                </button>
            </div>
        </div>
    );

    /* ─── Veri bağlama ─── */
    const level       = (user?.level || 'Başlangıç') as 'Başlangıç' | 'Orta' | 'İleri';
    const posKey      = normalizePosition(user?.position || 'PG');
    const posData     = BB_PROGRAMS[posKey] || BB_PROGRAMS['PG'];
    const levelProgram = posData.programs[level] || posData.programs['Başlangıç'];
    const weeklyPlan  = levelProgram.weeklyPlan;
    const lvlMod      = levelMod[level]  || levelMod['Başlangıç'];
    const intensity   = intensityByLevel[level] || intensityByLevel['Başlangıç'];
    const posGrad     = positionGradients[posKey] || positionGradients['PG'];
    const posLabel    = positionLabels[posKey];

    const youtubeLinks = [
        { label: 'Teknik',    query: `${posKey} basketball skills drills`, emoji: '🏀' },
        { label: 'Antrenman', query: `basketball ${posKey} training workout`,     emoji: '💪' },
        { label: 'Highlights', query: `best ${posLabel.toLowerCase()} NBA highlights`, emoji: '🎬' },
        { label: 'Rehber',    query: `how to play ${posLabel.toLowerCase()} basketball tutorial`, emoji: '📚' },
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
                            CORE<span style={{ color: '#f97316' }}>BALL</span>
                        </span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${lvlMod.bg} ${lvlMod.color} hidden sm:flex`}>
                            {lvlMod.label}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black hidden sm:flex"
                            style={{ background: posGrad.glow, color: posGrad.from, border: `1px solid ${posGrad.border}` }}>
                            {posKey} · {posLabel}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${posGrad.from}, ${posGrad.to})` }}>
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
                    {/* Zemin rengi */}
                    <div className="absolute inset-0" style={{ background: '#080808' }} />

                    {/* Basketbol Sahası SVG deseni */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg"
                        style={{ transition: 'opacity 1s ease', opacity: courtFlash ? 0.045 : 0.015 }}>
                        <defs>
                            <pattern id="court" width="400" height="400" patternUnits="userSpaceOnUse">
                                {/* üç sayı çizgisi */}
                                <path d="M 0 350 Q 200 120 400 350" fill="none" stroke="white" strokeWidth="2"/>
                                {/* orta çember */}
                                <circle cx="200" cy="200" r="60" fill="none" stroke="white" strokeWidth="2"/>
                                {/* serbest atış çemberi */}
                                <circle cx="200" cy="330" r="50" fill="none" stroke="white" strokeWidth="2"/>
                                {/* serbest atış yolu */}
                                <rect x="140" y="280" width="120" height="100" fill="none" stroke="white" strokeWidth="2"/>
                                {/* merkez daire */}
                                <circle cx="200" cy="200" r="8" fill="white" opacity="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#court)"/>
                    </svg>

                    {/* Ana glow */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px]"
                        style={{ background: `radial-gradient(ellipse, ${posGrad.glow} 0%, transparent 70%)`, opacity: 0.8 }} />

                    {/* Basketbol ikonları dekoratif */}
                    <div className="absolute top-24 right-8 text-[120px] opacity-[0.03] select-none">🏀</div>
                    <div className="absolute bottom-8 left-4 text-[80px] opacity-[0.025] select-none rotate-12">🏆</div>

                    {/* Alt fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-16">
                    {/* Rozet satırı */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${lvlMod.bg} ${lvlMod.color} border-current/20`}>
                            {lvlMod.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
                            style={{ background: posGrad.glow, color: posGrad.from, border: `1px solid ${posGrad.border}` }}>
                            {posData.emoji} {posKey} — {posLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border border-white/10 bg-white/5 text-gray-400">
                            🏀 Basketball
                        </span>
                    </div>

                    {/* Ana başlık */}
                    <div className="mb-6">
                        <h1 className="text-[clamp(3rem,12vw,7rem)] font-black leading-[0.9] tracking-tighter">
                            <span className="text-white">BASKET</span><br />
                            <span className="text-transparent bg-clip-text"
                                style={{ backgroundImage: `linear-gradient(135deg, ${posGrad.from}, ${posGrad.to})` }}>
                                BALL
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
                                style={{ background: `${posGrad.glow}` }}>
                                <Timer className="w-4 h-4" style={{ color: posGrad.from }} />
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
                            <div className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 text-violet-400" />
                            </div>
                            <span className="font-bold">{intensity.sets} Set / Egzersiz</span>
                        </div>
                    </div>

                    {/* Özellik kartları */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {posData.keyAttributes.map((attr, i) => (
                            <div key={i}
                                className="group relative rounded-2xl bg-white/[0.03] border border-white/8 p-4 hover:border-white/15 hover:bg-white/[0.05] transition-all overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity rounded-t-2xl"
                                    style={{ background: `linear-gradient(90deg, ${posGrad.from}, ${posGrad.to})` }} />
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1.5">{attr.label}</p>
                                <p className="text-sm text-white font-bold">{attr.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── Pozisyon Seçim Göstergesi ─────────────────────────── */}
            <section className="max-w-4xl mx-auto px-4 mb-8">
                <p className="text-[11px] text-gray-700 font-black uppercase tracking-widest mb-3">Tüm Pozisyonlar</p>
                <div className="grid grid-cols-5 gap-2">
                    {Object.entries(BB_PROGRAMS).map(([key, val]) => {
                        const pg = positionGradients[key] || positionGradients['PG'];
                        const isActive = key === posKey;
                        return (
                            <div key={key}
                                className="relative group rounded-2xl border p-3 transition-all cursor-default overflow-hidden"
                                style={{
                                    background: isActive ? `linear-gradient(135deg, ${pg.glow}, transparent)` : 'rgba(255,255,255,0.02)',
                                    borderColor: isActive ? pg.border : 'rgba(255,255,255,0.06)',
                                }}>
                                {isActive && (
                                    <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl"
                                        style={{ background: `linear-gradient(90deg, ${pg.from}, ${pg.to})` }} />
                                )}
                                <p className="text-xl mb-1">{val.emoji}</p>
                                <p className="text-xs font-black"
                                    style={{ color: isActive ? pg.from : '#4b5563' }}>{key}</p>
                                <p className="text-[9px] text-gray-700 mt-0.5 leading-tight hidden sm:block">
                                    {positionLabels[key]}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <p className="text-[11px] text-gray-700 mt-3 text-center">
                    Pozisyonunu değiştirmek için Dashboard → Profil → Pozisyon alanını güncelle
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
                            style={{ background: posGrad.glow }}>
                            <span className="text-lg">🏀</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white">Haftalık Program</h2>
                            <p className="text-xs text-gray-600">{posKey} — {posLabel} · {lvlMod.label}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-black ${lvlMod.bg} ${lvlMod.color}`}>
                        {weeklyPlan.length} gün
                    </span>
                </div>

                {weeklyPlan.map((workout: WorkoutDay, idx: number) => {
                    const isOpen = expandedDay === idx;
                    const emoji  = dayEmoji[workout.day] || '🏀';

                    return (
                        <div key={idx}
                            className="group rounded-3xl border overflow-hidden transition-all duration-300"
                            style={{
                                borderColor: isOpen ? posGrad.border : 'rgba(255,255,255,0.06)',
                                background: isOpen
                                    ? `linear-gradient(135deg, ${posGrad.glow} 0%, rgba(255,255,255,0.01) 100%)`
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
                                        background: isOpen
                                            ? `linear-gradient(135deg, ${posGrad.glow}, rgba(0,0,0,0.2))`
                                            : 'rgba(255,255,255,0.05)',
                                        borderColor: isOpen ? posGrad.border : 'rgba(255,255,255,0.08)',
                                        boxShadow: isOpen ? `0 0 20px ${posGrad.glow}` : 'none',
                                    }}>
                                    <span className="text-xl">{emoji}</span>
                                    <span className="text-[8px] font-black tracking-widest mt-0.5 text-gray-500">{workout.day}</span>
                                </div>

                                {/* Başlık & özet */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-base sm:text-lg leading-tight transition-colors"
                                        style={{ color: isOpen ? posGrad.from : 'white' }}>
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
                                        background: isOpen ? posGrad.glow : 'rgba(255,255,255,0.05)',
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}>
                                    <ChevronDown className="w-4 h-4 text-gray-400"
                                        style={{ color: isOpen ? posGrad.from : '#6b7280' }} />
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
                                                style={{
                                                    background: posGrad.glow,
                                                    borderColor: posGrad.border,
                                                }}>
                                                <span className="text-xs font-black" style={{ color: posGrad.from }}>{ei + 1}</span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <p className="font-bold text-white text-sm">{ex.name}</p>
                                                    <div className="flex gap-1.5 flex-shrink-0">
                                                        <span className="px-2 py-0.5 rounded-lg text-[11px] font-black"
                                                            style={{ background: posGrad.glow, color: posGrad.from }}>
                                                            {intensity.sets}×{ex.reps}
                                                        </span>
                                                        {ex.rest !== '—' && (
                                                            <span className="px-2 py-0.5 rounded-lg bg-white/5 text-gray-500 text-[11px] font-bold">
                                                                {ex.rest}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">🏀 {ex.tip}</p>
                                                <a
                                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' basketball drill technique')}`}
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
                                            style={{ background: `linear-gradient(135deg, ${posGrad.from}, ${posGrad.to})` }}>
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
                            style={{ background: posGrad.glow }}>
                            <Target className="w-5 h-5" style={{ color: posGrad.from }} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">Profil Güncellemesi</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Pozisyonunu veya seviyeni değiştirmek için Dashboard → Profil sekmesini kullan.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl border border-amber-500/10 bg-amber-500/[0.03] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">🏆 Maç Hazırlığı</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Program, pozisyonuna özel beceri ve kondisyon çalışmalarını dengeler. Maçtan 48 saat önce hafif al.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl border border-violet-500/10 bg-violet-500/[0.03] flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">⚡️ Patlayıcılık</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Basketbol ani yön değişikliklerini içerir. Plyometrik hareketleri eksiksiz yap, iniş tekniğine dikkat et.
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
                                Ayak bileği bant veya desteği kullan. Her antrenman öncesi 5-10 dk dinamik ısınma, sonrasında statik germe yap. Diz ve kalça stabilitesine özellikle dikkat et.
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
