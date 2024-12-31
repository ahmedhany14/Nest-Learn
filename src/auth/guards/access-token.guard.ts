import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { TokenService } from '../service/token.service';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject()
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    try {
      request.user =
        await this.tokenService.verifyToken<ActiveUserInterface>(token);
    } catch (error) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    return true;
  }

  private extractToken(request: Request) {
    const authorization = request.headers['authorization'];
    if (!authorization) return null;
    const parts = authorization.split(' ');
    if (parts.length !== 2) return null;
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return null;
    return token;
  }
}
