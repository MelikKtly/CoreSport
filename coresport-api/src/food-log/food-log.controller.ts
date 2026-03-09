import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { FoodLogService } from './food-log.service';
import { CreateFoodLogDto } from './dto/create-food-log.dto';

@Controller('food-log')
export class FoodLogController {
    constructor(private readonly service: FoodLogService) { }

    @Post()
    create(@Body() dto: CreateFoodLogDto) {
        return this.service.create(dto);
    }

    @Get('user/:userId/today')
    getToday(@Param('userId') userId: string) {
        return this.service.getTodayLogs(userId);
    }

    @Get('user/:userId/by-date')
    getByDate(@Param('userId') userId: string, @Query('date') date: string) {
        return this.service.getLogsByDate(userId, date);
    }

    @Get('user/:userId/recent')
    getRecent(@Param('userId') userId: string) {
        return this.service.getRecentLogs(userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
