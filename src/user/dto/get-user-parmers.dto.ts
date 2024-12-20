import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetUserParmersDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
