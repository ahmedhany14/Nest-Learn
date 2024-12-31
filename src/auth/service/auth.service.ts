import {
  Inject,
  Injectable,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';

// Services
import { UserService } from '../../user/services/user.service';
import { Hashing } from './hashing.provider';

// Dto
import { SignInDto } from '../dto/sign-in.dto';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

// Exceptions
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

// Services
import { TokenService } from './token.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject()
    private readonly hashing: Hashing,
    @Inject()
    private readonly tokenService: TokenService,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    const isPasswordValid = await this.hashing.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password', {
        description: 'The password you entered is incorrect',
      });
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }

  public async RefreshToken(refresh_Token: RefreshTokenDto) {
    try {
      // Verify the refresh token
      const { id } = await this.tokenService.verifyToken<
        Pick<ActiveUserInterface, 'id'>
      >(refresh_Token.refresh_token);

      // Find the user by id
      const user = await this.userService.findOnebyId(id);

      // Generate a new access token and refresh token
      const { accessToken, refreshToken } =
        await this.tokenService.generateToken(user);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error.messages);
    }
  }
}
