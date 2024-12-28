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
import { UserCreateManyServiceService } from './services/user-create-many.service.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserCreateManyServiceService],
  exports: [UserService],
  // imports: [AuthModule], //- A circular dependency
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UserModule { }
