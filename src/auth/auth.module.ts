import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

// Modules
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

// Services
import { BcryptProvider } from './service/bcrypt.provider';
import { Hashing } from './service/hashing.provider';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { GoogleController } from './google/google.controller';
import { Google } from './google/providers/google';

// configurations
import jwtConfig from './config/jwt.config';

@Module({
  controllers: [AuthController, GoogleController],
  providers: [
    AuthService,
    {
      provide: Hashing,
      useClass: BcryptProvider,
    },
    TokenService,
    Google,
  ],
  exports: [AuthService, Hashing],
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
