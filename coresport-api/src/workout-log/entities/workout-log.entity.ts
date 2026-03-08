import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('workout_logs')
export class WorkoutLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    workoutTitle: string; // Örn: "Pocket Drill & Mekanik"

    @Column('int', { default: 0 })
    durationMinutes: number; // Toplam süre

    @Column('int', { default: 0 })
    totalSets: number; // Tamamlanan set sayısı

    @Column('int', { default: 0 })
    totalReps: number; // Toplam tekrar

    @Column('float', { nullable: true })
    totalWeightKg: number | null; // Toplam kaldırılan ağırlık (kg × set × rep)

    @Column('simple-json', { nullable: true })
    exercises: {
        name: string;
        sets: number;
        reps: number;
        weightKg: number | null;
        completed: boolean;
    }[]; // Her egzersizin detayları

    @Column({ nullable: true })
    notes: string; // Kullanıcı notu

    @CreateDateColumn()
    createdAt: Date;
}
