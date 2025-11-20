// coresport-api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- BU SATIRI EKLEYİN

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- YENİ KOD BAŞLANGICI ---

  // 1. DTO doğrulama kurallarını global olarak etkinleştir
  // Bu, CreateUserDto'daki @IsEmail, @IsNotEmpty kurallarını çalıştırır
  app.useGlobalPipes(new ValidationPipe());

  // 2. Frontend'den (localhost:3000) gelen isteklere izin ver
  // Bu, "Load failed" (CORS) hatasını düzeltir
  app.enableCors({
    origin: 'http://localhost:3000', // Sadece bu adresten gelenlere izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // --- YENİ KOD BİTİŞİ ---

  // Sizin kodunuz (bu gayet iyi, böyle kalabilir)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();