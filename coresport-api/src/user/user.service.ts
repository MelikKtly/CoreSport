// coresport-api/src/user/user.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  // Veritabanı (User Tablosu) ve Güvenlik (AuthService) servislerini "enjekte" ediyoruz
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Gelen DTO'dan email, name ve password'ü al
    const { email, name, password } = createUserDto;

    // 2. Bu e-posta adresi veritabanında zaten var mı?
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      // Eğer varsa, 409 (Conflict) hatası fırlat
      throw new HttpException('Bu e-posta adresi zaten kullanılıyor', HttpStatus.CONFLICT);
    }

    // 3. Şifreyi hash'le (AuthService'imizi kullanıyoruz)
    const passwordHash = await this.authService.hashPassword(password);

    // 4. Yeni kullanıcıyı oluştur
    const newUser = this.userRepository.create({
      email,
      name,
      passwordHash, // Düz 'password' değil, hash'lenmiş olanı kaydediyoruz
    });

    // 5. Veritabanına kaydet
    const savedUser = await this.userRepository.save(newUser);
    
    // Güvenlik: Hash'lenmiş şifreyi asla geri döndürme
    const { passwordHash: _, ...result } = savedUser;
    return result;
  }

  // nest g resource komutunun oluşturduğu diğer fonksiyonlar:
  findAll() {
    return `This action returns all user`; // Şimdilik böyle kalabilir
  }

  async findOne(id: string): Promise<User | null> { // <-- DÜZELTİLDİ: 'string'
    return this.userRepository.findOne({ where: { id } }); // <-- DÜZELTİLDİ: Gerçek veritabanı sorgusu
  }

  // update(id: number, updateUserDto: UpdateUserDto) { ... }

  // remove(id: number) { ... }
}