import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';

import { AuthTypeEnum } from '../enums/AuthType.enum';
import { AUTH_TYPE_KEY } from '../../common/constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthTypeEnum.BEARER;
  private readonly authTypeMap = new Map();

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeMap.set(AuthTypeEnum.BEARER, this.accessTokenGuard);
    this.authTypeMap.set(AuthTypeEnum.NONE, { canActivate: () => true });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get all the auth types from the metadata
    const authTypes = this.reflector.getAllAndOverride<AuthTypeEnum[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()], // get the metadata from the handler or the class
    ) ?? [AuthenticationGuard.defaultAuthType]; // if there is no metadata, use the default auth type

    // Get array of guards based on the auth types
    const guards = authTypes.map((authType) => this.authTypeMap.get(authType));

    let defaultError = new UnauthorizedException('Unauthorized');

    // Check if the user can activate the guard
    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context),
      ).catch((err) => (defaultError = err));
      if (canActivate === true) return true;
    }

    throw defaultError;
  }
}
