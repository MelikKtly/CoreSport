# CoreSport 🚀

**CoreSport**, sporcular için tasarlanmış branşa özel, gelişmiş bir antrenman ve performans takip platformudur. 

Modern web teknolojileri (Next.js, NestJS, TailwindCSS, PostgreSQL) kullanılarak geliştirilmiş bir Full-Stack uygulamadır. Her sporcunun branşına *(Fitness, Basketbol, Amerikan Futbolu, Snowboard vb.)* özel bir hafta ve antrenman deneyimi yaşamasını sağlar.

![CoreSport Özellikleri](https://img.shields.io/badge/Status-Geliştirme_Aşamasında-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

---

## 🔥 Proje Özellikleri

*   **🏆 Branşa Özel Arayüzler:** Amerikan Futbolu, Basketbol, Snowboard ve Fitness için tasarlanmış görsel açıdan zengin (`glassmorphism`, `glow efektler`) özel antrenman listeleme sayfaları.
*   **🛠️ Seviye ve İhtiyaca Uygun Programlar:** Başlangıç, Orta ve İleri seviyeler için farklı hacim ve şiddete sahip antrenman rutinleri. Branşa ve seçilen roleye (örn; AF'de QB, Basketbolda PG) göre spesifik driller.
*   **🏋️‍♂️ Workout Tracker (Antrenman Takibi):** Kullanıcıların interaktif bir UI ile egzersiz listesini başlatabilmesi, dinlenme sürelerini takip edebilmesi ve bitirdiğinde "Workout Log" olarak veritabanına işleyebilmesi.
*   **🍔 Beslenme ve Kalori Takibi:** Günlük yenilen öğünlerin makro yapılarıyla girilip, kalori/protein limitleriyle kıyaslanabilmesi.
*   **🔐 Kimlik Doğrulama:** JWT tabanlı güvenli oturum yönetimi (Mevcut durumda kimlik doğrulama API'de mevcuttur ancak yetkilendirme korumaları entegre edilmektedir).

---

## 🏗️ Mimari ve Teknolojiler

Proje, bağımsız modüller halinde tasarlanmış bir **Monorepo** benzeri yapı takip eder. Frontend ve Backend ayrı klasörlerde barındırılır.

### 🌐 Frontend (`/coresport-app`)
Kullanıcıların etkileşime girdiği önyüz uygulamasıdır.
*   **Next.js 15 (App Router):** Hızlı ve SEO dostu React framework.
*   **React:** Modern UI bileşenleri.
*   **Tailwind CSS:** Esnek ve hızlı CSS utility framework'ü. 
*   **Lucide React:** Minimalist ikon kütüphanesi.
*   *Öne Çıkan Özellikler:* Premium UI/UX, animasyonlu SVG arka planlar (her branşa özel saha/ekipman çizimleri).

### ⚙️ Backend (`/coresport-api`)
Ölçeklenebilir API ve veritabanı iletişimi altyapısı.
*   **NestJS:** TypeScript tabanlı enterprise düzey Node.js framework'ü.
*   **TypeORM:** Object-Relational Mapper (ORM) aracı.
*   **PostgreSQL:** Güvenilir ilişkisel veritabanı.
*   **JWT & bcrypt:** Oturum kontrolleri ve şifre hashing.

---

## 📂 Proje Yapısı

```
CoreSportFinal/
├── coresport-api/          # Backend Kaynak Kodları (NestJS)
│   ├── src/
│   │   ├── auth/           # Login/Register Mantığı
│   │   ├── user/           # Kullanıcı Profil Yönetimi
│   │   ├── workout-log/    # Antrenman geçmişi kayıtları servisi
│   │   ├── food-log/       # Beslenme ve kalori takibi servisi
│   │   └── main.ts         # Backend giriş dosyası
│   └── .env                # Veritabanı ve gizli bilgilerin ayarlandığı dosya
│
└── coresport-app/          # Frontend Kaynak Kodları (Next.js)
    ├── src/
    │   ├── app/            # Sayfalar (App Router)
    │   │   ├── american-football/
    │   │   ├── basketball/
    │   │   ├── snowboard/
    │   │   ├── gym/
    │   │   ├── dashboard/
    │   │   └── login/
    │   ├── components/     # Ortak Komponentler (WorkoutTracker vb.)
    │   └── data/           # Sabit Program Verileri (AF, Gym, BB, SB Programs)
    └── public/             # Arka Plan Görselleri (Hero Images)
```

---

## 🛠️ Yerel Kurulum & Çalıştırma (Development)

Sistemi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin. (Node.js ve PostgreSQL kurulu olmalıdır).

### 1. Veritabanı Ayarları (Backend)
Önce yerel PostgreSQL sunucunuzda `coresport_db` (veya `.env` içerisinde belirteceğiniz isimde) bir veritabanı oluşturun.
Ardından `coresport-api` klasöründe `.env` dosyasını ayarlayın:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=secret
DB_NAME=coresport_db
JWT_SECRET=super-gizli-anahtar
```

### 2. Backend'i Başlatma

Ayrı bir terminal kullanarak backend sunucusunu ayağa kaldırın:
```bash
cd coresport-api
npm install
npm run start:dev
```
Backend `http://localhost:3001` adresinde çalışmaya başlayacaktır.

### 3. Frontend'i Başlatma

İkinci bir terminal açın:
```bash
cd coresport-app
npm install
npm run dev
```
Frontend `http://localhost:3000` adresinde çalışmaya başlayacaktır. Tarayıcınızda bu adresi açarak uygulamayı kullanmaya başlayabilirsiniz.

---
