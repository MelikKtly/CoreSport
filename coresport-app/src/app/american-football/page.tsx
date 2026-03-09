'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, LogOut, User as UserIcon, Loader2, ChevronRight, Flame, Timer, TrendingUp, Shield, Zap, Target, Star, Activity, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { WorkoutTracker } from '@/components/WorkoutTracker';
import { AF_PROGRAMS } from '@/data/af-programs';

const API_URL = 'http://127.0.0.1:3001';

interface User { id: string; name: string; weight: number; height: number; sportBranch: string; level: string; position: string; age: number; }

// ─── TİP TANIMLARI ───────────────────────────────────────────────
interface Exercise { name: string; sets: string; reps: string; rest: string; tip: string; }
interface WorkoutDay { day: string; title: string; icon: React.ReactNode; exercises: Exercise[]; }
interface PositionProgram { tagline: string; emoji: string; color: string; keyAttributes: { label: string; value: string }[]; weeklyPlan: WorkoutDay[]; }

type Level = 'Başlangıç' | 'Orta' | 'İleri';
type PositionKey = 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'CB' | 'Safety' | 'Quarterback' | 'Running Back' | 'Wide Receiver' | 'Tight End' | 'Offensive Line' | 'Linebacker' | 'Cornerback' | 'Defensive Line' | string;

// ─── LEVEL MODİFİER ─────────────────────────────────────────────
// Her seviyede set/tekrar/dinlenme farklılığı
const levelMod: Record<string, { setSuffix: string; repSuffix: string; rest: string; label: string; color: string; bg: string }> = {
    'Başlangıç': { setSuffix: '3', repSuffix: '0.8x', rest: '90 sn', label: '🌱 Başlangıç', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    'Orta': { setSuffix: '4', repSuffix: '1x', rest: '75 sn', label: '⚡️ Orta', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    'İleri': { setSuffix: '5', repSuffix: '1.2x', rest: '60 sn', label: '🏆 İleri', color: 'text-red-400', bg: 'bg-red-500/20' },
};

// ─── TÜM POZİSYON PROGRAMLARI ───────────────────────────────────
const buildProgram = (programs: Record<string, PositionProgram>): Record<string, PositionProgram> => programs;

const ALL_PROGRAMS = buildProgram({

    // ── QB ──────────────────────────────────────────────────────────
    QB: {
        tagline: 'Sahayı yönet. Her pasın arkasında sağlam bir mekanik ol.',
        emoji: '🏈',
        color: 'from-blue-500 to-indigo-700',
        keyAttributes: [
            { label: 'Pas Doğruluğu', value: '% ile ölçülür' },
            { label: 'Reaksiyon Hızı', value: 'Hızlı okuma' },
            { label: 'Liderlik', value: "Hudle'ı yönet" },
            { label: 'Pocket Farkındalığı', value: 'Baskıyı hisset' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Pocket Drill & Mekanik', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'Drop-Back Hareketi (3-5-7 adım)', sets: '4', reps: '10', rest: '45s', tip: 'Topuk-parmak ucu ile ger adım at, mekaniği kilitle.' },
                    { name: 'Pas Fırlatma Isınması', sets: '3', reps: '15', rest: '30s', tip: 'Bileğini döndür, release noktası tutarlı olsun.' },
                    { name: 'Scramble & Set Drill', sets: '4', reps: '8', rest: '45s', tip: 'Pocket dışına çıkarken hızlı ayak işi yap.' },
                    { name: 'Plank (Core stabilite)', sets: '3', reps: '30sn', rest: '30s', tip: 'QB core gücü pas gücünden gelir.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Göz Antrenmanı & Read', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Pre-Snap Okuma Drili', sets: '5', reps: '5 senaryo', rest: '60s', tip: 'Safety pozisyonuna bak, zone/man anla.' },
                    { name: 'Progressions Drill (1-2-3 hedef)', sets: '4', reps: '8', rest: '45s', tip: 'İlk hedef yoksa B\'ye geç, bekletme.' },
                    { name: 'Back Pedal + Throw', sets: '3', reps: '10', rest: '60s', tip: 'Hareket içinde pas at, durmadan fırlat.' },
                    { name: 'Film İzleme', sets: '—', reps: '20 dk', rest: '—', tip: 'Geçen haftaki 3 hatayı bul ve not al.' },
                ],
            },
            {
                day: 'CUM', title: 'Atletizm & Kondisyon', icon: <Zap className="w-5 h-5" />,
                exercises: [
                    { name: 'Pro Agility (5-10-5)', sets: '5', reps: '1 tur', rest: '75s', tip: 'Düşük merkez, hızlı pivot.' },
                    { name: 'Squat (Vücut Ağırlığı→Bar)', sets: '4', reps: '8', rest: '90s', tip: 'Diz stabilitesi kritik, pas şiddeti buradan gelir.' },
                    { name: 'Band Shoulder External Rotation', sets: '3', reps: '15', rest: '30s', tip: 'Omuz sağlığı QBnin sigortasıdır.' },
                    { name: 'Tempo Sprint %70', sets: '6', reps: '50m', rest: '60s', tip: 'Aerobik taban 4. çeyrek performansını belirler.' },
                ],
            },
        ],
    },

    // ── RB ──────────────────────────────────────────────────────────
    RB: {
        tagline: 'Her temas güç, her adım alınan mesafe. Sahayı parçala.',
        emoji: '💨',
        color: 'from-orange-500 to-red-700',
        keyAttributes: [
            { label: 'Patlayıcı İvme', value: 'İlk 10 yard' },
            { label: 'Vizyonu', value: 'Deliği gör' },
            { label: 'Pas Alımı', value: 'Route running' },
            { label: 'Blok Teslimi', value: 'Pass protection' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Patlayıcı Hız & İvme', icon: <Zap className="w-5 h-5" />,
                exercises: [
                    { name: '10-Yard Burst Sprint', sets: '6', reps: '10m', rest: '90s', tip: 'İlk adım en kritik, ön eğimini koru.' },
                    { name: 'Box Jump', sets: '4', reps: '5', rest: '90s', tip: 'Yumuşak iniş, refleks için çabuk dur.' },
                    { name: 'Koni Drili (Dört Köşe)', sets: '5', reps: '1 tur', rest: '75s', tip: 'Viraj geçişinde kalça düşük kalsın.' },
                    { name: 'Glute Bridge (Ağırlıklı)', sets: '4', reps: '12', rest: '45s', tip: 'RB gücünün temeli kalça kaslarındadır.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Ball Security & Vision', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'Top Tutma Drili (Strip)', sets: '4', reps: '20', rest: '30s', tip: '5 temas noktası: parmak, el, ön kol, göğüs, koltuk.' },
                    { name: 'Vision Koşusu (Cones)', sets: '4', reps: '1 rota', rest: '60s', tip: 'Göz her zaman savunmaya baksın, yere değil.' },
                    { name: 'Cut Drill (45°)', sets: '5', reps: '6 kesim', rest: '45s', tip: 'Cut anında tek adım dur, patlayıcı çıkış yap.' },
                    { name: 'Catching Drill (Soft Hands)', sets: '3', reps: '15', rest: '30s', tip: 'Topu göğüs yerine elle yakala.' },
                ],
            },
            {
                day: 'CUM', title: 'Güç & Dayanıklılık', icon: <Activity className="w-5 h-5" />,
                exercises: [
                    { name: 'Trap Bar Deadlift', sets: '4', reps: '6', rest: '120s', tip: 'Nötr omurga, kalçayla it.' },
                    { name: 'Walking Lunge (DB)', sets: '3', reps: '12 her bacak', rest: '75s', tip: 'RB yürüyüşünü taklit et, uzun adım.' },
                    { name: 'Sled Push', sets: '4', reps: '20m', rest: '90s', tip: 'Düşük gövde açısı, kısa güçlü adımlar.' },
                    { name: 'Hip Flexor Germe', sets: '3', reps: '30sn her taraf', rest: '—', tip: 'Hız için kalça fleksörü uzun kalsın.' },
                ],
            },
        ],
    },

    // ── WR ──────────────────────────────────────────────────────────
    WR: {
        tagline: 'Hız, yön değiştirme ve eller. Savunmayı geç, skoru al.',
        emoji: '⚡️',
        color: 'from-yellow-400 to-orange-600',
        keyAttributes: [
            { label: 'Rota Keskinliği', value: 'Break noktası' },
            { label: 'Başlangıç Hızı', value: 'Release off line' },
            { label: 'Yakalama', value: 'Hands & COD' },
            { label: 'Man Beater', value: 'vs Coverage' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Rota Koşusu & Release', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'Stem Koşusu (Vertikal)', sets: '5', reps: '20m', rest: '45s', tip: 'Savunmacıyı iç yönde zorla, break noktasında patlat.' },
                    { name: 'In/Out Cut Drili', sets: '4', reps: '8 her yön', rest: '45s', tip: 'Kesim açısı en az 90°, ayak yere düz basmalı.' },
                    { name: 'Jam Release (Dummy)', sets: '4', reps: '6', rest: '60s', tip: 'Swim, rip veya push tekniği ile CB bloğunu kır.' },
                    { name: 'Agility Merdiveni (High Knees)', sets: '4', reps: '3 tur', rest: '30s', tip: 'Ayak frekansını artır, diz yüksek.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Yakalama & El Kuvveti', icon: <Star className="w-5 h-5" />,
                exercises: [
                    { name: 'JUGS Makinesi Catch (her açı)', sets: '5', reps: '20 pas', rest: '30s', tip: 'Gözün topun üzerinde kalsın, eller önde.' },
                    { name: 'Tek El Yakalama Drili', sets: '4', reps: '10 (her el)', rest: '30s', tip: 'Parmak uçlarıyla yakala, bilekten döndür.' },
                    { name: 'Contested Catch (vs DB)', sets: '3', reps: '8', rest: '60s', tip: 'Beden pozisyonu — CB önüne geç.' },
                    { name: 'Grip Strengthener / Dead Hang', sets: '3', reps: '30sn', rest: '30s', tip: 'El gücü atlama ve yakalama kalitesini artırır.' },
                ],
            },
            {
                day: 'CUM', title: 'Hız & Explosiveness', icon: <Zap className="w-5 h-5" />,
                exercises: [
                    { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'Drive phase 15 yard, transition ve max hız.' },
                    { name: 'Resisted Sprint (Band)', sets: '4', reps: '20m', rest: '90s', tip: 'Bant ile dirençli koşu stride uzunluğunu artırır.' },
                    { name: 'Nordic Curl (Hamstring)', sets: '3', reps: '5', rest: '90s', tip: 'WR hamstring sakatlığına karşı en iyi önlem.' },
                    { name: 'Depth Jump', sets: '3', reps: '4', rest: '90s', tip: 'Yerle temas süresi minimal, hızlı elastik reaktif güç.' },
                ],
            },
        ],
    },

    // ── TE ──────────────────────────────────────────────────────────
    TE: {
        tagline: 'Hem güç hem hız. Bloğunu yap, rota koş, topu yakala.',
        emoji: '🔄',
        color: 'from-purple-500 to-pink-700',
        keyAttributes: [
            { label: 'Blok Gücü', value: 'Run blok' },
            { label: 'Rota Koşusu', value: 'Seam & Cross' },
            { label: 'Yakalama', value: 'YAC sonrası' },
            { label: 'Fizik', value: 'Boylu ve güçlü' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Blok & Fizik', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Run Block Drive (pad)', sets: '4', reps: '8', rest: '60s', tip: 'Alçak çıkış, dirsek genişliği kadar tut, sür.' },
                    { name: 'Bench Press', sets: '4', reps: '8', rest: '90s', tip: 'TE için üst vücut gücü blok oranını belirler.' },
                    { name: 'Sled Pull (harnessed)', sets: '3', reps: '20m', rest: '90s', tip: 'Blok sürerken kayma hissi yarat.' },
                    { name: 'Hip Hinge (KB Swing)', sets: '4', reps: '12', rest: '45s', tip: 'Kalça odaklı güç, blok drive gücü buradan.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Rota & Yakalama', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'Seam Route Koşusu', sets: '5', reps: '1 rota', rest: '45s', tip: 'LB ile S arasındaki boşluktan geç, hız kesmeden dön.' },
                    { name: 'Back Shoulder Catch', sets: '3', reps: '10', rest: '30s', tip: 'Topu vücudun gerisinde yakala, eli geri döndür.' },
                    { name: 'YAC (Catch & Run)', sets: '4', reps: '8', rest: '60s', tip: 'Yakaladıktan sonra hemen omuz düşür ve sür.' },
                    { name: 'High Point Catch (havada)', sets: '3', reps: '10', rest: '45s', tip: 'En yüksek noktada el kilitlensin, beden arkada.' },
                ],
            },
            {
                day: 'CUM', title: 'Athletes & Conditioning', icon: <Activity className="w-5 h-5" />,
                exercises: [
                    { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'TE için olimpik lift güç-hız kombinasyonunu geliştirir.' },
                    { name: 'Hex Bar Jump Squat', sets: '4', reps: '5', rest: '90s', tip: 'Patlayıcı güç, blok çıkış hızını artırır.' },
                    { name: 'Lateral Bound', sets: '3', reps: '8 her taraf', rest: '60s', tip: 'Rota kesme ve yön değiştirme kapasitesi.' },
                    { name: 'Farmer Walk', sets: '4', reps: '30m', rest: '60s', tip: 'Yakalama gücü ve kor stabilitesi.' },
                ],
            },
        ],
    },

    // ── OL ──────────────────────────────────────────────────────────
    OL: {
        tagline: 'Görünmez kahraman. Hattı tut, koridoru aç, takımını koru.',
        emoji: '🛡️',
        color: 'from-gray-500 to-slate-700',
        keyAttributes: [
            { label: 'Güç', value: 'Push power' },
            { label: 'Ayak İşi', value: 'Lateral hareketlilik' },
            { label: 'Pass Pro', value: 'Seta koruma' },
            { label: 'Takım Koordinasyon', value: 'Komşu OL ile' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Pass Protection & Stance', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Kick Slide Drili', sets: '5', reps: '10m', rest: '45s', tip: 'Alçak kalça, çapraz adım atmadan sür.' },
                    { name: 'Punch Drili (pad)', sets: '4', reps: '10', rest: '45s', tip: 'Her iki el eş zamanlı, dirsek içte kalsın.' },
                    { name: 'Mirror Drili (vs Rush)', sets: '4', reps: '8', rest: '60s', tip: 'Önce merkezi koru, sonra tepki ver.' },
                    { name: 'Squat (Ağır)', sets: '5', reps: '5', rest: '150s', tip: 'OL rakip ağırlığını taşımalı, güç her şeydir.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Run Blocking & Drive', icon: <Activity className="w-5 h-5" />,
                exercises: [
                    { name: 'Drive Block (sled)', sets: '5', reps: '10m', rest: '60s', tip: 'Alçak çıkış, kademeli dik duruşa geç.' },
                    { name: 'Double Team Block', sets: '3', reps: '8', rest: '75s', tip: 'Komşu OL ile senkron; aynı anda bas.' },
                    { name: 'Trap Block (iç hat)', sets: '4', reps: '6', rest: '60s', tip: 'Hız ve açıyı bul, DT\'yi köşele.' },
                    { name: 'Deadlift', sets: '4', reps: '5', rest: '150s', tip: 'OL için deadlift hamstring-kalça zincirine direktir.' },
                ],
            },
            {
                day: 'CUM', title: 'Kondisyon & Mobilite', icon: <Star className="w-5 h-5" />,
                exercises: [
                    { name: 'Sled Push (ağır)', sets: '5', reps: '20m', rest: '90s', tip: '4. çeyrek aynı gücü korumak için kondisyon şart.' },
                    { name: 'Duck Walk (kalça açım)', sets: '3', reps: '15m', rest: '45s', tip: 'Stance açısı düzgün olursa gücü zemine aktarırsın.' },
                    { name: 'Foam Roll (iç uyluk)', sets: '3', reps: '45sn her taraf', rest: '—', tip: 'Kasık sakatlığını en iyi önlem mobilite çalışması.' },
                    { name: 'Turkish Get-Up (KB)', sets: '3', reps: '5 her taraf', rest: '60s', tip: 'Omuz sağlığı ve kor stabilitesi.' },
                ],
            },
        ],
    },

    // ── DL ──────────────────────────────────────────────────────────
    DL: {
        tagline: 'Hattı yıkıyorsun. Sack, tackle for loss, baskı. Görevin bu.',
        emoji: '🧱',
        color: 'from-red-600 to-rose-900',
        keyAttributes: [
            { label: 'Güç', value: 'Point of attack' },
            { label: 'Pass Rush', value: 'Sack & HIT' },
            { label: 'Blok Yok Etme', value: 'Penetrasyon' },
            { label: 'Kondisyon', value: 'Her playde aynı şiddet' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Pass Rush Moves', icon: <Zap className="w-5 h-5" />,
                exercises: [
                    { name: 'Swim Move Drili', sets: '5', reps: '8', rest: '45s', tip: 'Dış elini salla, iç elinle OL\'yi itele.' },
                    { name: 'Rip Move Drili', sets: '5', reps: '8', rest: '45s', tip: 'Alçak rip, OL kolu altından geç.' },
                    { name: 'Bull Rush (sled)', sets: '4', reps: '10m', rest: '75s', tip: 'Mükemmel stance, kısa güçlü adımlar.' },
                    { name: 'Chop Block Resist', sets: '3', reps: '6', rest: '60s', tip: 'Alçak kalça, diz bükülü, devrilme.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Run Stop & Gap', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Gap Control Drili (cones)', sets: '4', reps: '1 tur', rest: '60s', tip: 'Gap\'ini bırakma, penetrasyon yerine kontrol.' },
                    { name: 'Tackle For Loss (dummy)', sets: '4', reps: '6', rest: '45s', tip: 'Bekle, bekle, patlat — sabır kritik.' },
                    { name: 'Bench Press (patlayıcı)', sets: '4', reps: '6', rest: '90s', tip: 'Hızlı iter, punch gücü buradan.' },
                    { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'DL için çeviklik olimpik lift ile gelişir.' },
                ],
            },
            {
                day: 'CUM', title: 'Güç & Patlayıcılık', icon: <Flame className="w-5 h-5" />,
                exercises: [
                    { name: 'Squat (Maksimum)', sets: '5', reps: '3 @85%', rest: '180s', tip: 'DL ağırlığını alt pozisyondan patlayıcı kaldır.' },
                    { name: 'Hang Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'Birinci adım hızını artırır.' },
                    { name: 'Explosive Push-Up', sets: '4', reps: '8', rest: '45s', tip: 'Ellerin yerden kalkmalı, punch benzetmesi.' },
                    { name: 'Hip Thrust (Ağır)', sets: '4', reps: '8', rest: '90s', tip: 'Kalça gücü DL birinci adım büyüklüğünü belirler.' },
                ],
            },
        ],
    },

    // ── LB ──────────────────────────────────────────────────────────
    LB: {
        tagline: 'Sahayı okuyorsun. Her hareketi görüyor, ilk reaksiyon veren sensin.',
        emoji: '👁️',
        color: 'from-teal-500 to-cyan-700',
        keyAttributes: [
            { label: 'Saha Okuma', value: 'Pre-snap IQ' },
            { label: 'Fizik', value: 'Güç + çeviklik' },
            { label: 'Coverage', value: 'Zone + Man' },
            { label: 'Blitz', value: 'Hızlı geçiş' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Saha Okuma & Reaksiyon', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'Shuffle & Tackle (dummy)', sets: '4', reps: '8', rest: '45s', tip: 'Adımların sabit, gözlerin backfield\'de.' },
                    { name: 'Zone Drop Drili', sets: '4', reps: '6 senaryo', rest: '60s', tip: 'QB eyes\'ı takip et, zone\'un derin kenarına at.' },
                    { name: 'Blitz Timing Drili', sets: '5', reps: '1 atılma', rest: '60s', tip: 'Snap anında patlat, seç yanlış gamble olur.' },
                    { name: 'Backpedal + Reaksiyon', sets: '4', reps: '10m + dönüş', rest: '45s', tip: 'Yavaş geri, hızlı dönüş.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Tackling & Güç', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Angle Tackle (dummy)', sets: '4', reps: '8', rest: '45s', tip: 'Açılı teslimlerde baş pozisyonu kritik.' },
                    { name: 'Squat / Front Squat', sets: '4', reps: '6', rest: '120s', tip: 'LB hem hızlı hem güçlü olmalı, alt vücut temeli.' },
                    { name: 'Lateral Speed Drill', sets: '4', reps: '10m x2 yön', rest: '60s', tip: 'Zone coverage için lateral hız şart.' },
                    { name: 'Pull-Up (sırt gücü)', sets: '3', reps: '8', rest: '75s', tip: 'RB tutma ve bloğu kırma için sırt kuvveti.' },
                ],
            },
            {
                day: 'CUM', title: 'Çeviklik & Kondisyon', icon: <Activity className="w-5 h-5" />,
                exercises: [
                    { name: 'T-Drill', sets: '5', reps: '1 tur', rest: '75s', tip: 'LB için en kritik yön değiştirme metriği.' },
                    { name: 'Koni Pro Agility', sets: '5', reps: '1 tur', rest: '60s', tip: 'Her köşede alçak merkez, konsantrasyon.' },
                    { name: 'Tempo Sprint', sets: '8', reps: '80m %70', rest: '60s', tip: '4. periyot için aerobik altyapı.' },
                    { name: 'Core Circuit (Plank+Bird Dog)', sets: '3', reps: '4 egzersiz', rest: '45s', tip: 'LB core stabilitesi tüm hareketlerin temelidir.' },
                ],
            },
        ],
    },

    // ── CB ──────────────────────────────────────────────────────────
    CB: {
        tagline: 'WR\'ı kapat, pasın önüne geç. İzolasyon ustası sensin.',
        emoji: '🔒',
        color: 'from-violet-500 to-purple-800',
        keyAttributes: [
            { label: 'Press Coverage', value: 'Man to man' },
            { label: 'Backpedal Hızı', value: 'Hızlı geri adım' },
            { label: 'Pick 6', value: 'İnterception' },
            { label: 'Konumlanma', value: 'Hip turn' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Coverage & Hip Turn', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Hip Turn Drili (WR takip)', sets: '5', reps: '8', rest: '45s', tip: 'Baş önce döner, kalça ikinci; WR\'ı gözden kaybetme.' },
                    { name: 'Backpedal Sprint', sets: '5', reps: '10m geri + 20m ileri', rest: '60s', tip: 'Geri hız kritik, denge kaybetme.' },
                    { name: 'Jam Release vs WR', sets: '4', reps: '6', rest: '60s', tip: 'İlk 5 yard içinde WR rutinini boz.' },
                    { name: 'Ball Tracking Drili', sets: '4', reps: '10', rest: '30s', tip: 'QB\'ye bak, WR\'ı hisset, topa geç.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Çeviklik & Hız', icon: <Zap className="w-5 h-5" />,
                exercises: [
                    { name: 'W-Drill (geniş alan)', sets: '4', reps: '1 tur', rest: '75s', tip: 'Her cut noktasında en az hız kaybı.' },
                    { name: 'Butt Kick Sprint', sets: '5', reps: '30m', rest: '60s', tip: 'Dönüş hızını ve adım frekansını geliştirir.' },
                    { name: 'Mirror Drili (vs WR)', sets: '4', reps: '10sn süre', rest: '45s', tip: 'Reaksiyon eğitimi — WR nereye giderse.' },
                    { name: 'Deceleration Drill', sets: '4', reps: '6', rest: '45s', tip: 'Hızlı durmak, hızlı başlamak kadar önemli.' },
                ],
            },
            {
                day: 'CUM', title: 'Güç & Kondisyon', icon: <Flame className="w-5 h-5" />,
                exercises: [
                    { name: 'Romanian Deadlift', sets: '4', reps: '8', rest: '90s', tip: 'CB hamstring gücü sprint ve cut kalitesini artırır.' },
                    { name: 'Single-Leg Squat (pistol)', sets: '3', reps: '8 her bacak', rest: '75s', tip: 'Tek bacak dengesi çok yönlü koşu için şart.' },
                    { name: 'Resistance Band Side Walk', sets: '4', reps: '15m x2 yön', rest: '45s', tip: 'Lateral kuvvet, press coverage için temel.' },
                    { name: "Vertikal Sıçrama (INT catch sim.)", sets: '4', reps: '5', rest: '60s', tip: 'Pick-6 anı: en yüksekte yakala.' },
                ],
            },
        ],
    },

    // ── Safety ──────────────────────────────────────────────────────
    Safety: {
        tagline: 'Son hat sensin. Saha kontrolü, run desteği ve derin pas okuma.',
        emoji: '🏹',
        color: 'from-emerald-500 to-green-800',
        keyAttributes: [
            { label: 'Saha Kontrolü', value: 'Deep coverage' },
            { label: 'Run Support', value: 'Hızlı geliş' },
            { label: 'Komunikasyon', value: 'DB organizing' },
            { label: 'Erkek Okuma', value: 'Pre-snap read' },
        ],
        weeklyPlan: [
            {
                day: 'PZT', title: 'Deep Coverage & Read', icon: <Target className="w-5 h-5" />,
                exercises: [
                    { name: 'High Point Drill (derin pas)', sets: '4', reps: '10', rest: '45s', tip: 'WR ile iç içe olmadan topu gör ve geç.' },
                    { name: 'QB Eyes Tracking', sets: '4', reps: '5 senaryo', rest: '60s', tip: 'QB omzu nereye dönerse, pas oraya.' },
                    { name: 'Zone Drop (deep half)', sets: '4', reps: '6', rest: '45s', tip: 'Hash ortasını koru, açığı tahmin et.' },
                    { name: 'Angle Run Support', sets: '4', reps: '8', rest: '45s', tip: 'Downhill hızlı, aşırı agresif olmadan.' },
                ],
            },
            {
                day: 'ÇAR', title: 'Tackling & Closing Speed', icon: <Shield className="w-5 h-5" />,
                exercises: [
                    { name: 'Open-Field Tackle', sets: '4', reps: '6', rest: '60s', tip: 'Güvenli kol kavraması, başın yanında asla önünde değil.' },
                    { name: 'Sprint (Downhill)', sets: '6', reps: '30m', rest: '75s', tip: 'Kapama hızın gönderim sonrası başlar, ilk adım kritik.' },
                    { name: 'Lateral Coverage (hashten boundary)', sets: '4', reps: '10m', rest: '45s', tip: 'Diagonal yol: FS için en kritik mesafe.' },
                    { name: 'Box Drill', sets: '4', reps: '1 tur', rest: '60s', tip: 'Köşelerde denge ve yön değiştirme.' },
                ],
            },
            {
                day: 'CUM', title: 'Atletizm & Kondisyon', icon: <Activity className="w-5 h-5" />,
                exercises: [
                    { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'Closing speed: Safety en önemli metriklerden biri.' },
                    { name: 'Bulgarian Split Squat', sets: '4', reps: '10 her bacak', rest: '75s', tip: 'Hip stability ve sprint mekaniği için.' },
                    { name: 'Band Pull Apart (omuz sağlığı)', sets: '3', reps: '20', rest: '30s', tip: 'Derin pas coverage için omuz açıklığı şart.' },
                    { name: 'Tempo Run (100m x6)', sets: '6', reps: '100m %70', rest: '60s', tip: "Safety'nin 4. çeyrek dayanıklılığı bu altyapıdan gelir." },
                ],
            },
        ],
    },
});

// Pozisyon isim normalizasyonu
function normalizePosition(pos: string): string {
    const map: Record<string, string> = {
        'Quarterback': 'QB', 'Running Back': 'RB', 'Wide Receiver': 'WR',
        'Tight End': 'TE', 'Offensive Line': 'OL', 'Defensive Line': 'DL',
        'Linebacker': 'LB', 'Cornerback': 'CB', 'S': 'Safety',
    };
    return map[pos] || pos;
}

export default function AmericanFootballPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    const [activeWorkout, setActiveWorkout] = useState<{ title: string; exercises: { name: string; sets: string; reps: string; tip: string }[] } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
                if (!userId || !token) throw new Error('Oturum bilgisi bulunamadı.');
                const res = await fetch(`${API_URL}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
                if (!res.ok) throw new Error('Kullanıcı bilgisi alınamadı.');
                setUser(await res.json());
            } catch (err: any) {
                setError(err.message);
                setTimeout(() => router.push('/login'), 3000);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="bg-red-900/20 border border-red-800 p-8 rounded-2xl max-w-md text-center">
                <p className="text-red-400 font-bold mb-2">Hata</p>
                <p className="text-gray-300">{error}</p>
            </div>
        </div>
    );

    const level = (user?.level || 'Başlangıç') as 'Başlangıç' | 'Orta' | 'İleri';
    const posKey = normalizePosition(user?.position || 'QB');
    const posData = AF_PROGRAMS[posKey] || AF_PROGRAMS['QB'];
    const levelProgram = posData.programs[level] || posData.programs['Başlangıç'];
    const weeklyPlan = levelProgram.weeklyPlan;
    const lvlMod = levelMod[level] || levelMod['Başlangıç'];
    const intensityByLevel: Record<string, { sets: string; intensityLabel: string; repNote: string }> = {
        'Başlangıç': { sets: '3', intensityLabel: 'Düşük-Orta', repNote: 'Teknik öncelikli, %60-70 yoğunluk' },
        'Orta': { sets: '4', intensityLabel: 'Orta-Yüksek', repNote: 'Performans odaklı, %75-82 yoğunluk' },
        'İleri': { sets: '5', intensityLabel: 'Maksimum', repNote: 'Elit yük, %85-95 yoğunluk' },
    };
    const intensity = intensityByLevel[level] || intensityByLevel['Başlangıç'];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 pb-24">

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-black tracking-wide text-white text-lg hidden sm:block">
                            CORE<span className="text-amber-500">FOOTBALL</span>
                        </span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className={`hidden sm:flex px-3 py-1 rounded-full text-sm font-bold border ${lvlMod.bg} ${lvlMod.color} border-current/30`}>
                            {lvlMod.label}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-sm font-bold text-white capitalize hidden sm:block">{user?.name}</span>
                        </div>
                        <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative pt-24 pb-12 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-br ${posData.color} opacity-10 blur-[120px] rounded-full`} />
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Üst rozetler */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${lvlMod.bg} ${lvlMod.color} border-current/20`}>
                            {lvlMod.label} Seviye
                        </span>
                        <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-bold">
                            {posData.emoji} {posKey === 'Safety' ? 'Safety' : posKey} — {user?.position}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
                        AMERİKAN<br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${posData.color}`}>
                            FUTBOLU
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mt-4 leading-relaxed">{levelProgram.tagline}</p>

                    {/* Anahtar özellikler */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                        {posData.keyAttributes.map((attr, i) => (
                            <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{attr.label}</p>
                                <p className="text-sm text-white font-bold mt-1">{attr.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Program özeti */}
                    <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5"><Timer className="w-4 h-4 text-amber-500" /> {weeklyPlan.length} Gün / Hafta</div>
                        <div className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-500" /> {intensity.intensityLabel} Yoğunluk</div>
                        <div className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-400" /> {intensity.repNote}</div>
                    </div>
                </div>
            </header>

            {/* HAFTALIK PROGRAM */}
            <main className="max-w-4xl mx-auto px-4 space-y-3">
                <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                    <Shield className="text-amber-500 w-5 h-5" /> HAFTALIK PLAN — {posKey} / {user?.position} / {lvlMod.label}
                </h2>

                {weeklyPlan.map((workout, idx) => {
                    const isOpen = expandedDay === idx;
                    return (
                        <div key={idx} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-amber-500/40 bg-white/5' : 'border-white/8 bg-white/[0.02] hover:border-white/15'}`}>
                            <button onClick={() => setExpandedDay(isOpen ? null : idx)} className="w-full p-5 flex items-center gap-4 text-left">
                                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border transition-colors ${isOpen ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                    <span className="text-lg">🏋️</span>
                                    <span className="text-[9px] font-black mt-0.5 tracking-widest">{workout.day}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-black text-lg transition-colors ${isOpen ? 'text-amber-400' : 'text-white'}`}>{workout.title}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{intensity.sets} Set · {intensity.intensityLabel}</p>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-90 text-amber-400' : ''}`} />
                            </button>

                            {isOpen && (
                                <div className="px-5 pb-5 border-t border-white/5 space-y-3 mt-2">
                                    {workout.exercises.map((ex, ei) => (
                                        <div key={ei} className="bg-black/30 rounded-xl p-4 flex items-start gap-4 border border-white/5">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">{ei + 1}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                    <span className="font-bold text-white">{ex.name}</span>
                                                    <div className="flex gap-3 text-xs font-medium text-gray-400">
                                                        <span className="text-amber-400/80">{intensity.sets} set</span>
                                                        <span>{ex.reps}</span>
                                                        {ex.rest !== '—' && <span className="text-gray-600">Dinlenme: {ex.rest}</span>}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1.5 italic">💡 {ex.tip}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Antrenmana Başla Butonu */}
                                    <button
                                        onClick={() => setActiveWorkout({ title: workout.title, exercises: workout.exercises })}
                                        className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-lg"
                                    >
                                        <Play size={16} fill="white" /> Antrenmana Başla
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </main>

            {/* WorkoutTracker Overlay */}
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
