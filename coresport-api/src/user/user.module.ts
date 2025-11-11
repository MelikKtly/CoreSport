// coresport-api/src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // BUNU EKLEYİN
import { User } from './entities/user.entity'; // BUNU EKLEYİN
import { AuthModule } from 'src/auth/auth.module'; // BUNU EKLEYİN

@Module({
  imports: [TypeOrmModule.forFeature([User]),AuthModule], // BU SATIRI EKLEYİN
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // BU SATIRI DA EKLEYİN (Auth için gerekli olacak)
})
export class UserModule {}