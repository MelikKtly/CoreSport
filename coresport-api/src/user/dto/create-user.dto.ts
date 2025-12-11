// coresport-api/src/user/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // --- Yeni Eklenen Alanlar (İsteğe Bağlı) ---
  // Kayıt sırasında gönderilirse kaydedilir, gönderilmezse sorun olmaz.

  @IsOptional()
  @IsString()
  sportBranch?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;
}