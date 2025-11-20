// coresport-app/src/app/register/page.tsx

"use client"; // Bu bir istemci bileşenidir (interaktif)

import { useState } from 'react'; // React'in "hafıza" (state) özelliğini import et

export default function RegisterPage() {
  // 1. Form verilerini saklamak için "state" (hafıza) oluştur
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  // Hata ve başarı mesajları için state'ler
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 2. Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setError(''); // Eski hataları temizle
    setSuccess(''); // Eski başarı mesajlarını temizle

    // 3. Backend'e (API) isteği gönder
    try {
      const res = await fetch('http://localhost:3001/user', { // API adresimiz
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend 400, 409 (Conflict) gibi bir hata döndürdüyse
        throw new Error(data.message || 'Bir hata oluştu');
      }

      // Başarılı!
      setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      console.log('Kayıt başarılı:', data);
      // İleride buraya: router.push('/login') ekleyeceğiz

    } catch (err: any) {
      // Bir hata yakalandı (örn: e-posta zaten kullanılıyor)
      setError(err.message);
    }
  };

  // 4. JSX (HTML) kısmını, state'lere bağla
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          CoreSport'a Katıl
        </h2>
        
        {/* onSubmit event'ini forma ekledik */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* İsim Alanı */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              İsim
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="Adınız Soyadınız"
              value={name} // State'e bağla
              onChange={(e) => setName(e.target.value)} // State'i güncelle
            />
          </div>

          {/* E-posta Alanı */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="test@coresport.com"
              value={email} // State'e bağla
              onChange={(e) => setEmail(e.target.value)} // State'i güncelle
            />
          </div>

          {/* Şifre Alanı */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 p-3 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
              placeholder="En az 6 karakter"
              value={password} // State'e bağla
              onChange={(e) => setPassword(e.target.value)} // State'i güncelle
            />
          </div>

          {/* Hata veya Başarı Mesajları */}
          {error && (
            <div className="rounded-md bg-red-800 p-3 text-center text-sm text-white">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-800 p-3 text-center text-sm text-white">
              {success}
            </div>
          )}

          {/* Kayıt Ol Butonu */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}