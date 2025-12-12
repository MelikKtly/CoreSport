import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Başarılı giriş 200 OK döner (varsayılan 201'dir)
  async login(@Body() loginDto: LoginDto) {
    // LoginDto sayesinde email ve şifre kuralları otomatik kontrol edilir
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Hatalı email veya şifre');
    }

    return this.authService.login(user);
  }
}