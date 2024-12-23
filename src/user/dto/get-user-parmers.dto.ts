import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class GetUserParmersDto {
  @ApiProperty({
    description: 'User ID',
    example: 123, 
  }
  )
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
