// coresport-api/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ettik
import { TypeOrmModule } from '@nestjs/typeorm'; // Import ettik
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. .env dosyasını okuyabilmek için ConfigModule'ü kuruyoruz
    ConfigModule.forRoot({
      isGlobal: true, // Bu modülü tüm uygulama için global yap
    }),

    // 2. Veritabanı bağlantısını kuruyoruz (TypeORM)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ayarları ConfigModule'den alacağımızı belirtiyoruz
      inject: [ConfigService], // ConfigService'i enjekte ediyoruz
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Varlıkların (tabloların) yolu (henüz yok)
        synchronize: true, // ÇOK ÖNEMLİ: Geliştirme modunda bu, tabloları otomatik oluşturur.
      }),
    }),

    UserModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}