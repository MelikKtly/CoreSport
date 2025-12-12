'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ChevronRight,
  Loader2
} from 'lucide-react';

// Kullanıcı Tipi
interface UserData {
  id: string;
  name: string;
  sportBranch: string;
  weight: number;
  height: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // --- 1. BACKEND'DEN VERİ ÇEKME ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        if (!userId || !token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`http://localhost:3001/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          localStorage.clear();
          router.push('/login');
        }
      } catch (error) {
        console.error("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  // --- 2. BRANŞA GÖRE İÇERİK AYARLAMA ---
  const getBranchContent = (branch: string = 'Fitness') => {
    // Branş ismini normalize et (İlk harf büyük, kalanı küçük: 'fitness' -> 'Fitness')
    // Bu sayede veritabanında küçük harf kayıtlı olsa bile eşleşme sağlanır.
    const normalizedBranch = branch 
      ? branch.charAt(0).toUpperCase() + branch.slice(1).toLowerCase() 
      : 'Fitness';

    switch (normalizedBranch) {
      case 'Basketbol':
        return {
          title: "Saha Hakimiyeti & Şut",
          category: "Basketbol Drilleri",
          image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          link: "/basketball"
        };
      case 'Snowboard':
        return {
          title: "Denge & Core Gücü",
          category: "Kış Hazırlığı",
          image: "https://images.unsplash.com/photo-1522056615691-16327385d95e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          link: "/snowboard"
        };
      case 'Amerikan futbolu': // Normalize edilse bile iki kelimeli olabilir
      case 'Amerikan Futbolu':
        return {
          title: "Patlayıcı Güç & Hız",
          category: "Saha Performansı",
          image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          link: "/american-football"
        };
      default: // Gym / Fitness
        return {
          title: "Hypertrophy Push",
          category: "Vücut Geliştirme",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
          link: "/gym"
        };
    }
  };

  const heroContent = getBranchContent(user?.sportBranch);

  // --- Yükleme Ekranı ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 relative overflow-x-hidden">
      
      {/* --- Header --- */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div>
          <p className="text-gray-500 text-sm font-bold tracking-wide uppercase">Hoş Geldin,</p>
          {/* Dinamik İsim */}
          <h1 className="text-2xl font-black text-gray-900 tracking-tight capitalize">
            {user?.name || 'Sporcu'} ⚡️
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="px-6 pt-4 space-y-8">
        
        {/* --- Hero Kart: Dinamik Antrenman --- */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-gray-900">Günün Antrenmanı</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">Tümünü Gör</button>
          </div>
          
          <div 
            onClick={() => router.push(heroContent.link)} // Karta tıklayınca ilgili spor sayfasına git
            className="relative w-full h-96 rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer hover:shadow-xl transition-shadow"
          >
            <img 
              src={heroContent.image} 
              alt="Workout" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="inline-block px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3">
                {heroContent.category}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 leading-tight tracking-tight">
                {heroContent.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-gray-300 text-sm mb-6 font-medium">
                <div className="flex items-center"><Clock size={16} className="mr-1.5 text-blue-400"/> 45 dk</div>
                <div className="flex items-center"><Flame size={16} className="mr-1.5 text-orange-400"/> 520 kcal</div>
              </div>

              {/* Başla Butonu - Tıklama olayını (onClick) garanti altına aldık */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Kart tıklamasıyla çakışmasın
                  router.push(heroContent.link);
                }}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-100 transition-transform active:scale-95 cursor-pointer"
              >
                <Play size={20} fill="currentColor" className="mr-2" /> Başla
              </button>
            </div>
          </div>
        </section>

        {/* --- İstatistik Özeti --- */}
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
                    <User size={20} />
                </div>
                {/* Dinamik Kilo Gösterimi */}
                <span className="text-xl font-black text-gray-900">{user?.weight || '-'}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Kg</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-2">
                    <Trophy size={20} />
                </div>
                <span className="text-xl font-black text-gray-900">3</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Gün Streak</span>
            </div>
        </section>

        {/* --- Haftalık Program --- */}
        <section>
             <h2 className="text-xl font-bold text-gray-900 mb-4">Bu Hafta</h2>
             <div className="flex space-x-3 overflow-x-auto pb-4 -mx-6 px-6 custom-scrollbar">
                {[
                  { day: "Pzt", title: "Başlangıç", status: "Tamamlandı", active: false },
                  { day: "Sal", title: "Kardiyo", status: "Tamamlandı", active: false },
                  { day: "Çar", title: "Teknik", status: "Bugün", active: true },
                  { day: "Per", title: "Dinlenme", status: "Bekliyor", active: false },
                  { day: "Cum", title: "Güç", status: "Bekliyor", active: false },
                ].map((item, index) => (
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
      </main>

      {/* --- Alt Navigasyon --- */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe pt-2 px-6 z-40">
        <div className="flex justify-between items-center max-w-md mx-auto h-16">
            <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center w-12 h-12 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
                <Home size={24} strokeWidth={activeTab === 'home' ? 3 : 2} />
            </button>
            
            <button onClick={() => setActiveTab('schedule')} className={`flex flex-col items-center justify-center w-12 h-12 ${activeTab === 'schedule' ? 'text-blue-600' : 'text-gray-400'}`}>
                <Calendar size={24} strokeWidth={activeTab === 'schedule' ? 3 : 2} />
            </button>

            {/* Büyük Play Butonu - Yönlendirmeyi burada da ekledik */}
            <button 
                onClick={() => router.push(heroContent.link)}
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-900/20 transform -translate-y-6 hover:scale-105 transition-transform border-4 border-gray-50 cursor-pointer"
            >
                <Play size={24} fill="currentColor" className="ml-1" />
            </button>

            <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center justify-center w-12 h-12 ${activeTab === 'stats' ? 'text-blue-600' : 'text-gray-400'}`}>
                <BarChart2 size={24} strokeWidth={activeTab === 'stats' ? 3 : 2} />
            </button>

            <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center w-12 h-12 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
                <User size={24} strokeWidth={activeTab === 'profile' ? 3 : 2} />
            </button>
        </div>
      </nav>
      
      <style jsx global>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}