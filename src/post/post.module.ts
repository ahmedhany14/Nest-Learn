import { Module } from '@nestjs/common';

// controllers
import { PostController } from './post.controller';

// services
import { PostService } from './post.service';

// modules
import {UserModule} from "../user/user.module";
import { MetaOptionsModule } from "../meta-options/meta-options.module";

// entities
import { Post } from './entitie/post.entitie';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UserModule, TypeOrmModule.forFeature([Post]), MetaOptionsModule],
})
export class PostModule {}
