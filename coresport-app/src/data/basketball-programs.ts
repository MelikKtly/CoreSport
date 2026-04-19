export interface BasketballExercise { name: string; sets: string; reps: string; rest: string; tip: string; }
export interface BasketballWorkoutDay { day: string; title: string; exercises: BasketballExercise[]; }
export interface BasketballLevelProgram { tagline: string; weeklyPlan: BasketballWorkoutDay[]; }
export interface BasketballPositionData {
    emoji: string; color: string;
    keyAttributes: { label: string; value: string }[];
    programs: Record<'Başlangıç' | 'Orta' | 'İleri', BasketballLevelProgram>;
}

export const BB_PROGRAMS: Record<string, BasketballPositionData> = {

    /* ═══════════════ PG ═══════════════ */
    PG: {
        emoji: '🏀', color: 'from-orange-500 to-red-600',
        keyAttributes: [
            { label: 'Vizyon', value: 'Saha okuma' },
            { label: 'Dripling', value: 'Top kontrolü' },
            { label: 'Pas', value: 'Asist üretimi' },
            { label: 'Hız', value: 'Transition liderliği' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Topu koru, sahayı oku. Playmaker yolculuğun başlıyor.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Dripling & Top Kontrolü', exercises: [
                            { name: 'Stationary Dribble (Sağ/Sol)', sets: '3', reps: '60 sn', rest: '30s', tip: 'Gözler yere bakmasın, topu hisset.' },
                            { name: 'Crossover Drill (yavaş)', sets: '3', reps: '10/taraf', rest: '45s', tip: 'Alçak dripling, vücut koruma.' },
                            { name: 'Agility Merdiveni', sets: '3', reps: '3 tur', rest: '45s', tip: 'Ayak koordinasyonu ve hız.' },
                            { name: 'Plank', sets: '3', reps: '30 sn', rest: '30s', tip: 'Core stabilitesi PG için kritik.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pas & Vizyon', exercises: [
                            { name: 'Chest Pass (sabit hedef)', sets: '3', reps: '15', rest: '30s', tip: 'Bilek snapli, hedefi gözlerle kilitle.' },
                            { name: 'Bounce Pass Drill', sets: '3', reps: '12', rest: '30s', tip: 'Toprağa ⅔ mesafe, alıcı beline.' },
                            { name: 'Pick & Roll Okuma (yavaş)', sets: '3', reps: '8 senaryo', rest: '60s', tip: 'Screener mi, roll man mı? Karar al.' },
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '60s', tip: 'Alt vücut güç temeli.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Hız & Kondisyon', exercises: [
                            { name: 'Full Court Sprint', sets: '5', reps: '1 tur', rest: '90s', tip: 'Transition hızı PG silahıdır.' },
                            { name: 'Defensive Slide', sets: '4', reps: '10 m/taraf', rest: '45s', tip: 'Kalça alçak, ayak hafif.' },
                            { name: 'Jump Rope', sets: '3', reps: '60 sn', rest: '45s', tip: 'Koordinasyon + aerobik.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30 sn/taraf', rest: '—', tip: 'First step hızı bu kasla gelir.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Sahayı yönet. Pick & Roll oku, tempo kontrol et.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Advance Handling & Finish', exercises: [
                            { name: 'Combo Dribble (Cross-Behind-Hesitation)', sets: '4', reps: '8', rest: '45s', tip: 'Her hareketi bağla, durma.' },
                            { name: 'Floater (Tek El)', sets: '4', reps: '10/taraf', rest: '45s', tip: 'Pota altından yüksek bırakmada.' },
                            { name: 'Euro Step Finish', sets: '4', reps: '8/taraf', rest: '60s', tip: 'İlk adım uzun, iniş kontrollü.' },
                            { name: 'Single Leg RDL', sets: '4', reps: '8/bacak', rest: '60s', tip: 'Denge + hamstring.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Pick & Roll Mastery', exercises: [
                            { name: 'PnR Read Drill (3 senaryo)', sets: '4', reps: '6', rest: '60s', tip: 'Hedge, switch, drop — hepsini oku.' },
                            { name: 'Pocket Pass', sets: '4', reps: '10', rest: '30s', tip: 'Dar alanda hassas pas.' },
                            { name: 'Gap Merdiveni', sets: '4', reps: '3 tur', rest: '45s', tip: 'PG çeviklik temeli.' },
                            { name: 'Med Ball Core Twist', sets: '4', reps: '12/taraf', rest: '30s', tip: 'Pas sırasındaki rotasyon.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Speed & Reaksiyon', exercises: [
                            { name: 'Reactive Sprint Drill', sets: '5', reps: '20 m', rest: '90s', tip: 'Sinyal ile patlat.' },
                            { name: 'Pro Agility (5-10-5)', sets: '5', reps: '1', rest: '75s', tip: 'PG yön değiştirme.' },
                            { name: 'Box Jump', sets: '4', reps: '6', rest: '90s', tip: 'Patlayıcı çıkış.' },
                            { name: 'Nordic Curl', sets: '3', reps: '5', rest: '90s', tip: 'Sprint koruma.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Sahayı domine et. Her PnR bir asist veya skor fırsatı.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Playmaking', exercises: [
                            { name: 'Full PnR Series (5 read)', sets: '5', reps: '8 senaryo', rest: '60s', tip: 'Switch, hedge, trap, drop, zone — hepsini oku.' },
                            { name: 'One-Dribble Pull-Up 3PT', sets: '5', reps: '10', rest: '45s', tip: 'Hız + hassasiyet bileşimi.' },
                            { name: 'Live Crossover Finish', sets: '5', reps: '6', rest: '60s', tip: 'Savunmayı yönlendir, bitiş yeri seç.' },
                            { name: 'Shoulder Press', sets: '4', reps: '8', rest: '90s', tip: 'Kontakt dayanıklılığı.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Court Vision Elite', exercises: [
                            { name: 'Transition 2v1 Drill', sets: '5', reps: '6', rest: '75s', tip: 'Doğru zamanla doğru pas opsiyonunu seç.' },
                            { name: 'Skip Pass + Lob Pass Serisi', sets: '4', reps: '10', rest: '45s', tip: 'Uzun mesafe doğruluk.' },
                            { name: 'Film Çalışması', sets: '—', reps: '20 dk', rest: '—', tip: 'PnR kararlarını analiz et.' },
                            { name: 'Pallof Press', sets: '4', reps: '10/taraf', rest: '45s', tip: 'Anti-rotasyon gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Peak Atletizm', exercises: [
                            { name: 'Resisted Sprint', sets: '5', reps: '20 m', rest: '90s', tip: 'First step patlayıcılığı.' },
                            { name: 'Depth Jump + Sprint', sets: '5', reps: '4+20 m', rest: '120s', tip: 'Reaktif güç.' },
                            { name: 'Power Clean', sets: '5', reps: '3', rest: '120s', tip: 'PG athleticism peak.' },
                            { name: 'Mobility & Recovery', sets: '—', reps: '15 dk', rest: '—', tip: 'Kalça, ayak bileği, omuz.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ SG ═══════════════ */
    SG: {
        emoji: '🎯', color: 'from-red-500 to-rose-700',
        keyAttributes: [
            { label: 'Şut', value: 'Catch & Shoot' },
            { label: 'Hareket', value: 'Off-ball' },
            { label: 'Atletizm', value: 'Sıçrama gücü' },
            { label: 'Savunma', value: 'On-ball pressure' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Şut mekaniğini kur. Topu potaya gönder.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Şut Mekaniği', exercises: [
                            { name: 'Form Shooting (yakın)', sets: '3', reps: '20', rest: '30s', tip: 'Tek el, yüksek ark, follow-through.' },
                            { name: 'Catch & Shoot (3 nokta)', sets: '3', reps: '15', rest: '30s', tip: 'Ayak seti hızlı, eller hazır.' },
                            { name: 'Free Throw', sets: '3', reps: '10', rest: '20s', tip: 'Rutin oluştur, nefes al, at.' },
                            { name: 'Core Dead Bug', sets: '3', reps: '10/taraf', rest: '30s', tip: 'Şut stabilitesi core\'dan gelir.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Off-Ball Hareket', exercises: [
                            { name: 'Curl Cut (Koni)', sets: '3', reps: '8/taraf', rest: '45s', tip: 'Screen\'e yapış, hızlı çık.' },
                            { name: 'V-Cut + Catch & Shoot', sets: '3', reps: '10', rest: '45s', tip: 'Sahte yön → gerçek yön.' },
                            { name: 'Lateral Shuffle', sets: '3', reps: '10 m/taraf', rest: '45s', tip: 'Off-ball pozisyon alma.' },
                            { name: 'Glute Bridge', sets: '3', reps: '15', rest: '45s', tip: 'Sıçrama gücü temeli.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm & Şut', exercises: [
                            { name: 'Box Jump', sets: '3', reps: '8', rest: '90s', tip: 'İniş yumuşak, sıçrama patlayıcı.' },
                            { name: 'Sprint + Pull-Up Jumper', sets: '3', reps: '8', rest: '60s', tip: 'Yorgunken şut tekniği bozulmasın.' },
                            { name: 'Footwork Ladder', sets: '3', reps: '3 tur', rest: '45s', tip: 'Ayak koordinasyonu.' },
                            { name: 'Hamstring Germe', sets: '3', reps: '30 sn/taraf', rest: '—', tip: 'Sıçrama sağlığı.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Perdeyi kullan, şutu bul. Her yerden skor tehlikesi.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Şut Çeşitliliği', exercises: [
                            { name: 'Pull-Up Mid-Range', sets: '4', reps: '12', rest: '45s', tip: 'Dribble → stop → shoot.' },
                            { name: 'Step-Back 3PT', sets: '4', reps: '10', rest: '45s', tip: 'Mesafe yarat, denge koru.' },
                            { name: 'Moving Catch & Shoot', sets: '4', reps: '12', rest: '30s', tip: 'Koşarak gel, hemen at.' },
                            { name: 'Single Leg Squat', sets: '4', reps: '8/bacak', rest: '75s', tip: 'Tek bacak denge ve güç.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Screen & Relocate', exercises: [
                            { name: 'Flare Screen + 3PT', sets: '4', reps: '10', rest: '45s', tip: 'Screen sonrası hızlı ayak seti.' },
                            { name: 'Pin Down + Curl', sets: '4', reps: '8/taraf', rest: '45s', tip: 'Baseline → elbow, hız kaybetme.' },
                            { name: 'Defensive Close-Out', sets: '4', reps: '8', rest: '45s', tip: 'Kapatma mesafesi önemli.' },
                            { name: 'Lateral Bound', sets: '4', reps: '8/taraf', rest: '60s', tip: 'Lateral patlayıcılık.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlayıcı Güç', exercises: [
                            { name: 'Depth Jump', sets: '4', reps: '5', rest: '120s', tip: 'Reaktif sıçrama gücü.' },
                            { name: 'Resisted Sprint', sets: '4', reps: '20 m', rest: '90s', tip: 'First step hızı.' },
                            { name: 'Romanian DL', sets: '4', reps: '8', rest: '90s', tip: 'Hamstring koruması.' },
                            { name: 'Core Rotation', sets: '4', reps: '12/taraf', rest: '30s', tip: 'Şut rotasyonu gücü.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Her pozisyondan skor. Oyun kurucuya destek, takımın silahı.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Shooting Lab', exercises: [
                            { name: 'Game Speed Shooting (7 spot)', sets: '5', reps: '3/spot', rest: '30s', tip: 'Maç hızında, maç baskısında.' },
                            { name: 'Off-Dribble 3PT Combo', sets: '5', reps: '8', rest: '45s', tip: 'Cross → step-back → 3PT.' },
                            { name: 'Contested Mid-Range', sets: '5', reps: '10', rest: '45s', tip: 'Savunmacı üzerinden cool finish.' },
                            { name: 'Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'SG güç piki.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Two-Way Dominance', exercises: [
                            { name: 'Full Court Press Drill', sets: '5', reps: '4 dk', rest: '90s', tip: 'Defans baskısı takım enerjisi.' },
                            { name: 'Transition 3PT (koşudan)', sets: '5', reps: '10', rest: '30s', tip: 'Sprint → spot-up → skor.' },
                            { name: 'Film Review', sets: '—', reps: '20 dk', rest: '—', tip: 'Rakip SG zayıflıklarını bul.' },
                            { name: 'Plyometric Push-Up', sets: '4', reps: '8', rest: '60s', tip: 'Üst vücut patlayıcılık.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Peak Performance', exercises: [
                            { name: 'Hurdle Jump Series', sets: '5', reps: '6 engel', rest: '2 dk', tip: 'Dikey patlama.' },
                            { name: 'Power Clean', sets: '5', reps: '3', rest: '120s', tip: 'Toplam atletizm.' },
                            { name: 'Closing Sprint', sets: '5', reps: '25 m', rest: '90s', tip: 'Close-out hızı.' },
                            { name: 'Recovery & Stretch', sets: '—', reps: '15 dk', rest: '—', tip: 'Omuz, kalça, ayak bileği.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ SF ═══════════════ */
    SF: {
        emoji: '🦅', color: 'from-emerald-500 to-teal-700',
        keyAttributes: [
            { label: 'Çok Yönlülük', value: 'Her iki uç' },
            { label: 'Atletizm', value: 'Wing player' },
            { label: 'Savunma', value: 'Switchable' },
            { label: 'Skor', value: 'Mid-range & drive' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'İki ucun da oyuncusu ol. Savunma ve hücumu birleştir.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Wing Fundamentals', exercises: [
                            { name: 'Triple Threat Duruşu', sets: '3', reps: '10', rest: '30s', tip: 'Şut, pas, drive — hepsi hazır.' },
                            { name: 'Wing Catch & Face-Up', sets: '3', reps: '12', rest: '45s', tip: 'Topu al, potayı gör.' },
                            { name: 'Mid-Range Pull-Up', sets: '3', reps: '10', rest: '45s', tip: 'Dirsek bölgesi şutu.' },
                            { name: 'Push-Up', sets: '3', reps: '15', rest: '45s', tip: 'Kontakt gücü temeli.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Drive & Finish', exercises: [
                            { name: 'Attack Baseline Drive', sets: '3', reps: '8/taraf', rest: '45s', tip: 'Omuz önce, top koruma.' },
                            { name: 'Reverse Layup', sets: '3', reps: '10/taraf', rest: '45s', tip: 'Rim arkasından bitir.' },
                            { name: 'Contact Finish (pad)', sets: '3', reps: '8', rest: '60s', tip: 'Kontakt sonrası kontrol.' },
                            { name: 'Lunge Walk', sets: '3', reps: '10/bacak', rest: '60s', tip: 'Drive gücü bacaktan.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm Temeli', exercises: [
                            { name: 'Full Court Sprint', sets: '5', reps: '1 tur', rest: '90s', tip: 'Wing transition hızı.' },
                            { name: 'Box Jump', sets: '3', reps: '8', rest: '90s', tip: 'Sıçrama gücü temeli.' },
                            { name: 'Defensive Slide', sets: '4', reps: '10 m', rest: '45s', tip: 'Switch savunma temeli.' },
                            { name: 'Stretching (kalça)', sets: '3', reps: '30 sn/taraf', rest: '—', tip: 'Drive açısı için kritik.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Maçın her anında etkili. Drive, şut, savunma.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Skor Çeşitliliği', exercises: [
                            { name: 'Step-Back Mid-Range', sets: '4', reps: '10', rest: '45s', tip: 'Mesafe yarat, denge koru.' },
                            { name: 'Drive + Kick Out', sets: '4', reps: '8', rest: '60s', tip: 'Penetrasyon → açık shootera pas.' },
                            { name: 'Iso Move (jab + go)', sets: '4', reps: '8/taraf', rest: '45s', tip: 'Sahte → gerçek drive.' },
                            { name: 'Bulgarian Split Squat', sets: '4', reps: '10/bacak', rest: '75s', tip: 'Tek bacak drive gücü.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Two-Way Wing', exercises: [
                            { name: 'Close-Out + Contest', sets: '4', reps: '8', rest: '45s', tip: 'Close-out hızlı, eller yukarı.' },
                            { name: 'Help & Recover', sets: '4', reps: '6 senaryo', rest: '60s', tip: 'Yardım savunmadan geri dön.' },
                            { name: 'Transition Basket', sets: '4', reps: '6', rest: '60s', tip: 'Sprint → finish, temiz topla.' },
                            { name: 'Lateral Bound', sets: '4', reps: '8/taraf', rest: '60s', tip: 'Defence lateral gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlayıcılık', exercises: [
                            { name: 'Depth Jump + Layup', sets: '4', reps: '6', rest: '120s', tip: 'Reaktif sıçrama → finish.' },
                            { name: 'Sled Push', sets: '4', reps: '20 m', rest: '90s', tip: 'Drive kontakt gücü.' },
                            { name: 'Hang Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'Wing explosiveness.' },
                            { name: 'Foam Roll + Stretch', sets: '—', reps: '10 dk', rest: '—', tip: 'IT band, kalça, omuz.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Takımın MVP\'si. Her maçta dominant, her sahada etkili.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Elite Scorer', exercises: [
                            { name: 'Iso Series (3 hamle)', sets: '5', reps: '6', rest: '60s', tip: 'Jab → cross → spin seçenekleri.' },
                            { name: 'Pull-Up 3PT (movement)', sets: '5', reps: '10', rest: '45s', tip: 'Maç hızında hareket.' },
                            { name: 'And-1 Finish (kontakt)', sets: '5', reps: '8', rest: '60s', tip: 'Kontakta rağmen tamamla.' },
                            { name: 'Squat @82%', sets: '5', reps: '4', rest: '150s', tip: 'Max güç çalışması.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Lockdown Defence', exercises: [
                            { name: 'Full Denial Drill', sets: '5', reps: '2 dk', rest: '75s', tip: 'Rakip topu almasın.' },
                            { name: 'Switch All Drill (1-5)', sets: '5', reps: '8 senaryo', rest: '60s', tip: '1-5 arası herkesi savun.' },
                            { name: 'Transition D + Score', sets: '4', reps: '6', rest: '75s', tip: 'Savun → sprint → skor.' },
                            { name: 'Core Anti-Rotation', sets: '4', reps: '12/taraf', rest: '45s', tip: 'Pod kontrollü hareket.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Atletizm Pik', exercises: [
                            { name: 'Max Vertical Jump', sets: '5', reps: '5', rest: '120s', tip: 'Rim seviyesi hedef.' },
                            { name: 'Power Snatch', sets: '5', reps: '3', rest: '120s', tip: 'Toplam patlayıcılık.' },
                            { name: '40-Yard Sprint', sets: '5', reps: '40 m', rest: '120s', tip: 'Wing hız değerlendirmesi.' },
                            { name: 'Full Recovery', sets: '—', reps: '15 dk', rest: '—', tip: 'Soft tissue + mobility.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ PF ═══════════════ */
    PF: {
        emoji: '💥', color: 'from-amber-500 to-yellow-700',
        keyAttributes: [
            { label: 'Güç', value: 'Post play' },
            { label: 'Ribaund', value: 'Agresif board' },
            { label: 'Şut', value: 'Stretch 4' },
            { label: 'Savunma', value: 'Help defence' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Boyalı alandaki gücünü keşfet. Ribaund ve post temeli.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Post & Ribaund Temeli', exercises: [
                            { name: 'Drop Step (sağ/sol)', sets: '3', reps: '8/taraf', rest: '45s', tip: 'Omuz sert, adım hızlı.' },
                            { name: 'Boxing Out Drill', sets: '3', reps: '10', rest: '45s', tip: 'Kalça düşük, sırt sert.' },
                            { name: 'Power Dribble + Layup', sets: '3', reps: '8/taraf', rest: '45s', tip: 'Güçlü top sürüşü, sert bitiriş.' },
                            { name: 'Bench Press (hafif)', sets: '3', reps: '10', rest: '75s', tip: 'Post oynama gücü.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Şut Genişletme', exercises: [
                            { name: 'Elbow Jumper', sets: '3', reps: '15', rest: '30s', tip: 'Dirsek bölgesinden şut.' },
                            { name: 'Short Corner Şut', sets: '3', reps: '12', rest: '30s', tip: 'Baseline köşeden.' },
                            { name: 'Free Throw', sets: '3', reps: '10', rest: '20s', tip: 'Serbest atış rutini.' },
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '60s', tip: 'Alt vücut güç temeli.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç & Atletizm', exercises: [
                            { name: 'Box Jump (düşük)', sets: '3', reps: '8', rest: '90s', tip: 'Patlayıcı ribaund.' },
                            { name: 'Sled Push', sets: '3', reps: '20 m', rest: '75s', tip: 'Post driving gücü.' },
                            { name: 'Lateral Shuffle', sets: '3', reps: '10 m/taraf', rest: '45s', tip: 'Help savunma hareketi.' },
                            { name: 'Hip Flexor Germe', sets: '3', reps: '30 sn/taraf', rest: '—', tip: 'Post pozisyon derinliği.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'İç ve dışı birleştir. Modern PF versatilitesi.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Stretch 4 & Post', exercises: [
                            { name: '3PT (köşe + wing)', sets: '4', reps: '12', rest: '30s', tip: 'Spacing yaratmak için şut şart.' },
                            { name: 'Face-Up Drive', sets: '4', reps: '8/taraf', rest: '45s', tip: 'Catch → yüzleş → drive.' },
                            { name: 'Post Spin Move', sets: '4', reps: '8/taraf', rest: '45s', tip: 'Drop step → spin → finish.' },
                            { name: 'Back Squat', sets: '4', reps: '6', rest: '120s', tip: 'PF güç temeli.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Ribaund & Help D', exercises: [
                            { name: 'Offensive Rebound Drill', sets: '4', reps: '8', rest: '60s', tip: 'İkinci şans puan kazan.' },
                            { name: 'Help & Recover (post)', sets: '4', reps: '6 senaryo', rest: '60s', tip: 'Help → rotation → contest.' },
                            { name: 'Rim Protection Drill', sets: '4', reps: '8', rest: '45s', tip: 'Timing ve pozisyon.' },
                            { name: 'Deadlift', sets: '4', reps: '6', rest: '120s', tip: 'Posterior chain gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlayıcı Güç', exercises: [
                            { name: 'Vertical Jump (max)', sets: '4', reps: '5', rest: '120s', tip: 'Ribaund yüksekliği.' },
                            { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'Patlayıcı güç.' },
                            { name: 'Hip Thrust', sets: '4', reps: '8', rest: '90s', tip: 'Post driving gücü.' },
                            { name: 'Core Circuit', sets: '3', reps: '4 egzersiz', rest: '45s', tip: 'Kontakt dayanıklılığı.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Boyalı alanın hakimi. Şutu, postu ve savunmayı domine et.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Dominant Post Play', exercises: [
                            { name: 'Post Combo (3 hamle)', sets: '5', reps: '6', rest: '60s', tip: 'Drop → spin → fade serileri.' },
                            { name: 'Face-Up Triple Threat Series', sets: '5', reps: '8', rest: '45s', tip: 'Şut, pas, drive — seç ve uygula.' },
                            { name: 'Contested 3PT', sets: '5', reps: '10', rest: '45s', tip: 'Baskı altında şut.' },
                            { name: 'Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'Maksimum güç.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Elite Defence', exercises: [
                            { name: 'Rim Protector Drill', sets: '5', reps: '8', rest: '60s', tip: 'Timing ile blok, foul yok.' },
                            { name: 'Switch Pick & Roll D', sets: '5', reps: '6 senaryo', rest: '60s', tip: 'Guard\'ları savunabilme.' },
                            { name: 'Rebound + Outlet Drill', sets: '5', reps: '8', rest: '45s', tip: 'Ribaund → hızlı transition başlat.' },
                            { name: 'Med Ball Rotational Slam', sets: '4', reps: '10', rest: '30s', tip: 'Post rotasyon gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Peak Power', exercises: [
                            { name: 'Hang Clean & Jerk', sets: '5', reps: '3', rest: '150s', tip: 'PF toplam güç.' },
                            { name: 'Max Vertical', sets: '5', reps: '5', rest: '120s', tip: 'Rim üstü oyun.' },
                            { name: 'Sled Sprint', sets: '4', reps: '20 m', rest: '90s', tip: 'Kontakt hızı.' },
                            { name: 'Recovery Protocol', sets: '—', reps: '15 dk', rest: '—', tip: 'Foam roll + ice.' },
                        ]
                    },
                ],
            },
        },
    },

    /* ═══════════════ C ═══════════════ */
    C: {
        emoji: '🗼', color: 'from-purple-500 to-indigo-700',
        keyAttributes: [
            { label: 'Rim Protection', value: 'Blok & Caydırma' },
            { label: 'Ribaund', value: 'Çift taraf' },
            { label: 'Post', value: 'Sırt dönük oyun' },
            { label: 'Screen', value: 'Pick & Roll' },
        ],
        programs: {
            'Başlangıç': {
                tagline: 'Potanın koruyucusu ol. Ribaund, blok ve screen temeli.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Post & Screen Temeli', exercises: [
                            { name: 'Post Seal (pozisyon alma)', sets: '3', reps: '10', rest: '45s', tip: 'Kalça düşük, omuz sert pozisyon al.' },
                            { name: 'Screen Setting Drill', sets: '3', reps: '8', rest: '45s', tip: 'Geniş duruş, ayaklar sabit.' },
                            { name: 'Baby Hook Shot', sets: '3', reps: '10/taraf', rest: '45s', tip: 'Tek el, yüksek release.' },
                            { name: 'Squat (vücut ağırlığı)', sets: '3', reps: '15', rest: '60s', tip: 'Center güç temeli.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Ribaund & Blok', exercises: [
                            { name: 'Defensive Rebound + Outlet', sets: '3', reps: '10', rest: '45s', tip: 'Yakala → koruma → pas.' },
                            { name: 'Shot Block Timing', sets: '3', reps: '8', rest: '60s', tip: 'Top el değil, zıplama zamanı.' },
                            { name: 'Box Out Circuit', sets: '3', reps: '10', rest: '45s', tip: 'Her ribaund box out ile başlar.' },
                            { name: 'Bench Press', sets: '3', reps: '10', rest: '75s', tip: 'Post savunma gücü.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Güç Temeli', exercises: [
                            { name: 'Goblet Squat', sets: '3', reps: '12', rest: '75s', tip: 'Derin pozisyon, dik gövde.' },
                            { name: 'Deadlift (hafif)', sets: '3', reps: '8', rest: '90s', tip: 'Posterior chain temeli.' },
                            { name: 'Farmer Walk', sets: '3', reps: '30 m', rest: '60s', tip: 'Kavrama + core gücü.' },
                            { name: 'Omuz Mobilitesi', sets: '3', reps: '30 sn/taraf', rest: '—', tip: 'Blok pozisyonu için.' },
                        ]
                    },
                ],
            },
            'Orta': {
                tagline: 'Boyalı alanı yönet. Screen, roll, ribaund — hepsinde etkili.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'PnR Roll & Finish', exercises: [
                            { name: 'Screen → Roll → Catch', sets: '4', reps: '8', rest: '60s', tip: 'Screen sert, roll açılı, eller hazır.' },
                            { name: 'Lob Catch & Finish', sets: '4', reps: '8', rest: '45s', tip: 'Alley-oop timing.' },
                            { name: 'Hook Shot (üst seviye)', sets: '4', reps: '10/taraf', rest: '45s', tip: 'Geniş arc, soft touch.' },
                            { name: 'Front Squat', sets: '4', reps: '6', rest: '120s', tip: 'Vertical güç.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Rim Protection', exercises: [
                            { name: 'Weakside Block Drill', sets: '4', reps: '8', rest: '60s', tip: 'Help pozisyondan dikey sıçra.' },
                            { name: 'Post D (1v1)', sets: '4', reps: '6', rest: '75s', tip: 'Pozisyon kaybetme, geri itme.' },
                            { name: 'Defensive Rebound War', sets: '4', reps: '8', rest: '60s', tip: 'Agresif box out + yakalama.' },
                            { name: 'Hip Thrust (ağır)', sets: '4', reps: '8', rest: '90s', tip: 'Rim koruma kaynağı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Patlayıcılık', exercises: [
                            { name: 'Vertical Jump (max)', sets: '4', reps: '6', rest: '120s', tip: 'Rim seviyesi hedef.' },
                            { name: 'Power Clean', sets: '4', reps: '4', rest: '120s', tip: 'Center patlayıcılık.' },
                            { name: 'Sled Push (ağır)', sets: '4', reps: '20 m', rest: '90s', tip: 'Post kontakt gücü.' },
                            { name: 'Band Shoulder Work', sets: '3', reps: '15/taraf', rest: '30s', tip: 'Blok sonrası omuz sağlığı.' },
                        ]
                    },
                ],
            },
            'İleri': {
                tagline: 'Pota senin evin. Her blok, her ribaund, her screen mükemmel.',
                weeklyPlan: [
                    {
                        day: 'PZT', title: 'Dominant Center', exercises: [
                            { name: 'Post Combo (drop-spin-hook-face)', sets: '5', reps: '6', rest: '60s', tip: 'Her post hamlesini çalış.' },
                            { name: 'Screen & Pop (3PT)', sets: '5', reps: '10', rest: '45s', tip: 'Modern C: screenden sonra şut.' },
                            { name: 'PnR Pocket Pass Alımı', sets: '5', reps: '8', rest: '45s', tip: 'Kalabalıkta topu yakala.' },
                            { name: 'Squat @85%', sets: '5', reps: '3', rest: '180s', tip: 'Center max güç.' },
                        ]
                    },
                    {
                        day: 'ÇAR', title: 'Anchor Defence', exercises: [
                            { name: 'Drop Coverage Drill', sets: '5', reps: '8 senaryo', rest: '60s', tip: 'PnR savunma stratejisi.' },
                            { name: 'Rim Protection Contest', sets: '5', reps: '8', rest: '60s', tip: 'Blok veya caydır.' },
                            { name: 'Double Team Recovery', sets: '4', reps: '6', rest: '60s', tip: 'Yardım → recovery → contest.' },
                            { name: 'Core Complex', sets: '4', reps: '5 egzersiz', rest: '45s', tip: 'Kontakt dayanıklılığı.' },
                        ]
                    },
                    {
                        day: 'CUM', title: 'Peak Power', exercises: [
                            { name: 'Clean & Press', sets: '5', reps: '3', rest: '150s', tip: 'Elite center gücü.' },
                            { name: 'Reactive Vertical Jump', sets: '5', reps: '5', rest: '120s', tip: 'Tip-in ve offensive board.' },
                            { name: 'Heavy Farmer Walk', sets: '4', reps: '40 m', rest: '90s', tip: 'Son çeyrek gücü.' },
                            { name: 'Recovery & Film', sets: '—', reps: '20 dk', rest: '—', tip: 'Rakip PnR analizi + stretch.' },
                        ]
                    },
                ],
            },
        },
    },

};
