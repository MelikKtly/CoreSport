'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play, Flame, Clock, Home, BarChart2,
  User, Bell, ChevronRight, Loader2, LogOut,
  Scale, Ruler, Calendar, TrendingUp,
  ChevronDown, Dumbbell, Trophy, Pencil, Check, X,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';

interface UserData {
  id: string; name: string; email: string;
  sportBranch: string; position: string; level: string;
  weight: number; height: number; age: number;
  motivation: string; gender: string;
}

interface WorkoutLog {
  id: string;
  workoutTitle: string;
  durationMinutes: number;
  totalSets: number;
  totalReps: number;
  totalWeightKg: number | null;
  notes: string;
  exercises: { name: string; sets: number; reps: number; weightKg: number | null; completed: boolean }[];
  createdAt: string;
}

interface Stats {
  totalSessions: number;
  totalMinutes: number;
  totalSets: number;
  totalWeightKg: number;
  weeklySessions: number;
  weeklyMinutes: number;
  recentLogs: WorkoutLog[];
}

// Branş konfigürasyonu
const branchConfig: Record<string, { link: string; gradient: string; label: string; emoji: string; kcal: string; duration: string }> = {
  'Amerikan Futbolu': { link: '/american-football', gradient: 'from-amber-500 to-orange-600', label: 'Amerikan Futbolu', emoji: '🏈', kcal: '480-600', duration: '65' },
  'Basketbol': { link: '/basketball', gradient: 'from-orange-500 to-red-600', label: 'Basketbol', emoji: '🏀', kcal: '400-520', duration: '60' },
  'Snowboard': { link: '/snowboard', gradient: 'from-blue-400 to-cyan-600', label: 'Snowboard', emoji: '🏔️', kcal: '320-420', duration: '55' },
  'Fitness': { link: '/gym', gradient: 'from-violet-500 to-purple-700', label: 'Fitness & Gym', emoji: '💪', kcal: '350-500', duration: '60' },
};

const levelCfg: Record<string, { color: string; bg: string; border: string; label: string }> = {
  'Başlangıç': { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: '🌱 Başlangıç' },
  'Orta': { color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', label: '⚡️ Orta' },
  'İleri': { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: '🏆 İleri' },
};

// Haftanın başlangıcını bul (Pazartesi)
function getWeekStart(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', weekday: 'short' });
}

function formatWeekLabel(weekStart: Date) {
  const start = weekStart.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  const end = new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  return `${start} – ${end}`;
}

// Haftaya göre gruplama
function groupByWeek(logs: WorkoutLog[]) {
  const weeks: Record<string, WorkoutLog[]> = {};
  for (const log of logs) {
    const ws = getWeekStart(new Date(log.createdAt));
    const key = ws.toISOString();
    if (!weeks[key]) weeks[key] = [];
    weeks[key].push(log);
  }
  return Object.entries(weeks)
    .map(([key, logs]) => ({ weekStart: new Date(key), logs }))
    .sort((a, b) => b.weekStart.getTime() - a.weekStart.getTime());
}

// Son 8 haftanın session sayısı (bar chart)
function getLast8WeeksBars(logs: WorkoutLog[]) {
  const now = new Date();
  const bars: { label: string; count: number; minutes: number }[] = [];
  for (let i = 7; i >= 0; i--) {
    const ws = getWeekStart(new Date(now.getTime() - i * 7 * 86400000));
    const we = new Date(ws.getTime() + 7 * 86400000);
    const weekLogs = logs.filter(l => {
      const d = new Date(l.createdAt);
      return d >= ws && d < we;
    });
    bars.push({
      label: ws.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
      count: weekLogs.length,
      minutes: weekLogs.reduce((s, l) => s + l.durationMinutes, 0),
    });
  }
  return bars;
}

const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [allLogs, setAllLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);

  // --- DÜZENLEME MODU ---
  const [editMode, setEditMode] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    weight: '', height: '', age: '', level: '', position: '', motivation: '', gender: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!userId || !token) { router.push('/login'); return; }

      const headers = { Authorization: `Bearer ${token}` };
      const [userRes, statsRes, logsRes] = await Promise.all([
        fetch(`http://127.0.0.1:3001/user/${userId}`, { headers }),
        fetch(`http://127.0.0.1:3001/workout-log/user/${userId}/stats`, { headers }),
        fetch(`http://127.0.0.1:3001/workout-log/user/${userId}`, { headers }),
      ]);

      if (userRes.ok) {
        const u = await userRes.json();
        setUser(u);
        setEditForm({
          weight: u.weight ? String(u.weight) : '',
          height: u.height ? String(u.height) : '',
          age: u.age ? String(u.age) : '',
          level: u.level || '',
          position: u.position || '',
          motivation: u.motivation || '',
          gender: u.gender || '',
        });
      } else { localStorage.clear(); router.push('/login'); return; }
      if (statsRes.ok) setStats(await statsRes.json());
      if (logsRes.ok) setAllLogs(await logsRes.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [router]);

  const handleSaveProfile = async () => {
    setEditSaving(true);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      await fetch(`http://127.0.0.1:3001/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          weight: editForm.weight ? parseFloat(editForm.weight) : undefined,
          height: editForm.height ? parseFloat(editForm.height) : undefined,
          age: editForm.age ? parseInt(editForm.age) : undefined,
          level: editForm.level || undefined,
          position: editForm.position || undefined,
          motivation: editForm.motivation || undefined,
          gender: editForm.gender || undefined,
        }),
      });
      setEditMode(false);
      await fetchData(); // Güncel veriyi çek
    } catch { /* ignore */ }
    finally { setEditSaving(false); }
  };

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-white/30 animate-spin" />
    </div>
  );

  const branch = user?.sportBranch || 'Fitness';
  const cfg = branchConfig[branch] || branchConfig['Fitness'];
  const lvl = levelCfg[user?.level || 'Başlangıç'] || levelCfg['Başlangıç'];

  const bmi = user?.weight && user?.height
    ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(1) : null;
  const bmiLabel = bmi
    ? Number(bmi) < 18.5 ? 'Zayıf' : Number(bmi) < 25 ? 'Normal' : Number(bmi) < 30 ? 'Fazla Kilolu' : 'Obez'
    : null;

  const today = new Date().getDay();
  const mondayOffset = today === 0 ? -6 : 1 - today;
  const weekItems = weekDays.map((d, i) => {
    const offset = mondayOffset + i;
    return { label: d, isToday: offset === 0, isPast: offset < 0 };
  });

  const bars = getLast8WeeksBars(allLogs);
  const maxCount = Math.max(...bars.map(b => b.count), 1);
  const weeklyGroups = groupByWeek(allLogs);

  // ── Ana Sayfa ──────────────────────────────────────────────────
  const HomeTab = () => (
    <div className="space-y-6">
      {/* Rozetler */}
      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${lvl.bg} ${lvl.color} ${lvl.border}`}>{lvl.label}</span>
        <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-gray-300">{cfg.emoji} {cfg.label}</span>
        {user?.position && <span className="px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20 bg-amber-500/10 text-amber-400">{user.position}</span>}
      </div>

      {/* Hero Kart */}
      <section onClick={() => router.push(cfg.link)} className="relative w-full rounded-3xl overflow-hidden cursor-pointer group" style={{ height: 200 }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient}`} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative h-full flex flex-col justify-between p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Bugünkü Antrenman</p>
            <h2 className="text-2xl font-black text-white drop-shadow">Sahaya Dön 🏈</h2>
            <p className="text-white/70 text-sm font-medium mt-1">Pozisyon programın seni bekliyor</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-white/80 text-sm font-medium">
              <span className="flex items-center gap-1"><Clock size={13} /> {cfg.duration} dk</span>
              <span className="flex items-center gap-1"><Flame size={13} /> {cfg.kcal} kcal</span>
            </div>
            <button onClick={e => { e.stopPropagation(); router.push(cfg.link); }} className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
              <Play size={13} fill="black" /> Başla
            </button>
          </div>
        </div>
      </section>

      {/* Stats özet */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Bu Hafta</p>
          <p className="text-3xl font-black text-white">{stats?.weeklySessions ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">antrenman</p>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Toplam</p>
          <p className="text-3xl font-black text-white">{stats?.totalSessions ?? 0}</p>
          <p className="text-xs text-gray-500 mt-1">seans</p>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <Scale size={14} className="text-blue-400 mb-2" />
          <p className="text-2xl font-black text-white">{bmi ?? '—'}</p>
          <p className={`text-xs font-bold mt-1 ${bmiLabel === 'Normal' ? 'text-emerald-400' : 'text-orange-400'}`}>{bmiLabel ?? '—'}</p>
        </div>
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <Ruler size={14} className="text-emerald-400 mb-2" />
          <p className="text-xl font-black text-white">{user?.weight ?? '—'} <span className="text-gray-500 text-sm">kg</span></p>
          <p className="text-xl font-black text-white mt-1">{user?.height ?? '—'} <span className="text-gray-500 text-sm">cm</span></p>
        </div>
      </div>

      {/* Haftalık takvim */}
      <div>
        <h2 className="text-base font-black text-white mb-3 flex items-center gap-2"><Calendar size={16} className="text-amber-500" /> Bu Hafta</h2>
        <div className="flex gap-2">
          {weekItems.map((item, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center justify-center h-14 rounded-2xl border transition-all ${item.isToday ? `bg-gradient-to-br ${cfg.gradient} border-transparent` : item.isPast ? 'bg-white/5 border-white/5 opacity-50' : 'bg-white/5 border-white/8'}`}>
              <span className={`text-[10px] font-bold ${item.isToday ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
              {item.isPast && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />}
              {item.isToday && <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>

      {/* Hızlı erişim */}
      <div>
        <h2 className="text-base font-black text-white mb-3">⚡️ Hızlı Erişim</h2>
        <button onClick={() => router.push(cfg.link)} className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/8 rounded-2xl px-5 py-4 transition-all">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0`}>
            <Play size={16} fill="white" className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-white text-sm">{cfg.emoji} {cfg.label} Programı</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.position ? user.position + ' · ' : ''}{user?.level} seviye</p>
          </div>
          <ChevronRight size={16} className="text-gray-600 flex-shrink-0" />
        </button>
      </div>
    </div>
  );

  // ── İstatistik Sekmesi ─────────────────────────────────────────
  const StatsTab = () => (
    <div className="space-y-6">
      {/* Özet Stat Kartları */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <Trophy size={16} className="text-yellow-400" />, label: 'Toplam Seans', value: stats?.totalSessions ?? 0, unit: 'antrenman', color: 'bg-yellow-500/15' },
          { icon: <Clock size={16} className="text-blue-400" />, label: 'Toplam Süre', value: stats?.totalMinutes ?? 0, unit: 'dakika', color: 'bg-blue-500/15' },
          { icon: <Dumbbell size={16} className="text-purple-400" />, label: 'Toplam Set', value: stats?.totalSets ?? 0, unit: 'set', color: 'bg-purple-500/15' },
          { icon: <TrendingUp size={16} className="text-emerald-400" />, label: 'Kaldırılan Ağırlık', value: stats?.totalWeightKg ?? 0, unit: 'kg', color: 'bg-emerald-500/15' },
        ].map((s, i) => (
          <div key={i} className={`${s.color} border border-white/8 rounded-2xl p-4`}>
            <div className="mb-2">{s.icon}</div>
            <p className="text-2xl font-black text-white">{s.value.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">{s.unit}</p>
            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart: Son 8 Hafta */}
      <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
        <h3 className="text-sm font-black text-white mb-1">Haftalık Antrenman</h3>
        <p className="text-xs text-gray-600 mb-5">Son 8 hafta · seans sayısı</p>
        <div className="flex items-end gap-1.5 h-32">
          {bars.map((bar, i) => {
            const isCurrentWeek = i === 7;
            const heightPct = maxCount > 0 ? (bar.count / maxCount) * 100 : 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full relative flex items-end justify-center" style={{ height: '96px' }}>
                  {bar.count > 0 && (
                    <div
                      className="absolute bottom-0 w-full rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${Math.max(heightPct, 8)}%`,
                        background: isCurrentWeek
                          ? `linear-gradient(to top, #f59e0b, #f97316)`
                          : 'rgba(255,255,255,0.12)',
                      }}
                    />
                  )}
                  {bar.count === 0 && (
                    <div className="absolute bottom-0 w-full h-1 rounded-full bg-white/5" />
                  )}
                  {bar.count > 0 && (
                    <span className="absolute -top-5 text-[10px] font-black text-gray-400">{bar.count}</span>
                  )}
                </div>
                <span className={`text-[9px] font-bold text-center leading-tight ${isCurrentWeek ? 'text-amber-400' : 'text-gray-700'}`}>
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
        {allLogs.length === 0 && (
          <p className="text-center text-gray-600 text-sm mt-4">Henüz antrenman kaydı yok</p>
        )}
      </div>

      {/* Hafta Hafta Geçmiş */}
      <div>
        <h3 className="text-sm font-black text-white mb-3">📅 Hafta Hafta Geçmiş</h3>
        {weeklyGroups.length === 0 ? (
          <div className="bg-white/5 border border-white/8 rounded-2xl p-6 text-center">
            <p className="text-gray-600 text-sm">Antrenman kaydın bulunmuyor.</p>
            <p className="text-gray-700 text-xs mt-1">İlk antrenmanını tamamladıktan sonra burada görünecek.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {weeklyGroups.map(({ weekStart, logs: wLogs }) => {
              const key = weekStart.toISOString();
              const isOpen = expandedWeek === key;
              const totalMin = wLogs.reduce((s, l) => s + l.durationMinutes, 0);
              const totalKg = wLogs.reduce((s, l) => s + (l.totalWeightKg || 0), 0);
              const isThisWeek = getWeekStart(new Date()).toISOString() === key;

              return (
                <div key={key} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-amber-500/30 bg-white/5' : 'border-white/8 bg-white/3'}`}>
                  <button onClick={() => setExpandedWeek(isOpen ? null : key)} className="w-full p-4 flex items-center gap-3 text-left">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isThisWeek ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                      📅
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-sm">{formatWeekLabel(weekStart)}</p>
                        {isThisWeek && <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Bu Hafta</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{wLogs.length} seans · {totalMin} dk{totalKg > 0 ? ` · ${Math.round(totalKg)} kg` : ''}</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 px-4 pb-4 pt-3 space-y-3">
                      {wLogs.map((log) => (
                        <div key={log.id} className="bg-black/30 rounded-xl p-4 border border-white/5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <p className="font-bold text-white text-sm">{log.workoutTitle}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{formatDate(log.createdAt)}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0 text-[11px] font-bold">
                              <span className="px-2 py-0.5 bg-amber-500/15 text-amber-400 rounded-lg">{log.durationMinutes} dk</span>
                              {log.totalWeightKg && <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 rounded-lg">{log.totalWeightKg} kg</span>}
                            </div>
                          </div>

                          {/* Egzersiz Detayları */}
                          <div className="space-y-2">
                            {log.exercises?.filter(e => e.completed).map((ex, ei) => (
                              <div key={ei} className="flex items-center justify-between text-xs">
                                <span className="text-gray-400 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                  {ex.name}
                                </span>
                                <span className="text-gray-600 font-medium flex-shrink-0 ml-2">
                                  {ex.sets}×{ex.reps}{ex.weightKg ? ` @${ex.weightKg}kg` : ''}
                                </span>
                              </div>
                            ))}
                            {log.exercises?.filter(e => !e.completed).length > 0 && (
                              <p className="text-[11px] text-gray-700 italic mt-1">
                                {log.exercises.filter(e => !e.completed).length} egzersiz atlandı
                              </p>
                            )}
                          </div>

                          {log.notes && (
                            <p className="mt-3 text-xs text-gray-600 italic border-t border-white/5 pt-2">"{log.notes}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // ── Program Sekmesi ────────────────────────────────────────────
  const ScheduleTab = () => {
    const now = new Date();
    const thisWeekStart = getWeekStart(now);
    const lastWeekStart = new Date(thisWeekStart.getTime() - 7 * 86400000);

    const thisWeekLogs = allLogs.filter(l => {
      const d = new Date(l.createdAt);
      return d >= thisWeekStart && d < new Date(thisWeekStart.getTime() + 7 * 86400000);
    });
    const lastWeekLogs = allLogs.filter(l => {
      const d = new Date(l.createdAt);
      return d >= lastWeekStart && d < thisWeekStart;
    });

    // Aylık takvim
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfWeek = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1;
    const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const logDays = new Set(allLogs.map(l => new Date(l.createdAt).toDateString()));
    const logCountByDay: Record<string, number> = {};
    for (const log of allLogs) {
      const key = new Date(log.createdAt).toDateString();
      logCountByDay[key] = (logCountByDay[key] || 0) + 1;
    }
    const calendarCells: (number | null)[] = [
      ...Array(firstDayOfWeek).fill(null),
      ...Array.from({ length: totalDays }, (_, i) => i + 1),
    ];
    while (calendarCells.length % 7 !== 0) calendarCells.push(null);

    const diffPct = (a: number, b: number) => b === 0 ? (a > 0 ? 100 : 0) : Math.round(((a - b) / b) * 100);
    const comparisons = [
      { label: 'Seans', thisW: thisWeekLogs.length, lastW: lastWeekLogs.length, icon: <Trophy size={14} className="text-yellow-400" /> },
      { label: 'Dakika', thisW: thisWeekLogs.reduce((s, l) => s + l.durationMinutes, 0), lastW: lastWeekLogs.reduce((s, l) => s + l.durationMinutes, 0), icon: <Clock size={14} className="text-blue-400" /> },
      { label: 'Set', thisW: thisWeekLogs.reduce((s, l) => s + l.totalSets, 0), lastW: lastWeekLogs.reduce((s, l) => s + l.totalSets, 0), icon: <Dumbbell size={14} className="text-purple-400" /> },
      { label: 'Kg', thisW: Math.round(thisWeekLogs.reduce((s, l) => s + (l.totalWeightKg || 0), 0)), lastW: Math.round(lastWeekLogs.reduce((s, l) => s + (l.totalWeightKg || 0), 0)), icon: <TrendingUp size={14} className="text-emerald-400" /> },
    ];

    const workoutCards = [
      { day: 'Pazartesi', label: 'Kuvvet', icon: '💪', color: 'from-amber-500 to-orange-600', desc: 'Üst vücut + core', dow: 1 },
      { day: 'Çarşamba', label: 'Çeviklik', icon: '⚡️', color: 'from-blue-500 to-cyan-600', desc: 'Drill + kondisyon', dow: 3 },
      { day: 'Cuma', label: 'Atletizm', icon: '🏃', color: 'from-emerald-500 to-teal-600', desc: 'Sprint + esneklik', dow: 5 },
    ];

    return (
      <div className="space-y-6 pt-2">
        {/* 1. Bu Haftanın 3 Antrenman Kartı */}
        <div>
          <h2 className="text-base font-black text-white mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-amber-500" /> Bu Haftanın Planı
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {workoutCards.map((card, i) => {
              const isToday = now.getDay() === card.dow;
              return (
                <div key={i} className={`relative rounded-2xl overflow-hidden border ${isToday ? 'border-amber-500/50' : 'border-white/8'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-15`} />
                  <div className="relative p-3">
                    <p className="text-xl mb-1">{card.icon}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{card.day}</p>
                    <p className="text-sm font-black text-white mt-0.5">{card.label}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{card.desc}</p>
                    {isToday && <span className="absolute top-2 right-2 text-[9px] font-black text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded-full">BUGÜN</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 space-y-2">
            {thisWeekLogs.length === 0 ? (
              <div className="py-4 px-5 bg-white/3 border border-white/5 rounded-2xl text-center">
                <p className="text-gray-600 text-sm">Bu hafta henüz antrenman yok</p>
              </div>
            ) : thisWeekLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">{log.workoutTitle}</p>
                    <p className="text-xs text-gray-500">{formatDate(log.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-[11px] font-bold flex-shrink-0">
                  <span className="px-2 py-0.5 bg-amber-500/15 text-amber-400 rounded-lg">{log.durationMinutes} dk</span>
                  <span className="px-2 py-0.5 bg-white/5 text-gray-400 rounded-lg">{log.totalSets} set</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Aylık Takvim Grid */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
          <h3 className="text-sm font-black text-white mb-4">
            {now.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-600 uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((day, i) => {
              if (!day) return <div key={i} />;
              const cellDate = new Date(now.getFullYear(), now.getMonth(), day);
              const key = cellDate.toDateString();
              const hasLog = logDays.has(key);
              const count = logCountByDay[key] || 0;
              const isToday = day === now.getDate();
              return (
                <div key={i} className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-bold
                  ${isToday ? 'bg-amber-500 text-black' : hasLog ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/30' : 'text-gray-700'}`}>
                  {day}
                  {hasLog && !isToday && count > 1 && <span className="text-[8px]">{count}x</span>}
                  {hasLog && !isToday && count === 1 && <div className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5" />}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Bugün</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" /> Antrenman yapıldı</div>
          </div>
        </div>

        {/* 3. Haftadan Haftaya Karşılaştırma */}
        <div>
          <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-amber-500" /> Geçen Haftaya Göre
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {comparisons.map((c, i) => {
              const pct = diffPct(c.thisW, c.lastW);
              const up = pct > 0; const eq = pct === 0;
              return (
                <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 mb-2">{c.icon}
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{c.label}</p>
                  </div>
                  <p className="text-2xl font-black text-white">{c.thisW.toLocaleString('tr-TR')}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs font-bold ${eq ? 'text-gray-500' : up ? 'text-emerald-400' : 'text-red-400'}`}>
                    {eq ? <Minus size={12} /> : up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    <span>{eq ? 'Aynı' : `${Math.abs(pct)}% ${up ? 'artış' : 'düşüş'}`}</span>
                    <span className="text-gray-600 font-normal ml-1">geçen: {c.lastW}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 font-sans pb-28 overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Hoş Geldin</p>
          <h1 className="text-2xl font-black text-white capitalize tracking-tight leading-none mt-0.5">
            {user?.name || 'Sporcu'} ⚡️
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 border border-white/8 transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-red-400 border border-white/8 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 pt-5 max-w-2xl mx-auto">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'stats' && <StatsTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'profile' && (
          <div className="space-y-4 pt-2 pb-4">
            {/* Başlık + Düzenle butonu */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Profil</h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-2xl text-sm font-bold hover:bg-amber-500/25 transition-colors"
                >
                  <Pencil size={14} /> Düzenle
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditMode(false); }}
                    className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-2xl text-sm font-bold"
                  >
                    <X size={14} /> İptal
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={editSaving}
                    className="flex items-center gap-1 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl text-sm font-bold hover:bg-emerald-500/30 transition-colors"
                  >
                    {editSaving ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} /> Kaydet</>}
                  </button>
                </div>
              )}
            </div>

            {/* Salt Okunur Alanlar (düzenlenemiyor) */}
            {[
              { label: 'Ad', value: user?.name },
              { label: 'E-posta', value: user?.email },
              { label: 'Branş', value: user?.sportBranch },
            ].map((row, i) => row.value ? (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 bg-white/3 border border-white/5 rounded-2xl opacity-70">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{row.label}</span>
                <span className="text-sm font-bold text-gray-400">{row.value}</span>
              </div>
            ) : null)}

            {/* Düzenlenebilir Alanlar */}
            <div className="space-y-3">
              {/* Cinsiyet */}
              <div className="px-5 py-4 bg-white/5 border border-white/8 rounded-2xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Cinsiyet</p>
                {editMode ? (
                  <div className="flex gap-2">
                    {['Kadın', 'Erkek'].map(g => (
                      <button key={g} onClick={() => setEditForm(f => ({ ...f, gender: g }))}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${editForm.gender === g ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}>{g}</button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-white">{user?.gender || '—'}</p>
                )}
              </div>

              {/* Seviye */}
              <div className="px-5 py-4 bg-white/5 border border-white/8 rounded-2xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Seviye</p>
                {editMode ? (
                  <div className="flex gap-2">
                    {['Başlangıç', 'Orta', 'İleri'].map(l => (
                      <button key={l} onClick={() => setEditForm(f => ({ ...f, level: l }))}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${editForm.level === l
                          ? 'bg-amber-500 text-black'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}>{l}</button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-white">{user?.level || '—'}</p>
                )}
              </div>

              {/* Pozisyon */}
              <div className="px-5 py-4 bg-white/5 border border-white/8 rounded-2xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pozisyon / Disiplin</p>
                {editMode ? (
                  <input
                    value={editForm.position}
                    onChange={e => setEditForm(f => ({ ...f, position: e.target.value }))}
                    placeholder="Örn: Quarterback, Point Guard..."
                    className="w-full bg-white/5 text-white placeholder-gray-600 text-sm font-bold px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/50"
                  />
                ) : (
                  <p className="text-sm font-bold text-white">{user?.position || '—'}</p>
                )}
              </div>

              {/* Sayısal Alanlar */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'weight', label: 'Kilo', unit: 'kg', min: 30, max: 250 },
                  { key: 'height', label: 'Boy', unit: 'cm', min: 100, max: 250 },
                  { key: 'age', label: 'Yaş', unit: '', min: 10, max: 100 },
                ].map(field => (
                  <div key={field.key} className="px-4 py-4 bg-white/5 border border-white/8 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{field.label}</p>
                    {editMode ? (
                      <input
                        type="number"
                        value={editForm[field.key as keyof typeof editForm]}
                        onChange={e => setEditForm(f => ({ ...f, [field.key]: e.target.value }))}
                        min={field.min} max={field.max}
                        className="w-full text-center bg-transparent text-white font-black text-xl focus:outline-none"
                      />
                    ) : (
                      <p className="text-xl font-black text-white">
                        {user?.[field.key as keyof UserData] ?? '—'}
                      </p>
                    )}
                    {field.unit && <p className="text-xs text-gray-600 mt-0.5">{field.unit}</p>}
                  </div>
                ))}
              </div>

              {/* Hedef / Motivasyon */}
              <div className="px-5 py-4 bg-white/5 border border-white/8 rounded-2xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hedef</p>
                {editMode ? (
                  <textarea
                    value={editForm.motivation}
                    onChange={e => setEditForm(f => ({ ...f, motivation: e.target.value }))}
                    placeholder="Spordan hedefin nedir?"
                    className="w-full bg-transparent text-white text-sm font-bold resize-none focus:outline-none placeholder-gray-600 min-h-[48px]"
                  />
                ) : (
                  <p className="text-sm font-bold text-white">{user?.motivation || '—'}</p>
                )}
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSaveProfile}
                disabled={editSaving}
                className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                {editSaving ? <Loader2 size={20} className="animate-spin" /> : <><Check size={18} /> Profili Kaydet</>}
              </button>
            )}
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center justify-around max-w-2xl mx-auto px-6 h-20">
          {[
            { id: 'home', icon: <Home size={22} />, label: 'Ana Sayfa' },
            { id: 'stats', icon: <BarChart2 size={22} />, label: 'İstatistik' },
            { id: 'play', special: true },
            { id: 'schedule', icon: <Calendar size={22} />, label: 'Program' },
            { id: 'profile', icon: <User size={22} />, label: 'Profil' },
          ].map((item) =>
            item.special ? (
              <button key="play" onClick={() => router.push(cfg.link)}
                className={`-mt-8 w-16 h-16 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-2xl border-4 border-[#0d0d0d] hover:scale-110 active:scale-95 transition-transform`}>
                <Play size={22} fill="white" className="text-white ml-0.5" />
              </button>
            ) : (
              <button key={item.id} onClick={() => setActiveTab(item.id!)}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}>
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