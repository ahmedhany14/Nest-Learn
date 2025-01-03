import { Body, Controller, Post } from "@nestjs/common";

// Decorators
import { Auth } from '../decorators/auth.decorator';
import { AuthTypeEnum } from '../enums/AuthType.enum';

// Services
import { Google } from './providers/google';
import { GoogleAuthDto } from "./dtos/google.auth.dto";

@Controller('auth/google-authentication')
@Auth(AuthTypeEnum.NONE)
export class GoogleController {
  constructor(private readonly googleService: Google) {}

  @Post()
  public async googleAuth(@Body() googleAuthDto: GoogleAuthDto) {
    return await this.googleService.verifyGoogleToken(googleAuthDto);
  }
}
