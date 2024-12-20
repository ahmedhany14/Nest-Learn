import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength,
    MaxLength,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

}
