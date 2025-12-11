import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  HttpException,
  HttpStatus,
  Patch,
  Delete // Delete'i ekledik
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST (Kayıt Ol)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // GET (Tüm Kullanıcıları Listele - Yeni Ekledik)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // GET (Tekil Kullanıcı Bul)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new HttpException('Kullanıcı bulunamadı', HttpStatus.NOT_FOUND);
    }
    // Güvenlik: Şifre hash'ini veritabanından gelse bile kullanıcıya gösterme
    const { passwordHash, ...result } = user;
    return result;
  }

  // PATCH (Güncelle)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // DELETE (Kullanıcı Sil - Yeni Ekledik)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.remove(id);
    return { message: 'Kullanıcı başarıyla silindi' };
  }
}