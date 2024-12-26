import { Module, forwardRef } from '@nestjs/common';

// Controllers
import { UserController } from './user.controller';

// Services
import { UserService } from './user.service';

// Models
import { AuthModule } from '../auth/auth.module';

// Entities and Repositories
import { TypeOrmModule} from "@nestjs/typeorm";
import { User } from './entite/user.entitie';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  // imports: [AuthModule], //- A circular dependency
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UserModule {}
