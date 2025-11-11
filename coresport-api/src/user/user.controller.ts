// coresport-api/src/user/user.controller.ts

import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  HttpException,  // BUNU EKLEYİN
  HttpStatus      // BUNU EKLEYİN
} from '@nestjs/common';import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user') // Sizin kullandığınız gibi 'user' (tekil) olarak bıraktım
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST http://localhost:3001/user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Artık 'This action...' döndürmeyecek,
    // doğrudan userService.create'i çağıracak ve sonucu döndürecek.
    return this.userService.create(createUserDto);
  }

  // GET http://localhost:3001/user/bir-uuid
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    // Bu fonksiyonu da düzeltmiş olalım, ileride lazım olacak
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('Kullanıcı bulunamadı', HttpStatus.NOT_FOUND);
    }
    const { passwordHash, ...result } = user;
    return result;
  }
  
  // Diğer (findAll, update, remove) adreslerini şimdilik sildik.
}