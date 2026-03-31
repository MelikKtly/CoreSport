export interface SnowboardExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tip: string;
}

export interface SnowboardWorkoutDay {
  day: string;
  title: string;
  exercises: SnowboardExercise[];
}

export interface SnowboardLevelProgram {
  tagline: string;
  weeklyPlan: SnowboardWorkoutDay[];
}

export interface SnowboardStyleData {
  emoji: string;
  color: string; // Tailwind gradient class
  keyAttributes: { label: string; value: string }[];
  programs: {
    Başlangıç: SnowboardLevelProgram;
    Orta: SnowboardLevelProgram;
    İleri: SnowboardLevelProgram;
  };
}

export const SB_PROGRAMS: Record<string, SnowboardStyleData> = {
  Freestyle: {
    emoji: '🛹',
    color: 'from-violet-500 to-purple-600',
    keyAttributes: [
      { label: 'Stil', value: 'Halfpipe & Park' },
      { label: 'Odak', value: 'Hava & Trick' },
      { label: 'Güç', value: 'Patlayıcı Sıçrama' },
      { label: 'Yüzey', value: 'Slopestyle / Pipe' },
    ],
    programs: {
      Başlangıç: {
        tagline: 'Piste çıkmadan önce vücudunu hazırla. Temel denge, core ve sıçrama gücü ile güvenli bir başlangıç yap.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Denge & Core Aktivasyonu',
            exercises: [
              { name: 'Tek Bacak Denge (Bosu)', sets: '3', reps: '30 sn', rest: '45 sn', tip: 'Snowboard duruşunu taklit et, dizleri hafifçe bük.' },
              { name: 'Plank', sets: '3', reps: '40 sn', rest: '30 sn', tip: 'Kalçanı yukarı kaldırma, nefes almayı unutma.' },
              { name: 'Yan Plank', sets: '3', reps: '25 sn / taraf', rest: '30 sn', tip: 'Kalçayı düz tut, omuz–ayak hizası önemli.' },
              { name: 'Dead Bug', sets: '3', reps: '10 / taraf', rest: '45 sn', tip: 'Bel yere temas etmeli, nefesini kontrol et.' },
              { name: 'Squat (Ağırlıksız)', sets: '3', reps: '15', rest: '60 sn', tip: 'Topuk yerde kalsın, dizler parmak ucunu geçmesin.' },
            ],
          },
          {
            day: 'ÇAR',
            title: 'Bacak Gücü & Koordinasyon',
            exercises: [
              { name: 'Goblet Squat', sets: '3', reps: '12', rest: '60 sn', tip: 'Göğüs dik, dirsekler diz içi tarafında.' },
              { name: 'Step-Up (Kürsü)', sets: '3', reps: '10 / bacak', rest: '60 sn', tip: 'Adım atarken gövde sallanmasın.' },
              { name: 'Lateral Squat', sets: '3', reps: '10 / taraf', rest: '60 sn', tip: 'Yan hareket snowboard yönlenmesini simüle eder.' },
              { name: 'Jumping Jack', sets: '3', reps: '20', rest: '45 sn', tip: 'Kondisyon için hafif tempo.' },
              { name: 'Kalf Yükseltme', sets: '3', reps: '15', rest: '45 sn', tip: 'Parmak ucunda duruşu 2 saniye tut.' },
            ],
          },
          {
            day: 'CUM',
            title: 'Patlayıcı Güç & Esneklik',
            exercises: [
              { name: 'Box Jump', sets: '3', reps: '8', rest: '90 sn', tip: 'İniş dizlerinde yumuşak ol, hafifçe bük.' },
              { name: 'Hip Flexor Germe', sets: '3', reps: '30 sn / taraf', rest: '30 sn', tip: 'Kalça öne çıkmasın, düz dur.' },
              { name: 'Yoga Köprü (Glute Bridge)', sets: '3', reps: '15', rest: '45 sn', tip: 'Üstte 2 sn tut, kalçayı sıkıştır.' },
              { name: 'İp Atlama', sets: '3', reps: '60 sn', rest: '60 sn', tip: 'Koordinasyon ve aerobik taban için.' },
              { name: 'Hamstring Germe', sets: '3', reps: '30 sn / taraf', rest: '30 sn', tip: 'Dizi bükmeden öne eğil.' },
            ],
          },
        ],
      },
      Orta: {
        tagline: 'Park ve halfpipede yüksek performans için patlayıcı kuvvet, denge ve havada kontrol geliştir.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Patlayıcı Bacak & Core',
            exercises: [
              { name: 'Bulgarian Split Squat', sets: '4', reps: '10 / bacak', rest: '75 sn', tip: 'Ön diz 90°, gövde dik. Snowboard duruşuna yakın açı.' },
              { name: 'Tuck Jump', sets: '4', reps: '8', rest: '90 sn', tip: 'Diz göğse çek, iniş yumuşak olsun.' },
              { name: 'Ab Wheel Rollout', sets: '4', reps: '10', rest: '60 sn', tip: 'Beli düz tut, aşırı uzamadan dön.' },
              { name: 'Rotasyonlu Pallof Press', sets: '4', reps: '10 / taraf', rest: '60 sn', tip: 'Dönüş sırasında gövde sabit.' },
              { name: 'Single-Leg RDL', sets: '4', reps: '8 / bacak', rest: '75 sn', tip: 'Hamstring gerilimini hissettir, denge koru.' },
            ],
          },
          {
            day: 'ÇAR',
            title: 'Sıçrama & Hava Kontrolü',
            exercises: [
              { name: 'Depth Jump', sets: '4', reps: '6', rest: '2 dk', tip: 'Kutudan inin, hemen maksimum sıçrayın.' },
              { name: 'Lateral Bound (Tek Bacak)', sets: '4', reps: '8 / taraf', rest: '90 sn', tip: 'İniş tek bacak, 2 sn dengeli dur.' },
              { name: 'Squat Jump (Ağırlıklı)', sets: '4', reps: '8', rest: '90 sn', tip: 'Sıçrama anında dizler tam aç.' },
              { name: 'Hareketli Plank', sets: '4', reps: '12', rest: '60 sn', tip: 'Dirsek ↔ el değişimi kontrolü kaybet.' },
              { name: 'Sırt Ekstansiyon', sets: '4', reps: '12', rest: '45 sn', tip: 'Üstte 2 sn tut, hızlı yapma.' },
            ],
          },
          {
            day: 'CUM',
            title: 'Kondisyon & Denge Rafine',
            exercises: [
              { name: 'HIIT: 20/10 Squat Thrust', sets: '5', reps: '8 tur', rest: '2 dk', tip: 'Maksimum tempo, form bozulmasın.' },
              { name: 'Bosu Ball Squat', sets: '4', reps: '12', rest: '60 sn', tip: 'İnstabil zeminde propriosepsiyon gelişimi.' },
              { name: 'Copenhagen Plank', sets: '4', reps: '20 sn / taraf', rest: '45 sn', tip: 'Addüktör ve core birlikte çalışır.' },
              { name: 'Sıçramalı Lunge', sets: '4', reps: '10 / taraf', rest: '75 sn', tip: 'Havada bacak değiştir, iniş kontrollü.' },
              { name: 'Foam Roller (Bacak & Sırt)', sets: '1', reps: '5 dk', rest: '—', tip: 'Toparlanma için yavaş hareketler.' },
            ],
          },
          {
            day: 'PAZ',
            title: 'Aktif Dinlenme & Esneklik',
            exercises: [
              { name: 'Yoga Akışı (Güvercin Pozu)', sets: '2', reps: '45 sn / taraf', rest: '30 sn', tip: 'Kalça açıcı, piste iniş için kritik.' },
              { name: 'Omuz Döndürme', sets: '2', reps: '15 / taraf', rest: '—', tip: 'Halfpipe kolları için eklem hazırlığı.' },
              { name: 'Yürüyüş / Hafif Koşu', sets: '1', reps: '20 dk', rest: '—', tip: 'Düşük nabız, aktif toparlanma.' },
            ],
          },
        ],
      },
      İleri: {
        tagline: 'Büyük hava, karmaşık trick ve halfpipe dominasyonu için elit düzey güç, hız ve koordinasyon.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Maksimum Güç Bloku',
            exercises: [
              { name: 'Barbell Squat', sets: '5', reps: '5', rest: '3 dk', tip: '%85+ 1RM, form aşılmasın. Spotter al.' },
              { name: 'Romanian Deadlift', sets: '5', reps: '5', rest: '3 dk', tip: 'Hamstring maksimum gerilim, bar vücut yanındaki.' },
              { name: 'Power Clean', sets: '5', reps: '3', rest: '3 dk', tip: 'Patlayıcı kalça uzatımı, catch pozisyonu.' },
              { name: 'Nordic Hamstring Curl', sets: '4', reps: '6', rest: '2 dk', tip: 'Eksantrik faz yavaş, 4 saniye iniş.' },
              { name: 'Weighted Pull-Up', sets: '4', reps: '5', rest: '2 dk', tip: 'Tam ROM, dead hang başlangıç.' },
            ],
          },
          {
            day: 'SAL',
            title: 'Reaktif & Pliometrik Güç',
            exercises: [
              { name: 'Hurdle Jump (Seri)', sets: '5', reps: '6 engel', rest: '2.5 dk', tip: 'Maksimum yatay–dikey güç çıkışı.' },
              { name: 'Bounding (Zıplamalı Koşu)', sets: '5', reps: '20 m', rest: '2 dk', tip: 'Uzun adım, havada bacak tam gerilimi.' },
              { name: 'Med Ball Rotasyon Fırlatma', sets: '5', reps: '8 / taraf', rest: '90 sn', tip: 'Dönüş gücü — halfpipe çıkışlarında kritik.' },
              { name: 'Depth Drop → Sprint', sets: '5', reps: '4', rest: '2 dk', tip: 'İniş anı → 10 m sprint, reaktivite.' },
            ],
          },
          {
            day: 'PER',
            title: 'Core & Hava Pozisyonu',
            exercises: [
              { name: 'Dragon Flag', sets: '4', reps: '6', rest: '90 sn', tip: 'Tüm gövde sertleşmeli, kontrollü iniş.' },
              { name: 'L-Sit (Paralel Bar)', sets: '4', reps: '15 sn', rest: '75 sn', tip: 'Havadaki pozisyon kontrolü için ideal.' },
              { name: 'Oblique Side Plank + Kaldırma', sets: '4', reps: '10 / taraf', rest: '60 sn', tip: 'Bacak kaldırırken kalça sarkmasın.' },
              { name: 'GHD Sit-Up', sets: '4', reps: '10', rest: '90 sn', tip: 'Tam ROM; makine olmadan alternatif: sırt ext bankı.' },
              { name: 'Pallof Press (Ağır)', sets: '4', reps: '8 / taraf', rest: '75 sn', tip: 'Anti-rotasyon; trick sırasında gövde stabilitesi.' },
            ],
          },
          {
            day: 'CMT',
            title: 'Kondisyon Bloku & Toparlanma',
            exercises: [
              { name: 'Ski Erg Sprint', sets: '6', reps: '15 sn all-out', rest: '45 sn', tip: 'Üst vücut kondisyonu ve nefes kapasitesi.' },
              { name: 'Assault Bike Tabata', sets: '8', reps: '20 sn / 10 sn', rest: '—', tip: 'Laktat eşiği adaptasyonu, tam effort.' },
              { name: 'Ice Bath / Kontrast Duş', sets: '1', reps: '10 dk', rest: '—', tip: 'Kas toparlanmasını hızlandırır.' },
              { name: 'Foam Rolling (Tam Vücut)', sets: '1', reps: '10 dk', rest: '—', tip: 'IT band, quad, kalça özellikle çalış.' },
            ],
          },
          {
            day: 'PAZ',
            title: 'Mental & Esneklik Seansı',
            exercises: [
              { name: 'Vizualizasyon Antrenmanı', sets: '1', reps: '15 dk', rest: '—', tip: 'Trick sırasını zihninde canlandır, adım adım.' },
              { name: 'Pigeon Pose (Derin)', sets: '3', reps: '60 sn / taraf', rest: '30 sn', tip: 'Kalça derinliği — iniş pozisyonu için şart.' },
              { name: 'Torasik Mobilite', sets: '3', reps: '10 / taraf', rest: '30 sn', tip: 'Omurga rotasyonu, aeryal kontrol.' },
            ],
          },
        ],
      },
    },
  },

  Freeride: {
    emoji: '🏔️',
    color: 'from-cyan-500 to-blue-600',
    keyAttributes: [
      { label: 'Stil', value: 'Off-Piste / Bakir Kar' },
      { label: 'Odak', value: 'Güç & Dayanıklılık' },
      { label: 'Güç', value: 'Bacak & Kalça' },
      { label: 'Yüzey', value: 'Derin Kar / Sarp' },
    ],
    programs: {
      Başlangıç: {
        tagline: 'Doğal arazide kontrol için temel bacak gücü, kardiyovasküler kapasite ve denge oluştur.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Temel Bacak Gücü',
            exercises: [
              { name: 'Squat (3 sn iniş)', sets: '3', reps: '12', rest: '75 sn', tip: 'Yavaş iniş derin kar sürüşünü simüle eder.' },
              { name: 'Reverse Lunge', sets: '3', reps: '10 / bacak', rest: '60 sn', tip: 'Geri adımda denge koru, öne eğilme.' },
              { name: 'Wall Sit', sets: '3', reps: '45 sn', rest: '60 sn', tip: 'Uzun yokuş beklentisi için izometrik dayanıklılık.' },
              { name: 'Glute Bridge', sets: '3', reps: '15', rest: '45 sn', tip: 'Üst pozisyonda sıkıştır, 1 sn tut.' },
              { name: 'Core Twist (Oturuşta)', sets: '3', reps: '15 / taraf', rest: '45 sn', tip: 'Yorulmadan önce dönüş gücünü geliştir.' },
            ],
          },
          {
            day: 'PER',
            title: 'Kardiyovasküler Kapasite',
            exercises: [
              { name: 'Yürüyüş / Hafif Yokuş Koşusu', sets: '1', reps: '30 dk', rest: '—', tip: 'Dağ kondisyonunu simüle et, eğimli zemin tercih et.' },
              { name: 'Mountain Climber', sets: '3', reps: '60 sn', rest: '60 sn', tip: 'Kalça sabit, tempo kontrollü.' },
              { name: 'Step-Up (Yüksek Kürsü)', sets: '3', reps: '12 / bacak', rest: '75 sn', tip: 'Yüke karşı direnç — derin karda sürüş yükü.' },
            ],
          },
          {
            day: 'CMT',
            title: 'Esneklik & Toparlanma',
            exercises: [
              { name: 'Hip 90/90 Germe', sets: '3', reps: '45 sn / taraf', rest: '30 sn', tip: 'Kalça rotasyonu kritik freeride için.' },
              { name: 'Köpük Rulosu (Quadriceps)', sets: '2', reps: '60 sn / bacak', rest: '—', tip: 'Ağrıyı hissederek, yavaş kaydır.' },
            ],
          },
        ],
      },
      Orta: {
        tagline: 'Off-piste hakimiyeti için bacak dayanıklılığı, stabilizatör kas gücü ve aerobik kapasiteni artır.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Bacak Dayanıklılık Bloku',
            exercises: [
              { name: 'Sürekli Squat (4 dk)', sets: '3', reps: '4 dk', rest: '2 dk', tip: 'Kesintisiz sürdür, son dakikayı patlayıcı bitir.' },
              { name: 'Ağırlıklı Step-Up', sets: '4', reps: '12 / bacak', rest: '75 sn', tip: 'Dumbbell bacak seviyesinde tut.' },
              { name: 'Lateral Band Walk', sets: '3', reps: '20 adım / taraf', rest: '60 sn', tip: 'Kalça abduktörü — dönüş kontrolü için.' },
              { name: 'Sissy Squat', sets: '3', reps: '10', rest: '90 sn', tip: 'Kuadriceps izole, diz sağlığına dikkat.' },
              { name: 'Calf Raise (Tek Bacak)', sets: '3', reps: '15 / bacak', rest: '45 sn', tip: 'İniş amortismanı için kritik kas.' },
            ],
          },
          {
            day: 'ÇAR',
            title: 'Kardiyomotorik Devre',
            exercises: [
              { name: 'Sırt Çantası Yürüyüşü (15 kg)', sets: '1', reps: '45 dk', rest: '—', tip: 'Dağ hike yükünü simüle et, eğimli tercih et.' },
              { name: 'Box Step-Up Serisi', sets: '4', reps: '5 dk sürekli', rest: '2 dk', tip: 'Yavaş tempoda uzun süre dayanıklılık.' },
              { name: 'Med Ball Slam', sets: '4', reps: '12', rest: '60 sn', tip: 'Derin karda patlayıcı itme gücü.' },
            ],
          },
          {
            day: 'CUM',
            title: 'Stabilizatör & Core Güçlendirme',
            exercises: [
              { name: 'Single-Leg Squat (Pistol)', sets: '4', reps: '6 / bacak', rest: '90 sn', tip: 'Bakır zeminde denge talebi yüksek.' },
              { name: 'TRX Row', sets: '4', reps: '12', rest: '60 sn', tip: 'Sırt stabilitesi — uzun gün sürüşünde postür.' },
              { name: 'Suitcase Carry', sets: '4', reps: '30 m / taraf', rest: '75 sn', tip: 'Core yan stabilitesi — tek taraflı yük.' },
              { name: 'Pallof Press', sets: '4', reps: '10 / taraf', rest: '60 sn', tip: 'Anti-rotasyon gücü.' },
            ],
          },
          {
            day: 'PAZ',
            title: 'Aktif Toparlanma',
            exercises: [
              { name: 'Yoga Akışı', sets: '1', reps: '30 dk', rest: '—', tip: 'Vinyasa temposu, kasları uzat ve canlandır.' },
              { name: 'Kontrast Duş', sets: '1', reps: '10 dk', rest: '—', tip: 'Soğuk-sıcak dönüşüm, toparlanmayı hızlandırır.' },
            ],
          },
        ],
      },
      İleri: {
        tagline: 'Yüksek ivmeli iniş, derin kar özelliği ve fiziksel dayanıklılıkta elit performansa ulaş.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Maksimum Bacak Gücü',
            exercises: [
              { name: 'Front Squat', sets: '5', reps: '5', rest: '3 dk', tip: '%85 1RM. Dirsekleri yüksek tut.' },
              { name: 'Hip Thrust (Yük Çubuğu)', sets: '5', reps: '6', rest: '2.5 dk', tip: 'Gluteal pik güç — derin kar kazma hareketi.' },
              { name: 'Trap Bar Deadlift', sets: '5', reps: '5', rest: '3 dk', tip: 'Ağırlık merkezini dengeler, diz dostu.' },
              { name: 'Sled Push (Ağır)', sets: '5', reps: '20 m', rest: '2 dk', tip: 'Derin karda itme yüküni simüle eder.' },
            ],
          },
          {
            day: 'SAL',
            title: 'Dayanıklılık & Aerobik Eşik',
            exercises: [
              { name: 'Trail Run (Eğimli)', sets: '1', reps: '60 dk', rest: '—', tip: '70% max nabız — aerobik baz oluştur.' },
              { name: 'AMRAP: Squat+Lunge+KB Swing', sets: '1', reps: '20 dk', rest: 'min', tip: 'Dinlenmeden sürekli döngü.' },
              { name: 'Beyin Egzersizi: Denge Tahtası', sets: '4', reps: '5 dk', rest: '60 sn', tip: 'Propriosepsiyon — off-piste engel yönetimi.' },
            ],
          },
          {
            day: 'PER',
            title: 'Güç Dayanıklılığı Devresi',
            exercises: [
              { name: 'KB Circuit (Swing–Clean–Press)', sets: '5', reps: '5 / hareket', rest: '90 sn', tip: 'Non-stop devre; tam vücut entegrasyonu.' },
              { name: 'Weighted Vest Squat Jump', sets: '5', reps: '6', rest: '2 dk', tip: '10 kg yelek. Patlayıcı artı ağırlık yük.' },
              { name: 'Copenhagen Plank (Ağırlıklı)', sets: '5', reps: '15 sn / taraf', rest: '60 sn', tip: 'Addüktör gücü derin kar dönüşlerinde kritik.' },
            ],
          },
          {
            day: 'CMT',
            title: 'Aktif Toparlanma & Mobilite',
            exercises: [
              { name: 'Sauna (10 dk) + Buz Banyosu', sets: '3', reps: 'dönüşüm', rest: '—', tip: 'Kas toparlanma protokolü.' },
              { name: 'PNF Germe (Tam Vücut)', sets: '2', reps: '30 sn / hareket', rest: '—', tip: 'Partner ile veya bant yardımıyla.' },
            ],
          },
        ],
      },
    },
  },

  Carve: {
    emoji: '🎿',
    color: 'from-rose-500 to-orange-500',
    keyAttributes: [
      { label: 'Stil', value: 'Pistte Keskin Dönüş' },
      { label: 'Odak', value: 'Diz & Kalça Kontrolü' },
      { label: 'Güç', value: 'Lateral Stabilite' },
      { label: 'Yüzey', value: 'Sert Pist / Buz' },
    ],
    programs: {
      Başlangıç: {
        tagline: 'Keskin virajlar için bacak lateral gücü, diz stabilitesi ve proprioseptif denge temelleri.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Lateral Güç & Diz Stabilitesi',
            exercises: [
              { name: 'Lateral Step-Up', sets: '3', reps: '12 / taraf', rest: '60 sn', tip: 'Yan adım vücut sürüş duruşunu yansıtır.' },
              { name: 'Clamshell (Bant)', sets: '3', reps: '15 / taraf', rest: '45 sn', tip: 'Kalça abduktörü — viraj stabilizasyonu.' },
              { name: 'Tek Bacak Denge (Göz Kapalı)', sets: '3', reps: '30 sn / taraf', rest: '30 sn', tip: 'Propriosepsiyon — buz yüzey taklidi.' },
              { name: 'Reverse Nordic', sets: '3', reps: '8', rest: '75 sn', tip: 'Quad eksantrik gücü — viraj yavaşlama.' },
              { name: 'Ankle Mobilite (Ayak Bileği)', sets: '3', reps: '15 / taraf', rest: '—', tip: 'Sert bota uyum analizi için temel.' },
            ],
          },
          {
            day: 'PER',
            title: 'Alt Vücut Dayanıklılık',
            exercises: [
              { name: 'Wall Sit (Varyasyonlu)', sets: '4', reps: '60 sn', rest: '75 sn', tip: 'Son 10 saniyede topuğu yerden kaldır.' },
              { name: 'Lateral Lunge', sets: '3', reps: '12 / taraf', rest: '60 sn', tip: 'Karving geçiş hareketi taklidi.' },
              { name: 'Kuadriceps Germe', sets: '3', reps: '30 sn / taraf', rest: '—', tip: 'Uzun pist sonrası mutlaka uygula.' },
            ],
          },
        ],
      },
      Orta: {
        tagline: 'Yüksek hız karving için lateral patlayıcı güç, diz eklemi stabilitesi ve reaksiyon hızı geliştir.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Lateral Patlayıcı Güç',
            exercises: [
              { name: 'Lateral Bound + Tek Bacak Iniş', sets: '4', reps: '8 / taraf', rest: '90 sn', tip: 'İniş yumuşak, diz içe çökmemeli.' },
              { name: 'Sumo Squat Jump', sets: '4', reps: '8', rest: '75 sn', tip: 'Geniş duruş — karving açısı.' },
              { name: 'Speed Skater', sets: '4', reps: '12 / taraf', rest: '60 sn', tip: 'Buz patenci taklidi, patlayıcı yan geçiş.' },
              { name: 'TRX Pistol Squat', sets: '4', reps: '6 / bacak', rest: '90 sn', tip: 'Tek bacak kontrol, TRX destekli.' },
              { name: 'Sled Pull (Lateral)', sets: '4', reps: '20 m / taraf', rest: '2 dk', tip: 'Yan hareket direnci — gerçek karving yükü.' },
            ],
          },
          {
            day: 'ÇAR',
            title: 'Diz & Kalça Entegrasyonu',
            exercises: [
              { name: 'Terminal Knee Extension (Bant)', sets: '4', reps: '15 / bacak', rest: '45 sn', tip: 'VMO aktivasyonu — diz valgusunu önler.' },
              { name: 'Hip Internal Rotation (Bant)', sets: '4', reps: '12 / taraf', rest: '45 sn', tip: 'Toe-side karving için kalça rotasyonu.' },
              { name: 'Single-Leg Press (Makinede)', sets: '4', reps: '10 / bacak', rest: '75 sn', tip: 'Kontrollü yük, tam ROM.' },
              { name: 'Plank Rotasyonu (T-Plank)', sets: '4', reps: '8 / taraf', rest: '60 sn', tip: 'Gövde stabilizatörü + omuz gücü.' },
            ],
          },
          {
            day: 'CUM',
            title: 'Reaksiyon & Koordinasyon',
            exercises: [
              { name: 'Agility Ladder (Karışık Desen)', sets: '4', reps: '30 sn', rest: '60 sn', tip: 'Hızlı adım değişimi — karving geçiş hızı.' },
              { name: 'Hurdle Lateral Jump', sets: '4', reps: '8 / taraf', rest: '75 sn', tip: 'Yan yön değişimi reaktif güç.' },
              { name: 'Reaction Ball (Partner)', sets: '3', reps: '3 dk', rest: '60 sn', tip: 'Öngörülemeyen yön — pist değişkeni taklidi.' },
              { name: 'IT Band & Quads Foam Roll', sets: '1', reps: '5 dk', rest: '—', tip: 'Karving yükü altında en çok zorlanan bölge.' },
            ],
          },
        ],
      },
      İleri: {
        tagline: 'Buz üzerinde maksimum G-kuvveti karving için elit lateral güç, çeviklik ve diz optimizasyonu.',
        weeklyPlan: [
          {
            day: 'PZT',
            title: 'Maksimum Lateral Güç',
            exercises: [
              { name: 'Yük Çubuklu Lateral Squat', sets: '5', reps: '5 / taraf', rest: '3 dk', tip: '%80 1RM, derin pozisyona in.' },
              { name: 'Hex Bar Jump Squat', sets: '5', reps: '5', rest: '3 dk', tip: 'Güç-hız eğrisi optimizasyonu.' },
              { name: 'Single-Leg Squat (Plato)', sets: '5', reps: '6 / bacak', rest: '2.5 dk', tip: 'Ek ağırlıkla, mükemmel form öncelikli.' },
              { name: 'Reactive Step-Up', sets: '5', reps: '5 / taraf', rest: '2 dk', tip: 'Hızlı adım, patlayıcı iniş = karving reaksiyon.' },
            ],
          },
          {
            day: 'SAL',
            title: 'Dayanıklılık & Yüksek Hız Devresi',
            exercises: [
              { name: 'Bike Sprint (10 sn max)', sets: '8', reps: '10 sn', rest: '50 sn', tip: 'Patlayıcı alaktik güç — karving hız patlaması.' },
              { name: 'Sürekli Lateral Bound (5 dk)', sets: '4', reps: '5 dk', rest: '2 dk', tip: 'Laktat dayanıklılığı içindi.' },
              { name: 'BFR Wall Sit (Damar Oklüzyon)', sets: '4', reps: '90 sn', rest: '30 sn arası', tip: 'Düşük yük yüksek adaptasyon — uzman denetiminde.' },
            ],
          },
          {
            day: 'PER',
            title: 'Diz Optimizasyon Protokolü',
            exercises: [
              { name: 'Blood Flow Restriction Leg Ext.', sets: '4', reps: '25 / 15 / 15 / 15', rest: '30 sn', tip: 'VMO hipertrofisi, düşük eklem stresi.' },
              { name: 'Copenhagen Ağırlıklı', sets: '5', reps: '20 sn / taraf', rest: '60 sn', tip: 'Addüktör gücü — buz yüzey lateral yükü.' },
              { name: 'Valgus Control Isometric', sets: '4', reps: '45 sn / bacak', rest: '45 sn', tip: 'Diz hizalaması — virajda baskı yönetimi.' },
              { name: 'Ankle Mobilite Protokolü', sets: '3', reps: '10 / taraf', rest: '—', tip: 'Sert boot + maksimum açı talebi için şart.' },
            ],
          },
          {
            day: 'CMT',
            title: 'Elit Toparlanma',
            exercises: [
              { name: 'Marc Pro / EMS Seansı', sets: '1', reps: '30 dk', rest: '—', tip: 'Pasif kas kontraksiyonu ile kan akışı.' },
              { name: 'Hiperbarik Oksijen / Sauna', sets: '1', reps: '20 dk', rest: '—', tip: 'Elit sporcu toparlanma protokolü.' },
              { name: 'Mobilite (Tam Vücut)', sets: '2', reps: '30 dk', rest: '—', tip: 'Eklem açıklığını koru, bir sonraki hafta için hazırlan.' },
            ],
          },
        ],
      },
    },
  },
};
