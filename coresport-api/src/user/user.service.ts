import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  // Veritabanı ve Auth servislerini enjekte ediyoruz
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Şifreyi ayır, geri kalan tüm bilgileri (email, name, sportBranch, weight, height) userData içinde tut
    const { password, ...userData } = createUserDto;

    // 1. E-posta kontrolü
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new HttpException('Bu e-posta adresi zaten kullanılıyor', HttpStatus.CONFLICT);
    }

    // 2. Şifreyi hash'le (AuthService üzerinden)
    const passwordHash = await this.authService.hashPassword(password);

    // 3. Yeni kullanıcıyı oluştur
    // ...userData sayesinde DTO'daki tüm profil bilgileri (boy, kilo, spor) otomatik eklenir
    const newUser = this.userRepository.create({
      ...userData,
      passwordHash,
    });

    // 4. Kaydet ve sonucu döndür
    const savedUser = await this.userRepository.save(newUser);
    
    // Güvenlik: Hash'i çıkarıp döndür
    const { passwordHash: _, ...result } = savedUser;
    return result;
  }

  // Tüm kullanıcıları getir
  findAll() {
    return this.userRepository.find();
  }

  // ID ile bul
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Kullanıcı #${id} bulunamadı`);
    }
    return user;
  }

  // E-posta ile bul (Auth işlemleri için)
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Profil Güncelleme
  async update(id: string, updateUserDto: UpdateUserDto) {
    // preload: Varsa üzerine yazar (merge eder), yoksa null döner (çünkü id veriyoruz)
    // Not: Şifre güncellemesi gerekirse buraya ayrıca logic eklenmeli, 
    // şu an sadece profil bilgilerini güncelliyoruz.
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new HttpException(`Kullanıcı #${id} bulunamadı`, HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.userRepository.save(user);

    const { passwordHash, ...result } = updatedUser;
    return result;
  }

  // Kullanıcı Silme
  async remove(id: string) {
    const user = await this.findOne(id); // Önce var mı diye kontrol et (yoksa hata fırlatır)
    return this.userRepository.remove(user);
  }
}