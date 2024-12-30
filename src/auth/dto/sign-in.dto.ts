import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';


export class SignInDto {


    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string;
}