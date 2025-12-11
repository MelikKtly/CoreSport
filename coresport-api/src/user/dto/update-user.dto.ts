// coresport-api/src/user/dto/update-user.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType, CreateUserDto içindeki TÜM alanları (email, password, name, sportBranch, weight, height)
// otomatik olarak alır ve hepsini "optional" (isteğe bağlı) yapar.
// Bu yüzden buraya tekrar elle yazmamıza gerek kalmadı.

export class UpdateUserDto extends PartialType(CreateUserDto) {}