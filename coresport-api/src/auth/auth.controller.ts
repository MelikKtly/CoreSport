// coresport-api/src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    // 1. Kullanıcıyı doğrula
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Hatalı email veya şifre');
    }

    // 2. Doğruysa Token ver
    return this.authService.login(user);
  }
}