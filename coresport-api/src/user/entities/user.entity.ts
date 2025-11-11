// coresport-api/src/user/entities/user.entity.ts

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
    
    @PrimaryGeneratedColumn('uuid') // Otomatik artan 'uuid' tipinde bir ID (benzersiz ve güvenli)
    id: string;
  
    @Column({ unique: true }) // Bu e-posta adresi benzersiz olmalı (iki kişi aynı maille kayıt olamaz)
    @Index() // E-postayı sık sık arayacağımız için 'index' ekliyoruz (bu, hızı artırır)
    email: string;
  
    @Column({ nullable: true }) // Ad/Soyad başlangıçta zorunlu olmayabilir
    name: string;
  
    @Column()
    passwordHash: string; // Şifreyi asla düz metin olarak SAKLAMAYACAĞIZ, 'hash' olarak saklayacağız
  
    @CreateDateColumn() // Otomatik olarak kayıt tarihini ekler
    createdAt: Date;
  
    @UpdateDateColumn() // Otomatik olarak güncelleme tarihini ekler
    updatedAt: Date;
  
    // İleride buraya 'sporDali', 'kilo', 'boy' gibi alanlar da ekleyeceğiz.
  }