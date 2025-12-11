"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Token'ı çözmek için

// Token'ın içindeki bilgilerin tipi
interface TokenPayload {
  sub: string; // Kullanıcı ID'si (Backend 'sub' olarak kaydetmişti)
  email: string;
}

// Spor Dalları Listesi (Görselleri internetten çekiyoruz)
const sports = [
  { id: "gym", name: "Gym & Fitness", img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "snowboard", name: "Snowboard", img: "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "basketball", name: "Basketbol", img: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "american_football", name: "Amerikan Futbolu", img: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: "running", name: "Koşu & Atletizm", img: "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"},
];



export default function OnboardingPage() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Sayfa açılınca Token'dan ID'yi al
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Token yoksa giriş sayfasına at
      return;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setUserId(decoded.sub);
    } catch (error) {
      console.error("Token hatası:", error);
      router.push("/login");
    }
  }, [router]);

  const handleSave = async () => {
    if (!selectedSport || !userId) return;
    setLoading(true);

    try {
      // Backend'e GÜNCELLEME (PATCH) isteği at
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sportBranch: selectedSport }),
      });

      if (!res.ok) throw new Error("Kaydedilemedi");

      console.log("Branş seçildi:", selectedSport);
      router.push("/"); // Ana sayfaya yönlendir
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu, lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        
        {/* Başlıklar */}
        <div className="text-center mb-10 space-y-2 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Senin Alanın Hangisi?
          </h1>
          <p className="text-gray-400 text-lg">
            Sana özel içerikler sunabilmemiz için bir branş seç.
          </p>
        </div>

        {/* Kartlar Izgarası (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {sports.map((sport) => (
            <div
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl h-48 md:h-64 ${
                selectedSport === sport.id
                  ? "border-emerald-500 shadow-emerald-500/30 scale-105" // Seçiliyse parlat
                  : "border-gray-700 opacity-70 hover:opacity-100 hover:border-gray-500" // Seçili değilse
              }`}
            >
              {/* Arka Plan Resmi */}
              <img
                src={sport.img}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Karartma ve Yazı */}
              <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-colors ${selectedSport === sport.id ? "bg-emerald-900/40" : ""}`}>
                <span className="text-2xl font-bold text-center px-2">{sport.name}</span>
              </div>

              {/* Seçildi İşareti (Tik) */}
              {selectedSport === sport.id && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Devam Et Butonu */}
        <div className="text-center">
          <button
            onClick={handleSave}
            disabled={!selectedSport || loading}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg transition-all hover:scale-105 hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Kaydediliyor..." : "Seçimi Onayla ve Başla 🚀"}
          </button>
        </div>

      </div>
    </div>
  );
}