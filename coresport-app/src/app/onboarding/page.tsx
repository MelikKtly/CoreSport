"use client";

import React, { useState } from 'react';
import { Check, ArrowRight, Activity, ArrowLeft, Scale, Ruler, User, Dumbbell, Zap, Heart, Trophy, Medal } from 'lucide-react';

// --- TypeScript Veri Tipleri ---
interface Interest {
  id: string;
  name: string;
  img: string;
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
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;
  
  // State: Seçilen veriler
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    gender: 'female',
    age: 25,
    height: 170,
    weight: 60
  });

  // Veri: İlgi Alanları
  const interests: Interest[] = [
    { 
      id: "american_football", 
      name: "Amerikan Futbolu", 
      img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: "snowboard", 
      name: "Snowboard", 
      img: "https://images.unsplash.com/photo-1565992441121-4367c2967103?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: "basketball", 
      name: "Basketbol", 
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
    },
    { 
      id: "gym", 
      name: "Fitness & Gym", 
      img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" 
    }
  ];

  // Veri: Hedefler (GÜNCELLENDİ: Daha genel sporcu hedefleri)
  const goals: Goal[] = [
    { id: 'improve_skill', title: 'Teknik Gelişim', desc: 'Branşımda ustalaşmak ve seviye atlamak', icon: <Medal size={24} /> },
    { id: 'athletic_performance', title: 'Atletik Performans', desc: 'Daha hızlı, daha güçlü ve patlayıcı olmak', icon: <Zap size={24} /> },
    { id: 'competition', title: 'Yarışma & Maç', desc: 'Müsabakalara ve liglere hazırlanmak', icon: <Trophy size={24} /> },
    { id: 'health_hobby', title: 'Sağlık & Hobi', desc: 'Aktif kalmak, eğlenmek ve stres atmak', icon: <Heart size={24} /> },
  ];

  const handleNext = () => {
    if (step < totalSteps + 1) setStep(step + 1);
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

  // --- Adım 1: İlgi Alanları ---
  const renderStep1 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Nelerden <br/><span className="text-blue-600">Hoşlanırsın?</span>
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
              <img 
                src={item.img} 
                alt={item.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-black/40' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90'}`}></div>
              
              {/* Seçim İkonu (Sağ Üst) */}
              <div className={`absolute top-3 right-3 transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="bg-blue-600 rounded-full p-1.5 shadow-lg">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </div>
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

  // --- Adım 2: Hedefler (GÜNCELLENDİ) ---
  const renderStep2 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Seni <span className="text-blue-600">Motive Eden</span><br/>Şey Ne?
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

  // --- Adım 3: İstatistikler ---
  const renderStep3 = () => (
    <>
      <div className="mt-4 mb-6 animate-in slide-in-from-right duration-500">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
          Vücut <span className="text-blue-600">Analizi</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg">VKİ hesaplaması için bilgilerine ihtiyacımız var.</p>
      </div>
      
      <div className="space-y-6 flex-1 animate-in slide-in-from-bottom duration-700 delay-100 pb-4">
        
        {/* Cinsiyet */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex">
            <button 
                onClick={() => setStats({...stats, gender: 'female'})}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${stats.gender === 'female' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Kadın
            </button>
            <button 
                onClick={() => setStats({...stats, gender: 'male'})}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${stats.gender === 'male' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                Erkek
            </button>
        </div>

        {/* Boy Slider */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-end mb-4">
                <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><Ruler className="mr-2 text-blue-500" size={16}/> Boyun</span>
                <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.height} <span className="text-base font-bold text-gray-400">cm</span></span>
            </div>
            <input 
                type="range" min="140" max="220" 
                value={stats.height} 
                onChange={(e) => setStats({...stats, height: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
             <div className="flex justify-between text-[10px] text-gray-300 mt-2 font-bold uppercase tracking-widest">
                <span>Kısa</span>
                <span>Uzun</span>
            </div>
        </div>

        {/* Kilo Slider */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-end mb-4">
                <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><Scale className="mr-2 text-blue-500" size={16}/> Kilon</span>
                <span className="text-4xl font-black text-gray-900 tracking-tighter">{stats.weight} <span className="text-base font-bold text-gray-400">kg</span></span>
            </div>
            <input 
                type="range" min="40" max="150" 
                value={stats.weight} 
                onChange={(e) => setStats({...stats, weight: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-300 mt-2 font-bold uppercase tracking-widest">
                <span>Hafif</span>
                <span>Ağır</span>
            </div>
        </div>

        {/* Yaş */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
            <span className="flex items-center text-gray-400 font-bold text-sm tracking-wide uppercase"><User className="mr-2 text-blue-500" size={16}/> Yaşın</span>
            <div className="flex items-center space-x-3">
                 <button onClick={() => setStats({...stats, age: Math.max(10, stats.age - 1)})} className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
                    <span className="text-xl font-bold mb-1">-</span>
                 </button>
                 <span className="text-2xl font-black text-gray-900 w-8 text-center">{stats.age}</span>
                 <button onClick={() => setStats({...stats, age: Math.min(100, stats.age + 1)})} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
                    <span className="text-xl font-bold mb-1">+</span>
                 </button>
            </div>
        </div>
      </div>
    </>
  );

  // --- Tamamlandı Ekranı ---
  if (step > totalSteps) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-gray-900 text-center animate-in fade-in duration-700 relative overflow-hidden">
        {/* Dekoratif Arka Plan */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
        
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-blue-100 animate-bounce">
            <Trophy size={40} className="text-blue-600" />
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Hazırsın! 🚀</h1>
        <p className="text-gray-500 text-xl mb-12 max-w-xs mx-auto leading-relaxed font-medium">
            Profilin oluşturuldu. <strong className="text-blue-600">{selectedInterests.length} farklı spor</strong> dalına odaklı planın yükleniyor.
        </p>
        <button className="bg-black text-white w-full max-w-sm py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-gray-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center group">
            Hemen Başla <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  // --- Ana Düzen ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden relative">
      
      {/* İlerleme Barı (Üst) */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
            {step > 1 ? (
                <button 
                    onClick={handleBack} 
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-400 hover:text-black hover:shadow-md transition-all border border-gray-100"
                >
                    <ArrowLeft size={20} />
                </button>
            ) : <div className="w-10"></div>}
            
            <div className="font-bold text-gray-400 text-sm tracking-widest uppercase">
                ADIM {step} / {totalSteps}
            </div>
            
            <div className="w-10"></div>
        </div>
        
        {/* Akıcı İlerleme Çubuğu */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-6 pt-0 z-10">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Alt Aksiyon Barı */}
      <div className="sticky bottom-0 z-20 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 p-6 pb-8">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleNext}
            disabled={
                (step === 1 && selectedInterests.length === 0) ||
                (step === 2 && !selectedGoal)
            }
            className={`
              w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-xl
              ${
                (step === 1 && selectedInterests.length > 0) || (step === 2 && selectedGoal) || step === 3
                ? 'bg-black text-white hover:bg-gray-900 hover:-translate-y-0.5 active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
              }
            `}
          >
            {step === totalSteps ? 'Planı Oluştur' : 'Devam Et'} <ArrowRight className="ml-2" size={20} />
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