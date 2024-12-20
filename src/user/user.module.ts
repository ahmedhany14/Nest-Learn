import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  // imports: [AuthModule], //- A circular dependency
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
