import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number = 1;


    @IsOptional()
    @IsPositive()
    @Max(20)
    @Type(() => Number)
    limit?: number = 10;
}