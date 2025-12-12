import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  passwordHash: string;

  // --- Profil ve Fiziksel Bilgiler ---

  @Column({ nullable: true })
  sportBranch: string; // Seçtiği Branş

  @Column('simple-array', { nullable: true }) 
  interests: string[]; // YENİ: İlgi Alanları (Örn: ["Yoga", "Kardiyo"])

  @Column({ nullable: true })
  motivation: string; // YENİ: Motivasyon Kaynağı (Örn: "Kas yapmak")

  @Column('int', { nullable: true })
  age: number; // YENİ: Yaş

  @Column('float', { nullable: true })
  weight: number; // Kilo

  @Column('float', { nullable: true })
  height: number; // Boy

  // ---------------------------

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}