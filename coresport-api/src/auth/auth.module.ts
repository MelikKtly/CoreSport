// coresport-api/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService], // BU SATIRI EKLEYİN (Çok önemli)
})
export class AuthModule {}