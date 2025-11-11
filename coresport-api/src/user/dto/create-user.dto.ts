// coresport-api/src/user/dto/create-user.dto.ts

import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUserDto {

  @IsEmail() // Gelen verinin geçerli bir e-posta olmasını zorunlu kılar
  @IsNotEmpty() // Boş olmamasını zorunlu kılar
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' }) // Minimum şifre uzunluğu
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}