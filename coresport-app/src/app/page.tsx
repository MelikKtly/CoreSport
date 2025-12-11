"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa açıldığında: Token var mı kontrol et
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    // Çıkış yap: Token'ı sil, state'i güncelle, giriş sayfasına at
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (loading) return null; // Yüklenirken boş ekran (veya loading spinner) göster

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative p-4 overflow-hidden">
      
      {/* Hareketli Arka Plan (Bütünlük için buraya da koyduk) */}
      <AnimatedBackground />

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        
        {/* LOGO / BAŞLIK */}
        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-600 drop-shadow-lg">
            CoreSport
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-lg mx-auto">
            Yapay zeka destekli, kişiselleştirilmiş sporcu gelişim platformun.
          </p>
        </div>

        {/* DURUMA GÖRE İÇERİK (Glassmorphism Kart İçinde) */}
        <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {isLoggedIn ? (
            // --- SENARYO A: GİRİŞ YAPMIŞ KULLANICI ---
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Hoş Geldin Sporcu! 🚀</h2>
                <p className="text-gray-400">Gelişim yolculuğuna devam etmeye hazır mısın?</p>
              </div>
              
              <button 
                onClick={() => router.push('/onboarding')} 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Branşını Seç ve Başla
              </button>

              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 text-sm font-medium underline decoration-red-400/30 hover:decoration-red-300 transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            // --- SENARYO B: MİSAFİR KULLANICI ---
            <div className="flex flex-col space-y-4">
              <p className="text-gray-400 mb-2">Hemen hesabını oluştur veya giriş yap.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/login"
                  className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
                >
                  Giriş Yap
                </Link>
                
                <Link 
                  href="/register"
                  className="px-8 py-3 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}