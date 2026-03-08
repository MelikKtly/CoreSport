'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play, Flame, Clock, Trophy, Home, BarChart2,
  User, Bell, ChevronRight, Loader2, LogOut,
  Zap, Shield, Target, Activity, TrendingUp, Star,
  Scale, Ruler, Calendar
} from 'lucide-react';

interface UserData {
  id: string; name: string; email: string;
  sportBranch: string; position: string; level: string;
  weight: number; height: number; age: number;
  motivation: string; gender: string;
}

// Branşa göre konfigürasyon
const branchConfig: Record<string, {
  link: string; gradient: string; bgGlow: string;
  label: string; heroTitle: string; heroSub: string;
  workoutType: string; kcal: string; duration: string; emoji: string;
}> = {
  'Amerikan Futbolu': {
    link: '/american-football', gradient: 'from-amber-500 to-orange-700',
    bgGlow: 'bg-amber-500/10', label: 'Amerikan Futbolu', emoji: '🏈',
    heroTitle: 'Sahaya Dön', heroSub: 'Seni Bekleyen Antrenman Hazır',
    workoutType: 'Pozisyon & Kondisyon', kcal: '480-600', duration: '65',
  },
  'Basketbol': {
    link: '/basketball', gradient: 'from-orange-500 to-red-700',
    bgGlow: 'bg-orange-500/10', label: 'Basketbol', emoji: '🏀',
    heroTitle: 'Kornere Git', heroSub: "Bugün Sahaya Çık",
    workoutType: 'Teknik & Kondisyon', kcal: '400-520', duration: '60',
  },
  'Snowboard': {
    link: '/snowboard', gradient: 'from-blue-400 to-cyan-700',
    bgGlow: 'bg-blue-500/10', label: 'Snowboard', emoji: '🏔️',
    heroTitle: 'Dağa Çık', heroSub: 'Denge ve Core Gücü Seni Bekliyor',
    workoutType: 'Core & Denge', kcal: '320-420', duration: '55',
  },
  'Fitness': {
    link: '/gym', gradient: 'from-violet-500 to-purple-800',
    bgGlow: 'bg-violet-500/10', label: 'Fitness & Gym', emoji: '💪',
    heroTitle: 'Iron Paradise', heroSub: 'Vücudunu İnşa Et',
    workoutType: 'Hypertrophy', kcal: '350-500', duration: '60',
  },
};

const levelConfig: Record<string, { color: string; bg: string; border: string; label: string }> = {
  'Başlangıç': { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: '🌱 Başlangıç' },
  'Orta': { color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', label: '⚡️ Orta' },
  'İleri': { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: '🏆 İleri' },
};

const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const today = new Date().getDay(); // 0=Paz, 1=Pzt...

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        if (!userId || !token) { router.push('/login'); return; }
        const res = await fetch(`http://127.0.0.1:3001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setUser(await res.json());
        else { localStorage.clear(); router.push('/login'); }
      } catch { /* ignore */ }
      finally { setLoading(false); }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => { localStorage.clear(); router.push('/login'); };

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-white/30 animate-spin" />
    </div>
  );

  const branch = user?.sportBranch || 'Fitness';
  const cfg = branchConfig[branch] || branchConfig['Fitness'];
  const lvl = levelConfig[user?.level || 'Başlangıç'] || levelConfig['Başlangıç'];

  // VKİ hesabı
  const bmi = user?.weight && user?.height
    ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1)
    : null;
  const bmiLabel = bmi
    ? Number(bmi) < 18.5 ? 'Zayıf'
      : Number(bmi) < 25 ? 'Normal'
        : Number(bmi) < 30 ? 'Fazla Kilolu' : 'Obez'
    : null;

  // Haftanın günleri (bugün aktif)
  const mondayOffset = today === 0 ? -6 : 1 - today; // pazartesiyi bul
  const weekItems = weekDays.map((d, i) => {
    const dayOffset = mondayOffset + i;
    const isToday = dayOffset === 0;
    const isPast = dayOffset < 0;
    return { label: d, isToday, isPast };
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 font-sans pb-28 overflow-x-hidden">

      {/* ── HEADER ────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Hoş Geldin</p>
          <h1 className="text-2xl font-black text-white capitalize tracking-tight leading-none mt-0.5">
            {user?.name || 'Sporcu'} <span className="text-lg">⚡️</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white border border-white/8 transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button onClick={handleLogout} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-red-400 border border-white/8 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="px-5 pt-5 space-y-6 max-w-2xl mx-auto">

        {/* ── ROZET SATIRI ──────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lvl.bg} ${lvl.color} ${lvl.border}`}>
            {lvl.label}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-gray-300">
            {cfg.emoji} {cfg.label}
          </span>
          {user?.position && (
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20 bg-amber-500/10 text-amber-400">
              {user.position}
            </span>
          )}
        </div>

        {/* ── HERO KARTI ─────────────────────────────── */}
        <section
          onClick={() => router.push(cfg.link)}
          className="relative w-full rounded-3xl overflow-hidden cursor-pointer group"
          style={{ height: '220px' }}
        >
          {/* Gradient arka plan */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-90`} />
          {/* Desen */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />
          {/* İçerik */}
          <div className="relative h-full flex flex-col justify-between p-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">{cfg.workoutType}</span>
              <h2 className="text-3xl font-black text-white mt-1 leading-tight drop-shadow">{cfg.heroTitle}</h2>
              <p className="text-white/70 text-sm font-medium mt-1">{cfg.heroSub}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-white/80 text-sm font-medium">
                <span className="flex items-center gap-1"><Clock size={14} /> {cfg.duration} dk</span>
                <span className="flex items-center gap-1"><Flame size={14} /> {cfg.kcal} kcal</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); router.push(cfg.link); }}
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                <Play size={14} fill="black" /> Başla
              </button>
            </div>
          </div>
        </section>

        {/* ── İSTATİSTİK KARTLARI ─────────────────────── */}
        <section className="grid grid-cols-2 gap-3">
          {/* VKİ */}
          <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Scale size={16} className="text-blue-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">VKİ</span>
            </div>
            <p className="text-3xl font-black text-white">{bmi ?? '—'}</p>
            <p className={`text-xs font-bold mt-1 ${bmiLabel === 'Normal' ? 'text-emerald-400' :
                bmiLabel === 'Zayıf' ? 'text-blue-400' : 'text-orange-400'
              }`}>{bmiLabel ?? 'Henüz bilgi yok'}</p>
          </div>

          {/* Kilo & Boy */}
          <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Ruler size={16} className="text-emerald-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Ölçüler</span>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold">
                <span className="text-2xl font-black">{user?.weight ?? '—'}</span>
                <span className="text-gray-500 text-sm ml-1">kg</span>
              </p>
              <p className="text-white font-bold">
                <span className="text-xl font-black">{user?.height ?? '—'}</span>
                <span className="text-gray-500 text-sm ml-1">cm</span>
              </p>
            </div>
          </div>

          {/* Motivasyon */}
          <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Star size={16} className="text-yellow-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Hedef</span>
            </div>
            <p className="text-white font-bold text-sm leading-snug">{user?.motivation || '—'}</p>
          </div>

          {/* Yaş */}
          <div className="bg-white/5 border border-white/8 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <User size={16} className="text-purple-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Yaş & Cinsiyet</span>
            </div>
            <p className="text-3xl font-black text-white">{user?.age ?? '—'}</p>
            <p className="text-xs font-bold mt-1 text-gray-400">{user?.gender || '—'}</p>
          </div>
        </section>

        {/* ── HAFTALIK TAKVİM ──────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Calendar size={18} className="text-amber-500" /> Bu Hafta
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {weekItems.map((item, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-16 rounded-2xl border transition-all ${item.isToday
                    ? `bg-gradient-to-br ${cfg.gradient} border-transparent shadow-lg`
                    : item.isPast
                      ? 'bg-white/5 border-white/5 opacity-50'
                      : 'bg-white/5 border-white/8'
                  }`}
              >
                <span className={`text-xs font-bold ${item.isToday ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                {item.isPast && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />}
                {item.isToday && <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 animate-pulse" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── HIZLI ERİŞİM LINKLERI ─────────────────────── */}
        <section>
          <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-amber-500" /> Hızlı Erişim
          </h2>
          <div className="space-y-3">
            {[
              {
                title: `${cfg.emoji} ${cfg.label} Programı`,
                desc: `${user?.position ? user.position + ' · ' : ''}${user?.level || ''} seviye plan`,
                link: cfg.link,
                icon: <Play size={18} className="text-white" fill="white" />,
                grad: cfg.gradient,
              },
              {
                title: '💪 Fitness & Gym',
                desc: 'Push / Pull / Legs rutini',
                link: '/gym',
                icon: <Activity size={18} className="text-violet-400" />,
                grad: 'from-violet-500 to-purple-700',
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.link)}
                className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl px-5 py-4 transition-all group text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.grad} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>

      </main>

      {/* ── ALT NAVİGASYON ──────────────────────────── */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center justify-around max-w-2xl mx-auto px-6 h-20">
          {[
            { id: 'home', icon: <Home size={22} />, label: 'Ana Sayfa' },
            { id: 'schedule', icon: <Calendar size={22} />, label: 'Program' },
            { id: 'play', special: true },
            { id: 'stats', icon: <BarChart2 size={22} />, label: 'İstatistik' },
            { id: 'profile', icon: <User size={22} />, label: 'Profil' },
          ].map((item) =>
            item.special ? (
              <button
                key="play"
                onClick={() => router.push(cfg.link)}
                className={`-mt-8 w-16 h-16 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-2xl border-4 border-[#0d0d0d] hover:scale-110 active:scale-95 transition-transform`}
              >
                <Play size={22} fill="white" className="text-white ml-0.5" />
              </button>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id!)}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
              >
                {item.icon}
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            )
          )}
        </div>
      </nav>
    </div>
  );
}