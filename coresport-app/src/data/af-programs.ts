export interface Exercise { name: string; sets: string; reps: string; rest: string; tip: string; }
export interface WorkoutDay { day: string; title: string; exercises: Exercise[]; }
export interface LevelProgram { tagline: string; weeklyPlan: WorkoutDay[]; }
export interface PositionData {
    emoji: string; color: string;
    keyAttributes: { label: string; value: string }[];
    programs: Record<'Başlangıç' | 'Orta' | 'İleri', LevelProgram>;
}

export const AF_PROGRAMS: Record<string, PositionData> = {

    /* ═══════════════ QB ═══════════════ */
    QB: {
        emoji: '🏈', color: 'from-blue-500 to-indigo-700',
        keyAttributes: [
            { label: 'Pas Doğruluğu', value: '% ile ölçülür' },
            { label: 'Reaksiyon', value: 'Hızlı okuma' },
            { label: 'Liderlik', value: 'Huddle yönetimi' },
            { label: 'Pocket IQ', value: 'Baskıyı hisset' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Temelleri oluştur. Doğru adım, doğru atış.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Temel Pas Mekaniği', exercises: [
                            { name: 'Duran Noktadan Kısa Pas', sets: '3', reps: '10', rest: '45s', tip: 'El pozisyonu sabit, bilek dönsün.' },
                            { name: '3 Adım Drop', sets: '3', reps: '8', rest: '45s', tip: 'Hızlı ve dengeli geri adım.' },
                            { name: 'Plank', sets: '3', reps: '20sn', rest: '30s', tip: 'Core kilitli, nefes tutma.' },
                            { name: 'Omuz Isınma (rotasyon)', sets: '3', reps: '15', rest: '30s', tip: 'Düşük ağırlık, tam hareket.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Hedef Gözetleme', exercises: [
                            { name: 'Sabit Hedef Atışı', sets: '3', reps: '15', rest: '30s', tip: 'Gözü headeri kilitle.' },
                            { name: 'WR ile Kısa Rota Atışı', sets: '3', reps: '10', rest: '45s', tip: 'Alıcı hareket etmeden at.' },
                            { name: 'Yürüyüş + Koşu Geçişi', sets: '3', reps: '5', rest: '60s', tip: 'Yavaş başla, ivmelen.' },
                            { name: 'Kavrama Kuvveti (squeez)', sets: '3', reps: '20', rest: '20s', tip: 'Top düşmeden bırak.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Kondisyon Temeli', exercises: [
                            { name: 'Temp Koşu %60', sets: '5', reps: '50m', rest: '60s', tip: 'Kontrollü nefes ritmi.' },
                            { name: 'Lateral Shuffle', sets: '4', reps: '10m', rest: '45s', tip: 'Adımlar çaprazlanmamalı.' },
                            { name: 'Squat (vücut ağırlığı)', sets: '3', reps: '12', rest: '45s', tip: 'Diz parmak hizasında.' },
                            { name: 'Stretching (omuz)', sets: '3', reps: '30sn', rest: '—', tip: 'Gergin tut, serbest bırak.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Hareket halinde karar ver. Pocket\'ı kullan.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Pocket Hareket & Pas', exercises: [
                            { name: '5 Adım Drop + Atış', sets: '4', reps: '10', rest: '45s', tip: 'Geri adım ritmi tutarlı olsun.' },
                            { name: 'Scramble Drill', sets: '4', reps: '6', rest: '60s', tip: 'Pocket dışında hızlı set.' },
                            { name: 'Dead Hang', sets: '3', reps: '20sn', rest: '30s', tip: 'Omuz güçlenir, sakatlık azalır.' },
                            { name: 'Med Ball Core Twist', sets: '4', reps: '12', rest: '30s', tip: 'Bel değil, omuz dönsün.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Progressions & Okuma', exercises: [
                            { name: '1→2→3 Hedef Drill', sets: '4', reps: '8', rest: '60s', tip: 'Safety pozisyonuna bak.' },
                            { name: 'Bootleg Pass', sets: '3', reps: '8', rest: '60s', tip: 'Hareket içinde ritim koru.' },
                            { name: 'Hip Turn Sprint', sets: '4', reps: '20m', rest: '60s', tip: 'Kalça önce, ayak arkadan.' },
                            { name: 'Film Çalışması', sets: '—', reps: '15 dk', rest: '—', tip: '3 hata tespit et, not al.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm', exercises: [
                            { name: 'Pro Agility (5-10-5)', sets: '5', reps: '1', rest: '75s', tip: 'Pivot anında alçak dur.' },
                            { name: 'Goblet Squat', sets: '4', reps: '8', rest: '90s', tip: 'Göğsü dik tut.' },
                            { name: 'Shoulder Press (ılımlı)', sets: '3', reps: '10', rest: '60s', tip: 'Omuz sağlığı önce gelir.' },
                            { name: 'Tempo Sprint %70', sets: '6', reps: '50m', rest: '60s', tip: 'Aerobik temel kurula.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'NFL standartlarında oku, karar ver, at.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Pocket & Release', exercises: [
                            { name: '7 Adım Drop + Hızlı Atış', sets: '5', reps: '10', rest: '45s', tip: 'Platform kilitli, release hızlı.' },
                            { name: 'Blitz Tanıma Drili', sets: '5', reps: '6 senaryo', rest: '60s', tip: 'Pre-snap okumayı egzersiz et.' },
                            { name: 'Rotational Med Ball Slam', sets: '5', reps: '10', rest: '30s', tip: 'Patlayıcı güç, tam rotasyon.' },
                            { name: 'Band Shoulder ER', sets: '4', reps: '20', rest: '30s', tip: 'Önleme antrenmanı – zorunlu.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Complex Route Trees', exercises: [
                            { name: '4 Alıcılı Combo Atış', sets: '5', reps: '5 rota', rest: '60s', tip: 'Her atışta farklı alıcı seç.' },
                            { name: 'Pressure Under Fire Drill', sets: '4', reps: '8', rest: '45s', tip: 'Gelen rush\'a rağmen doğru at.' },
                            { name: 'Ice Bath Film Review', sets: '—', reps: '20 dk', rest: '—', tip: 'Rakip D-koordinatörünü analiz et.' },
                            { name: 'Box Jump', sets: '4', reps: '5', rest: '90s', tip: 'Reaktif güç aktarımı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Peak Kondisyon', exercises: [
                            { name: '40 Yard Sprint', sets: '6', reps: '40m', rest: '120s', tip: 'Drive 15y, max hız sonrası.' },
                            { name: 'Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'NFL QB patlayıcılığı buradan.' },
                            { name: 'Single Leg Stability', sets: '4', reps: '30sn/bacak', rest: '30s', tip: 'Tek bacak denge kritik.' },
                            { name: 'Stretch & Recovery', sets: '—', reps: '15 dk', rest: '—', tip: 'Sonraki hafta temeli.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ RB ═══════════════ */
    RB: {
        emoji: '💨', color: 'from-orange-500 to-red-700',
        keyAttributes: [
            { label: 'İvme', value: 'İlk 10 yard' },
            { label: 'Vizyon', value: 'Deliği gör' },
            { label: 'Pas Alımı', value: 'Rota koşusu' },
            { label: 'Blok', value: 'Pass protection' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'İlk adımı kilitle. Top güvenliğini ögren.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Temel Koşu & İvme', exercises: [
                            { name: '20m Düz Sprint', sets: '4', reps: '20m', rest: '75s', tip: 'Öne eğik başla, adım kısa.' },
                            { name: 'Top Taşıma Yürüyüşü', sets: '3', reps: '30m', rest: '30s', tip: '5 temas noktası kontrol et.' },
                            { name: 'Glute Bridge', sets: '3', reps: '12', rest: '45s', tip: 'Kalça tam yukarı gelsin.' },
                            { name: 'High Knees', sets: '3', reps: '15m', rest: '30s', tip: 'Ritim ve diz yüksekliği.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Vizyon & Rota', exercises: [
                            { name: 'Koni Slalom (düşük hız)', sets: '4', reps: '1 tur', rest: '60s', tip: 'Gözler sahanın önünde.' },
                            { name: 'Flat Rota Yakalama', sets: '3', reps: '10', rest: '30s', tip: 'El önde, gözler önce.' },
                            { name: '45° Cut Drill', sets: '4', reps: '6/yön', rest: '45s', tip: 'Kesimde hız düşer, çıkışta patla.' },
                            { name: 'Core Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Kıç ne yukarı ne aşağı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Temeli', exercises: [
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '75s', tip: 'Göğüs dik, diz dışa.' },
                            { name: 'Step-Up (boksör)', sets: '3', reps: '8/bacak', rest: '60s', tip: 'Üst bacakla basarak çık.' },
                            { name: 'Walking Lunge', sets: '3', reps: '10/bacak', rest: '60s', tip: 'Adım geniş, omurga dik.' },
                            { name: 'Hip Flexor Açma', sets: '3', reps: '30sn/taraf', rest: '—', tip: 'First-step hızı buradan.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Deliği gör, patlayıcı geç. Contact\'tan kaç.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Patlayıcı İvme', exercises: [
                            { name: '10-Yard Burst', sets: '6', reps: '10m', rest: '90s', tip: 'İlk adım yön değiştirir.' },
                            { name: 'Box Jump', sets: '4', reps: '5', rest: '90s', tip: 'Yumuşak iniş, reaktif çıkış.' },
                            { name: 'Trap Bar Deadlift', sets: '4', reps: '6', rest: '120s', tip: 'Kalça itmek güç aktarımı.' },
                            { name: 'Single Leg Glute Bridge', sets: '3', reps: '10/bacak', rest: '45s', tip: 'Asimetrik güç dengele.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Ball Security & Cut', exercises: [
                            { name: 'Strip Drill (takımla)', sets: '4', reps: '15', rest: '30s', tip: 'Kol tamamen sarmalamalı.' },
                            { name: 'Zigzag Sprint', sets: '5', reps: '1 rota', rest: '75s', tip: 'Her köşede düşük ağırlık.' },
                            { name: 'Route Running (flat+out)', sets: '4', reps: '8', rest: '45s', tip: 'Soft hands yakalama bitis.' },
                            { name: 'Lateral Bound', sets: '3', reps: '8/taraf', rest: '60s', tip: 'Tek bacak iniş, denge.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç & Dayanıklılık', exercises: [
                            { name: 'Sled Push', sets: '4', reps: '20m', rest: '90s', tip: 'Gövde açısı 45°.' },
                            { name: 'Romanian DL', sets: '4', reps: '8', rest: '90s', tip: 'Hamstring gerilimi hisset.' },
                            { name: 'Split Squat', sets: '3', reps: '10/bacak', rest: '75s', tip: 'Ön diz dışa gitmesin.' },
                            { name: 'Nordic Curl', sets: '3', reps: '5', rest: '90s', tip: 'Hamstring sağlık korut.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Her temas güç. Her yard kazan. Durma yok.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'NFL İvme', exercises: [
                            { name: 'Resisted Sprint (band)', sets: '5', reps: '20m', rest: '90s', tip: 'Direnç biter, patlat.' },
                            { name: 'Depth Jump + Sprint', sets: '5', reps: '4+20m', rest: '120s', tip: 'Yerle temas min süreli.' },
                            { name: 'Power Snatch', sets: '4', reps: '3', rest: '120s', tip: 'Patlayıcı kalça uzatma.' },
                            { name: 'Hip Thrust (ağır)', sets: '5', reps: '6', rest: '90s', tip: 'First-step gücü buradan.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Elite Vision & YAC', exercises: [
                            { name: 'Reaktif Cut Drill', sets: '5', reps: '8', rest: '60s', tip: 'Koç sinyaline göre yön.' },
                            { name: 'YAC Run (post-catch)', sets: '5', reps: '6', rest: '60s', tip: 'Yakalayıp omuz düşür.' },
                            { name: 'Route Tree (full)', sets: '4', reps: '1 rota', rest: '45s', tip: '9 rotanın tümünü çalış.' },
                            { name: 'Pass Pro vs Blitz', sets: '4', reps: '6', rest: '60s', tip: 'Punch zamanlaması kritik.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Pik', exercises: [
                            { name: 'Back Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'Bar low, kalça aktif.' },
                            { name: 'Hang Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'Shrug ve pull hızlı.' },
                            { name: '40-Yard Dash', sets: '5', reps: '40m', rest: '120s', tip: 'Tüm ölçümleri kaydet.' },
                            { name: 'Soft Tissue Recovery', sets: '—', reps: '10 dk', rest: '—', tip: 'Foam roll + mobility.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ WR ═══════════════ */
    WR: {
        emoji: '⚡️', color: 'from-yellow-400 to-orange-600',
        keyAttributes: [
            { label: 'Rota', value: 'Break keskinliği' },
            { label: 'Başlangıç', value: 'Release hızı' },
            { label: 'Eller', value: 'Soft hands' },
            { label: 'Coverage', value: 'Man beater' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Rota bil. Topu yakala. Temeli kur.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Temel Rota & Release', exercises: [
                            { name: 'Slant Rota Koşusu', sets: '3', reps: '8', rest: '45s', tip: '45° kesim, hız kesmeden.' },
                            { name: 'Agility Merdiveni', sets: '3', reps: '3 tur', rest: '30s', tip: 'Her kareye bir adım.' },
                            { name: 'Catch (yerinde)', sets: '3', reps: '15', rest: '30s', tip: 'Eller önde, bakış topa.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30sn', rest: '—', tip: 'Stride uzunluğu artar.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'El Kuvveti', exercises: [
                            { name: 'Tek El Yakalama', sets: '3', reps: '10/el', rest: '30s', tip: 'Parmak uçlarıyla yakala.' },
                            { name: 'Dead Hang', sets: '3', reps: '20sn', rest: '30s', tip: 'Kavrama kuvveti temel.' },
                            { name: 'Out Rota (düşük hız)', sets: '3', reps: '6', rest: '45s', tip: 'Sert dur, keskin çık.' },
                            { name: 'Jogging Yakalama', sets: '3', reps: '12', rest: '30s', tip: 'Koşuda eller çalışsın.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Hız Temeli', exercises: [
                            { name: '30m Düz Sprint', sets: '5', reps: '30m', rest: '90s', tip: 'Drive phase 10m dik.' },
                            { name: 'Butt Kicks', sets: '3', reps: '20m', rest: '30s', tip: 'Frekans ve diz geri.' },
                            { name: 'Lateral Shuffle', sets: '4', reps: '10m', rest: '45s', tip: 'Adim çaprazlanmamalı.' },
                            { name: 'Core Side Plank', sets: '3', reps: '20sn/taraf', rest: '30s', tip: 'Kalça düşmesin.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'CB\'yi geç. Doğru açıda kır. Topu yakala.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Release & Rota Keskinliği', exercises: [
                            { name: 'Jam Release (Swim)', sets: '4', reps: '8', rest: '45s', tip: 'Dış el block, iç geç.' },
                            { name: 'Curl + Out Combo', sets: '4', reps: '6', rest: '45s', tip: 'Her rotada farklı break.' },
                            { name: 'Sprint + Catch (hareket)', sets: '4', reps: '10', rest: '60s', tip: 'Bakış geç, eller hazır.' },
                            { name: 'Box Drill', sets: '4', reps: '1 tur', rest: '60s', tip: 'Köşelerde alçak merkez.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Contested Catch', exercises: [
                            { name: 'High Point Catch', sets: '4', reps: '10', rest: '45s', tip: 'En yüksek noktada el kilitle.' },
                            { name: 'Back Shoulder Grab', sets: '3', reps: '8', rest: '45s', tip: 'Geri dön, hızlı el.' },
                            { name: 'Grip Strengthener', sets: '3', reps: '30', rest: '20s', tip: 'Maç sonunda da tutmalısın.' },
                            { name: 'Seam Route (vs DB)', sets: '4', reps: '6', rest: '60s', tip: 'Safety arasından geç.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Hız & Patlama', exercises: [
                            { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'Transition 15. yarda başlar.' },
                            { name: 'Resisted Sprint', sets: '4', reps: '20m', rest: '90s', tip: 'Direnç stride\'ı uzatır.' },
                            { name: 'Nordic Curl', sets: '3', reps: '5', rest: '90s', tip: 'Sprint sakatlık önlemi.' },
                            { name: 'Depth Jump', sets: '3', reps: '4', rest: '90s', tip: 'Temas min, çıkış ani.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Her CB\'yi yeniyorsun. Rota ağacın tam.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Route Tree', exercises: [
                            { name: 'Full Route Tree (9 rota)', sets: '5', reps: '1/rota', rest: '30s', tip: 'Her rotada teknik fark.' },
                            { name: 'Double Move Drill', sets: '5', reps: '6', rest: '60s', tip: 'Sahte break + gerçek break.' },
                            { name: 'Sprint-Cut-Sprint', sets: '5', reps: '40m', rest: '90s', tip: 'Ortada kesim, hız koru.' },
                            { name: 'Weighted Catch (ağır top)', sets: '4', reps: '15', rest: '30s', tip: 'El kuvveti gelişir.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Coverage Yenme', exercises: [
                            { name: 'Press Coverage Escape', sets: '5', reps: '6', rest: '60s', tip: 'Rip + hızlı koşu çıkışı.' },
                            { name: 'Zone Beating Route', sets: '4', reps: '8', rest: '45s', tip: 'Boş alana yerleş, dur.' },
                            { name: 'Catch in Traffic', sets: '4', reps: '10', rest: '45s', tip: 'Contact altında focus.' },
                            { name: 'Ice Route (vs man)', sets: '5', reps: '6', rest: '60s', tip: 'Ritim değiştir, dur, koş.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Explosiveness Pik', exercises: [
                            { name: 'Plyometric Sprint Combo', sets: '5', reps: '3+20m', rest: '90s', tip: 'Jump → immediate sprint.' },
                            { name: 'Reactive Catch Drill', sets: '5', reps: '10', rest: '30s', tip: 'Işık/ses sinyaline tepki.' },
                            { name: 'Hamstring Complex', sets: '4', reps: '6', rest: '90s', tip: 'Nordic + hip thrust.' },
                            { name: 'Film + Recovery', sets: '—', reps: '20 dk', rest: '—', tip: 'CB zayıflıklarını bul.' },
                        ]
                    },
                ],
            },
        },
    },


    /* ═══════════════ TE ═══════════════ */
    TE: {
        emoji: '🔄', color: 'from-purple-500 to-pink-700',
        keyAttributes: [
            { label: 'Blok Gücü', value: 'Run block' },
            { label: 'Rota', value: 'Seam & cross' },
            { label: 'Yakalama', value: 'YAC kapasitesi' },
            { label: 'Fizik', value: 'Boylu + güçlü' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Bloğunu ögren, topu yakala. İki iş bir vücut.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Temel Blok', exercises: [
                            { name: 'Run Block Duruşu (stance)', sets: '3', reps: '8', rest: '60s', tip: 'Alçak çıkış, dirsek içte.' },
                            { name: 'Bench Press (hafif)', sets: '3', reps: '10', rest: '75s', tip: 'Teknik önce, ağırlık sonra.' },
                            { name: 'Hip Hinge (KB)', sets: '3', reps: '12', rest: '45s', tip: 'Kalça arkaya, sırt düz.' },
                            { name: 'Core Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Stabilite blok temeli.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Temel Rota', exercises: [
                            { name: 'Seam Route (yavaş)', sets: '3', reps: '6', rest: '45s', tip: 'LB arasından düz koş.' },
                            { name: 'Catch (hareket halinde)', sets: '3', reps: '12', rest: '30s', tip: 'Eller önde, gözler topa.' },
                            { name: 'Short Yardage Route', sets: '3', reps: '8', rest: '45s', tip: 'Kısa mesafe, sert blok.' },
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '60s', tip: 'Blok çıkış gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Kondisyon', exercises: [
                            { name: 'Sled Pull (hafif)', sets: '3', reps: '20m', rest: '75s', tip: 'Doğru yükleme hissi.' },
                            { name: 'Tempo Koşu', sets: '4', reps: '50m', rest: '60s', tip: 'TE uzun süreli koşu.' },
                            { name: 'Farmer Walk', sets: '3', reps: '25m', rest: '60s', tip: 'Kavrama + kor aktif.' },
                            { name: 'Omuz Mobilitesi', sets: '3', reps: '30sn', rest: '—', tip: 'Yüksek yakalama için.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Blok + rota. İki rolü birden uygula.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Blok Güç', exercises: [
                            { name: 'Drive Block (sled)', sets: '4', reps: '15m', rest: '75s', tip: 'Kısa adım, sürekli it.' },
                            { name: 'Bench Press', sets: '4', reps: '8', rest: '90s', tip: 'Kontrol iniş, güçlü itme.' },
                            { name: 'KB Swing', sets: '4', reps: '12', rest: '45s', tip: 'Kalça snaple yükselt.' },
                            { name: 'Plyo Push-Up', sets: '3', reps: '8', rest: '60s', tip: 'Punch hızı simülasyon.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'YAC & Yakalama', exercises: [
                            { name: 'YAC Run (catch & go)', sets: '4', reps: '8', rest: '60s', tip: 'Yakaladıktan hemen koş.' },
                            { name: 'High Point Catch', sets: '3', reps: '10', rest: '45s', tip: 'Elleri yukarı kilitle.' },
                            { name: 'Seam Route (hızlı)', sets: '4', reps: '6', rest: '45s', tip: 'LB-S arasına gir.' },
                            { name: 'Cross Route (vs DB)', sets: '3', reps: '8', rest: '45s', tip: 'Hız kesmeden dön.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlayıcı Güç', exercises: [
                            { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'Olimpik hız+güç bileşimi.' },
                            { name: 'Hex Bar Jump Squat', sets: '4', reps: '5', rest: '90s', tip: 'Blok çıkış simülasyonu.' },
                            { name: 'Lateral Bound', sets: '3', reps: '8/taraf', rest: '60s', tip: 'Rota dönüşü güç.' },
                            { name: 'Grip Hang', sets: '3', reps: '25sn', rest: '30s', tip: 'Yakalama gücü kritik.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Elite TE: blok, rota, yakalama — hepsini üst düzeyde.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Blok', exercises: [
                            { name: 'Double Team Block', sets: '5', reps: '8', rest: '75s', tip: 'Komşu OL ile senkron.' },
                            { name: 'Bench @80%', sets: '5', reps: '5', rest: '120s', tip: 'Yüksek yük kontrolü.' },
                            { name: 'Sled Drag + Sprint', sets: '4', reps: '20m+10m', rest: '90s', tip: 'Güç → hız geçişi.' },
                            { name: 'Rotational Med Ball', sets: '4', reps: '10', rest: '30s', tip: 'Core patlayıcılığı.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Route Mastery', exercises: [
                            { name: 'Full TE Route Tree', sets: '5', reps: '1/rota', rest: '30s', tip: 'Seam, cross, corner, flat.' },
                            { name: 'Double Move Seam', sets: '4', reps: '6', rest: '60s', tip: 'Sahte in, gerçek derin.' },
                            { name: 'Red Zone Catch (crowded)', sets: '4', reps: '10', rest: '45s', tip: 'Kalabalıkta fokus.' },
                            { name: 'Back Shoulder Grab', sets: '4', reps: '8', rest: '45s', tip: 'Elleri geriye kilitle.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç + Atletizm', exercises: [
                            { name: 'Clean & Jerk', sets: '5', reps: '3', rest: '150s', tip: 'TE toplam atletizm.' },
                            { name: 'Vertical Jump', sets: '5', reps: '5', rest: '90s', tip: 'Red zone kafa golü.' },
                            { name: '40-Yard Sprint', sets: '4', reps: '40m', rest: '120s', tip: 'Hız değerlendirmesi.' },
                            { name: 'Recovery Mobility', sets: '—', reps: '15 dk', rest: '—', tip: 'Foam roll + band.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ OL ═══════════════ */
    OL: {
        emoji: '🛡️', color: 'from-gray-500 to-slate-700',
        keyAttributes: [
            { label: 'Güç', value: 'Push power' },
            { label: 'Ayak İşi', value: 'Lateral hız' },
            { label: 'Pass Pro', value: 'Set koruma' },
            { label: 'Koordinasyon', value: 'Hat senkronu' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Duruş ve adım. Hattın temeli buradan başlar.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Stance & Teknik', exercises: [
                            { name: 'Üç Nokta Duruş', sets: '3', reps: '8', rest: '45s', tip: 'Ağırlık öne, alçak.' },
                            { name: 'Kick Slide (yavaş)', sets: '3', reps: '10m', rest: '45s', tip: 'Çapraz adım yok.' },
                            { name: 'Squat (vücut ağ.)', sets: '3', reps: '12', rest: '60s', tip: 'OL temeli alt vücut.' },
                            { name: 'Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Denge ve stabilite.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pas Koruma Temeli', exercises: [
                            { name: 'Punch Tekniği (pad)', sets: '3', reps: '10', rest: '45s', tip: 'İki el eş zamanlı.' },
                            { name: 'Mirror Drill (yavaş)', sets: '3', reps: '6', rest: '60s', tip: 'Merkez önce, tepki sonra.' },
                            { name: 'Wall Sit', sets: '3', reps: '30sn', rest: '45s', tip: 'Diz açısı 90°.' },
                            { name: 'Hip Açma Egzersizi', sets: '3', reps: '12/taraf', rest: '30s', tip: 'Stance genişliği için.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Temeli', exercises: [
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '75s', tip: 'OL gücü bacaktan.' },
                            { name: 'DB Row', sets: '3', reps: '10/taraf', rest: '60s', tip: 'Sırt gücü punch için.' },
                            { name: 'Farmer Walk', sets: '3', reps: '25m', rest: '60s', tip: 'Kor kilitli yürü.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30sn', rest: '—', tip: 'Stance açısı korur.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Hattı koru. Erkenden set ol. Her playde.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Pass Protection', exercises: [
                            { name: 'Kick Slide + Punch', sets: '4', reps: '10m', rest: '60s', tip: 'Hareket içinde punch.' },
                            { name: 'Set Point Drill', sets: '4', reps: '8', rest: '45s', tip: 'Pocket sınırını koru.' },
                            { name: 'Squat (ağırlıklı)', sets: '4', reps: '6', rest: '120s', tip: 'OL temel güç.' },
                            { name: 'Pallof Press', sets: '3', reps: '12/taraf', rest: '45s', tip: 'Rotational stabilite.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Run Block', exercises: [
                            { name: 'Drive Block (pad)', sets: '4', reps: '8', rest: '75s', tip: 'Alçak çıkış, yüksel sür.' },
                            { name: 'Zone Block (yan hareket)', sets: '4', reps: '6', rest: '60s', tip: 'Hat ile birlikte kayma.' },
                            { name: 'Deadlift', sets: '4', reps: '5', rest: '150s', tip: 'Hamstring+kalça zinciri.' },
                            { name: 'DB Lunge', sets: '3', reps: '10/bacak', rest: '60s', tip: 'Blok pozisyon benzetmesi.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Ayak İşi & Kond.', exercises: [
                            { name: 'Sled Push (ılımlı)', sets: '4', reps: '20m', rest: '90s', tip: '4. çeyrek için temel.' },
                            { name: 'Lateral Quickstep', sets: '4', reps: '10m/taraf', rest: '60s', tip: 'Pass pro lateral hız.' },
                            { name: 'Duck Walk', sets: '3', reps: '15m', rest: '45s', tip: 'Stance açısı mobilite.' },
                            { name: 'Foam Roll (kalça)', sets: '3', reps: '45sn', rest: '—', tip: 'Kasık sağlığı.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Görünmez kahraman. Her play\'de sıfır hata.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Pass Pro', exercises: [
                            { name: 'Kick Slide vs Speed Rush', sets: '5', reps: '8', rest: '60s', tip: 'Hız rusher önünde hız eş.' },
                            { name: 'Mirror vs Power Rush', sets: '5', reps: '6', rest: '75s', tip: 'Punch timing kritik.' },
                            { name: 'Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'Maksimum güç çalışması.' },
                            { name: 'Core Anti-Rotation', sets: '4', reps: '12/taraf', rest: '45s', tip: 'Pocket stabilite.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Run Block Mastery', exercises: [
                            { name: 'Double Team vs NT', sets: '5', reps: '8', rest: '75s', tip: '2. level\'a git, bırakma.' },
                            { name: 'Pull Block (trap)', sets: '4', reps: '6', rest: '60s', tip: 'Hızlı dönüş + aç.' },
                            { name: 'Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'Hat explosiveness.' },
                            { name: 'Sled Sprint', sets: '4', reps: '20m', rest: '90s', tip: 'Run block uzak sürme.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç + Kondisyon', exercises: [
                            { name: 'Deadlift @85%', sets: '5', reps: '3', rest: '180s', tip: 'OL zirve güç.' },
                            { name: 'Farmer Walk (ağır)', sets: '4', reps: '40m', rest: '60s', tip: 'Play sonu gücü.' },
                            { name: 'Turkish Get-Up', sets: '3', reps: '5/taraf', rest: '60s', tip: 'Omuz sağlığı koruma.' },
                            { name: 'Recovery & Film', sets: '—', reps: '20 dk', rest: '—', tip: 'DT şemalarını incele.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ DL ═══════════════ */
    DL: {
        emoji: '🧱', color: 'from-red-600 to-rose-900',
        keyAttributes: [
            { label: 'Güç', value: 'Point of attack' },
            { label: 'Pass Rush', value: 'Sack + hit' },
            { label: 'Penetrasyon', value: 'Gap yönetimi' },
            { label: 'Kondisyon', value: 'Her play aynı' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Birinci adımı kilitle. Hattı geçmeyi ögren.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Stance & İlk Adım', exercises: [
                            { name: 'DL Üç Nokta Duruş', sets: '3', reps: '8', rest: '45s', tip: 'Alçak, ağırlık öne.' },
                            { name: 'Get-Off Drill (snap)', sets: '3', reps: '6', rest: '60s', tip: 'Snap sesi ile patlat.' },
                            { name: 'Push-Up (geniş tutuş)', sets: '3', reps: '12', rest: '45s', tip: 'Punch gücü temeli.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30sn', rest: '—', tip: 'Get-off için gerekli.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Gap Kontrolü', exercises: [
                            { name: 'Shuffle & Gap Hold', sets: '3', reps: '8', rest: '45s', tip: 'Gap bırakma, kontrol et.' },
                            { name: 'Tackle Dummy Hit', sets: '3', reps: '8', rest: '60s', tip: 'Düşük vuruş, güvenli.' },
                            { name: 'Squat (vücut ağ.)', sets: '3', reps: '12', rest: '60s', tip: 'Alt vücut kurulumu.' },
                            { name: 'Core Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Stabilite temeli.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Temeli', exercises: [
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '75s', tip: 'DL güç başlangıcı.' },
                            { name: 'Band Pull-Apart', sets: '3', reps: '15', rest: '30s', tip: 'Shoulders sağlığı.' },
                            { name: 'Sled Push (hafif)', sets: '3', reps: '15m', rest: '75s', tip: 'DL drive kuvveti.' },
                            { name: 'Hip Bridge', sets: '3', reps: '12', rest: '45s', tip: 'Kalça aktivasyonu.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Bloğu kır, QB\'ye ulaş. Baskıyı hissettir.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Pass Rush Moves', exercises: [
                            { name: 'Swim Move', sets: '4', reps: '8', rest: '45s', tip: 'Dış el sal, içten geç.' },
                            { name: 'Rip Move', sets: '4', reps: '8', rest: '45s', tip: 'Alçak rip, arm under.' },
                            { name: 'Bull Rush (sled)', sets: '4', reps: '15m', rest: '75s', tip: 'Kısa adım, sürekli güç.' },
                            { name: 'Explosive Push-Up', sets: '3', reps: '8', rest: '60s', tip: 'Punch gücü aktif.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Run Stuff', exercises: [
                            { name: 'Gap Control + Shed', sets: '4', reps: '6', rest: '60s', tip: 'Gap → bloker at → tackle.' },
                            { name: 'Bench Press', sets: '4', reps: '8', rest: '90s', tip: 'Punch kuvveti.' },
                            { name: 'Power Clean', sets: '3', reps: '4', rest: '120s', tip: 'İlk adım patlayıcılığı.' },
                            { name: 'Lateral Agility Drill', sets: '4', reps: '10m', rest: '60s', tip: 'DL yan hareketi.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç', exercises: [
                            { name: 'Back Squat', sets: '4', reps: '6', rest: '120s', tip: 'Ağır yükleme temeli.' },
                            { name: 'Hip Thrust', sets: '4', reps: '8', rest: '90s', tip: 'İlk adım kalça gücü.' },
                            { name: 'Sled Push (ağır)', sets: '4', reps: '20m', rest: '90s', tip: 'DL dayanıklılık.' },
                            { name: 'Deadlift', sets: '3', reps: '5', rest: '150s', tip: 'Posterior chain.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Sack. TFL. Pressure. Her play\'de baskı.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Pass Rush Elite', exercises: [
                            { name: 'Counter Move (swim→spin)', sets: '5', reps: '6', rest: '60s', tip: 'İlk hamle sahte, ikinci gerçek.' },
                            { name: 'Long Arm + Rip Combo', sets: '5', reps: '8', rest: '60s', tip: 'OL uzat, sol taraf geç.' },
                            { name: 'Bull Rush @max', sets: '5', reps: '20m', rest: '90s', tip: 'Maksimum güç uygulaması.' },
                            { name: 'Rotational Med Ball', sets: '4', reps: '10', rest: '30s', tip: 'Spin move core gücü.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Domination Drill', exercises: [
                            { name: 'TFL Drill (dummy)', sets: '5', reps: '6', rest: '60s', tip: 'Bekle → patlat → tackle.' },
                            { name: 'Bench @85%', sets: '5', reps: '3', rest: '150s', tip: 'Punch kuvveti pik.' },
                            { name: 'get-off + Rush Combo', sets: '5', reps: '6', rest: '75s', tip: 'Sub-second get-off.' },
                            { name: 'Hip Thrust (ağır)', sets: '4', reps: '6', rest: '90s', tip: 'İlk adım patlama.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Pik', exercises: [
                            { name: 'Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'DL maksimum güç.' },
                            { name: 'Hang Power Clean', sets: '5', reps: '4', rest: '120s', tip: '1. adım hız.' },
                            { name: 'Conditioning Circuit', sets: '4', reps: '3 egz.', rest: '60s', tip: 'DL oyun sonu kondisyon.' },
                            { name: 'Film & Recovery', sets: '—', reps: '20 dk', rest: '—', tip: 'OL zafiyetlerini bul.' },
                        ]
                    },
                ],
            },
        },
    },


    /* ═══════════════ LB ═══════════════ */
    LB: {
        emoji: '👁️', color: 'from-teal-500 to-cyan-700',
        keyAttributes: [
            { label: 'Saha Okuma', value: 'Pre-snap IQ' },
            { label: 'Fizik', value: 'Güç + çeviklik' },
            { label: 'Coverage', value: 'Zone + Man' },
            { label: 'Blitz', value: 'Hızlı geçiş' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Sahayı oku. Pozisyonu koru. Temel tackle ögren.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Duruş & Tepki', exercises: [
                            { name: 'LB Stance (Athletic)', sets: '3', reps: '8', rest: '45s', tip: 'Alçak, omuz genişliğinde.' },
                            { name: 'Shuffle & Stop', sets: '3', reps: '10m', rest: '45s', tip: 'Adım çaprazlanmamalı.' },
                            { name: 'Squat (hafif)', sets: '3', reps: '12', rest: '60s', tip: 'Alt vücut temel.' },
                            { name: 'Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Stabilite zorunlu.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Zone Drop Temeli', exercises: [
                            { name: 'Backpedal (yavaş)', sets: '3', reps: '10m', rest: '45s', tip: 'Kalça düşük, denge.' },
                            { name: 'Zone Drop Drill', sets: '3', reps: '6 senaryo', rest: '60s', tip: 'Koçun gösterdiği bölgeye.' },
                            { name: 'Open-Field Tackle (dummy)', sets: '3', reps: '8', rest: '60s', tip: 'Düşük vuruş, baş yan.' },
                            { name: 'DB Row', sets: '3', reps: '10/taraf', rest: '60s', tip: 'Sırt gücü tackle.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Kondisyon Temeli', exercises: [
                            { name: 'Tempo Koşu %60', sets: '5', reps: '60m', rest: '60s', tip: 'LB sahada çok koşar.' },
                            { name: 'Lateral Shuffle', sets: '4', reps: '10m/taraf', rest: '45s', tip: 'Zone coverage tabanı.' },
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '75s', tip: 'Diz ve kalça güç.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30sn', rest: '—', tip: 'Yön değiştirme için.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Blitz zamanla. Zone\'u kapat. Tackle yap.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Blitz & Reaksiyon', exercises: [
                            { name: 'Blitz Timing Drill', sets: '4', reps: '6', rest: '60s', tip: 'Snap anında patlat.' },
                            { name: 'Shuffle + Tackle', sets: '4', reps: '8', rest: '45s', tip: 'Gözler backfield\'de.' },
                            { name: 'Front Squat', sets: '4', reps: '6', rest: '120s', tip: 'LB dik duruş gücü.' },
                            { name: 'Backpedal + Break', sets: '4', reps: '10m geri + dönüş', rest: '60s', tip: 'Break noktasında patlat.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Coverage & Tackle', exercises: [
                            { name: 'Man Coverage Drill', sets: '4', reps: '6', rest: '60s', tip: 'TE\'yi gölgele.' },
                            { name: 'Angle Tackle (dummy)', sets: '4', reps: '8', rest: '45s', tip: 'Açılı vuruş baş yanda.' },
                            { name: 'Pull-Up', sets: '3', reps: '8', rest: '75s', tip: 'Sırt gücü RB tutma.' },
                            { name: 'Lateral Speed Drill', sets: '4', reps: '10m/taraf', rest: '60s', tip: 'Zone lateral hız.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Çeviklik', exercises: [
                            { name: 'T-Drill', sets: '5', reps: '1 tur', rest: '75s', tip: 'LB en kritik metrik.' },
                            { name: 'Pro Agility', sets: '5', reps: '1', rest: '60s', tip: 'Her köşe alçak.' },
                            { name: 'Deadlift', sets: '4', reps: '5', rest: '150s', tip: 'Posterior kuvvet.' },
                            { name: 'Core Circuit', sets: '3', reps: '4 egz.', rest: '45s', tip: 'Tüm hareketlerin temeli.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Sahayı yönetiyorsun. Ofans şemasını okuyorsun.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Read & React', exercises: [
                            { name: 'Pre-Snap Okuma Drili', sets: '5', reps: '6 senaryo', rest: '60s', tip: 'Formation\'dan play tahmin et.' },
                            { name: 'Reaktif Blitz', sets: '5', reps: '6', rest: '60s', tip: 'Koç işareti → anında patlat.' },
                            { name: 'Squat @82%', sets: '5', reps: '4', rest: '150s', tip: 'LB güç piki.' },
                            { name: 'Plyometric Lateral', sets: '4', reps: '8/taraf', rest: '60s', tip: 'Explosif yön değişimi.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pass Coverage Elite', exercises: [
                            { name: 'Zone + Man Combo', sets: '5', reps: '8 senaryo', rest: '60s', tip: 'Her playde ikisini de bil.' },
                            { name: 'TE Coverage Deep', sets: '4', reps: '6', rest: '60s', tip: 'Seam route takibi.' },
                            { name: 'Open-Field Tackle', sets: '4', reps: '6', rest: '60s', tip: 'Açık sahada sehpa.' },
                            { name: 'Complex Core Circuit', sets: '4', reps: '5 egz.', rest: '45s', tip: 'Multi-planar stabilite.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm Piki', exercises: [
                            { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'LB hız değerlendirmesi.' },
                            { name: 'Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'Patlayıcı güç.' },
                            { name: 'Film Review', sets: '—', reps: '20 dk', rest: '—', tip: 'Hücum rotalarını incele.' },
                            { name: 'Recovery Protocol', sets: '—', reps: '15 dk', rest: '—', tip: 'Soft tissue + stretch.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ CB ═══════════════ */
    CB: {
        emoji: '🔒', color: 'from-violet-500 to-purple-800',
        keyAttributes: [
            { label: 'Press Coverage', value: 'Man to man' },
            { label: 'Backpedal', value: 'Hızlı geri adım' },
            { label: 'INT', value: 'Pick 6 kapasitesi' },
            { label: 'Position', value: 'Hip turn' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Backpedal ögren. WR\'ı gözden kaybetme.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Backpedal Temeli', exercises: [
                            { name: 'Backpedal (yavaş)', sets: '3', reps: '10m', rest: '45s', tip: 'Kalça düşük, ağırlık öne.' },
                            { name: 'Hip Turn Drili', sets: '3', reps: '8/taraf', rest: '45s', tip: 'Baş döner, kalça arkadan.' },
                            { name: 'Lateral Shuffle', sets: '3', reps: '10m/taraf', rest: '45s', tip: 'Çapraz adım yok.' },
                            { name: 'Hip Abductor', sets: '3', reps: '15', rest: '30s', tip: 'Coverage lateral gücü.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Ball Tracking', exercises: [
                            { name: 'QB Eyes Takip', sets: '3', reps: '6 senaryo', rest: '60s', tip: 'QB\'ye bak, pas tahmin et.' },
                            { name: 'Break on Ball Drill', sets: '3', reps: '8', rest: '45s', tip: 'Top serbest → sprint.' },
                            { name: 'Zone Drop (short CB)', sets: '3', reps: '6', rest: '45s', tip: 'Kısa bölgenin üst kenarı.' },
                            { name: 'Core Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Coverage dengesi.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Hız Temeli', exercises: [
                            { name: '30m Sprint', sets: '5', reps: '30m', rest: '90s', tip: 'Drive ve maks hız.' },
                            { name: 'Butt Kicks', sets: '3', reps: '20m', rest: '30s', tip: 'Frekans ve geri diz.' },
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '60s', tip: 'Denge ve güç.' },
                            { name: 'Hamstring Germe', sets: '3', reps: '30sn/taraf', rest: '—', tip: 'Sprint sağlığı.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'WR\'ı kapat. Press ve off coverage uygula.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Press Coverage', exercises: [
                            { name: 'Jam Release (Swim/Rip)', sets: '4', reps: '8', rest: '45s', tip: 'İlk 5 yarda WR\'ı boz.' },
                            { name: 'Backpedal Sprint', sets: '4', reps: '10m geri+20m ileri', rest: '60s', tip: 'Denge → patlat.' },
                            { name: 'Mirror Drill (vs WR)', sets: '4', reps: '10sn', rest: '45s', tip: 'Reaksiyon her yönde.' },
                            { name: 'Single-Leg Squat', sets: '3', reps: '8/bacak', rest: '75s', tip: 'Tek yön denge şart.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Coverage & INT', exercises: [
                            { name: 'Ball Hawk Drill', sets: '4', reps: '10', rest: '45s', tip: 'INT noktasına sprint.' },
                            { name: 'High Point Catch', sets: '3', reps: '10', rest: '45s', tip: 'Elleri en yüksekte kilitle.' },
                            { name: 'W-Drill', sets: '4', reps: '1 tur', rest: '75s', tip: 'Köşelerde min hız kaybı.' },
                            { name: 'Resistance Band Side', sets: '4', reps: '15m', rest: '45s', tip: 'Lateral güç şart.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Hız & Güç', exercises: [
                            { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'Closing speed ölçümü.' },
                            { name: 'Romanian DL', sets: '4', reps: '8', rest: '90s', tip: 'Hamstring koruması.' },
                            { name: 'Deceleration Drill', sets: '4', reps: '6', rest: '45s', tip: 'Hızlı durmak kritik.' },
                            { name: 'Nordic Curl', sets: '3', reps: '5', rest: '90s', tip: 'Sprint sakatlık önlemi.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Her WR\'ı yeniyorsun. Pick-6 her maçta hedef.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Coverage', exercises: [
                            { name: 'Press + Trail Technique', sets: '5', reps: '6', rest: '60s', tip: 'Press → trail → INT.' },
                            { name: 'Double Move Defense', sets: '5', reps: '6', rest: '60s', tip: 'İlk break sahte, bekle.' },
                            { name: 'Sprint-to-Catch', sets: '5', reps: '8', rest: '60s', tip: 'Closing speed + el.' },
                            { name: 'Squat @82%', sets: '5', reps: '4', rest: '150s', tip: 'CB güç piki.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pick Artist Drill', exercises: [
                            { name: 'INT Return Simulation', sets: '5', reps: '5', rest: '90s', tip: 'Yakala → koş → skor.' },
                            { name: 'Zone + Man Combo Drill', sets: '4', reps: '8 senaryo', rest: '60s', tip: 'Her havalede hazır ol.' },
                            { name: 'Reactive Backpedal', sets: '5', reps: '10m', rest: '45s', tip: 'Sinyal ile yön değiştir.' },
                            { name: 'Plyometric Bound', sets: '4', reps: '8/taraf', rest: '60s', tip: 'Yatay closing güç.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlama & Kondisyon', exercises: [
                            { name: 'Resisted Sprint', sets: '5', reps: '25m', rest: '90s', tip: 'Stride uzunluğu artar.' },
                            { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'CB reaktif atletizm.' },
                            { name: 'Film: WR Route Trees', sets: '—', reps: '20 dk', rest: '—', tip: 'Rakip WR\'ı önceden oku.' },
                            { name: 'Recovery + Mobility', sets: '—', reps: '15 dk', rest: '—', tip: 'Maç hazırlığı.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ Safety ═══════════════ */
    Safety: {
        emoji: '🏹', color: 'from-emerald-500 to-green-800',
        keyAttributes: [
            { label: 'Saha Kontrolü', value: 'Deep coverage' },
            { label: 'Run Desteği', value: 'Downhill hız' },
            { label: 'Komunikasyon', value: 'DB lideri' },
            { label: 'Pre-Snap', value: 'Ofans okuma' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Son hat sensin. Derin alanı koru, koşucuyu durdur.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Deep Coverage Temeli', exercises: [
                            { name: 'Backpedal (derin)', sets: '3', reps: '15m', rest: '45s', tip: 'Derin yarıyı izle.' },
                            { name: 'QB Eyes Takibi', sets: '3', reps: '6 senaryo', rest: '60s', tip: 'Omuz yönü = pas yönü.' },
                            { name: 'Zone Drop (deep half)', sets: '3', reps: '6', rest: '45s', tip: 'Hash ortasını koru.' },
                            { name: 'Core Plank', sets: '3', reps: '25sn', rest: '30s', tip: 'Stabilite zorunlu.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Run Support', exercises: [
                            { name: 'Downhill Sprint', sets: '4', reps: '30m', rest: '75s', tip: 'Kapama hızı kritik.' },
                            { name: 'Open Field Tackle', sets: '3', reps: '6', rest: '60s', tip: 'Baş yan, kol sarmala.' },
                            { name: 'Box Drill', sets: '3', reps: '1 tur', rest: '60s', tip: 'Yön değişimi temeli.' },
                            { name: 'Goblet Squat', sets: '3', reps: '10', rest: '60s', tip: 'Downhill güç kaynağı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm Temeli', exercises: [
                            { name: '40-Yard Sprint', sets: '4', reps: '40m', rest: '120s', tip: 'Hız temeli ölçümü.' },
                            { name: 'Lateral Shuffle', sets: '3', reps: '10m/taraf', rest: '45s', tip: 'Diagonal coverage.' },
                            { name: 'Bulgarian Split Squat', sets: '3', reps: '8/bacak', rest: '75s', tip: 'Sprint mekaniği.' },
                            { name: 'Hamstring Germe', sets: '3', reps: '30sn', rest: '—', tip: 'Koşu sağlığı.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'İki derin alan ve run desteği. Her ikisini de yap.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'High Point & Read', exercises: [
                            { name: 'High Point Catch (derin)', sets: '4', reps: '10', rest: '45s', tip: 'WR üzerinden geç.' },
                            { name: 'Pre-Snap Read Drill', sets: '4', reps: '6 senaryo', rest: '60s', tip: 'Formation → coverage çağır.' },
                            { name: 'Angle Run Support', sets: '4', reps: '8', rest: '45s', tip: 'Diagonal yol, alçak kalça.' },
                            { name: 'Backpedal → Break', sets: '4', reps: '15m+sprint', rest: '60s', tip: 'Yavaş geri, hızlı ileri.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Tackle & Closing', exercises: [
                            { name: 'Open Field Tackle', sets: '4', reps: '6', rest: '60s', tip: 'Güvenli kol pozisyonu.' },
                            { name: 'Sprint Downhill', sets: '5', reps: '30m', rest: '75s', tip: 'İlk adım kapama başlar.' },
                            { name: 'Lateral Coverage Drill', sets: '4', reps: '10m', rest: '45s', tip: 'FS diagonal mesafesi.' },
                            { name: 'Pull-Up', sets: '3', reps: '8', rest: '60s', tip: 'Tacklede sırt gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm', exercises: [
                            { name: '40-Yard Sprint', sets: '5', reps: '40m', rest: '120s', tip: 'Closing speed ölçümü.' },
                            { name: 'Romanian DL', sets: '4', reps: '8', rest: '90s', tip: 'Sprint mekaniği.' },
                            { name: 'Band Pull-Apart', sets: '3', reps: '20', rest: '30s', tip: 'Derin coverage için omuz.' },
                            { name: 'Tempo Run', sets: '6', reps: '80m %70', rest: '60s', tip: '4. çeyrek altyapısı.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Son hat, takım lideri. Her detayı görüyorsun.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Read & INT', exercises: [
                            { name: 'Route Tree Anticipation', sets: '5', reps: '8 senaryo', rest: '60s', tip: 'Rotayı snap\'ten önce bil.' },
                            { name: 'Pick-6 Simulation', sets: '5', reps: '6', rest: '90s', tip: 'INT → dönüş → skor.' },
                            { name: 'Reactive Drill (ışık)', sets: '4', reps: '10', rest: '45s', tip: 'Anlık karar hızı.' },
                            { name: 'Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'Safety toplam atletizm.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Run Force & Tackle', exercises: [
                            { name: 'Force Drill (run force)', sets: '5', reps: '6', rest: '60s', tip: 'Yönlendir, takımı bekle.' },
                            { name: 'Physical Tackle', sets: '4', reps: '6', rest: '60s', tip: 'Hem hava hem koşu dur.' },
                            { name: 'Sprint + COD', sets: '5', reps: '30m+cut', rest: '75s', tip: 'Kesimde alçak kalça.' },
                            { name: 'Squat @82%', sets: '5', reps: '4', rest: '150s', tip: 'Safety güç piki.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Pik Kondisyon', exercises: [
                            { name: '100m Tempo x8', sets: '8', reps: '100m %75', rest: '60s', tip: '4. çeyrek dayanıklılık.' },
                            { name: 'Hang Power Clean', sets: '5', reps: '4', rest: '120s', tip: 'Explosif güç.' },
                            { name: 'Film: Ofans Deep Routes', sets: '—', reps: '20 dk', rest: '—', tip: 'Derin pas şemalarını gör.' },
                            { name: 'Full Recovery', sets: '—', reps: '15 dk', rest: '—', tip: 'Foam roll + stretch.' },
                        ]
                    },
                ],
            },
        },
    },

};


