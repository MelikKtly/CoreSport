import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutLog } from './entities/workout-log.entity';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Injectable()
export class WorkoutLogService {
    constructor(
        @InjectRepository(WorkoutLog)
        private readonly repo: Repository<WorkoutLog>,
    ) { }

    async create(dto: CreateWorkoutLogDto): Promise<WorkoutLog> {
        const log = this.repo.create(dto);
        return this.repo.save(log);
    }

    async findByUser(userId: string): Promise<WorkoutLog[]> {
        return this.repo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: 50,
        });
    }

    async getStats(userId: string) {
        const logs = await this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });

        const totalSessions = logs.length;
        const totalMinutes = logs.reduce((s, l) => s + (l.durationMinutes || 0), 0);
        const totalSets = logs.reduce((s, l) => s + (l.totalSets || 0), 0);
        const totalWeight = logs.reduce((s, l) => s + (l.totalWeightKg || 0), 0);

        // Son 7 gün
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weeklyLogs = logs.filter(l => new Date(l.createdAt) >= weekAgo);

        return {
            totalSessions,
            totalMinutes,
            totalSets,
            totalWeightKg: Math.round(totalWeight),
            weeklySessions: weeklyLogs.length,
            weeklyMinutes: weeklyLogs.reduce((s, l) => s + (l.durationMinutes || 0), 0),
            recentLogs: logs.slice(0, 10),
        };
    }
}
