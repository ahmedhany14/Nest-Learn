import { SetMetadata } from '@nestjs/common';
import { AuthTypeEnum } from '../enums/AuthType.enum';
import { AUTH_TYPE_KEY } from '../../common/constants';

export const Auth = (...authType: AuthTypeEnum[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
