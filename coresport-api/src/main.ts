import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // --- CORS AYARLARI (KRİTİK) ---
  // "Authorization" başlığına izin vermezsek, tarayıcı isteği bloklar.
  app.enableCors({
    origin: true, // Geliştirme ortamı için tüm kaynaklara izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization', // <-- BU KISIM EKSİK OLABİLİR
  });

  await app.listen(3001);
}
bootstrap();