import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('food_log')
export class FoodLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    foodName: string;

    @Column('float')
    gramsConsumed: number;

    @Column('float')
    calories: number;

    @Column('float')
    protein: number;

    @Column('float')
    carb: number;

    @Column('float')
    fat: number;

    @Column({ default: 'Diğer' })
    mealType: string; // Kahvaltı | Öğle | Akşam | Ara Öğün

    @CreateDateColumn()
    createdAt: Date;
}
