import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WorkoutLogService } from './workout-log.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Controller('workout-log')
export class WorkoutLogController {
    constructor(private readonly service: WorkoutLogService) { }

    /** Yeni antrenman kaydı oluştur */
    @Post()
    create(@Body() dto: CreateWorkoutLogDto) {
        return this.service.create(dto);
    }

    /** Kullanıcının tüm antrenman geçmişi */
    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.service.findByUser(userId);
    }

    /** Kullanıcının özet istatistikleri */
    @Get('user/:userId/stats')
    getStats(@Param('userId') userId: string) {
        return this.service.getStats(userId);
    }
}
