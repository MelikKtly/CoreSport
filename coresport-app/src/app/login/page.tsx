"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// AnimatedBackground bileşeni src/app/components/AnimatedBackground.tsx yolunda olmalı
import AnimatedBackground from '../components/AnimatedBackground';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // JWT Token'ı çözüp içindeki UserID'yi alma fonksiyonu
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Backend'e istek at (127.0.0.1 bağlantı hatalarını azaltır)
      const res = await fetch('http://127.0.0.1:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }

      // --- KRİTİK DÜZELTME BAŞLANGICI ---
      
      // 1. Token'ı 'accessToken' adıyla kaydet (Onboarding sayfası bunu arıyor)
      localStorage.setItem('token', data.access_token);
      
      // 2. Token içinden UserID'yi al ve kaydet
      const decodedToken = parseJwt(data.access_token);
      if (decodedToken && decodedToken.sub) {
        localStorage.setItem('userId', decodedToken.sub);
        console.log('Giriş Başarılı. UserID:', decodedToken.sub);
      } else {
        // Yedek plan: Eğer token parse edilemezse backend yanıtındaki user objesine bak
        if (data.user && data.user.id) {
             localStorage.setItem('userId', data.user.id);
        } else {
             throw new Error("Token geçersiz, kullanıcı kimliği alınamadı.");
        }
      }

      // 3. Onboarding sayfasına yönlendir
      router.push('/onboarding');
      
      // --- KRİTİK DÜZELTME BİTİŞİ ---
      
    } catch (err: any) {
      console.error("Login Hatası:", err);
      setError(err.message || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative p-4 overflow-hidden">
      
      {/* Hareketli Arka Plan */}
      <AnimatedBackground />
      
      {/* Glassmorphism Kart */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-2xl animate-fade-in-up relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Tekrar Hoş Geldin
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Kaldığın yerden devam etmeye hazır mısın?
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* E-posta */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-blue-400">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              placeholder="ornek@coresport.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Şifre */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-blue-400">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-200 animate-pulse">
              {error}
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          {/* Alt Linkler */}
          <div className="text-center text-sm text-gray-400 mt-4 flex justify-between items-center">
             <Link href="#" className="hover:text-blue-400 transition-colors">
                 Şifremi Unuttum
             </Link>
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:underline">
              Hesap Oluştur
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}