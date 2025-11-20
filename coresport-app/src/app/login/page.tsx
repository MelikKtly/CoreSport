// coresport-app/src/app/login/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Sayfa yönlendirmesi için
import Link from 'next/link'; // Link vermek için

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Backend'e Giriş İsteği Gönder
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }

      // 2. Başarılı! Token'ı sakla (İleride bunu cookie ile yapacağız, şimdilik localStorage yeterli)
      localStorage.setItem('token', data.access_token);
      
      console.log('Giriş Başarılı, Token:', data.access_token);

      // 3. Ana sayfaya (veya Dashboard'a) yönlendir
      router.push('/'); 
      
    } catch (err: any) {
      setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Tekrar Hoş Geldin
        </h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* E-posta */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="test@coresport.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Şifre */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="rounded-md bg-red-800 p-3 text-center text-sm text-white">
              {error}
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Giriş Yap
          </button>

          {/* Kayıt Ol Linki */}
          <div className="text-center text-sm text-gray-400">
            Hesabın yok mu?{' '}
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300">
              Hemen Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}