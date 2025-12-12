'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  LogOut, 
  ChartBar, 
  User as UserIcon, 
  Activity, 
  BicepsFlexed, 
  CalendarDays,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- AYARLAR ---
const API_URL = 'http://127.0.0.1:3001'; // Bağlantı garantisi için 127.0.0.1

// --- TİP TANIMLAMALARI ---
interface User {
  id: string;
  name: string;
  weight: number;
  height: number;
  sportBranch: string;
}

interface ProgramItem {
  day: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function GymPage() {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Veri Çekme
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Token'ı güvenli şekilde al (Hem 'token' hem 'accessToken' kontrol et)
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

        if (!userId || !token) {
          throw new Error('Oturum bilgisi bulunamadı. Lütfen giriş yapın.');
        }

        // 2. Backend isteği (127.0.0.1 üzerinden)
        const response = await fetch(`${API_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error('Oturum süresi dolmuş.');
          throw new Error('Kullanıcı verileri alınamadı.');
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        console.error("GymPage Hatası:", err);
        setError(err.message);
        
        // Kritik hatalarda login'e yönlendir
        if (err.message.includes('Oturum')) {
           setTimeout(() => router.push('/login'), 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  // Statik Gym Programı
  const program: ProgramItem[] = [
    { 
      day: "PZT", 
      title: "Push (İtiş)", 
      desc: "Göğüs, Omuz ve Arka Kol odaklı hipertrofi antrenmanı.",
      icon: <Dumbbell className="w-6 h-6" />
    },
    { 
      day: "ÇAR", 
      title: "Pull (Çekiş)", 
      desc: "Sırt, Kanat ve Ön Kol için güç ve hacim.",
      icon: <BicepsFlexed className="w-6 h-6" />
    },
    { 
      day: "CUM", 
      title: "Legs (Bacak)", 
      desc: "Squat varyasyonları, Quadriceps ve Hamstring.",
      icon: <Activity className="w-6 h-6" />
    },
    { 
      day: "CMT", 
      title: "Full Body & Weak Points", 
      desc: "Eksik bölgelere odaklanma ve genel kondisyon.",
      icon: <CalendarDays className="w-6 h-6" />
    }
  ];

  // --- RENDER ---

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-orange-500">
        <Dumbbell className="w-16 h-16 animate-spin mb-4" />
        <p className="text-gray-400 animate-pulse">Salon Hazırlanıyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="bg-red-900/20 border border-red-800 p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Hata Oluştu</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/login')} 
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
          >
            Giriş Sayfasına Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 selection:bg-orange-500 selection:text-white pb-20">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="text-gray-400 w-6 h-6 hover:text-white" />
            <span className="text-2xl font-bold tracking-wider font-oswald text-white hidden sm:block">
              CORE<span className="text-orange-500">GYM</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-gray-400">Sporcu</span>
              <span className="font-bold text-sm text-white capitalize">{user?.name}</span>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
               <UserIcon className="w-5 h-5" />
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Alanı */}
      <header className="pt-32 pb-12 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 font-oswald tracking-tight animate-fade-in-down">
          VÜCUDUNU <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">İNŞA ET</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Bilimsel temelli hypertrophy antrenmanları ile sınırlarını zorla.
        </p>
      </header>

      {/* Ana İçerik Grid */}
      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Kolon: İstatistikler */}
        <section className="lg:col-span-1 h-fit">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <ChartBar className="text-orange-500 w-5 h-5" />
              <span>İSTATİSTİKLERİN</span>
            </h2>

            <div className="space-y-4">
              {/* Kilo Kartı */}
              <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-gray-800 flex justify-between items-center group hover:border-orange-500/50 transition-colors">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Güncel Kilo</p>
                  <p className="text-2xl font-bold text-white">{user?.weight || '--'} <span className="text-sm font-normal text-gray-500">kg</span></p>
                </div>
                <Activity className="text-gray-600 group-hover:text-orange-500 transition-colors w-8 h-8" />
              </div>

              {/* Branş Kartı */}
              <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                 <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Branş</p>
                    <p className="text-lg font-bold text-white uppercase">{user?.sportBranch || 'Fitness'}</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sağ Kolon: Program */}
        <section className="lg:col-span-2">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <Dumbbell className="text-orange-500 w-5 h-5" />
              <span>HAFTALIK ANTRENMAN RUTİNİ</span>
            </h2>

            <div className="space-y-4">
              {program.map((item, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 flex items-start sm:items-center gap-5 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-800/50 rounded-xl flex flex-col items-center justify-center border border-gray-700 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                    {item.icon}
                    <span className="text-[10px] font-bold mt-1 uppercase text-gray-400 group-hover:text-orange-400">{item.day}</span>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  <div className="hidden sm:block opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                     <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                        <ChevronRight className="w-5 h-5" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
        </section>

      </main>
    </div>
  );
}