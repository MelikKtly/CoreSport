import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  // 1. Email kontrolü: Hem boş olamaz hem de geçerli bir email formatında olmalı
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz' })
  @IsNotEmpty({ message: 'E-posta alanı boş bırakılamaz' })
  email: string;

  // 2. Şifre kontrolü: String olmalı, boş olamaz ve en az 6 karakter olmalı
  @IsString()
  @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz' })
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;
}