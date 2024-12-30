import { Inject, Injectable, forwardRef } from '@nestjs/common';

// Services
import { UserService } from '../../user/services/user.service';
import { Hashing } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';

// Dto
import { SignInDto } from '../dto/sign-in.dto';

// Exceptions
import { BadRequestException, RequestTimeoutException } from '@nestjs/common';

// Configurations
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject()
    private readonly hashing: Hashing,
    @Inject()
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public isAuth(id: number) {
    return true;
  }

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

    const token = await this.jwtService.signAsync(
      {
        // payload
        id: user.id,
        email: user.email,
      },
      {
        // options
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.expiresIn,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );
    return {
      token,
    };
  }
}
