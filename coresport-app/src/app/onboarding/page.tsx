"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ArrowLeft, Scale, Ruler, User, Zap, Heart, Trophy, Medal, Loader2 } from 'lucide-react';

// --- AYARLAR ---
// Backend adresi
const API_URL = 'http://127.0.0.1:3001';

// --- TypeScript Veri Tipleri ---
interface Interest {
  id: string;
  name: string;
  img: string;
  route: string;
}

interface Goal {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface Stats {
  gender: 'female' | 'male';
  age: number;
  height: number;
  weight: number;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const [isSaving, setIsSaving] = useState(false);

  // State: Seçilen veriler
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    gender: 'female',
    age: 25,
    height: 170,
    weight: 60
  });

  // --- YARDIMCI FONKSİYONLAR ---

  // 1. Token'ı al
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('access_token');
    }
    return null;
  };

  // 2. JWT Token'ı çözüp User ID'yi bulma
  const getUserIdFromToken = (token: string): string | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decoded = JSON.parse(jsonPayload);
      return decoded.sub || decoded.id || null;
    } catch (e) {
      console.error("Token çözümleme hatası:", e);
      return null;
    }
  };

  // 3. User ID'yi getir
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      let uid = localStorage.getItem('userId');
      if (!uid) {
        const token = getToken();
        if (token) {
          uid = getUserIdFromToken(token);
          if (uid) localStorage.setItem('userId', uid);
        }
      }
      return uid;
    }
    return null;
  };

  // Sayfa yüklendiğinde log bas (Geliştirme amaçlı)
  useEffect(() => {
    const token = getToken();
    const uid = getUserId();
    console.log("🔍 Onboarding Yüklendi | Token:", !!token, "| UserID:", uid);
  }, []);

  // Oturum kapatma (Hata durumunda kullanılır)
  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  // Veri: İlgi Alanları
  const interests: Interest[] = [
    {
      id: "american_football",
      name: "Amerikan Futbolu",
      img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      route: "/american-football"
    },
    {
      id: "snowboard",
      name: "Snowboard",
      img: "https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      route: "/snowboard"
    },
    {
      id: "basketball",
      name: "Basketbol",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      route: "/basketball"
    },
    {
      id: "gym",
      name: "Fitness & Gym",
      img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600",
      route: "/gym"
    }
  ];

  // Veri: Hedefler
  const goals: Goal[] = [
    { id: 'improve_skill', title: 'Teknik Gelişim', desc: 'Branşımda ustalaşmak ve seviye atlamak', icon: <Medal size={24} /> },
    { id: 'athletic_performance', title: 'Atletik Performans', desc: 'Daha hızlı, daha güçlü ve patlayıcı olmak', icon: <Zap size={24} /> },
    { id: 'competition', title: 'Yarışma & Maç', desc: 'Müsabakalara ve liglere hazırlanmak', icon: <Trophy size={24} /> },
    { id: 'health_hobby', title: 'Sağlık & Hobi', desc: 'Aktif kalmak, eğlenmek ve stres atmak', icon: <Heart size={24} /> },
  ];

  // --- İŞLEMLER ---

  const handleNext = () => {
    if (step === totalSteps) {
      saveProfile();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (targetId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(targetId)) {
        return prev.filter((item) => item !== targetId);
      } else {
        return [...prev, targetId];
      }
    });
  };

  // --- BACKEND KAYIT FONKSİYONU ---
  const saveProfile = async () => {
    setIsSaving(true);
    try {
      const token = getToken();
      const userId = getUserId();

      console.log(`[DEBUG] Kayıt İsteği: ${API_URL}/user/${userId}`);

      if (!userId || !token) {
        alert("HATA: Oturum bilgisi doğrulanamadı. Lütfen tekrar giriş yapın.");
        handleLogout();
        setIsSaving(false);
        return;
      }

      const mapIdToName: Record<string, string> = {
        american_football: 'Amerikan Futbolu',
        snowboard: 'Snowboard',
        basketball: 'Basketbol',
        gym: 'Fitness'
      };

      const mainInterestId = selectedInterests[0] || 'gym';
      const sportBranch = mapIdToName[mainInterestId];
      const mappedInterests = selectedInterests.map(id => mapIdToName[id] || id);
      const selectedGoalObj = goals.find(g => g.id === selectedGoal);
      const motivation = selectedGoalObj ? selectedGoalObj.title : 'Genel';

      const levelNameMap: Record<string, string> = {
        beginner: 'Başlangıç',
        intermediate: 'Orta',
        advanced: 'İleri',
      };
      const genderName = stats.gender === 'male' ? 'Erkek' : 'Kadın';

      const bodyData = {
        sportBranch,
        interests: mappedInterests,
        motivation,
        gender: genderName,
        level: levelNameMap[selectedLevel || ''] || 'Başlangıç',
        age: stats.age,
        weight: stats.weight,
        height: stats.height
      };

      // API İsteği
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        setStep(totalSteps + 1); // Başarılı
      } else {
        const err = await response.json();
        console.error("Backend Hatası:", err);
        alert(`Hata: ${err.message || 'Kaydedilemedi'}`);
      }

    } catch (error: any) {
      console.error("Hata Detayı:", error);
      alert(`Sunucuya bağlanılamadı! Lütfen internet bağlantınızı ve sunucunun çalıştığını kontrol edin.`);
    } finally {
      setIsSaving(false);
    }
  };

  // --- YÖNLENDİRME ---
  const handleFinalRedirect = () => {
    const mainInterestId = selectedInterests[0];
    const interestObj = interests.find(i => i.id === mainInterestId);
    const targetRoute = interestObj ? interestObj.route : '/dashboard';
    router.push(targetRoute);
  };

  // --- RENDER ---

  const renderStep1 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Nelerden <br /><span className="text-blue-600">Hoşlanırsın?</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">Sana özel antrenmanlar hazırlayacağız.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8 overflow-y-auto pb-4 custom-scrollbar flex-1 animate-in slide-in-from-bottom duration-700 delay-100">
        {interests.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleInterest(item.id)}
              className={`
                relative group cursor-pointer rounded-[2rem] overflow-hidden aspect-[3/4] transition-all duration-300
                ${isSelected
                  ? 'ring-4 ring-blue-600 shadow-2xl shadow-blue-200 transform scale-[0.98]'
                  : 'hover:shadow-xl hover:-translate-y-1 shadow-md'}
              `}
            >
              <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-black/40' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90'}`}></div>
              <div className={`absolute top-3 right-3 transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="bg-blue-600 rounded-full p-1.5 shadow-lg"><Check size={16} className="text-white" strokeWidth={3} /></div>
              </div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className={`text-white font-bold text-xl leading-tight transition-all duration-300 ${isSelected ? 'mb-1' : 'mb-0'}`}>{item.name}</span>
                {isSelected && <span className="text-blue-200 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">Seçildi</span>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Seni <span className="text-blue-600">Motive Eden</span><br />Şey Ne?
        </h1>
        <p className="text-gray-500 font-medium text-lg">Bu sporu yapma amacını belirleyelim.</p>
      </div>
      <div className="space-y-3 flex-1 animate-in slide-in-from-bottom duration-700 delay-100">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelectedGoal(goal.id)}
            className={`
              w-full p-4 rounded-2xl border-2 flex items-center transition-all duration-300 text-left group relative
              ${selectedGoal === goal.id
                ? 'border-blue-600 bg-blue-50 shadow-lg ring-1 ring-blue-600'
                : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-colors duration-300
              ${selectedGoal === goal.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-500 group-hover:text-blue-600 group-hover:bg-blue-100'}
            `}>
              {goal.icon}
            </div>
            <div className="flex-1">
              <div className={`font-bold text-lg ${selectedGoal === goal.id ? 'text-gray-900' : 'text-gray-700'}`}>
                {goal.title}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{goal.desc}</div>
            </div>
            {selectedGoal === goal.id && (
              <Check size={20} className="text-blue-600 animate-in zoom-in ml-2" strokeWidth={3} />
            )}
          </button>
        ))}
      </div>
    </>
  );

  // --- ADIM 3: FİZİKSEL BİLGİLER (eskiden step 3, şimdi 4) ---
  const renderStep4 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Vücut <span className="text-blue-600">Analizi</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">VKİ hesaplaması için bilgilerine ihtiyacımız var.</p>
      </div>
      <div className="space-y-6 flex-1 animate-in slide-in-from-bottom duration-700 delay-100 pb-4">
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex">
          <button onClick={() => setStats({ ...stats, gender: 'female' })} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${stats.gender === 'female' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Kadın</button>
          <button onClick={() => setStats({ ...stats, gender: 'male' })} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${stats.gender === 'male' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>Erkek</button>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-between items-end mb-4">
            <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><Ruler className="mr-2 text-blue-500" size={16} /> Boyun</span>
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.height} <span className="text-base font-bold text-gray-400">cm</span></span>
          </div>
          <input type="range" min="140" max="220" value={stats.height} onChange={(e) => setStats({ ...stats, height: parseInt(e.target.value) })} className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-between items-end mb-4">
            <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><Scale className="mr-2 text-blue-500" size={16} /> Kilon</span>
            <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.weight} <span className="text-base font-bold text-gray-400">kg</span></span>
          </div>
          <input type="range" min="40" max="150" value={stats.weight} onChange={(e) => setStats({ ...stats, weight: parseInt(e.target.value) })} className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><User className="mr-2 text-blue-500" size={16} /> Yaşın</span>
          <div className="flex items-center space-x-3">
            <button onClick={() => setStats({ ...stats, age: Math.max(10, stats.age - 1) })} className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-colors"><span className="text-xl font-bold mb-1">-</span></button>
            <span className="text-2xl font-black text-gray-900 w-8 text-center">{stats.age}</span>
            <button onClick={() => setStats({ ...stats, age: Math.min(100, stats.age + 1) })} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"><span className="text-xl font-bold mb-1">+</span></button>
          </div>
        </div>
      </div>
    </>
  );

  // --- ADIM 3 (YENİ): SEVİYE SEÇİMİ ---
  const levels = [
    {
      id: 'beginner',
      name: 'Başlangıç',
      emoji: '🌱',
      desc: 'Bu branşa yeni başladım, temel hareketleri öğreniyorum.'
    },
    {
      id: 'intermediate',
      name: 'Orta',
      emoji: '⚡️',
      desc: 'Temel tekniklere hakimim, daha da geliştirmek istiyorum.'
    },
    {
      id: 'advanced',
      name: 'İleri',
      emoji: '🏆',
      desc: 'Deneyimliyim, performansımı zirveye taşımak istiyorum.'
    },
  ];

  const renderStep3 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Seviyeni <span className="text-blue-600">Belirle</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          {selectedInterests.length > 0
            ? `${['american_football', 'snowboard', 'basketball', 'gym'].includes(selectedInterests[0])
              ? { american_football: 'Amerikan Futbolu', snowboard: 'Snowboard', basketball: 'Basketbol', gym: 'Fitness' }[selectedInterests[0]]
              : 'Seçtiğin branşta'} ne kadar deneyimlisin?`
            : 'Seçtiğin branşta ne kadar deneyimlisin?'}
        </p>
      </div>

      <div className="space-y-4 flex-1 animate-in slide-in-from-bottom duration-700 delay-100">
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`
                w-full p-5 rounded-3xl border-2 flex items-center text-left transition-all duration-300 group
                ${isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-lg ring-1 ring-blue-600'
                  : 'border-gray-100 bg-white hover:border-blue-200 hover:shadow-md'}
              `}
            >
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mr-4 text-2xl flex-shrink-0 transition-all duration-300
                ${isSelected ? 'bg-blue-600 shadow-md' : 'bg-gray-100 group-hover:bg-blue-50'}
              `}>
                {lvl.emoji}
              </div>
              <div className="flex-1">
                <div className={`font-bold text-xl ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                  {lvl.name}
                </div>
                <div className="text-sm text-gray-500 mt-0.5 font-medium">{lvl.desc}</div>
              </div>
              {isSelected && (
                <Check size={22} className="text-blue-600 ml-3 animate-in zoom-in" strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>
    </>
  );

  // --- Tamamlandı Ekranı ---
  if (step > totalSteps) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-gray-900 text-center animate-in fade-in duration-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-blue-100 animate-bounce">
          <Trophy size={40} className="text-blue-600" />
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Hazırsın! 🚀</h1>
        <p className="text-gray-500 text-xl mb-12 max-w-xs mx-auto leading-relaxed font-medium">
          Profilin kaydedildi. Şimdi seni <strong className="text-blue-600">antrenman alanına</strong> ışınlıyoruz.
        </p>
        <button onClick={handleFinalRedirect} className="bg-black text-white w-full max-w-sm py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center group">
          Antrenmana Başla <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  // --- Ana Düzen ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden relative">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          {step > 1 ? (<button onClick={handleBack} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-400 hover:text-black hover:shadow-md transition-all border border-gray-100"><ArrowLeft size={20} /></button>) : <div className="w-10"></div>}
          <div className="font-bold text-gray-400 text-sm tracking-widest uppercase">ADIM {step} / {totalSteps}</div>
          <div className="w-10"></div>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div></div>
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-6 pt-0 z-10">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      <div className="sticky bottom-0 z-20 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 p-6 pb-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={(step === 1 && selectedInterests.length === 0) || (step === 2 && !selectedGoal) || (step === 3 && !selectedLevel) || isSaving}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-xl ${((step === 1 && selectedInterests.length > 0) || (step === 2 && selectedGoal) || (step === 3 && selectedLevel) || step === 4) && !isSaving ? 'bg-black text-white hover:bg-gray-900 hover:-translate-y-0.5 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={24} /> : <>{step === totalSteps ? 'Planı Oluştur' : 'Devam Et'} <ArrowRight className="ml-2" size={20} /></>}
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 20px; }
      `}</style>
    </div>
  );
}