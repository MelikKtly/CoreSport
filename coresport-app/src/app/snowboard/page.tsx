'use client';

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft, LogOut, User as UserIcon, Loader2,
    Flame, Timer, TrendingUp, Mountain, Play,
    Youtube, ChevronDown, Target, Wind, Snowflake
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { SB_PROGRAMS } from '@/data/snowboard-programs';

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
    'Orta':      { label: '⚡️ Orta',       color: 'text-sky-400',     bg: 'bg-sky-500/15',     accent: '#0ea5e9'  },
    'İleri':     { label: '🏔️ İleri',      color: 'text-violet-400',  bg: 'bg-violet-500/15',  accent: '#8b5cf6'  },
};

const intensityByLevel: Record<string, { sets: string; intensityLabel: string; repNote: string }> = {
    'Başlangıç': { sets: '3', intensityLabel: 'Düşük-Orta',  repNote: 'Teknik öncelikli, %60-70 yoğunluk' },
    'Orta':      { sets: '4', intensityLabel: 'Orta-Yüksek', repNote: 'Performans odaklı, %75-82 yoğunluk' },
    'İleri':     { sets: '5', intensityLabel: 'Maksimum',    repNote: 'Elit yük, %85-95 yoğunluk' },
};

const dayEmoji: Record<string, string> = {
    PZT: '💪', ÇAR: '❄️', CUM: '🏔️', SAL: '⚡️', PER: '🎯', CMT: '🔥', PAZ: '💤'
};

/* ─── Stil normalizasyon ─── */
function normalizeStyle(pos: string): string {
    const map: Record<string, string> = {
        'Freestyle': 'Freestyle',
        'Freeride':  'Freeride',
        'Carve':     'Carve',
        'Carving':   'Carve',
    };
    return map[pos] || 'Freestyle';
}

export default function SnowboardPage() {
    const router = useRouter();
    const [user, setUser]           = useState<User | null>(null);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    const [activeWorkout, setActiveWorkout] = useState<{ title: string; exercises: Exercise[] } | null>(null);

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

    /* ─── Loading ─── */
    if (loading) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-xl shadow-cyan-500/30">
                    <span className="text-2xl">🏂</span>
                </div>
                <Loader2 className="w-6 h-6 text-cyan-500/60 animate-spin" />
            </div>
        </div>
    );

    /* ─── Error ─── */
    if (error) return (
        <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
            <div className="text-center">
                <p className="text-5xl mb-4">⚠️</p>
                <p className="text-gray-300 font-bold">{error}</p>
                <button onClick={() => router.push('/dashboard')} className="mt-6 px-6 py-3 bg-cyan-500 text-black font-black rounded-2xl">
                    Dashboard&apos;a Dön
                </button>
            </div>
        </div>
    );

    /* ─── Veri bağlama ─── */
    const level    = (user?.level || 'Başlangıç') as 'Başlangıç' | 'Orta' | 'İleri';
    const styleKey = normalizeStyle(user?.position || 'Freestyle');
    const styleData = SB_PROGRAMS[styleKey] || SB_PROGRAMS['Freestyle'];
    const levelProgram = styleData.programs[level] || styleData.programs['Başlangıç'];
    const weeklyPlan   = levelProgram.weeklyPlan;
    const lvlMod       = levelMod[level]  || levelMod['Başlangıç'];
    const intensity    = intensityByLevel[level] || intensityByLevel['Başlangıç'];

    const youtubeLinks = [
        { label: 'Teknik',     query: `${styleKey} snowboard technique beginner`, emoji: '🏂' },
        { label: 'Antrenman',  query: `${styleKey} snowboard off-snow training`,  emoji: '💪' },
        { label: 'Pist',       query: `${styleKey} snowboard run edit`,           emoji: '🎥' },
        { label: 'Rehber',     query: `snowboard ${styleKey} tutorial`,           emoji: '📚' },
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
                            CORE<span className="text-cyan-400">SNOW</span>
                        </span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${lvlMod.bg} ${lvlMod.color} hidden sm:flex`}>
                            {lvlMod.label}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                                <UserIcon className="w-3 h-3 text-black" />
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
                    {/* Fotoğraf */}
                    <div
                        className="absolute inset-0"
                        style={{ backgroundImage: 'url(/snowboard-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center 25%' }}
                    />
                    {/* Koyu örtü */}
                    <div className="absolute inset-0 bg-[#080808]/70" />
                    {/* Stil rengi glow */}
                    <div
                        className={`absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br ${styleData.color} opacity-[0.14] blur-[130px] rounded-full`}
                    />
                    {/* Kar taneleri dekoratif */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                    {/* Alt fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#080808] to-transparent" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-16">
                    {/* Rozet satırı */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${lvlMod.bg} ${lvlMod.color} border-current/20`}>
                            {lvlMod.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">
                            {styleData.emoji} {styleKey}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border border-white/10 bg-white/5 text-gray-400">
                            🏂 Snowboard
                        </span>
                    </div>

                    {/* Ana başlık */}
                    <div className="mb-6">
                        <h1 className="text-[clamp(3rem,12vw,7rem)] font-black leading-[0.9] tracking-tighter">
                            <span className="text-white">SNOW</span><br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${styleData.color}`}>BOARD</span>
                        </h1>
                    </div>

                    {/* Tagline */}
                    <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
                        {levelProgram.tagline}
                    </p>

                    {/* İstatistikler */}
                    <div className="flex flex-wrap gap-6 text-sm mb-10">
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                                <Timer className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="font-bold">{weeklyPlan.length} Antrenman / Hafta</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center">
                                <Flame className="w-4 h-4 text-blue-400" />
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
                        {styleData.keyAttributes.map((attr, i) => (
                            <div key={i} className="group relative rounded-2xl bg-white/[0.03] border border-white/8 p-4 hover:border-white/15 hover:bg-white/[0.05] transition-all">
                                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${styleData.color} opacity-0 group-hover:opacity-60 transition-opacity rounded-t-2xl`} />
                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1.5">{attr.label}</p>
                                <p className="text-sm text-white font-bold">{attr.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── Stil Seçim İpucu ────────────────────────────────────── */}
            <section className="max-w-4xl mx-auto px-4 mb-8">
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(SB_PROGRAMS).map(([key, val]) => (
                        <div
                            key={key}
                            className={`relative group rounded-2xl border p-4 transition-all cursor-default ${key === styleKey
                                ? `border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/5`
                                : 'border-white/6 bg-white/[0.02] hover:border-white/12'
                            }`}
                        >
                            {key === styleKey && (
                                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${val.color} opacity-60 rounded-t-2xl`} />
                            )}
                            <p className="text-xl mb-1">{val.emoji}</p>
                            <p className={`text-xs font-black ${key === styleKey ? 'text-cyan-400' : 'text-gray-500'}`}>{key}</p>
                            <p className="text-[10px] text-gray-700 mt-0.5">{val.keyAttributes[0].value}</p>
                        </div>
                    ))}
                </div>
                <p className="text-[11px] text-gray-700 mt-3 text-center">
                    Stilini değiştirmek için Dashboard → Profil → Pozisyon alanını güncelle
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
                            className="group flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 hover:border-red-500/30 rounded-2xl transition-all"
                        >
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
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                            <Mountain className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white">Haftalık Program</h2>
                            <p className="text-xs text-gray-600">{styleKey} · {lvlMod.label}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-black ${lvlMod.bg} ${lvlMod.color}`}>
                        {weeklyPlan.length} gün
                    </span>
                </div>

                {weeklyPlan.map((workout, idx) => {
                    const isOpen = expandedDay === idx;
                    const emoji  = dayEmoji[workout.day] || '🏂';

                    return (
                        <div key={idx}
                            className={`group rounded-3xl border overflow-hidden transition-all duration-300 ${isOpen
                                ? 'border-cyan-500/30'
                                : 'border-white/6 hover:border-white/12'
                            }`}
                            style={isOpen
                                ? { background: 'linear-gradient(135deg, rgba(6,182,212,0.04) 0%, rgba(255,255,255,0.02) 100%)' }
                                : { background: 'rgba(255,255,255,0.015)' }
                            }
                        >
                            {/* Kart başlığı */}
                            <button
                                onClick={() => setExpandedDay(isOpen ? null : idx)}
                                className="w-full p-5 flex items-center gap-4 text-left"
                            >
                                {/* Gün rozeti */}
                                <div className={`flex-shrink-0 relative w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300
                                    ${isOpen
                                        ? 'bg-gradient-to-br from-cyan-500/25 to-blue-600/15 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                                        : 'bg-white/5 border-white/8 group-hover:border-white/15'
                                    }`}
                                >
                                    <span className="text-xl">{emoji}</span>
                                    <span className="text-[8px] font-black tracking-widest mt-0.5 text-gray-500">{workout.day}</span>
                                    {isOpen && <div className="absolute -inset-px rounded-2xl bg-cyan-500/5" />}
                                </div>

                                {/* Başlık & özet */}
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-black text-base sm:text-lg leading-tight transition-colors ${isOpen ? 'text-cyan-400' : 'text-white'}`}>
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
                                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-cyan-500/20 rotate-180' : 'bg-white/5'}`}>
                                    <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-cyan-400' : 'text-gray-600'}`} />
                                </div>
                            </button>

                            {/* Egzersiz listesi */}
                            {isOpen && (
                                <div className="px-5 pb-5 space-y-2 border-t border-white/5 pt-4">
                                    {workout.exercises.map((ex, ei) => (
                                        <div key={ei}
                                            className="group/ex relative flex items-start gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 hover:bg-black/30 transition-all"
                                        >
                                            {/* Numara */}
                                            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center">
                                                <span className="text-xs font-black text-cyan-400">{ei + 1}</span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <p className="font-bold text-white text-sm">{ex.name}</p>
                                                    <div className="flex gap-1.5 flex-shrink-0">
                                                        <span className="px-2 py-0.5 rounded-lg bg-cyan-500/15 text-cyan-400 text-[11px] font-black">
                                                            {intensity.sets}×{ex.reps}
                                                        </span>
                                                        {ex.rest !== '—' && (
                                                            <span className="px-2 py-0.5 rounded-lg bg-white/5 text-gray-500 text-[11px] font-bold">
                                                                {ex.rest}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">❄️ {ex.tip}</p>
                                                <a
                                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' snowboard training technique')}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-red-500/60 hover:text-red-400 transition-colors"
                                                >
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
                                            className="w-full group/btn relative overflow-hidden flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-sm text-black transition-all active:scale-95"
                                            style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)' }}
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            <div className="w-7 h-7 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                                                <Play size={14} fill="black" />
                                            </div>
                                            <span>Antrenmana Başla</span>
                                            <div className="flex gap-1 ml-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* ── Bilgi Kartı ── */}
                <div className="mt-8 p-5 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                            <Target className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">Profil Güncellemesi</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Stilini (Freestyle / Freeride / Carve) veya seviyeni değiştirmek için Dashboard → Profil sekmesinden düzenleyebilirsin. Program otomatik güncellenir.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Kar Koşulları İpucu ── */}
                <div className="mt-4 p-5 rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.03]">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                            <Snowflake className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">❄️ Sezon Dışı Antrenman</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Pistlere çıkamadığın dönemlerde bu program vücudunu hazır tutar. Dry-land egzersizleri; denge, güç ve koordinasyonu piste hazır seviyede korur.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Rüzgar İpucu ── */}
                <div className="mt-4 mb-8 p-5 rounded-3xl border border-violet-500/10 bg-violet-500/[0.03]">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                            <Wind className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white mb-1">🏔️ Yüksek İrtifa Hazırlığı</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Yüksek rakımda oksijen azalır. Aerobik kapasiteni artırmak için programdaki kardiyovasküler egzersizleri önceliklendir. Sezon öncesi en az 8 hafta çalış.
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
