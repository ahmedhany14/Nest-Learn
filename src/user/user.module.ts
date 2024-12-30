import { Module, forwardRef } from '@nestjs/common';

// Controllers
import { UserController } from './user.controller';

// Services
import { UserService } from './services/user.service';

// Models
import { AuthModule } from '../auth/auth.module';

// Entities and Repositories
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entite/user.entitie';

// Services
import { UserCreateManyServiceService } from './services/user-create-many.service.service';
import { CreateUserServiceService } from './services/create-user.service.service';

// Configurations
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "../auth/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";

// Guards
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateManyServiceService, CreateUserServiceService,],
  exports: [UserService],
  // imports: [AuthModule], //- A circular dependency
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule { }
