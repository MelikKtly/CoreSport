import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // CreateUserDto'daki her şey (email, name, password) isteğe bağlı olarak buraya gelir.
  // Ek olarak spor dalını da ekliyoruz:
  
  @IsOptional()
  @IsString()
  sportBranch?: string;
}