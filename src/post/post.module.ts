import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {UserModule} from "../user/user.module";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UserModule],
})
export class PostModule {}
