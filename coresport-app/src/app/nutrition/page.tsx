'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Flame, Droplets, Plus, X, Search, ChevronDown, Trash2, Star } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface User {
    id: string; name: string; weight: number; height: number; age: number;
    gender: string; sportBranch: string; position: string; level: string;
}
interface FoodLogEntry {
    id: string; foodName: string; gramsConsumed: number;
    calories: number; protein: number; carb: number; fat: number;
    mealType: string; createdAt: string;
}

// ── Türkiye'de yaygın besinler veritabanı (100g başına) ──
const FOOD_DB: { name: string; kcal: number; protein: number; carb: number; fat: number; emoji: string }[] = [
    { name: 'Tavuk Göğsü', kcal: 165, protein: 31, carb: 0, fat: 3.6, emoji: '🍗' },
    { name: 'Kırmızı Et (dana)', kcal: 250, protein: 26, carb: 0, fat: 15, emoji: '🥩' },
    { name: 'Ton Balığı (konserve)', kcal: 130, protein: 29, carb: 0, fat: 1, emoji: '🐟' },
    { name: 'Somon', kcal: 208, protein: 20, carb: 0, fat: 13, emoji: '🐠' },
    { name: 'Yumurta', kcal: 155, protein: 13, carb: 1.1, fat: 11, emoji: '🥚' },
    { name: 'Yumurta Akı', kcal: 52, protein: 11, carb: 0.7, fat: 0.2, emoji: '🍳' },
    { name: 'Greek Yoğurt', kcal: 59, protein: 10, carb: 3.6, fat: 0.4, emoji: '🫙' },
    { name: 'Lor Peyniri', kcal: 98, protein: 11, carb: 3.4, fat: 4.3, emoji: '🧀' },
    { name: 'Süt (tam yağlı)', kcal: 61, protein: 3.2, carb: 4.8, fat: 3.3, emoji: '🥛' },
    { name: 'Whey Protein (1 ölçek)', kcal: 120, protein: 25, carb: 3, fat: 1.5, emoji: '💊' },
    { name: 'Yulaf Ezmesi', kcal: 389, protein: 17, carb: 66, fat: 7, emoji: '🌾' },
    { name: 'Esmer Pirinç', kcal: 111, protein: 2.6, carb: 23, fat: 0.9, emoji: '🍚' },
    { name: 'Makarna (pişmiş)', kcal: 131, protein: 5, carb: 25, fat: 1.1, emoji: '🍝' },
    { name: 'Ekmek (tam tahıl)', kcal: 247, protein: 13, carb: 41, fat: 3.4, emoji: '🍞' },
    { name: 'Tatlı Patates', kcal: 86, protein: 1.6, carb: 20, fat: 0.1, emoji: '🍠' },
    { name: 'Patates', kcal: 77, protein: 2, carb: 17, fat: 0.1, emoji: '🥔' },
    { name: 'Muz', kcal: 89, protein: 1.1, carb: 23, fat: 0.3, emoji: '🍌' },
    { name: 'Elma', kcal: 52, protein: 0.3, carb: 14, fat: 0.2, emoji: '🍎' },
    { name: 'Portakal', kcal: 47, protein: 0.9, carb: 12, fat: 0.1, emoji: '🍊' },
    { name: 'Avokado', kcal: 160, protein: 2, carb: 9, fat: 15, emoji: '🥑' },
    { name: 'Badem', kcal: 579, protein: 21, carb: 22, fat: 50, emoji: '🥜' },
    { name: 'Ceviz', kcal: 654, protein: 15, carb: 14, fat: 65, emoji: '🌰' },
    { name: 'Fıstık Ezmesi', kcal: 588, protein: 25, carb: 20, fat: 50, emoji: '🥜' },
    { name: 'Zeytinyağı', kcal: 884, protein: 0, carb: 0, fat: 100, emoji: '🫒' },
    { name: 'Pirinç (pişmiş)', kcal: 130, protein: 2.7, carb: 28, fat: 0.3, emoji: '🍚' },
    { name: 'Mercimek (pişmiş)', kcal: 116, protein: 9, carb: 20, fat: 0.4, emoji: '🫘' },
    { name: 'Nohut (pişmiş)', kcal: 164, protein: 9, carb: 27, fat: 2.6, emoji: '🫘' },
    { name: 'Brokoli', kcal: 34, protein: 2.8, carb: 7, fat: 0.4, emoji: '🥦' },
    { name: 'Ispanak', kcal: 23, protein: 2.9, carb: 3.6, fat: 0.4, emoji: '🥬' },
    { name: 'Domates', kcal: 18, protein: 0.9, carb: 3.9, fat: 0.2, emoji: '🍅' },
    { name: 'Zeytinyağlı Salata', kcal: 80, protein: 1, carb: 6, fat: 6, emoji: '🥗' },
];

const MEAL_TYPES = ['Kahvaltı', 'Öğle', 'Akşam', 'Ara Öğün'];

const positionNutrition: Record<string, { proteinMultiplier: number; carbPct: number; fatPct: number; goal: string }> = {
    QB: { proteinMultiplier: 2.0, carbPct: 45, fatPct: 25, goal: 'Yalın Kas + Performans' },
    RB: { proteinMultiplier: 2.2, carbPct: 50, fatPct: 20, goal: 'Patlayıcı Güç + Hız' },
    WR: { proteinMultiplier: 1.9, carbPct: 47, fatPct: 23, goal: 'Hız + Hafiflik' },
    TE: { proteinMultiplier: 2.2, carbPct: 43, fatPct: 25, goal: 'Güç + Devamlılık' },
    OL: { proteinMultiplier: 2.3, carbPct: 42, fatPct: 28, goal: 'Maksimum Güç Kütlesi' },
    DL: { proteinMultiplier: 2.3, carbPct: 40, fatPct: 28, goal: 'Güç + Kondisyon' },
    LB: { proteinMultiplier: 2.1, carbPct: 45, fatPct: 25, goal: 'Güç + Dayanıklılık' },
    CB: { proteinMultiplier: 1.9, carbPct: 48, fatPct: 23, goal: 'Hız + Hafiflik + Reaktivite' },
    Safety: { proteinMultiplier: 2.0, carbPct: 45, fatPct: 25, goal: 'Dayanıklılık + Güç Dengesi' },
};

const activityMultiplier: Record<string, number> = { 'Başlangıç': 1.55, 'Orta': 1.725, 'İleri': 1.9 };

function calcBMR(w: number, h: number, a: number, g: string) {
    return g === 'Erkek' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
}
function normalizePos(pos: string): string {
    const map: Record<string, string> = { 'Quarterback': 'QB', 'Running Back': 'RB', 'Wide Receiver': 'WR', 'Tight End': 'TE', 'Offensive Line': 'OL', 'Defensive Line': 'DL', 'Linebacker': 'LB', 'Cornerback': 'CB', 'Safety': 'Safety' };
    return map[pos] || 'QB';
}

export default function NutritionPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [logs, setLogs] = useState<FoodLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedFood, setSelectedFood] = useState<typeof FOOD_DB[0] | null>(null);
    const [grams, setGrams] = useState('100');
    const [mealType, setMealType] = useState('Kahvaltı');
    const [saving, setSaving] = useState(false);

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const token = typeof window !== 'undefined' ? (localStorage.getItem('accessToken') || localStorage.getItem('token')) : null;

    const fetchLogs = useCallback(async () => {
        if (!userId || !token) return;
        const r = await fetch(`${API_URL}/food-log/user/${userId}/today`, { headers: { Authorization: `Bearer ${token}` } });
        if (r.ok) setLogs(await r.json());
    }, [userId, token]);

    useEffect(() => {
        if (!userId || !token) { router.push('/login'); return; }
        setLoading(true);
        Promise.all([
            fetch(`${API_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : null),
            fetch(`${API_URL}/food-log/user/${userId}/today`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
        ]).then(([u, l]) => { if (u) setUser(u); setLogs(l || []); }).finally(() => setLoading(false));
    }, [userId, token, router]);

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="w-10 h-10 text-white/30 animate-spin" /></div>;
    if (!user) return null;

    const posKey = normalizePos(user.position || 'QB');
    const nutCfg = positionNutrition[posKey] || positionNutrition['QB'];
    const actMult = activityMultiplier[user.level] || 1.55;
    const bmr = user.weight && user.height && user.age ? calcBMR(user.weight, user.height, user.age, user.gender || 'Erkek') : 0;
    const tdee = Math.round(bmr * actMult);
    const targetProtein = Math.round((user.weight || 80) * nutCfg.proteinMultiplier);
    const targetFatKcal = Math.round(tdee * (nutCfg.fatPct / 100));
    const targetFat = Math.round(targetFatKcal / 9);
    const targetCarbKcal = tdee - targetProtein * 4 - targetFatKcal;
    const targetCarb = Math.round(targetCarbKcal / 4);

    // Bugünkü toplam
    const total = logs.reduce((acc, l) => ({
        kcal: acc.kcal + l.calories, protein: acc.protein + l.protein,
        carb: acc.carb + l.carb, fat: acc.fat + l.fat,
    }), { kcal: 0, protein: 0, carb: 0, fat: 0 });

    const pct = (val: number, target: number) => Math.min(100, target > 0 ? Math.round((val / target) * 100) : 0);

    // Öğüne göre grupla
    const byMeal: Record<string, FoodLogEntry[]> = {};
    for (const l of logs) {
        if (!byMeal[l.mealType]) byMeal[l.mealType] = [];
        byMeal[l.mealType].push(l);
    }

    const filteredFoods = FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

    const computedNutrients = selectedFood && grams ? {
        calories: Math.round(selectedFood.kcal * Number(grams) / 100),
        protein: Math.round(selectedFood.protein * Number(grams) / 100 * 10) / 10,
        carb: Math.round(selectedFood.carb * Number(grams) / 100 * 10) / 10,
        fat: Math.round(selectedFood.fat * Number(grams) / 100 * 10) / 10,
    } : null;

    async function addFood() {
        if (!selectedFood || !userId || !computedNutrients) return;
        setSaving(true);
        await fetch(`${API_URL}/food-log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userId, foodName: selectedFood.name, gramsConsumed: Number(grams), mealType, ...computedNutrients }),
        });
        await fetchLogs();
        setShowModal(false); setSelectedFood(null); setSearch(''); setGrams('100');
        setSaving(false);
    }

    async function deleteLog(id: string) {
        await fetch(`${API_URL}/food-log/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        setLogs(prev => prev.filter(l => l.id !== id));
    }

    const macroRows = [
        { label: 'Protein', consumed: Math.round(total.protein), target: targetProtein, unit: 'g', color: 'bg-amber-500' },
        { label: 'Karbonhidrat', consumed: Math.round(total.carb), target: targetCarb, unit: 'g', color: 'bg-emerald-500' },
        { label: 'Yağ', consumed: Math.round(total.fat), target: targetFat, unit: 'g', color: 'bg-blue-500' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 pb-20">
            {/* NAV */}
            <nav className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push('/dashboard')} className="p-2 text-gray-400 hover:text-white"><ArrowLeft size={20} /></button>
                    <div>
                        <h1 className="text-lg font-black text-white leading-none">Besin Günlüğü</h1>
                        <p className="text-xs text-gray-500">{posKey} · {nutCfg.goal}</p>
                    </div>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 rounded-2xl font-black text-sm text-black hover:brightness-110 active:scale-95 transition-all shadow-lg">
                    <Plus size={16} /> Yemek Ekle
                </button>
            </nav>

            <div className="max-w-2xl mx-auto px-4 pt-5 space-y-5">

                {/* Kalori Halkası */}
                <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Bugün Alınan</p>
                            <p className="text-5xl font-black text-white">{Math.round(total.kcal).toLocaleString('tr-TR')}</p>
                            <p className="text-gray-500 text-sm mt-1">/ {tdee > 0 ? tdee.toLocaleString('tr-TR') : '—'} kcal hedef</p>
                        </div>
                        {tdee > 0 && (
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeOpacity={0.05} strokeWidth="3" />
                                    <circle cx="18" cy="18" r="15.9" fill="none"
                                        stroke={pct(total.kcal, tdee) >= 100 ? '#ef4444' : '#f59e0b'}
                                        strokeWidth="3" strokeDasharray={`${pct(total.kcal, tdee)} 100`} strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-black text-white">%{pct(total.kcal, tdee)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Kalan */}
                    <div className="mt-4 flex gap-3">
                        <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Kalan</p>
                            <p className={`text-lg font-black ${tdee - Math.round(total.kcal) < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {tdee > 0 ? (tdee - Math.round(total.kcal)).toLocaleString('tr-TR') : '—'} kcal
                            </p>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Öğün</p>
                            <p className="text-lg font-black text-white">{logs.length}</p>
                        </div>
                        <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
                            <Droplets size={14} className="text-blue-400 mx-auto mb-1" />
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Su</p>
                            <p className="text-lg font-black text-blue-400">{user.weight ? `${(user.weight * 0.04).toFixed(1)}L` : '—'}</p>
                        </div>
                    </div>
                </div>

                {/* Makro Takibi */}
                <div className="space-y-3">
                    <h2 className="text-sm font-black text-white">Günlük Makrolar</h2>
                    {macroRows.map((m, i) => (
                        <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-bold text-white">{m.label}</p>
                                <p className="text-sm font-black">
                                    <span className="text-white">{m.consumed}{m.unit}</span>
                                    <span className="text-gray-600"> / {m.target}{m.unit}</span>
                                </p>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: `${pct(m.consumed, m.target)}%` }} />
                            </div>
                            <p className="text-[10px] text-gray-600 mt-1 text-right">%{pct(m.consumed, m.target)} tamamlandı</p>
                        </div>
                    ))}
                </div>

                {/* Öğün Listesi */}
                <div>
                    <h2 className="text-sm font-black text-white mb-3">Bugünkü Öğünler</h2>
                    {logs.length === 0 ? (
                        <div className="py-10 text-center bg-white/3 border border-white/5 rounded-2xl">
                            <p className="text-4xl mb-2">🍽️</p>
                            <p className="text-gray-600 text-sm">Henüz yemek eklenmedi</p>
                            <button onClick={() => setShowModal(true)} className="mt-3 text-amber-400 text-sm font-bold hover:text-amber-300 transition-colors">+ İlk öğünü ekle</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {MEAL_TYPES.filter(mt => byMeal[mt]?.length).map(mt => (
                                <div key={mt}>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">{mt}</h3>
                                        <span className="text-xs text-gray-600">
                                            {Math.round(byMeal[mt].reduce((s, l) => s + l.calories, 0))} kcal
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {byMeal[mt].map(log => (
                                            <div key={log.id} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/8 rounded-2xl">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-white truncate">{log.foodName}</p>
                                                    <p className="text-xs text-gray-500">{log.gramsConsumed}g</p>
                                                    <div className="flex gap-3 mt-1 text-[11px] font-bold">
                                                        <span className="text-amber-400">{Math.round(log.calories)} kcal</span>
                                                        <span className="text-gray-500">P: {Math.round(log.protein)}g</span>
                                                        <span className="text-gray-500">K: {Math.round(log.carb)}g</span>
                                                        <span className="text-gray-500">Y: {Math.round(log.fat)}g</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => deleteLog(log.id)} className="p-2 text-gray-700 hover:text-red-400 transition-colors flex-shrink-0">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* YEMEK EKLEME MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) { setShowModal(false); setSelectedFood(null); setSearch(''); } }}>
                    <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-black text-white">Yemek Ekle</h2>
                            <button onClick={() => { setShowModal(false); setSelectedFood(null); setSearch(''); }} className="p-2 text-gray-500 hover:text-white"><X size={20} /></button>
                        </div>

                        {/* Öğün Seçimi */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {MEAL_TYPES.map(mt => (
                                <button key={mt} onClick={() => setMealType(mt)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${mealType === mt ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-gray-400 border-white/8'}`}>
                                    {mt}
                                </button>
                            ))}
                        </div>

                        {/* Arama */}
                        <div className="relative mb-3">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                value={search} onChange={e => { setSearch(e.target.value); setSelectedFood(null); }}
                                placeholder="Besin ara (ör. Tavuk, Yulaf...)"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50"
                            />
                        </div>

                        {/* Besin Listesi */}
                        {!selectedFood && (
                            <div className="space-y-1 max-h-48 overflow-y-auto mb-4">
                                {filteredFoods.map((f, i) => (
                                    <button key={i} onClick={() => setSelectedFood(f)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/8 rounded-xl transition-colors text-left">
                                        <span className="text-lg flex-shrink-0">{f.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{f.name}</p>
                                            <p className="text-[11px] text-gray-500">{f.kcal} kcal · P:{f.protein}g K:{f.carb}g Y:{f.fat}g (100g)</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Seçili besin + gram */}
                        {selectedFood && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                    <span className="text-2xl">{selectedFood.emoji}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-sm">{selectedFood.name}</p>
                                        <p className="text-xs text-gray-500">100g → {selectedFood.kcal} kcal</p>
                                    </div>
                                    <button onClick={() => setSelectedFood(null)} className="text-gray-500 hover:text-white"><X size={16} /></button>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Miktar (gram)</label>
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {['50', '100', '150', '200', '250'].map(g => (
                                            <button key={g} onClick={() => setGrams(g)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${grams === g ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-gray-400 border-white/8'}`}>
                                                {g}g
                                            </button>
                                        ))}
                                    </div>
                                    <input type="number" value={grams} onChange={e => setGrams(e.target.value)} min={1} max={2000}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-amber-500/50" />
                                </div>

                                {computedNutrients && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { label: 'Kalori', value: `${computedNutrients.calories}`, color: 'text-amber-400' },
                                            { label: 'Protein', value: `${computedNutrients.protein}g`, color: 'text-white' },
                                            { label: 'Karbonhidrat', value: `${computedNutrients.carb}g`, color: 'text-emerald-400' },
                                            { label: 'Yağ', value: `${computedNutrients.fat}g`, color: 'text-blue-400' },
                                        ].map((n, i) => (
                                            <div key={i} className="bg-white/5 rounded-xl p-2 text-center">
                                                <p className={`text-sm font-black ${n.color}`}>{n.value}</p>
                                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-wide mt-0.5">{n.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button onClick={addFood} disabled={saving || !grams || Number(grams) <= 0}
                                    className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <><Star size={16} /> {mealType}&apos;a Ekle</>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
