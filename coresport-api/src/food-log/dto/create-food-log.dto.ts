import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFoodLogDto {
    @IsString()
    userId: string;

    @IsString()
    foodName: string;

    @IsNumber()
    gramsConsumed: number;

    @IsNumber()
    calories: number;

    @IsNumber()
    protein: number;

    @IsNumber()
    carb: number;

    @IsNumber()
    fat: number;

    @IsOptional()
    @IsString()
    mealType?: string;
}
