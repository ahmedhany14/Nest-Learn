import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

import {
  TypeOrmModule
} from '@nestjs/typeorm';


@Module({
  imports: [UserModule, PostModule, AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        entities: [],
        synchronize: true, // This will automatically create database tables that don't exist, useful for development
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'new_password',
        database: "nest-learn"
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
