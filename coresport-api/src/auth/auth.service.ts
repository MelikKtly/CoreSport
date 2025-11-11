// coresport-api/src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10; // Hash'leme gücü (standart)

  /**
   * Verilen şifreyi (plaintext) hash'ler.
   * @param password - Kullanıcının girdiği '12345' gibi düz şifre
   * @returns Hash'lenmiş şifre (örn: $2b$10$...)
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Kullanıcının girdiği şifre ile veritabanındaki hash'i karşılaştırır.
   * (Bunu 'Giriş Yap' özelliğinde kullanacağız)
   * @param password - Kullanıcının girdiği düz şifre
   * @param hash - Veritabanında saklanan hash'lenmiş şifre
   * @returns true (eşleşirse) veya false (eşleşmezse)
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}