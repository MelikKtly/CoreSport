// coresport-api/src/auth/auth.service.ts

import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // UserModule ve AuthModule birbirine bağlı olduğu için (Döngü),
    // UserService'i çağırırken 'forwardRef' kullanıyoruz.
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService // Token üretici
  ) {}

  /**
   * 1. Şifre Hash'leme (Kayıt olurken kullanılır)
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * 2. Kullanıcı Doğrulama (Giriş yaparken kullanılır)
   * Email ve Şifreyi alır, doğruysa kullanıcının bilgilerini döner.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    // Kullanıcıyı email ile bul (Bu fonksiyonu UserService'e eklememiz gerekecek)
    const user = await this.userService.findOneByEmail(email);
    
    // Kullanıcı bulunduysa VE şifresi doğruysa
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      // Şifre hash'ini sonuçtan çıkar (güvenlik için) ve geri kalanı döndür
      const { passwordHash, ...result } = user;
      return result;
    }
    
    return null; // Kullanıcı yoksa veya şifre yanlışsa null döner
  }

  /**
   * 3. Giriş Yapma (Token Üretme)
   * Doğrulanmış kullanıcıyı alır ve ona bir "Access Token" verir.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Token içine gizlenecek bilgi
    return {
      access_token: this.jwtService.sign(payload), // İmzalı token'ı döndür
    };
  }
}