export interface GymExercise { name: string; sets: string; reps: string; rest: string; tip: string; }
export interface GymWorkoutDay { day: string; title: string; exercises: GymExercise[]; }
export interface GymLevelProgram { tagline: string; weeklyPlan: GymWorkoutDay[]; }
export interface GymGoalData {
    emoji: string; color: string;
    keyAttributes: { label: string; value: string }[];
    programs: Record<'Başlangıç' | 'Orta' | 'İleri', GymLevelProgram>;
}

export const GYM_PROGRAMS: Record<string, GymGoalData> = {

    /* ═══════════════ Kas Geliştirme (Hypertrophy) ═══════════════ */
    Hypertrophy: {
        emoji: '💪', color: 'from-violet-500 to-purple-700',
        keyAttributes: [
            { label: 'Hedef', value: 'Kas büyümesi' },
            { label: 'Volüm', value: 'Yüksek TUT' },
            { label: 'Split', value: 'PPL / Bölgesel' },
            { label: 'Dinlenme', value: '60-90 sn' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Kas-bağlantısını kur. Doğru teknikle ilk adaptasyonu başlat.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Push (İtiş) — Göğüs, Omuz, Triceps', exercises: [
                            { name: 'Bench Press (bar)', sets: '3', reps: '10', rest: '90s', tip: 'Bar göğüs ortasına, dirsekler 45°.' },
                            { name: 'Incline DB Press', sets: '3', reps: '12', rest: '75s', tip: 'Üst göğüs vurgusu, kontrollü iniş.' },
                            { name: 'Overhead Press (ayakta)', sets: '3', reps: '10', rest: '90s', tip: 'Core sıkı, bar alından geçsin.' },
                            { name: 'Lateral Raise', sets: '3', reps: '15', rest: '45s', tip: 'Dirsek hafif bükük, serçe parmak yukarı.' },
                            { name: 'Triceps Pushdown', sets: '3', reps: '12', rest: '45s', tip: 'Dirsekler sabit, bilek dönmesin.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pull (Çekiş) — Sırt, Biceps', exercises: [
                            { name: 'Lat Pulldown', sets: '3', reps: '10', rest: '90s', tip: 'Geniş tutuş, göğse çek.' },
                            { name: 'Seated Cable Row', sets: '3', reps: '12', rest: '75s', tip: 'Göğüs dik, kürek kemikleri sık.' },
                            { name: 'DB Row', sets: '3', reps: '10/taraf', rest: '75s', tip: 'Dirsek arkaya, sırt düz.' },
                            { name: 'Face Pull', sets: '3', reps: '15', rest: '45s', tip: 'Arka omuz ve rotator cuff.' },
                            { name: 'Biceps Curl (DB)', sets: '3', reps: '12', rest: '45s', tip: 'Dirsek sabit, kontrollü iniş.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Legs (Bacak) — Quad, Ham, Glute', exercises: [
                            { name: 'Squat (bar)', sets: '3', reps: '10', rest: '120s', tip: 'Diz parmak ucunu geçmesin, dip pozisyon.' },
                            { name: 'Romanian Deadlift', sets: '3', reps: '10', rest: '90s', tip: 'Hamstring gerilimi hisset, sırt düz.' },
                            { name: 'Leg Press', sets: '3', reps: '12', rest: '90s', tip: 'Bel arkadan kalkmayacak kadar.' },
                            { name: 'Walking Lunge', sets: '3', reps: '10/bacak', rest: '75s', tip: 'Geniş adım, dik gövde.' },
                            { name: 'Calf Raise', sets: '3', reps: '15', rest: '45s', tip: 'Üstte 2 sn tut.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'Full Body & Weak Points', exercises: [
                            { name: 'DB Bench Press', sets: '3', reps: '12', rest: '75s', tip: 'Her elde bağımsız çalışma.' },
                            { name: 'Pull-Up (asist)', sets: '3', reps: '8', rest: '90s', tip: 'Kontrollü iniş, full ROM.' },
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '60s', tip: 'Göğüs dik, kalça aktif.' },
                            { name: 'Plank', sets: '3', reps: '30 sn', rest: '30s', tip: 'Core bağlantısı her harekette.' },
                            { name: 'Face Pull', sets: '3', reps: '15', rest: '45s', tip: 'Postür düzeltme / arka omuz.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Volümü artır, progresif yükle. Kas büyümesi burada başlar.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Push — Progresif Yükleme', exercises: [
                            { name: 'Bench Press', sets: '4', reps: '8', rest: '2 dk', tip: '%75-80 1RM, kontrollü.' },
                            { name: 'Incline DB Press', sets: '4', reps: '10', rest: '90s', tip: 'Tempo: 3-1-1 (iniş-dur-çıkış).' },
                            { name: 'Cable Flye', sets: '4', reps: '12', rest: '60s', tip: 'Tam stretch, peak contraction.' },
                            { name: 'Military Press', sets: '4', reps: '8', rest: '90s', tip: 'Omuz mobility düzenli kontrol et.' },
                            { name: 'Overhead Triceps Extension', sets: '4', reps: '12', rest: '45s', tip: 'Long head vurgusu.' },
                            { name: 'Lateral Raise Drop Set', sets: '3', reps: '12+8+8', rest: '60s', tip: 'Drop set: ağırlık azalt, devam et.' },
                        ]
                    },
                    {
                        day: 'SAL', title: 'Pull — Hacim & Detay', exercises: [
                            { name: 'Barbell Row', sets: '4', reps: '8', rest: '2 dk', tip: '45° gövde açısı, bar karına.' },
                            { name: 'Weighted Pull-Up', sets: '4', reps: '6', rest: '2 dk', tip: 'Kemer kullan, full ROM.' },
                            { name: 'Cable Pullover', sets: '4', reps: '12', rest: '60s', tip: 'Lat stretch hisset.' },
                            { name: 'Reverse Flye', sets: '4', reps: '15', rest: '45s', tip: 'Arka delt izolasyon.' },
                            { name: 'Hammer Curl', sets: '4', reps: '10', rest: '45s', tip: 'Brachialis + ön kol.' },
                            { name: 'Incline DB Curl', sets: '3', reps: '12', rest: '45s', tip: 'Biceps uzun baş stretch.' },
                        ]
                    },
                    {
                        day: 'PER', title: 'Legs — Hacim Günü', exercises: [
                            { name: 'Front Squat', sets: '4', reps: '8', rest: '2 dk', tip: 'Quad dominant, dik gövde.' },
                            { name: 'Romanian Deadlift', sets: '4', reps: '8', rest: '2 dk', tip: '%75 1RM, hamstring odak.' },
                            { name: 'Bulgarian Split Squat', sets: '4', reps: '10/bacak', rest: '90s', tip: 'Tek bacak güç dengesi.' },
                            { name: 'Leg Curl', sets: '4', reps: '12', rest: '60s', tip: 'Eksantrik yavaş.' },
                            { name: 'Hip Thrust', sets: '4', reps: '10', rest: '90s', tip: 'Glute peak contraction.' },
                            { name: 'Calf Raise (oturarak)', sets: '4', reps: '15', rest: '45s', tip: 'Soleus odak.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'Arms & Shoulders Focus', exercises: [
                            { name: 'Arnold Press', sets: '4', reps: '10', rest: '75s', tip: 'Rotasyonlu, tam ROM.' },
                            { name: 'Lateral Raise (cable)', sets: '4', reps: '12', rest: '45s', tip: 'Sürekli gerilim.' },
                            { name: 'Close Grip Bench', sets: '4', reps: '8', rest: '90s', tip: 'Triceps dominant itme.' },
                            { name: 'Preacher Curl', sets: '4', reps: '10', rest: '45s', tip: 'Tam izolasyon, cheat yok.' },
                            { name: 'Face Pull', sets: '4', reps: '15', rest: '45s', tip: 'Omuz sağlığı + arka delt.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Elit hacim, ileri teknikler. Kas gelişiminde platoya yer yok.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Push — Max Hypertrophy', exercises: [
                            { name: 'Bench Press', sets: '5', reps: '6', rest: '3 dk', tip: '%80-85 1RM, spotter al.' },
                            { name: 'Incline DB Press (tempo)', sets: '4', reps: '10', rest: '90s', tip: '4-0-1 tempo, TUT uzun.' },
                            { name: 'Pec Deck Flye', sets: '4', reps: '12', rest: '60s', tip: 'Peak squeeze 2 sn.' },
                            { name: 'Seated DB Press', sets: '4', reps: '8', rest: '90s', tip: 'Omuz hacmi ağır yük.' },
                            { name: 'Skullcrusher', sets: '4', reps: '10', rest: '60s', tip: 'EZ bar, alnın hizasına.' },
                            { name: 'Cable Lateral Raise SS → Front Raise', sets: '4', reps: '12+10', rest: '60s', tip: 'Superset: yan + ön omuz.' },
                        ]
                    },
                    {
                        day: 'SAL', title: 'Pull — Back Thickness & Width', exercises: [
                            { name: 'Deadlift', sets: '5', reps: '5', rest: '3 dk', tip: '%80+ 1RM, kayış kullan.' },
                            { name: 'Weighted Pull-Up', sets: '5', reps: '5', rest: '2 dk', tip: 'Ağır yük, kontrol.' },
                            { name: 'T-Bar Row', sets: '4', reps: '8', rest: '90s', tip: 'Sırt kalınlığı odak.' },
                            { name: 'Straight Arm Pulldown', sets: '4', reps: '12', rest: '60s', tip: 'Lat izolasyonu.' },
                            { name: 'Barbell Curl', sets: '4', reps: '8', rest: '60s', tip: 'Ağır curl, kontrollü.' },
                            { name: 'Incline Curl + Hammer SS', sets: '3', reps: '10+10', rest: '60s', tip: 'Biceps superset.' },
                        ]
                    },
                    {
                        day: 'PER', title: 'Legs — Max Strength + Hypertrophy', exercises: [
                            { name: 'Back Squat', sets: '5', reps: '5', rest: '3 dk', tip: '%85 1RM, dip pozisyon.' },
                            { name: 'Romanian Deadlift', sets: '5', reps: '6', rest: '2 dk', tip: 'Ağır yük, hamstring.' },
                            { name: 'Hack Squat', sets: '4', reps: '10', rest: '90s', tip: 'Quad izolasyonu.' },
                            { name: 'GHR / Nordic', sets: '4', reps: '6', rest: '90s', tip: 'Eksantrik hamstring.' },
                            { name: 'Hip Thrust', sets: '5', reps: '8', rest: '90s', tip: 'Ağır yük, glute.' },
                            { name: 'Calf Complex', sets: '4', reps: '12 ayakta + 12 oturarak', rest: '60s', tip: 'Gastro + soleus.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'Upper Body Detail', exercises: [
                            { name: 'OHP', sets: '4', reps: '6', rest: '2 dk', tip: 'Omuz gücü + hacim.' },
                            { name: 'Cable Crossover', sets: '4', reps: '12', rest: '60s', tip: 'Göğüs detay ve çizgi.' },
                            { name: 'V-Bar Pulldown', sets: '4', reps: '10', rest: '75s', tip: 'Sırt alt bölge odak.' },
                            { name: 'French Press', sets: '4', reps: '10', rest: '60s', tip: 'Triceps long head.' },
                            { name: 'Concentration Curl', sets: '3', reps: '12/taraf', rest: '30s', tip: 'Pik detay.' },
                            { name: 'Face Pull + Band Pull-Apart', sets: '3', reps: '15+15', rest: '45s', tip: 'Omuz sağlığı finali.' },
                        ]
                    },
                    {
                        day: 'PAZ', title: 'Active Recovery & Conditioning', exercises: [
                            { name: 'Hafif Yürüyüş / Bisiklet', sets: '1', reps: '20 dk', rest: '—', tip: 'Düşük nabız aktif toparlanma.' },
                            { name: 'Full Body Stretching', sets: '1', reps: '15 dk', rest: '—', tip: 'Kas gruplarını sırayla gerin.' },
                            { name: 'Foam Rolling', sets: '1', reps: '10 dk', rest: '—', tip: 'IT band, quad, lat odak.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ Güç (Strength) ═══════════════ */
    Strength: {
        emoji: '🏋️', color: 'from-red-600 to-rose-800',
        keyAttributes: [
            { label: 'Hedef', value: 'Maksimum güç' },
            { label: 'Rep', value: '1-6 ağır' },
            { label: 'Dinlenme', value: '3-5 dk' },
            { label: 'Program', value: 'Compound odak' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Büyük kaldırılara giriş. Form her şeyin önünde.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Squat & Lower Push', exercises: [
                            { name: 'Back Squat', sets: '3', reps: '8', rest: '2 dk', tip: 'Dip pozisyon, sırt düz, nefes tutarak çık.' },
                            { name: 'Leg Press', sets: '3', reps: '10', rest: '90s', tip: 'Squat\'ı tamamlayıcı hacim.' },
                            { name: 'Walking Lunge', sets: '3', reps: '10/bacak', rest: '75s', tip: 'Denge + unilateral güç.' },
                            { name: 'Plank', sets: '3', reps: '30 sn', rest: '30s', tip: 'Core güç kaldırışlarda temel.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Bench & Upper Push', exercises: [
                            { name: 'Bench Press', sets: '3', reps: '8', rest: '2 dk', tip: 'Ayaklar yerde, kürek kemikleri sıkı.' },
                            { name: 'Overhead Press', sets: '3', reps: '8', rest: '90s', tip: 'Bar alnından geçsin, lockout tam.' },
                            { name: 'DB Row', sets: '3', reps: '10/taraf', rest: '75s', tip: 'Bench pres dengesi.' },
                            { name: 'Band Pull-Apart', sets: '3', reps: '15', rest: '30s', tip: 'Omuz sağlığı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Deadlift & Hinge', exercises: [
                            { name: 'Conventional Deadlift', sets: '3', reps: '6', rest: '3 dk', tip: 'Kalça itmesi, bar bacak yanında.' },
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '60s', tip: 'Ek bacak hacmi.' },
                            { name: 'Glute Bridge', sets: '3', reps: '15', rest: '45s', tip: 'Kalça aktivasyonu.' },
                            { name: 'Core Dead Bug', sets: '3', reps: '10/taraf', rest: '30s', tip: 'Deadlift core desteği.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Progresif yükleme. Her hafta biraz daha ağır, biraz daha güçlü.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Max Squat Day', exercises: [
                            { name: 'Back Squat', sets: '5', reps: '5', rest: '3 dk', tip: '%78-82 1RM, her hafta 2.5 kg artır.' },
                            { name: 'Pause Squat', sets: '3', reps: '3', rest: '3 dk', tip: 'Dipte 3 sn bekle, patlat.' },
                            { name: 'Leg Press', sets: '4', reps: '8', rest: '90s', tip: 'Hacim tamamlayıcı.' },
                            { name: 'Core Pallof Press', sets: '3', reps: '10/taraf', rest: '45s', tip: 'Anti-rotasyon gücü.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Max Bench Day', exercises: [
                            { name: 'Bench Press', sets: '5', reps: '5', rest: '3 dk', tip: '%78-82 1RM, progresif artış.' },
                            { name: 'Close-Grip Bench', sets: '3', reps: '8', rest: '2 dk', tip: 'Triceps + lockout gücü.' },
                            { name: 'Barbell Row', sets: '4', reps: '6', rest: '2 dk', tip: 'Bench antagonist dengesi.' },
                            { name: 'Face Pull', sets: '3', reps: '15', rest: '45s', tip: 'Bench sonrası omuz dengesi.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Max Deadlift Day', exercises: [
                            { name: 'Deadlift', sets: '5', reps: '3', rest: '3 dk', tip: '%80-85 1RM, grip kayarsa kayış.' },
                            { name: 'Deficit Deadlift', sets: '3', reps: '5', rest: '3 dk', tip: 'Alt ROM güçlendir.' },
                            { name: 'Hip Thrust', sets: '4', reps: '8', rest: '90s', tip: 'Lockout gücü.' },
                            { name: 'Farmer Walk', sets: '3', reps: '40 m', rest: '90s', tip: 'Kavrama + core.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'OHP & Accessory', exercises: [
                            { name: 'Overhead Press', sets: '5', reps: '5', rest: '3 dk', tip: 'Dördüncü büyük kaldırış.' },
                            { name: 'Weighted Pull-Up', sets: '4', reps: '5', rest: '2 dk', tip: 'Çekiş dengesi.' },
                            { name: 'DB Lateral Raise', sets: '3', reps: '15', rest: '45s', tip: 'Omuz hacmi.' },
                            { name: 'Biceps Curl', sets: '3', reps: '10', rest: '45s', tip: 'Çekiş yardımcısı.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Zirveye ulaş. %90+ yüklerle çalış, elit güç kaz.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Heavy Squat', exercises: [
                            { name: 'Back Squat', sets: '5', reps: '3', rest: '4 dk', tip: '%85-90 1RM. Spotter ve kemer şart.' },
                            { name: 'Pin Squat', sets: '3', reps: '2', rest: '4 dk', tip: 'Alt ROM güç açığını kapat.' },
                            { name: 'Front Squat', sets: '3', reps: '5', rest: '3 dk', tip: 'Quad dominant, dik postür.' },
                            { name: 'Ab Wheel Rollout', sets: '4', reps: '10', rest: '60s', tip: 'Heavy squat core desteği.' },
                        ]
                    },
                    {
                        day: 'SAL', title: 'Heavy Bench', exercises: [
                            { name: 'Bench Press', sets: '5', reps: '3', rest: '4 dk', tip: '%85-90 1RM, arkadan spotter.' },
                            { name: 'Board Press / Floor Press', sets: '3', reps: '3', rest: '3 dk', tip: 'Lockout gücü geliştirme.' },
                            { name: 'Weighted Dip', sets: '4', reps: '5', rest: '2 dk', tip: 'Triceps + göğüs gücü.' },
                            { name: 'Band Pull-Apart + Face Pull', sets: '3', reps: '15+15', rest: '45s', tip: 'Omuz sağlığı superset.' },
                        ]
                    },
                    {
                        day: 'PER', title: 'Heavy Deadlift', exercises: [
                            { name: 'Deadlift', sets: '5', reps: '2', rest: '4 dk', tip: '%87-92 1RM, kontrollü iniş.' },
                            { name: 'Block Pull', sets: '3', reps: '3', rest: '3 dk', tip: 'Üst ROM + lockout.' },
                            { name: 'Barbell Row (Pendlay)', sets: '4', reps: '5', rest: '2 dk', tip: 'Patlayıcı çekiş.' },
                            { name: 'Hanging Leg Raise', sets: '4', reps: '10', rest: '60s', tip: 'Dead bug pozisyondan.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'Dynamic Effort + OHP', exercises: [
                            { name: 'Speed Squat (%60 + band)', sets: '8', reps: '2', rest: '60s', tip: 'Hız odaklı, patlayıcı çıkış.' },
                            { name: 'Speed Bench (%60 + chain)', sets: '8', reps: '3', rest: '60s', tip: 'Bar hızı > yük.' },
                            { name: 'OHP', sets: '4', reps: '5', rest: '2 dk', tip: 'Omuz güç gelişimi.' },
                            { name: 'Recovery Protocol', sets: '—', reps: '15 dk', rest: '—', tip: 'Foam roll + band + stretch.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ Yağ Yakımı (Fat Loss) ═══════════════ */
    FatLoss: {
        emoji: '🔥', color: 'from-orange-500 to-amber-600',
        keyAttributes: [
            { label: 'Hedef', value: 'Yağ oranı düşürme' },
            { label: 'Tempo', value: 'Yüksek yoğunluk' },
            { label: 'Kombinasyon', value: 'Ağırlık + HIIT' },
            { label: 'Dinlenme', value: '30-60 sn' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Metabolizmayı ateşle. Ağırlık + kardiyo birleşimi.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Full Body Circuit A', exercises: [
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '45s', tip: 'Alt vücut + core aynı anda.' },
                            { name: 'Push-Up', sets: '3', reps: '12', rest: '30s', tip: 'Göğüs + triceps temel.' },
                            { name: 'DB Row', sets: '3', reps: '10/taraf', rest: '45s', tip: 'Sırt + arka omuz.' },
                            { name: 'Mountain Climber', sets: '3', reps: '20/taraf', rest: '30s', tip: 'Kardiyovasküler yakıt.' },
                            { name: 'Plank', sets: '3', reps: '30 sn', rest: '30s', tip: 'Core bağlantısı.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'HIIT Cardio', exercises: [
                            { name: 'Jump Squat', sets: '4', reps: '15', rest: '30s', tip: 'Patlayıcı sıçrama, yumuşak iniş.' },
                            { name: 'Burpee', sets: '4', reps: '8', rest: '45s', tip: 'Full body EPOC artırıcı.' },
                            { name: 'High Knees', sets: '4', reps: '30 sn', rest: '30s', tip: 'İnterval sprint etkisi.' },
                            { name: 'Jumping Jack', sets: '4', reps: '30', rest: '30s', tip: 'Aktif dinlenme aralığı.' },
                            { name: 'Cool Down Walk', sets: '1', reps: '5 dk', rest: '—', tip: 'Nabzı düşür.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Full Body Circuit B', exercises: [
                            { name: 'Lunge Walk', sets: '3', reps: '10/bacak', rest: '45s', tip: 'Bacak + glute.' },
                            { name: 'DB Press', sets: '3', reps: '12', rest: '45s', tip: 'Göğüs push.' },
                            { name: 'Lat Pulldown', sets: '3', reps: '12', rest: '45s', tip: 'Sırt çekiş.' },
                            { name: 'Kettlebell Swing', sets: '3', reps: '15', rest: '45s', tip: 'Posterior chain + kondisyon.' },
                            { name: 'Dead Bug', sets: '3', reps: '10/taraf', rest: '30s', tip: 'Core devamlılık.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Süpersetler ve metabolik devreler. Yağ yakarken kas koru.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Superset Upper Body', exercises: [
                            { name: 'Bench Press SS → Pull-Up', sets: '4', reps: '10+8', rest: '60s', tip: 'Push-pull superset, tempo yüksek.' },
                            { name: 'OHP SS → DB Row', sets: '4', reps: '10+10', rest: '60s', tip: 'İkinci superset, nefes kontrol.' },
                            { name: 'Triceps Dip SS → Biceps Curl', sets: '3', reps: '12+12', rest: '45s', tip: 'Kol superset finisher.' },
                        ]
                    },
                    {
                        day: 'SAL', title: 'HIIT + Core', exercises: [
                            { name: 'Assault Bike HIIT', sets: '6', reps: '20 sn max', rest: '40s', tip: 'All-out sprint aralık.' },
                            { name: 'Sled Push', sets: '4', reps: '20 m', rest: '45s', tip: 'Metabolik overload.' },
                            { name: 'Med Ball Slam', sets: '4', reps: '12', rest: '30s', tip: 'Tam vücut patlama.' },
                            { name: 'Hanging Leg Raise', sets: '3', reps: '12', rest: '30s', tip: 'Core def.' },
                            { name: 'Pallof Press', sets: '3', reps: '10/taraf', rest: '30s', tip: 'Anti-rotasyon.' },
                        ]
                    },
                    {
                        day: 'PER', title: 'Superset Lower Body', exercises: [
                            { name: 'Squat SS → RDL', sets: '4', reps: '8+10', rest: '75s', tip: 'Quad + hamstring superset.' },
                            { name: 'Leg Press SS → Leg Curl', sets: '4', reps: '10+12', rest: '60s', tip: 'Makineli hacim.' },
                            { name: 'Walking Lunge SS → Calf Raise', sets: '3', reps: '10+15', rest: '60s', tip: 'Bacak finisher.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'Metabolik Devre', exercises: [
                            { name: 'KB Swing', sets: '5', reps: '15', rest: '30s', tip: 'Kalça snap, nefes ritmi.' },
                            { name: 'Renegade Row', sets: '4', reps: '8/taraf', rest: '30s', tip: 'Plank + row.' },
                            { name: 'Thruster (DB)', sets: '4', reps: '10', rest: '45s', tip: 'Squat + press combo.' },
                            { name: 'Battle Rope', sets: '4', reps: '30 sn', rest: '30s', tip: 'Upper body HIIT.' },
                            { name: 'Conditioning Cool Down', sets: '1', reps: '10 dk', rest: '—', tip: 'Yürüyüş + stretch.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Maksimum EPOC, minimum yağ. Elit metabolik antrenman.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Heavy Compound + Finisher', exercises: [
                            { name: 'Back Squat', sets: '5', reps: '5', rest: '2 dk', tip: 'Ağır yük kas korur, kalori yakar.' },
                            { name: 'Bench Press', sets: '4', reps: '6', rest: '2 dk', tip: 'Yüksek EPOC.' },
                            { name: 'Sled Push Sprint', sets: '5', reps: '20 m', rest: '45s', tip: 'Finisher metabolik.' },
                            { name: 'Assault Bike Tabata', sets: '4', reps: '20 sn/10 sn', rest: '—', tip: 'Son 4 dk all-out.' },
                        ]
                    },
                    {
                        day: 'SAL', title: 'Metabolik Devre Elit', exercises: [
                            { name: 'KB Complex (Swing-Clean-Press-Squat)', sets: '5', reps: '5/hareket', rest: '60s', tip: 'Non-stop tam vücut devre.' },
                            { name: 'Rowing Erg Sprint', sets: '6', reps: '200 m', rest: '60s', tip: 'Sprint interval.' },
                            { name: 'Farmer Walk Sprint', sets: '4', reps: '40 m', rest: '45s', tip: 'Ağır yük + hız.' },
                            { name: 'Core Circuit', sets: '3', reps: '5 egzersiz', rest: '30s', tip: 'Plank-crunch-leg raise-twist-dead bug.' },
                        ]
                    },
                    {
                        day: 'PER', title: 'Strength + Conditioning', exercises: [
                            { name: 'Deadlift', sets: '5', reps: '3', rest: '3 dk', tip: 'Ağır yük metabolik tepki.' },
                            { name: 'Barbell Row', sets: '4', reps: '6', rest: '2 dk', tip: 'Sırt gücü koruma.' },
                            { name: 'EMOM: Burpee + Box Jump', sets: '1', reps: '10 dk', rest: '—', tip: 'Her dakika 3 burpee + 3 box jump.' },
                            { name: 'Bike Sprint Flush', sets: '1', reps: '10 dk hafif', rest: '—', tip: 'Laktat temizleme.' },
                        ]
                    },
                    {
                        day: 'CMT', title: 'HIIT + Active Recovery', exercises: [
                            { name: 'Ski Erg Sprint', sets: '8', reps: '15 sn', rest: '45s', tip: 'Üst vücut HIIT.' },
                            { name: 'Med Ball Complex', sets: '5', reps: '8', rest: '30s', tip: 'Slam + twist + toss.' },
                            { name: 'Jump Rope Double-Under', sets: '5', reps: '20', rest: '30s', tip: 'Koordinasyon + kondisyon.' },
                            { name: 'Foam Rolling + Stretch', sets: '1', reps: '15 dk', rest: '—', tip: 'Tam vücut toparlanma.' },
                        ]
                    },
                ],
            },
        },
    },

};
