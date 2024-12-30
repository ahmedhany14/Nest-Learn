import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';

import { UserModule } from '../user/user.module';
import { BcryptProvider } from './service/bcrypt.provider';
import { Hashing } from './service/hashing.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide: Hashing,
    useClass: BcryptProvider,
  }],
  exports: [AuthService, Hashing],
  imports: [forwardRef(() => UserModule)],
})
export class AuthModule { }
