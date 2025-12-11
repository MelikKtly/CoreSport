"use client";

import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Clock, 
  Trophy, 
  Calendar, 
  Home, 
  BarChart2, 
  User, 
  Bell, 
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');

  // Mock Veri: Kullanıcının onboarding'de seçtiği varsayılan bir profil gibi
  const todayWorkout = {
    title: "Patlayıcı Güç & Hız",
    category: "Atletik Performans",
    duration: "45 dk",
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    completed: false
  };

  const weeklySchedule = [
    { day: "Pzt", title: "Plyometrics", status: "Tamamlandı", active: false },
    { day: "Sal", title: "Üst Vücut", status: "Tamamlandı", active: false },
    { day: "Çar", title: "Hız & Agility", status: "Bugün", active: true },
    { day: "Per", title: "Aktif Dinlenme", status: "Bekliyor", active: false },
    { day: "Cum", title: "Tüm Vücut", status: "Bekliyor", active: false },
  ];

  const popularTrainings = [
    { title: "Basketbol Drilleri", subtitle: "Top Hakimiyeti", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
    { title: "Core & Denge", subtitle: "Stabilite", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 relative overflow-x-hidden">
      
      {/* --- Üst Başlık (Header) --- */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <p className="text-gray-500 text-sm font-bold tracking-wide uppercase">Hoş Geldin,</p>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Şampiyon ⚡️</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="px-6 pt-4 space-y-8">
        
        {/* --- Hero Kart: Günün Antrenmanı --- */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-gray-900">Günün Antrenmanı</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">Tümünü Gör</button>
          </div>
          
          <div className="relative w-full h-96 rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src={todayWorkout.image} 
              alt="Workout" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="inline-block px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3">
                {todayWorkout.category}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 leading-tight tracking-tight">
                {todayWorkout.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-gray-300 text-sm mb-6 font-medium">
                <div className="flex items-center"><Clock size={16} className="mr-1.5 text-blue-400"/> {todayWorkout.duration}</div>
                <div className="flex items-center"><Flame size={16} className="mr-1.5 text-orange-400"/> {todayWorkout.calories}</div>
              </div>

              <button className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95">
                <Play size={20} fill="currentColor" className="mr-2" /> Başla
              </button>
            </div>
          </div>
        </section>

        {/* --- İstatistik Özeti (Stats Row) --- */}
        <section className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-2">
                    <Flame size={20} />
                </div>
                <span className="text-xl font-black text-gray-900">1,240</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Kcal</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                    <Clock size={20} />
                </div>
                <span className="text-xl font-black text-gray-900">3.5</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Saat</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-2">
                    <Trophy size={20} />
                </div>
                <span className="text-xl font-black text-gray-900">3</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Gün Streak</span>
            </div>
        </section>

        {/* --- Haftalık Program (Weekly Schedule) --- */}
        <section>
             <h2 className="text-xl font-bold text-gray-900 mb-4">Bu Hafta</h2>
             <div className="flex space-x-3 overflow-x-auto pb-4 -mx-6 px-6 custom-scrollbar">
                {weeklySchedule.map((item, index) => (
                    <div 
                        key={index} 
                        className={`
                            min-w-[100px] p-4 rounded-3xl flex flex-col justify-between h-32 border transition-all duration-300
                            ${item.active 
                                ? 'bg-black text-white border-black shadow-lg shadow-gray-300 transform -translate-y-1' 
                                : 'bg-white text-gray-500 border-gray-100'}
                        `}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">{item.day}</span>
                        <div>
                            <span className={`block text-lg font-bold leading-tight mb-1 ${item.active ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>
                            {item.active && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
                        </div>
                    </div>
                ))}
             </div>
        </section>

        {/* --- Senin İçin Önerilenler --- */}
        <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Branşına Özel</h2>
            <div className="space-y-4">
                {popularTrainings.map((item, idx) => (
                    <div key={idx} className="flex bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="ml-4 flex flex-col justify-center flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                            <p className="text-gray-500 text-sm font-medium">{item.subtitle}</p>
                        </div>
                        <div className="flex items-center justify-center w-10 text-gray-300">
                            <ChevronRight />
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      {/* --- Alt Navigasyon (Bottom Tab Bar) --- */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-6 z-40">
        <div className="flex justify-between items-center max-w-md mx-auto h-16">
            <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2} />
                {activeTab === 'home' && <span className="w-1 h-1 bg-blue-600 rounded-full mt-1"></span>}
            </button>
            
            <button 
                onClick={() => setActiveTab('schedule')}
                className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${activeTab === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <Calendar size={24} strokeWidth={activeTab === 'schedule' ? 3 : 2} />
            </button>

            {/* Orta Buton (Hızlı Eylem) */}
            <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-900/20 transform -translate-y-6 hover:scale-105 transition-transform border-4 border-gray-50">
                <Play size={24} fill="currentColor" className="ml-1" />
            </button>

            <button 
                onClick={() => setActiveTab('stats')}
                className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <BarChart2 size={24} strokeWidth={activeTab === 'stats' ? 3 : 2} />
            </button>

            <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <User size={24} strokeWidth={activeTab === 'profile' ? 3 : 2} />
            </button>
        </div>
      </nav>
      
      {/* Özel Scrollbar Gizleme CSS */}
      <style jsx global>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}