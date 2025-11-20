// coresport-api/src/auth/auth.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; // Kullanıcıları bulmak için
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller'; // Birazdan oluşturacağız

@Module({
  imports: [
    // UserModule'ü içeri alıyoruz ki kullanıcı var mı diye bakabilelim.
    // forwardRef: Döngüsel bağımlılığı önlemek için (Auth -> User -> Auth olmasın diye)
    forwardRef(() => UserModule), 

    // JWT Modülünü .env dosyasındaki ayarlarla kuruyoruz
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Token 1 gün boyunca geçerli olsun
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController], // Birazdan oluşturacağız
  exports: [AuthService],
})
export class AuthModule {}