import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  googleId: string;
}
