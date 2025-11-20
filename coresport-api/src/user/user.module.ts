// coresport-api/src/user/user.module.ts

import { Module, forwardRef } from '@nestjs/common'; // forwardRef'i buraya ekledik
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // Virgül hatasını düzelttik
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module'; // Yolu düzelttik (src yerine ..)

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => AuthModule), 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}