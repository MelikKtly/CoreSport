import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users') // Veritabanındaki tablo adını 'users' olarak belirledik
export class User {
  
  @PrimaryGeneratedColumn('uuid') // Otomatik artan 'uuid' tipinde bir ID
  id: string;

  @Column({ unique: true }) // E-posta benzersiz olmalı
  @Index() // Arama performansı için indekslendi
  email: string;

  @Column({ nullable: true }) // Ad/Soyad
  name: string;

  @Column()
  passwordHash: string; // Şifrenin hashlenmiş hali

  // --- Yeni Eklenen Alanlar ---

  @Column({ nullable: true })
  sportBranch: string; // Spor Dalı (Örn: 'Basketbol', 'Fitness')

  @Column('float', { nullable: true })
  weight: number; // Kilo (kg cinsinden, ondalıklı olabilir örn: 75.5)

  @Column('float', { nullable: true })
  height: number; // Boy (cm cinsinden, ondalıklı olabilir örn: 182)

  // ---------------------------

  @CreateDateColumn() // Kayıt tarihi
  createdAt: Date;

  @UpdateDateColumn() // Güncelleme tarihi
  updatedAt: Date;
}