import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FoodLog } from './entities/food-log.entity';
import { CreateFoodLogDto } from './dto/create-food-log.dto';

@Injectable()
export class FoodLogService {
    constructor(
        @InjectRepository(FoodLog)
        private readonly repo: Repository<FoodLog>,
    ) { }

    create(dto: CreateFoodLogDto) {
        const log = this.repo.create(dto);
        return this.repo.save(log);
    }

    async getTodayLogs(userId: string) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return this.repo.find({
            where: { userId, createdAt: Between(start, end) },
            order: { createdAt: 'ASC' },
        });
    }

    async getLogsByDate(userId: string, dateStr: string) {
        const start = new Date(dateStr);
        start.setHours(0, 0, 0, 0);
        const end = new Date(dateStr);
        end.setHours(23, 59, 59, 999);
        return this.repo.find({
            where: { userId, createdAt: Between(start, end) },
            order: { createdAt: 'ASC' },
        });
    }

    async getRecentLogs(userId: string, days = 7) {
        const start = new Date();
        start.setDate(start.getDate() - days);
        start.setHours(0, 0, 0, 0);
        return this.repo.find({
            where: { userId, createdAt: Between(start, new Date()) },
            order: { createdAt: 'DESC' },
        });
    }

    async delete(id: string) {
        return this.repo.delete(id);
    }
}
