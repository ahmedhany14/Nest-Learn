import { Body, Controller, Post } from '@nestjs/common';

// services
import { AuthService } from './service/auth.service';

// dto
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from "./dto/refresh-token.dto";

// Decorators
import { AuthTypeEnum } from './enums/AuthType.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Auth(AuthTypeEnum.NONE)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
  }

  @Post('refresh-token')
  @Auth(AuthTypeEnum.NONE)
  public async refreshToken(@Body() refresh_token: RefreshTokenDto) {
    return this.authService.RefreshToken(refresh_token);
  }
}
