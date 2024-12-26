import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

// entities
import { User } from './user/entite/user.entitie';
import { Post } from './post/entitie/post.entitie';
import { Tags } from './tags/tags.entity';
import { MetaOptionsEntity } from './meta-options/meta-options.entity';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        // entities: [User, Post, Tags, MetaOptionsEntity],
        autoLoadEntities: true,
        synchronize: true, // This will automatically create database tables that don't exist, useful for development
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'new_password',
        database: 'nest-learn',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
