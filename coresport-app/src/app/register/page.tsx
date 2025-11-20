"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Backend'e istek at (Port 3001/user)
      const res = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Kayıt başarısız oldu');
      }
      
      console.log('Kayıt Başarılı:', data);
      // Başarılı kayıt sonrası giriş sayfasına yönlendir
      router.push('/login'); 

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative p-4 overflow-hidden">
      
      {/* Hareketli Arka Plan */}
      <AnimatedBackground />

      {/* Glassmorphism Kart */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg shadow-2xl animate-fade-in-up my-4 relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Aramıza Katıl
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Sporcu yolculuğun burada başlıyor.
          </p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* İsim */}
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-emerald-400">
              Ad Soyad
            </label>
            <input
              id="name"
              type="text"
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* E-posta */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-emerald-400">
              E-posta <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="ornek@coresport.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Şifre */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-emerald-400">
              Şifre <span className="text-red-400">*</span>
            </label>
            <input
              id="password"
              type="password"
              required
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="En az 6 karakter"
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

          {/* Kayıt Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
             {isLoading ? "Kaydediliyor..." : "Hesap Oluştur"}
          </button>

          {/* Alt Linkler */}
          <div className="text-center text-sm text-gray-400 mt-4">
            Zaten bir hesabın var mı?{' '}
            <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors hover:underline">
              Giriş Yap
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}