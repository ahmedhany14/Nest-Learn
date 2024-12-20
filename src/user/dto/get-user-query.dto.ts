import { IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetUserQueryDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number;
}
