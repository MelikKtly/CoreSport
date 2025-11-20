"use client"; 

import React from 'react';

const AnimatedBackground = () => {
  // YENİ YOUTUBE SHORTS VİDEOSU
  // Video ID: pUU5jy7bXFI (Linkten alınan ID)
  const youtubeId = "pUU5jy7bXFI";
  
  // VİDEO AYARLARI
  // Shorts olduğu için baştan (0. saniye) başlaması en iyisidir.
  const startSeconds = 0; 

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
      
      {/* KARARTMA KATMANI */}
      {/* Yazıların net okunması için %70 siyah perde */}
      <div className="absolute inset-0 bg-black/70 z-20" />

      {/* YOUTUBE IFRAME KATMANI */}
      {/* pointer-events-none: Kullanıcının videoyu durdurmasını/tıklamasını engeller.
          w-[300%] h-[300%]: Videoyu ekrandan çok daha büyük yaparız. 
          Böylece YouTube logosu, başlık ve kenar çubukları ekranın dışında kalır.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <iframe
          className="w-[300%] h-[300%] opacity-60 object-cover" 
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&loop=1&playlist=${youtubeId}&start=${startSeconds}&modestbranding=1&showinfo=0&iv_load_policy=3&rel=0`}
          allow="autoplay; encrypted-media"
          title="Background Video"
          style={{ filter: 'grayscale(100%) contrast(1.2)' }} // Siyah beyaz ve kontrastlı tema (Reel havası)
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;