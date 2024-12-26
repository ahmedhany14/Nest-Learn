import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

// entities
import { User } from './user/entite/user.entitie';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [UserModule, PostModule, AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        entities: [User],
        synchronize: true, // This will automatically create database tables that don't exist, useful for development
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'new_password',
        database: "nest-learn"
      })
    }),
    TagsModule,
    MetaOptionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
