import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  HttpException,
  HttpStatus,
  Patch // Patch'i ekledik
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // UpdateUserDto'yu ekledik

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST (Kayıt Ol)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // GET (Kullanıcı Bul)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('Kullanıcı bulunamadı', HttpStatus.NOT_FOUND);
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  // PATCH (Güncelle - Yeni Eklediğimiz Kısım)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }
}