import { Inject, Injectable } from '@nestjs/common';

// interfaces
import { ActiveUserInterface } from '../interfaces/active-user.interface';

// Entities
import { User } from '../../user/entite/user.entitie';

// Configurations
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class TokenService {
  constructor(
    @Inject()
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private async signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      // payload
      {
        id: userId,
        ...payload,
      },
      {
        // options
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  public async generateToken<T>(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserInterface>>(
        user.id,
        this.jwtConfiguration.expiresIn,
        {
          email: user.email,
        },
      ),

      this.signToken(user.id, this.jwtConfiguration.refreshToken),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async verifyToken<T>(token: string): Promise<T> {
    return (await this.jwtService.verifyAsync(token, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    })) as T;
  }
}
