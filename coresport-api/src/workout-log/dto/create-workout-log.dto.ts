import {
    IsString, IsInt, IsOptional, IsNumber, IsArray, IsBoolean, Min, IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseLogDto {
    @IsString() name: string;
    @IsInt() @Min(0) sets: number;
    @IsInt() @Min(0) reps: number;
    @IsOptional() @IsNumber() weightKg?: number | null;
    @IsBoolean() completed: boolean;
}

export class CreateWorkoutLogDto {
    @IsString() @IsNotEmpty() userId: string;
    @IsString() @IsNotEmpty() workoutTitle: string;
    @IsInt() @Min(0) durationMinutes: number;
    @IsInt() @Min(0) totalSets: number;
    @IsInt() @Min(0) totalReps: number;
    @IsOptional() @IsNumber() totalWeightKg?: number | null;
    @IsArray() @Type(() => ExerciseLogDto) exercises: ExerciseLogDto[];
    @IsOptional() @IsString() notes?: string;
}
